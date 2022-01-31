import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerApi;
import com.mongodb.ServerApiVersion;
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;

// ...

// Replace <connection string> with your MongoDB deployment's connection string.
ConnectionString connString = new ConnectionString("<connection string>");

// Set the version of the {+stable-api+} on the client.
ServerApi serverApi = ServerApi.builder()
        .version(ServerApiVersion.V1)
         .build();

MongoClientSettings settings = MongoClientSettings.builder()
         .applyConnectionString(connString)
         .serverApi(serverApi)
         .build();
MongoClient mongoClient = MongoClients.create(settings);
