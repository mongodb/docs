package com.mongodb.quickstart.javaspringbootcsfle.repository;

import com.mongodb.quickstart.javaspringbootcsfle.model.PersonEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the PersonEntity
 */
// start-person-repository
@Repository
public interface PersonRepository extends MongoRepository<PersonEntity, String> {

    PersonEntity findFirstBySsn(String ssn);
}
// end-person-repository