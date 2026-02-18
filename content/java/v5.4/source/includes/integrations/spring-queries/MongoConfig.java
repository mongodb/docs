package com.mongodb;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoConfig  {

   @Bean
   public MongoClient mongoClient() {
       MongoClientSettings settings = MongoClientSettings.builder()
               .applyConnectionString(new ConnectionString("<your connection string>"))
               .build();
       return MongoClients.create(settings);
   }

   @Bean
   MongoOperations mongoTemplate(MongoClient mongoClient) {
       return new MongoTemplate(mongoClient, "springshop");
   }
}
