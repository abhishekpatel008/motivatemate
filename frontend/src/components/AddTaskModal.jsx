const AddTaskModal = ({ isOpen, onClose, newTask, setNewTask, onCreateTask }) => {
    if (!isOpen) return null;

const calculatePoints = () => {
    const priorityPoints = {low: 10, medium: 25, high: 50, urgent:75};
    const difficultyMultiplier = { easy: 1, medium: 1.5, hard: 2 };
        const basePoints = priorityPoints[newTask.priority] || 10;
        const multiplier = difficultyMultiplier[newTask.difficulty] || 1;
        return Math.round(basePoints * multiplier);

}

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
                <h2 className="text-xl font-bold mb-4 text-purple-700">New Goal</h2>
                <form onSubmit={onCreateTask}>
                    {/* Title */}
                    <input
                        className="w-full border border-gray-300 p-2 mb-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        placeholder="What will you accomplish?"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        required
                    />

                    {/* Description */}
                    <textarea
                        className="w-full border border-gray-300 p-2 mb-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                        placeholder="Add details or steps (optional)"
                        rows="2"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />

                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                            <label className="block text-xs text-gray-500 font-bold mb-1">Priority</label>
                            <select
                                className="w-full border border-gray-300 p-2 rounded-lg"
                                value={newTask.priority}
                                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="urgent">Urgent</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs text-gray-500 font-bold mb-1">Difficulty</label>
                            <select
                                className="w-full border border-gray-300 p-2 rounded-lg"
                                value={newTask.difficulty}
                                onChange={(e) => setNewTask({ ...newTask, difficulty: e.target.value })}
                            >
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                    </div>

                    {/* Due Date */}
                    <div className="mb-4">
                        <label className="block text-xs text-gray-500 font-bold mb-1">Due Date (Optional)</label>
                        <input
                            type="date"
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            value={newTask.due_date}
                            onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                        />
                    </div>

                    <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Points reward:</span>
                            <span className="text-xl font-bold text-purple-600">
                                ⭐ {calculatePoints()} pts
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            {newTask.priority} priority × {newTask.difficulty} difficulty
                        </p>
                    </div>

                    <div className="flex justify-end gap-3 mt-4 border-t pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium">
                            Cancel
                        </button>
                        <button type="submit" className="px-6 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition">
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;