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
    private String status;     
    private String priority;   
    private LocalDate dueDate; 

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
