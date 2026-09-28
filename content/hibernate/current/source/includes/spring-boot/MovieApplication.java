package org.example;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MovieApplication {

    public static void main(String[] args) {
        SpringApplication.run(MovieApplication.class, args);
    }

    @Bean
    CommandLineRunner run(MovieRepository repository) {
        return args -> {
            for (Movie movie : repository.findByTitle("Little Women")) {
                System.out.println("Title: " + movie.getTitle()
                        + ", Year: " + movie.getYear());
            }
        };
    }
}
