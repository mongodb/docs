package fundamentals;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerApi;
import com.mongodb.ServerApiVersion;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

public class StableApiExample {
    private static void setApiVersionOptions(String uri) {
        // start apiVersionOptions
        ServerApi serverApi = ServerApi.builder()
                .version(ServerApiVersion.V1)
                .strict(true)
                .deprecationErrors(true)
                .build();
        // end apiVersionOptions
    }

    public static void main(String[] args) {
        // start serverAPIVersion
        ServerApi serverApi = ServerApi.builder()
                .version(ServerApiVersion.V1)
                .build();

        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "<connection string uri>";

        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(uri))
                .serverApi(serverApi)
                .build();

        MongoClient client = MongoClients.create(settings);
        // end serverAPIVersion
    }
}

