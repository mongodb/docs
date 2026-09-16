package org.example;

import org.bson.types.ObjectId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, ObjectId> {
    List<Movie> findByTitle(String title);
}
