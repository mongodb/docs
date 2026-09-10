.. note::
   The following server application uses
   `NanoHTTPD <https://github.com/NanoHttpd/nanohttpd>`__ and
   `json <https://mvnrepository.com/artifact/org.json/json>`__ 
   which you need to add to your project as dependencies before you 
   can run it.

.. code-block:: java
   :linenos:

   // File: App.java

   import java.util.Map;
   import java.util.logging.Logger;

   import org.bson.Document;
   import org.json.JSONArray;

   import com.mongodb.MongoException;
   import com.mongodb.client.MongoClient;
   import com.mongodb.client.MongoClients;
   import com.mongodb.client.MongoCollection;
   import com.mongodb.client.MongoDatabase;

   import fi.iki.elonen.NanoHTTPD;

   public class App extends NanoHTTPD {
       private static final Logger LOGGER = Logger.getLogger(App.class.getName());

       static int port = 3000;
       static MongoClient client = null;

       public App() throws Exception {
           super(port);

           // Replace the uri string with your MongoDB deployment's connection string
           String uri = "<atlas-connection-string>";
           client = MongoClients.create(uri);

           start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);
           LOGGER.info("\nStarted the server: http://localhost:" + port + "/ \n");
       }

       public static void main(String[] args) {
           try {
               new App();
           } catch (Exception e) {
               LOGGER.severe("Couldn't start server:\n" + e);
           }
       }

       @Override
       public Response serve(IHTTPSession session) {
           StringBuilder msg = new StringBuilder();
           Map<String, String> params = session.getParms();

           Method reqMethod = session.getMethod();
           String uri = session.getUri();

           if (Method.GET == reqMethod) {
               if (uri.equals("/")) {
                   msg.append("Welcome to my API!");
               } else if (uri.equals("/users")) {
                   msg.append(listUsers(client));
               } else {
                   msg.append("Unrecognized URI: ").append(uri);
               }
           } else if (Method.POST == reqMethod) {
               try {
                   String name = params.get("name");
                   if (name == null) {
                       throw new Exception("Unable to process POST request: 'name' parameter required");
                   } else {
                       insertUser(client, name);
                       msg.append("User successfully added!");
                   }
               } catch (Exception e) {
                   msg.append(e);
               }
           }

           return newFixedLengthResponse(msg.toString());
       }

       static String listUsers(MongoClient client) {
           MongoDatabase database = client.getDatabase("test");
           MongoCollection<Document> collection = database.getCollection("users");

           final JSONArray jsonResults = new JSONArray();
           collection.find().forEach((result) -> jsonResults.put(result.toJson()));

           return jsonResults.toString();
       }

       static String insertUser(MongoClient client, String name) throws MongoException {
           MongoDatabase database = client.getDatabase("test");
           MongoCollection<Document> collection = database.getCollection("users");

           collection.insertOne(new Document().append("name", name));
           return "Successfully inserted user: " + name;
       }
   }
