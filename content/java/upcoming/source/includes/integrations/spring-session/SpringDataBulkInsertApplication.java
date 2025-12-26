package com.mongodb.examples.springdatabulkinsert;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringDataBulkInsertApplication implements CommandLineRunner {

    @Value("${documentCount}")
    private int count;
    private static final Logger LOG = LoggerFactory
            .getLogger(SpringDataBulkInsertApplication.class);

    @Autowired
    private ProductRepository repository;

    public static void main(String[] args) {
        SpringApplication.run(SpringDataBulkInsertApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        repository.bulkInsertProducts(count);
        LOG.info("Bulk insert completed. Web endpoints are now available.");
        LOG.info("You can visit these URLs:");
        LOG.info("  http://localhost:8080/products/search?name=goose");
        LOG.info("  http://localhost:8080/products/history");
    }
}