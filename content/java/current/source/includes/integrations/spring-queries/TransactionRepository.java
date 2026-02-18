package com.mongodb;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String>{
    List<Transaction> findByTransactionType(String type);
    List<Transaction> findByAmountGreaterThan(double amount);
    void deleteByTransactionType(String type);
}
