package org.example;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.ExplainVerbosity;
import com.mongodb.client.model.*;
import org.bson.BsonDocument;
import org.bson.Document;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.bson.json.JsonWriterSettings;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

public class POJO {

    public static void main(String[] args) {
        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "<connection string>";

        // start-codec-provider
        CodecProvider pojoCodecProvider = PojoCodecProvider.builder().automatic(true).build();
        // end-codec-provider

        CodecRegistry pojoCodecRegistry = fromRegistries(getDefaultCodecRegistry(), fromProviders(pojoCodecProvider));

        // start-connect-db
        MongoClient mongoClient = MongoClients.create(uri);
        MongoDatabase database = mongoClient.getDatabase("sample_pojos").withCodecRegistry(pojoCodecRegistry);
        // end-connect-db

        // start-get-coll
        MongoCollection<Flower> collection = database.getCollection("flowers", Flower.class);
        // end-get-coll

        collection.deleteMany(Filters.empty());

        // start-crud-ops
        // Insert three Flower instances
        Flower roseFlower = new Flower("rose", false, 25.4f, Arrays.asList(new String[] {"red", "pink"}));
        Flower daisyFlower = new Flower("daisy", true, 21.1f, Arrays.asList(new String[] {"purple", "white"}));
        Flower peonyFlower = new Flower("peony", false, 19.2f, Arrays.asList(new String[] {"red", "green"}));
        collection.insertMany(Arrays.asList(roseFlower, daisyFlower, peonyFlower));

        // Update a document
        collection.updateOne(
                Filters.lte("height", 22),
                Updates.addToSet("colors", "pink")
        );

        // Delete a document
        collection.deleteOne(Filters.eq("name", "rose"));

        // Return and print all documents in the collection
        List<Flower> flowers = new ArrayList<>();
        collection.find().into(flowers);
        System.out.println(flowers);
        // end-crud-ops

    }
}