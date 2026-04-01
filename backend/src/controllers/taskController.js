const { Task, User, Pet } = require('../models');
const { sequelize } = require('../config/database');
const { checkAndAwardAchievements } = require('./achievementController');

// @desc Get all tasks for the authenticated user
// @route GET /api/tasks
// @access Private

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: { user_id: req.user.id },
            order: [['createdAt', 'DESC']]
        });
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Server error' });

    }
};

// @desc Create a new task
// @route POST /api/tasks
// @access Private
const createTask = async (req, res) => {
    try {

        const { title, description, priority, difficulty, due_date, points_worth, completed } = req.body;
        // Calculate points on backend
        const priorityPoints = { low: 10, medium: 25, high: 50, urgent: 75 };
        const difficultyMultiplier = { easy: 1, medium: 1.5, hard: 2 };
        const pointsWorth = Math.round(
            (priorityPoints[priority] || 10) * (difficultyMultiplier[difficulty] || 1)
        );

        // Check authentication
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const task = await Task.create({
            user_id: req.user.id,
            title,
            description,
            priority: priority || 'medium',
            difficulty: difficulty || 'medium',
            due_date,
            points_worth: pointsWorth,
            completed: completed || false
        });

        res.status(201).json(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc Get a single task
// @route GET /api/tasks/:id
// @access Private

const getTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            where: { id: req.params.id, user_id: req.user.id }
        });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc Update a task
// @route PUT /api/tasks/:id
// @access Private
const updateTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            where: { id: req.params.id, user_id: req.user.id }
        });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        let pointsWorth = task.points_worth;
        if (req.body.priority !== undefined || req.body.difficulty !== undefined) {
            const priority = req.body.priority || task.priority;
            const difficulty = req.body.difficulty || task.difficulty;
            const priorityPoints = { low: 10, medium: 25, high: 50, urgent: 75 };
            const difficultyMultiplier = { easy: 1, medium: 1.5, hard: 2 };
            pointsWorth = Math.round(
                (priorityPoints[priority] || 10) * (difficultyMultiplier[difficulty] || 1)
            );
        }

        await task.update({
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            difficulty: req.body.difficulty,
            due_date: req.body.due_date,
            points_worth: pointsWorth
        });

        res.json(task);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc Delete a task
// @route DELETE /api/tasks/:id
// @access Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            where: { id: req.params.id, user_id: req.user.id }
        });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await task.destroy();
        res.json({ message: 'Task deleted' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc Mark task as completed and award points
// @route POST /api/tasks/:id/complete
// @access Private

const completeTask = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const task = await Task.findOne({
            where: { id: req.params.id, user_id: req.user.id },
            transaction
        });
        if (!task) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.completed) {
            await transaction.rollback();
            return res.status(400).json({ message: 'Task already completed' });
        }
        task.completed = true;
        await task.save({ transaction });

        // Mark task as completed
        await task.update({
            completed: true,
            completed_at: new Date(),
            points_earned: task.points_worth
        }, { transaction });

        // Award points to user
        const user = await User.findByPk(req.user.id, { transaction });
        user.points += task.points_worth;
        await user.save({ transaction });

        // Increase pet happiness
        const pet = await Pet.findOne({ where: { user_id: req.user.id }, transaction });
        await pet.update({
            happiness: Math.min(100, pet.happiness + 5),
            last_interaction: new Date()
        }, { transaction });

        await transaction.commit();

        const newAchievements = await checkAndAwardAchievements(req.user.id);

        res.json({
            success: true,
            message: 'Task completed, points awarded, and pet happiness increased',
            points_earned: task.points_worth,
            points_worth: task.points_worth,
            total_points: user.points + task.points_worth,
            pet_happiness: pet.happiness,
            task: {
                id: task.id,
                completed: task.completed,
                points_earned: task.points_earned
            }
        });

    } catch (error) {
        await transaction.rollback();
        console.error('Error completing task:', error);
        res.status(500).json({ message: 'Server error' });
    }

};

module.exports = {
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    completeTask
};
