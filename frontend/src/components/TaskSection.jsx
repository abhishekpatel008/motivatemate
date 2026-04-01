import TaskItem from './TaskItem';

const TaskSection = ({ tasks, onComplete, onAddTaskClick, onEdit, onDelete }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h2 className="text-xl font-bold text-gray-800">Current Tasks</h2>
                <button
                    onClick={onAddTaskClick}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-purple-700 hover:shadow-md transition"
                >
                    + Add Task
                </button>
            </div>

            <div className="space-y-3">
                {tasks.length === 0 ? (
                    <p className="text-gray-400 italic text-center py-6">
                        No tasks yet. Time to get productive!
                    </p>
                ) : (
                    tasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onComplete={onComplete}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TaskSection;