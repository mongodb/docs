package org.example;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity(name = "Book")
@Table(name = "books")
public class Book {
    @EmbeddedId
    private BookId id;
    private String title;

    public Book(BookId id, String title) {
        this.id = id;
        this.title = title;
    }

    public Book() {

    }

    public BookId getId() {
        return id;
    }

    public void setId(BookId id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

}
