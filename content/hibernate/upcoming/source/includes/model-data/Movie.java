package org.example;

import com.mongodb.hibernate.annotations.ObjectIdGenerator;
import org.bson.types.ObjectId;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// start-movie-entity
@Entity
@Table(name = "movies")
public class Movie {

    @Id
    @ObjectIdGenerator
    private ObjectId id;
    private String title;
    private String plot;
    private int year;
    private List<String> cast;
    private List<String> directors;

    public Movie(String title, String plot, int year, List<String> cast, List<String> directors) {
        this.title = title;
        this.plot = plot;
        this.year = year;
        this.cast = cast;
        this.directors = directors;
    }

    public Movie() {
    }

    // Getter and setter methods
}
// end-movie-entity
