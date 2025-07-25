package org.example;

import com.mongodb.client.*;
import com.mongodb.client.model.SearchIndexModel;
import org.bson.Document;

import java.util.Arrays;

public class SearchIndexMethods {

    private static String URI = "<your connection string>";
    private static String DB_NAME = "test_db";
    private static String COLL_NAME = "test_coll";

    private static void setup(MongoClient mongoClient) {
        MongoDatabase database = mongoClient.getDatabase(DB_NAME);
        MongoCollection<Document> collection = database.getCollection(COLL_NAME);
        collection.dropIndexes();
        database.createCollection(COLL_NAME);
    }

    public static void main( String[] args ) {
        try (MongoClient mongoClient = MongoClients.create(URI)) {
            setup(mongoClient);
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(COLL_NAME);

            // start create-search-index
            Document index = new Document("mappings",
                    new Document("dynamic", true));
            collection.createSearchIndex("myIndex", index);
            // end create-search-index

            // start create-search-indexes
            SearchIndexModel indexOne = new SearchIndexModel("myIndex1",
                    new Document("analyzer", "lucene.standard").append(
                            "mappings", new Document("dynamic", true)));

            SearchIndexModel indexTwo = new SearchIndexModel("myIndex2",
                    new Document("analyzer", "lucene.simple").append(
                            "mappings", new Document("dynamic", true)));

            collection.createSearchIndexes(Arrays.asList(indexOne, indexTwo));
            // end create-search-indexes

            // start update-search-index
            collection.updateSearchIndex("myIndex",
                    new Document("analyzer", "lucene.simple").append(
                            "mappings",
                            new Document("dynamic", false)
                                    .append("fields",
                                            new Document("title",
                                                    new Document("type", "string")))
                    )
            );
            // end update-search-index

            // start list-search-indexes
            try (MongoCursor<Document> resultsCursor = collection.listSearchIndexes().iterator()) {
                while (resultsCursor.hasNext()) {
                    System.out.println(resultsCursor.next());
                }
            }
            // end list-search-indexes

            // start drop-search-index
            collection.dropSearchIndex("myIndex");
            // end drop-search-index
        }
    }
}
