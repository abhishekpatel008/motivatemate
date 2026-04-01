import { useState, useEffect } from 'react';

const EditTaskModal = ({ isOpen, onClose, task, onSave }) => {
    // Initialize state directly - no useEffect needed
    const [formData, setFormData] = useState({
        title: task?.title || '',
        description: task?.description || '',
        priority: task?.priority || 'medium',
        difficulty: task?.difficulty || 'medium',
        due_date: task?.due_date ? task.due_date.split('T')[0] : ''
    });

    // Reset form when task changes (when modal opens with new task)
    // Using a key in the parent component is better, but this is safe
    useEffect(() => {
        setFormData({
            title: task?.title || '',
            description: task?.description || '',
            priority: task?.priority || 'medium',
            difficulty: task?.difficulty || 'medium',
            due_date: task?.due_date ? task.due_date.split('T')[0] : ''
        });
    }, [task]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    const calculatePoints = () => {
        const priorityPoints = { low: 10, medium: 25, high: 50, urgent: 75 };
        const difficultyMultiplier = { easy: 1, medium: 1.5, hard: 2 };
        const basePoints = priorityPoints[formData.priority] || 10;
        const multiplier = difficultyMultiplier[formData.difficulty] || 1;
        return Math.round(basePoints * multiplier);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[500px] max-w-[90%]">
                <h2 className="text-xl font-bold mb-4 text-purple-700">Edit Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Task title"
                            value={formData.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
                            required
                        />
                        <textarea
                            placeholder="Description (optional)"
                            value={formData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
                            rows="3"
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Priority</label>
                                <select
                                    value={formData.priority}
                                    onChange={(e) => handleChange('priority', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Difficulty</label>
                                <select
                                    value={formData.difficulty}
                                    onChange={(e) => handleChange('difficulty', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                >
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Due Date (Optional)</label>
                            <input
                                type="date"
                                value={formData.due_date}
                                onChange={(e) => handleChange('due_date', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2"
                            />
                        </div>

                        <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Points reward:</span>
                                <span className="text-xl font-bold text-purple-600">
                                    ⭐ {calculatePoints()} pts
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-4 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-500 hover:text-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTaskModal;