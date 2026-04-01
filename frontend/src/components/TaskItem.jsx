const TaskItem = ({ task, onComplete, onEdit, onDelete }) => {
    const getPriorityColor = (priority) => {
        const colors = {
            urgent: 'bg-red-100 text-red-700',
            high: 'bg-orange-100 text-orange-700',
            medium: 'bg-blue-100 text-blue-700',
            low: 'bg-gray-100 text-gray-700'
        };
        return colors[priority] || colors.medium;
    };

    return (
        <div className="flex flex-col p-4 border rounded-lg hover:bg-gray-50 transition shadow-sm">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 flex-1">
                    <span className={`font-bold text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                        {task.title}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {/* ========= EDIT BUTTON ========= */}
                    <button
                        onClick={() => onEdit(task)}
                        className="text-blue-500 hover:text-blue-700 px-2 py-1 rounded text-sm"
                        title="Edit task"
                    >
                        ✏️ Edit
                    </button>
                    {/* ========= DELETE BUTTON ========= */}
                    <button
                        onClick={() => onDelete(task.id)}
                        className="text-red-500 hover:text-red-700 px-2 py-1 rounded text-sm"
                        title="Delete task"
                    >
                        🗑️ Delete
                    </button>

                </div>

                {!task.completed && (
                    <button
                        onClick={() => onComplete(task.id)}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-bold hover:bg-green-200 transition"
                    >
                        ✓ Done
                    </button>
                )}
            </div>

            <div className="flex justify-between items-end text-sm text-gray-500 mt-2 border-t pt-2">
                <div className="flex flex-col gap-1">
                    {task.description && <p className="text-gray-600">{task.description}</p>}
                    <div className="flex gap-3 mt-1 text-xs">
                        {task.due_date && <span>📅 Due: {new Date(task.due_date).toLocaleDateString()}</span>}
                        <span>⚡ Difficulty: {task.difficulty || 'medium'}</span>
                    </div>
                </div>
                <div className="font-bold text-purple-600 whitespace-nowrap">
                    ⭐ {task.points_worth || 0} pts
                </div>
            </div>
        </div>
    );
};

export default TaskItem;