package dev.aserrar.taskmanager.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/tasks")
public class TaskController  {
    
    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<Iterable<Task>> getTasks() {
        return new ResponseEntity<>(taskService.alltasks(), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Task> addTask(@RequestBody TaskRequest request) {
        return ResponseEntity.ok(taskService.addTask(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> editTask(@RequestBody TaskRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok(taskService.editTask(request, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteTask( @PathVariable Integer id) {
        return ResponseEntity.ok(taskService.deleteTask(id));
    }

}
