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
public class TodoController {

    private static final Logger LOG = LoggerFactory.getLogger(TodoController.class);

    private final TodoRepository todoRepository;

    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    /*
     * Endpoint: GET localhost:8080/todos
     * Command line: curl localhost:8080/todos | jq
     */
    @GetMapping
    public List<Todo> getTodos() {
        return todoRepository.findAll();
    }

    /*
     * Endpoint: GET localhost:8080/todos/{id}
     * Command line: curl localhost:8080/todos/1 | jq
     */
    @GetMapping("/{id}")
    public Todo getTodo(@PathVariable Long id) {
        return todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Todo not found"));
    }

    /*
     * Endpoint: POST localhost:8080/todos
     * Command line: curl -X POST -H "Content-Type: application/json" -d '{"title":"This is a test"}' localhost:8080/todos | jq
     */
    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
        Todo savedTodo = todoRepository.save(todo);
        LOG.info("Created new Todo with id: {}", savedTodo.getId());
        return ResponseEntity.ok(savedTodo);
    }

    /*
     * Endpoint: PUT localhost:8080/todos/{id}
     * Command line: curl -X PUT -H "Content-Type: application/json" -d '{"title":"This test is done", "completed":true}' localhost:8080/todos/4 | jq
     */
    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo todo) {
        Todo currentTodo = todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Todo not found"));
        currentTodo.setTitle(todo.getTitle());
        currentTodo.setCompleted(todo.isCompleted());
        currentTodo = todoRepository.save(currentTodo);

        LOG.info("Updated Todo with id: {}", currentTodo.getId());

        return ResponseEntity.ok(currentTodo);
    }

    /*
     * Endpoint: DELETE localhost:8080/todos/{id}
     * Command line: curl -X DELETE localhost:8080/todos/4
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        todoRepository.deleteById(id);
        LOG.info("Deleted Todo with id: {}", id);
        return ResponseEntity.ok().build();
    }
}