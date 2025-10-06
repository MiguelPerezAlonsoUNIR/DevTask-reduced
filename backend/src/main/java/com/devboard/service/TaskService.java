package com.devboard.service;

import com.devboard.model.Task;
import com.devboard.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // Fetch all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Fetch a single task by ID
    public Optional<Task> getTaskById(String id) {
        return taskRepository.findById(id);
    }

    // Create a new task
    public Task createTask(Task task) {
        task.setCreatedAt(LocalDateTime.now());
        task.setUpdatedAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

    // Update an existing task
    public Task updateTask(String id, Task updatedTask) {
        return taskRepository.findById(id).map(task -> {
            task.setTitle(updatedTask.getTitle());
            task.setDescription(updatedTask.getDescription());
            task.setStatus(updatedTask.getStatus());
            task.setPriority(updatedTask.getPriority());   // ✅ FIXED: priority now updated
            task.setDueDate(updatedTask.getDueDate());     // ✅ Optional: due date support
            task.setUpdatedAt(LocalDateTime.now());
            return taskRepository.save(task);
        }).orElse(null);
    }

    // Delete a task
    public void deleteTask(String id) {
        taskRepository.deleteById(id);
    }
}
