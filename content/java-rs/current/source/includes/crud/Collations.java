package org.example;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.model.*;
import com.mongodb.reactivestreams.client.*;
import org.bson.Document;
import org.bson.conversions.Bson;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;

public class Collations {
    public static void main(String[] args) {
        String uri = "<connection URI>";

        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(uri))
                .build();

        try (MongoClient mongoClient = MongoClients.create(settings)) {
            MongoDatabase database = mongoClient.getDatabase("fundamentals_example");

            // start-create-collection-options
            Mono.from(database.createCollection(
                            "items",
                            new CreateCollectionOptions().collation(
                                    Collation.builder().locale("en_US").build())))
                    .block();
            // end-create-collection-options

            MongoCollection<Document> itemsCollection =
                    database.getCollection("items");

            // start-list-indexes
            List<Document> indexes = Flux.from(itemsCollection.listIndexes())
                    .collectList().block();
            if (indexes != null) {
                indexes.forEach(idx -> System.out.println(idx.toJson()));
            }
            // end-list-indexes

            // start-create-index
            IndexOptions idxOptions = new IndexOptions();
            idxOptions.collation(Collation.builder().locale("en_US").build());
            Mono.from(itemsCollection.createIndex(
                    Indexes.ascending("name"), idxOptions)).block();
            // end-create-index

            // start-index-operation
            FindPublisher<Document> indexPublisher = itemsCollection.find()
                    .collation(Collation.builder().locale("en_US").build())
                    .sort(Sorts.ascending("name"));
            Flux.from(indexPublisher)
                    .doOnNext(doc -> System.out.println(doc.toJson()))
                    .blockLast();
            // end-index-operation

            // start-custom-collation-operation
            FindPublisher<Document> customPublisher = itemsCollection.find()
                    .collation(Collation.builder().locale("is").build())
                    .sort(Sorts.ascending("name"));
            Flux.from(customPublisher)
                    .doOnNext(doc -> System.out.println(doc.toJson()))
                    .blockLast();
            // end-custom-collation-operation

            // start-collation-builder
            Collation.builder()
                    .caseLevel(true)
                    .collationAlternate(CollationAlternate.SHIFTED)
                    .collationCaseFirst(CollationCaseFirst.UPPER)
                    .collationMaxVariable(CollationMaxVariable.SPACE)
                    .collationStrength(CollationStrength.SECONDARY)
                    .locale("en_US")
                    .normalization(false)
                    .numericOrdering(true)
                    .build();
            // end-collation-builder

            MongoCollection<Document> phonebookCollection =
                    database.getCollection("phonebook");

            // start-find-and-sort
            FindPublisher<Document> findPublisher = phonebookCollection.find()
                    .collation(Collation.builder()
                            .locale("de@collation=phonebook").build())
                    .sort(Sorts.ascending("first_name"));
            Flux.from(findPublisher)
                    .doOnNext(doc -> System.out.println(doc.toJson()))
                    .blockLast();
            // end-find-and-sort

            // start-find-one-and-update
            Document updatedDoc = Mono.from(
                            phonebookCollection.findOneAndUpdate(
                                    Filters.lt("first_name", "Gunter"),
                                    Updates.set("verified", true),
                                    new FindOneAndUpdateOptions()
                                            .collation(Collation.builder()
                                                    .locale("de@collation=phonebook")
                                                    .build())
                                            .sort(Sorts.ascending("first_name"))
                                            .returnDocument(ReturnDocument.AFTER)))
                    .block();
            if (updatedDoc != null) {
                System.out.println("Updated document: " + updatedDoc.toJson());
            }
            // end-find-one-and-update

            MongoCollection<Document> numericalCollection =
                    database.getCollection("numerical");

            // start-find-one-and-delete
            Document deletedDoc = Mono.from(
                            numericalCollection.findOneAndDelete(
                                    Filters.gt("a", "100"),
                                    new FindOneAndDeleteOptions()
                                            .collation(Collation.builder()
                                                    .locale("en")
                                                    .numericOrdering(true)
                                                    .build())
                                            .sort(Sorts.ascending("a"))))
                    .block();
            if (deletedDoc != null) {
                System.out.println("Deleted document: " + deletedDoc.toJson());
            }
            // end-find-one-and-delete

            // start-aggregation-example
            Bson groupStage = Aggregates.group(
                    "$first_name", Accumulators.sum("nameCount", 1));
            Bson sortStage = Aggregates.sort(Sorts.ascending("_id"));

            AggregatePublisher<Document> aggregatePublisher =
                    phonebookCollection
                            .aggregate(Arrays.asList(groupStage, sortStage))
                            .collation(Collation.builder()
                                    .locale("de")
                                    .collationStrength(CollationStrength.PRIMARY)
                                    .build());

            Flux.from(aggregatePublisher)
                    .doOnNext(doc -> System.out.println(doc.toJson()))
                    .blockLast();
            // end-aggregation-example
        }
    }
}
