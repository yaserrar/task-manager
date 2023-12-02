package dev.aserrar.taskmanager.task;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskRequest {
    
    @NotBlank(message = "Title is required.")
    @NotNull(message = "Title is required.")
    private String title;

    @NotNull(message = "Description is required.")
    private String description;

    @Enumerated(EnumType.STRING)
    private Status status;
}
