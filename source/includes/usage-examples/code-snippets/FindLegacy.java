package usage_examples;

import static com.mongodb.client.model.Filters.lt;

import org.bson.Document;
import org.bson.conversions.Bson;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Projections;
import com.mongodb.client.model.Sorts;

public class Find
{
  public static void main( String[] args )
  {
    // Replace the uri string with your MongoDB deployment's connection string
     MongoClientURI uri = new MongoClientURI("mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority");

     MongoClient mongoClient = new MongoClient(uri);

     MongoDatabase database = mongoClient.getDatabase("sample_mflix");
     MongoCollection<Document> collection = database.getCollection("movies");

     Bson projectionFields = Projections.fields(
         Projections.include("title", "imdb"),
         Projections.excludeId());

     MongoCursor<Document> cursor = collection
         .find(lt("runtime", 15))
         .projection(projectionFields)
         .sort(Sorts.descending("title")).iterator();

     try {
         while(cursor.hasNext()) {
             System.out.println(cursor.next().toJson());
         }
     } finally {
         cursor.close();
     }

    mongoClient.close();
  }
}
