package com.rewe.digital.todoapp;

import com.rewe.digital.todoapp.persistence.Todo;
import com.rewe.digital.todoapp.persistence.TodoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TodoApplication implements CommandLineRunner {

    private final TodoRepository todoRepository;

    public TodoApplication(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(TodoApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        todoRepository.save(new Todo("Learn Spring Boot", true));
        todoRepository.save(new Todo("Build a REST API"));
        todoRepository.save(new Todo("Write Unit Tests"));
        todoRepository.save(new Todo("Build a Frontend"));
    }
}
