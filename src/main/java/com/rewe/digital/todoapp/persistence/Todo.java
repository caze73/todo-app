package com.rewe.digital.todoapp.persistence;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
public class Todo {

    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private boolean completed;

    public Todo() {
        super();
    }

    public Todo(String title) {
        super();
        this.title = title;
    }

    public Todo(String title, boolean completed) {
        this(title);
        this.completed = completed;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
