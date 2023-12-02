package dev.aserrar.taskmanager.task;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "task")
public class Task {
    
    @Id
    @GeneratedValue(generator = "task_id_seq")
    @SequenceGenerator(name = "task_id_seq", sequenceName = "task_id_seq", allocationSize = 1)
    private Integer id ;
    
    
    @NotBlank(message = "Title is required.")
    @NotNull(message = "Title is required.")
    private String title;

    @NotNull(message = "Description is required.")
    private String description;


    @Enumerated(EnumType.STRING)
    private Status status;

    @NotNull(message = "Created at is required.")
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @NotNull(message = "Creator at is required.")
    @Column(name = "creator_id")
    private Integer creatorId;

    // @ManyToOne
    // @JoinColumn(name = "creator_id", nullable = false)
    // private User creator;

}
