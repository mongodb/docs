package org.example.pojos;

import static org.bson.codecs.configuration.CodecRegistries.fromProviders;

import java.util.Optional;

import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;

import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;

public class OptionalPropertyExample {

    public static void main(String[] args) {
        CodecProvider pojoCodecProvider = PojoCodecProvider.builder()
                .register("githubdocs")
                .register(new OptionalPropertyCodecProvider()) // comment this out to make the code fail
                .build();

        CodecRegistry registry = CodecRegistries.fromRegistries(
                MongoClientSettings.getDefaultCodecRegistry(),
                fromProviders(pojoCodecProvider));

        String uri = "mongodb://localhost:27017";

        try (MongoClient mongoClient = MongoClients.create(uri)) {

            MongoDatabase database = mongoClient.getDatabase("sample_pojo").withCodecRegistry(registry);
            MongoCollection<ApplicationUser> collection = database.getCollection("appUser", ApplicationUser.class);

            ApplicationUser appUser = new ApplicationUser("Chris");
            Address addr = new Address("New York City", "Broadway");
            appUser.setOptionalAddress(Optional.ofNullable(addr));
            collection.insertOne(appUser);

            ApplicationUser anotherAppUser = new ApplicationUser("Sirhc");
            Subscription sub = new Subscription("Monthly", "12-Month Plan");
            anotherAppUser.setOptionalAddress(Optional.ofNullable(new Address()));
            anotherAppUser.setOptionalSubscription(Optional.ofNullable(sub));
            collection.insertOne(anotherAppUser);

            MongoCursor<ApplicationUser> results = collection.find().iterator();
            while(results.hasNext()) {
                ApplicationUser result = results.next();
                StringBuilder sb = new StringBuilder(result.getName() + ": ");
                
                if (result.getOptionalSubscription() != null && result.getOptionalSubscription().isPresent()) {
                    sb.append(result.getOptionalSubscription().get().toString());
                }
                if (result.getOptionalAddress() != null && result.getOptionalAddress().isPresent()) {
                    sb.append(result.getOptionalAddress().get().toString());
                }
                
                System.out.println(sb);
            }
        }


    }

}
