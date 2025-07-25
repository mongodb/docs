# start-connect-local
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoClient;

public class MongoConnection {
    public static void main(String[] args) {
        String uri = "mongodb://localhost:27017/";
        try (MongoClient client = MongoClients.create(uri)) {
            // use `client` here
        }
    }
}
# end-connect-local

# start-connect-replica
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoClient;

public class MongoConnection {
    public static void main(String[] args) {
        String uri = "mongodb://localhost:27017/?replicaSet=sampleRS";
        try (MongoClient client = MongoClients.create(uri)) {
            // use `client` here
        }
    }
}
# end-connect-replica

# start-arg-constructor
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoClient;

public class MongoConnection {
public static void main(String[] args) {
    try (MongoClient client = 
    MongoClients.create("mongodb://<hostname>:<port>", directConnection=True)){
            // use `client` here
        }
    }
}
# end-arg-constructor

# start-parameter-string
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoClient;

public class MongoConnection {
public static void main(String[] args) {
    String uri = "mongodb://<hostname>:<port>/?directConnection=true";
    try (MongoClient client = MongoClients.create(uri)){
            // use `client` here
        }
    }
}
# end-parameter-string
