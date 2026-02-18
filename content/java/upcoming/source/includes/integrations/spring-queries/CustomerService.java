package com.mongodb.domain.service;

import com.mongodb.bulk.BulkWriteResult;
import com.mongodb.client.MongoCollection;
import com.mongodb.domain.model.Customer;
import com.mongodb.domain.model.CustomersByCity;
import org.bson.Document;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.BulkOperations;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.Fields;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class CustomerService {

    private static final org.slf4j.Logger log = LoggerFactory.getLogger(CustomerService.class);
    private final Logger logger = Logger.getLogger(this.getClass().getName());
    private final MongoOperations mongoOperations;

    CustomerService(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }


    public Customer insert(Customer customer) {
        return mongoOperations.insert(customer);
    }

    public List<Customer> findAll() {
        return this.mongoOperations.findAll(Customer.class);
    }

    // start-findCustomerByEmail
    public Customer findCustomerByEmail(String email) {
        return mongoOperations.query(Customer.class)
                .matching(query(where("email").is(email)))
                .one()
                .orElseThrow(() -> new RuntimeException("Customer not found with email: " + email));
    }
    // end-findCustomerByEmail

    // start-totalCustomerByCity
    public List<CustomersByCity> totalCustomerByCity() {

        TypedAggregation<Customer> aggregation = newAggregation(Customer.class,
                group("address.city")
                        .count().as("total"),
                Aggregation.sort(Sort.Direction.ASC, "_id"),
                project(Fields.fields("total", "_id")));

        AggregationResults<CustomersByCity> result = mongoOperations.aggregate(aggregation, CustomersByCity.class);
        return result.getMappedResults();
    }
    // end-totalCustomerByCity

    public String getCustomerIndexExplanation() {
        MongoCollection<Document> collection = mongoOperations.getCollection("customer");
        Document query = new Document("email", "ricardo.mello@mongodb.com");
        Document explanation = collection.find(query).explain();

        logger.info(explanation.toJson());
        return explanation.toJson();
    }

    public Customer updatePhoneByEmail(String email, String newPhone) {
        Query query = new Query(Criteria.where("email").is(email));
        Update update = new Update().set("phone", newPhone);

        mongoOperations.updateFirst(query, update, Customer.class);

        // Return the updated customer (optional)
        return findCustomerByEmail(email);
    }

    public void deleteByEmail(String email) {
        mongoOperations.remove(
                query(where("email").is(email)),
                Customer.class
        );
    }

    // start-bulkCustomerSample
    public int bulkCustomerSample(List<Customer> customerList) {
        if (findAll().isEmpty()) {
            BulkWriteResult result = mongoOperations.bulkOps(BulkOperations.BulkMode.ORDERED, Customer.class)
                    .insert(customerList)
                    .execute();


            return result.getInsertedCount();
        }

        return 0;
    }
    // end-bulkCustomerSample
}