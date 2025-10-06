import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask, updateTask } from '../services/taskService';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import SearchBar from '../components/SearchBar';
import ThemeToggle from '../components/ThemeToggle';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ query: '' });

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const clearEdit = () => {
    setEditingTask(null);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter((task) => {
        const matchesQuery =
          task.title?.toLowerCase().includes(filters.query.toLowerCase()) ||
          task.description?.toLowerCase().includes(filters.query.toLowerCase());
        return matchesQuery;
      })
    : [];

  const groupedTasks = {
    pending: filteredTasks.filter((t) => t.status === 'pending'),
    'in-progress': filteredTasks.filter((t) => t.status === 'in-progress'),
    done: filteredTasks.filter((t) => t.status === 'done'),
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    const task = tasks.find((t) => t.id === draggableId);
    if (!task) return;

    try {
      await updateTask(task.id, { ...task, status: destination.droppableId });
      loadTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-7xl mx-auto px-4 pt-10">
        <div className="grid grid-cols-3 items-center mb-6 bg-inherit">
          <div></div>
          <h1 className="text-3xl font-bold text-center">DevBoard Tasks</h1>
          <div className="flex items-center justify-end gap-4">
            <SearchBar filters={filters} setFilters={setFilters} />
            <ThemeToggle />
          </div>
        </div>

        <div className="mb-6 bg-inherit">
          <TaskForm
            onTaskCreated={loadTasks}
            editingTask={editingTask}
            clearEdit={clearEdit}
          />
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-inherit">
            {['pending', 'in-progress', 'done'].map((status) => (
              <Droppable
                droppableId={status}
                key={status}
                isDropDisabled={false}
                isCombineEnabled={false}
                ignoreContainerClipping={false}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md min-h-[200px]"
                  >
                    <h2 className="text-xl font-semibold mb-4 capitalize text-center">
                      {status.replace('-', ' ')}
                    </h2>
                    {groupedTasks[status].length === 0 ? (
                      <p className="text-gray-500 text-center">No tasks</p>
                    ) : (
                      groupedTasks[status].map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                          isDragDisabled={false}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard
                                task={task}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default TaskBoard;
