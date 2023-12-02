package dev.aserrar.taskmanager.task;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    Iterable<Task> findByCreatorId(Integer creatorId);
}
