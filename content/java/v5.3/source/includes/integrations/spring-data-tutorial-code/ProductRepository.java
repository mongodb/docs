package com.mongodb.examples.springdatabulkinsert;

import com.mongodb.WriteConcern;
import com.mongodb.bulk.BulkWriteResult;
import com.mongodb.client.result.UpdateResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.BulkOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

// start-productrepo
@Repository
public class ProductRepository {

    private static final Logger LOG = LoggerFactory
            .getLogger(ProductRepository.class);

    private final MongoTemplate mongoTemplate;

    @Autowired
    public ProductRepository(MongoTemplate mongoTemplate){
        this.mongoTemplate = mongoTemplate;
    }


    public void updateProductQuantity(String name, int newQuantity) {
        Query query = new Query(Criteria.where("name").is(name));
        Update update = new Update();
        update.set("quantity", newQuantity);

        UpdateResult result = mongoTemplate.updateFirst(query, update, Product.class);

        if (result == null)
            LOG.error("No documents updated");
        else
            LOG.info(result.getModifiedCount() + " document(s) updated..");
    }

    public int bulkInsertProducts(int count) {

        LOG.info("Dropping collection...");
        mongoTemplate.dropCollection(Product.class);
        LOG.info("Dropped!");

        Instant start = Instant.now();
        mongoTemplate.setWriteConcern(WriteConcern.W1.withJournal(true));

        List<Product> productList = Product.randomProducts(count);
        BulkOperations bulkInsertion = mongoTemplate.bulkOps(BulkOperations.BulkMode.UNORDERED, Product.class);

        bulkInsertion.insert(productList);

        BulkWriteResult bulkWriteResult = bulkInsertion.execute();

        LOG.info("Bulk insert of " + bulkWriteResult.getInsertedCount() + " documents completed in " + Duration.between(start, Instant.now()).toMillis() + " milliseconds");
        return bulkWriteResult.getInsertedCount();
    }
}
// end-productrepo
