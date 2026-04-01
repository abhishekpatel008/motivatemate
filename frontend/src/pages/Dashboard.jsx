import { useState, useEffect, useCallback } from 'react';
import {
    getTasks,
    completeTask,
    createTask,
    updateTask,
    deleteTask,
    getPet,
    getCurrentUser,
    applyItemToPet,
    getUserInventory
} from '../services/api';
import Header from '../components/Header';
import TaskSection from '../components/TaskSection';
import InventorySection from '../components/InventorySection';
import PetDisplay from '../components/PetDisplay';
import CalendarView from '../components/CalendarView';
import AddTaskModal from '../components/AddTaskModal';
import ShopModal from '../components/ShopModal';
import AchievementsModal from '../components/AchievementsModal';
import EditTaskModal from '../components/EditTaskModal';
import { useNavigate } from 'react-router-dom';

function Dashboard({ user, setUser }) {
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [isShopOpen, setIsShopOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [pointAnimation, setPointAnimation] = useState(null);
    const [showAddTask, setShowAddTask] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'medium',
        difficulty: 'medium',
        due_date: '',
    });

    const loadDashboard = useCallback(async () => {
        try {
            const [userData, petData, tasksData, invData] = await Promise.all([
                getCurrentUser().catch(() => null),
                getPet().catch(() => null),
                getTasks().catch(() => []),
                getUserInventory().catch(() => [])
            ]);

            setInventory(invData || []);
            if (petData) setPet(petData);
            setTasks(tasksData || []);
            if (userData) {
                const actualUser = userData.user || userData;
                setUser(actualUser);
                localStorage.setItem('storedUser', JSON.stringify(actualUser));
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }, [setUser]);

    useEffect(() => {
        loadDashboard();
    }, [loadDashboard]);


    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!newTask.title.trim()) return;

        // If date is selected from calendar, auto-fill due_date
        const taskData = {
            ...newTask,
            due_date: newTask.due_date || (selectedDate ? selectedDate.toISOString().split('T')[0] : ''),
        };

        try {
            await createTask(taskData);
            setNewTask({ title: '', description: '', priority: 'medium', difficulty: 'medium', due_date: '' });
            setShowAddTask(false);
            setSelectedDate(null);
            loadDashboard();
        } catch (error) {
            alert(error);
        }
    };

    const handleComplete = async (id) => {
        try {
            const res = await completeTask(id);
            if (res.success) {
                setPointAnimation(res.points_worth);
                setTimeout(() => setPointAnimation(null), 2000);
                loadDashboard();
            }
        } catch (err) {
            console.error("Completion error:", err);
        }
    };

    const handleEditClick = (task) => {
        setEditingTask(task);
        setIsEditModalOpen(true);
    };
    // Handle update task
    const handleUpdateTask = async (updatedTask) => {
        try {
            await updateTask(updatedTask.id, {
                title: updatedTask.title,
                description: updatedTask.description,
                priority: updatedTask.priority,
                difficulty: updatedTask.difficulty,
                due_date: updatedTask.due_date
            });
            setIsEditModalOpen(false);
            setEditingTask(null);
            loadDashboard();
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Failed to update task');
        }
    };

    // Handle delete task
    const handleDeleteTask = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask(taskId);
                loadDashboard();
            } catch (error) {
                console.error('Error deleting task:', error);
                alert('Failed to delete task');
            }
        }
    };

    const handleUseItem = async (invId) => {
        try {
            await applyItemToPet(invId);
            loadDashboard();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setNewTask({ ...newTask, due_date: date.toISOString().split('T')[0] });
        setShowAddTask(true);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login', { replace: true });
    };

    if (loading) {
        return <div className="p-10 text-center text-purple-600 font-bold">Loading MotivateMate...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Header
                user={user}
                onShopClick={() => setIsShopOpen(true)}
                onAchievementsClick={() => setIsAchievementsOpen(true)}
                onLogout={handleLogout}
            />

            <main className="container mx-auto p-6">
                {/* Two column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Tasks and Inventory */}
                    <div className="lg:col-span-2 space-y-6">
                        <TaskSection
                            tasks={tasks}
                            onComplete={handleComplete}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteTask}
                            onAddTaskClick={() => setShowAddTask(true)}
                        />
                        <InventorySection
                            inventory={inventory}
                            onUseItem={handleUseItem}
                        />
                    </div>

                    {/* Right Column: Pet Display */}
                    <div>
                        <PetDisplay pet={pet} pointAnimation={pointAnimation} />
                    </div>
                </div>

                {/* Full Width Calendar Section */}
                <div className="mt-6">
                    <CalendarView
                        tasks={tasks}
                        onDateClick={handleDateClick}
                    />
                </div>
            </main>

            <ShopModal
                isOpen={isShopOpen}
                onClose={() => setIsShopOpen(false)}
                userPoints={user?.points || 0}
                onPurchaseSuccess={loadDashboard}
            />

            <AddTaskModal
                isOpen={showAddTask}
                onClose={() => {
                    setShowAddTask(false);
                    setSelectedDate(null);
                }}
                newTask={newTask}
                setNewTask={setNewTask}
                onCreateTask={handleCreateTask}
            />

            <AchievementsModal
                isOpen={isAchievementsOpen}
                onClose={() => setIsAchievementsOpen(false)}
            />

            <EditTaskModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setEditingTask(null);
                }}
                task={editingTask}
                onSave={handleUpdateTask}
            />

        </div>
    );
}

export default Dashboard;