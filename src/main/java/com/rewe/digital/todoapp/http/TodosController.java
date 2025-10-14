package com.rewe.digital.todoapp.http;

import com.rewe.digital.todoapp.persistence.Todo;
import com.rewe.digital.todoapp.persistence.TodoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
public class TodosController {

    private static final Logger LOG = LoggerFactory.getLogger(TodosController.class);

    private final TodoRepository todoRepository;

    public TodosController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @GetMapping
    public List<Todo> getTodos() {
        return todoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Todo getTodo(@PathVariable Long id) {
        return todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Todo not found"));
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
        Todo savedTodo = todoRepository.save(todo);
        LOG.info("Created new Todo with id: {}", savedTodo.getId());
        return ResponseEntity.ok(savedTodo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo todo) {
        Todo currentTodo = todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Todo not found"));
        currentTodo.setTitle(todo.getTitle());
        currentTodo.setCompleted(todo.isCompleted());
        currentTodo = todoRepository.save(currentTodo);

        LOG.info("Updated Todo with id: {}", currentTodo.getId());

        return ResponseEntity.ok(currentTodo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        todoRepository.deleteById(id);
        LOG.info("Deleted Todo with id: {}", id);
        return ResponseEntity.ok().build();
    }
}