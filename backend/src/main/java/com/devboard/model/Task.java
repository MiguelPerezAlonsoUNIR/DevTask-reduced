package com.devboard.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "tasks")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {
    @Id
    private String id;

    private String title;
    private String description;
    private String status;     // e.g. "pending", "in-progress", "done"
    private String priority;   // e.g. "Low", "Medium", "High"
    private LocalDate dueDate; // ✅ Proper date type for MongoDB

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
