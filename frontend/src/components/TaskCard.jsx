import React from 'react';

const TaskCard = ({ task, onDelete, onEdit }) => {
  const normalizePriority = (value) => {
    if (!value) return 'Medium';
    const lower = value.toLowerCase();
    if (lower === 'high') return 'High';
    if (lower === 'low') return 'Low';
    return 'Medium';
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-200 text-red-800 dark:bg-red-400 dark:text-red-900';
      case 'Medium':
        return 'bg-yellow-200 text-yellow-800 dark:bg-yellow-400 dark:text-yellow-900';
      case 'Low':
        return 'bg-green-200 text-green-800 dark:bg-green-400 dark:text-green-900';
      default:
        return 'bg-gray-200 text-gray-800 dark:bg-gray-400 dark:text-gray-900';
    }
  };

  const priorityLabel = normalizePriority(task.priority);

  const formatDate = (date) => {
    if (!date) return null;
    const parsed = new Date(date);
    return isNaN(parsed) ? null : parsed.toLocaleDateString();
  };

  return (
    <div className="bg-white dark:bg-gray-700 text-black dark:text-white p-4 rounded shadow mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <span className={`px-2 py-1 rounded text-sm font-medium ${getPriorityStyles(priorityLabel)}`}>
          {priorityLabel}
        </span>
      </div>
      <p className="text-sm mb-2">{task.description}</p>
      <p className="text-xs text-gray-600 dark:text-gray-300">
        {formatDate(task.dueDate) ? `Due: ${formatDate(task.dueDate)}` : 'No due date'}
      </p>
      <div className="flex justify-end gap-4 mt-2">
        <button
          onClick={() => onEdit(task)}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-600 dark:text-red-400 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
