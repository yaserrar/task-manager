package dev.aserrar.taskmanager.task;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import dev.aserrar.taskmanager.user.User;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Iterable<Task> alltasks(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User userDetails = (User) authentication.getPrincipal();
        Integer id = userDetails.getId();

        return taskRepository.findByCreatorId(id);
    }
    

    public Task addTask(TaskRequest request){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User userDetails = (User) authentication.getPrincipal();
        Integer id = userDetails.getId();

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .createdAt(LocalDateTime.now())
                .status(request.getStatus())
                .creatorId(id)
                .build();

       return taskRepository.save(task);
    }
    
    public Task editTask(TaskRequest request, Integer id){
        Task task = taskRepository.findById(id).orElseThrow();

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());

        return taskRepository.save(task);
    }

    public Boolean deleteTask(Integer id){
        taskRepository.deleteById(id);
        return true;
    }
}
