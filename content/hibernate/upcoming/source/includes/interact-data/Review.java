package org.example;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity(name = "Review")
@Table(name = "reviews")
public class Review {
    @EmbeddedId
    private ReviewId id;
    private String comment;

    @ManyToOne
    private Book book;

    public Review(ReviewId id, Book book, String comment) {
        this.id = id;
        this.book = book;
        this.comment = comment;
    }

    public Review() {

    }

    public ReviewId getId() {
        return id;
    }

    public void setId(ReviewId id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

}
