package com.rewe.digital.todoapp.http;

import com.rewe.digital.todoapp.persistence.Todo;
import com.rewe.digital.todoapp.persistence.TodoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
public class TodosController {

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
        return ResponseEntity.ok(savedTodo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo todo) {
        Todo currentTodo = todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Todo not found"));
        currentTodo.setTitle(todo.getTitle());
        currentTodo.setCompleted(todo.isCompleted());
        currentTodo = todoRepository.save(currentTodo);

        return ResponseEntity.ok(currentTodo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        todoRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}