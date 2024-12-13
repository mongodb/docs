The example application brings together the following recommendations 
to ensure resilience against network outages and failover events:

- Use the |service|-provided connection string with retryable writes, majority 
  write concern, and default read concern.

- Specify an operation time limit with the :manual:`maxTimeMS 
  </tutorial/terminate-running-operations/#maxtimems>` method. For instructions 
  on how to set ``maxTimeMS``, refer to your specific :driver:`Driver 
  Documentation <>`.

- Handle errors for duplicate keys and timeouts.

The application is an HTTP |api| that allows clients to create or list user 
records. It exposes an endpoint that accepts GET and POST requests 
http://localhost:3000:

.. list-table::
   :widths: 25 25 50
   :header-rows: 1

   * - Method
     - Endpoint
     - Description

   * - ``GET``
     - ``/users``
     - Gets a list of user names from a ``users`` collection.

   * - ``POST``
     -  ``/users``
     - Requires a ``name`` in the request body. Adds a new user to a
       ``users`` collection.

.. tabs-drivers::

   .. tab::
      :tabid: nodejs

      .. note::
         The following server application uses
         `Express <https://github.com/expressjs/express>`__,
         which you need to add to your project as a dependency
         before you can run it.

      .. code-block:: javascript
         :linenos:
         :emphasize-lines: 5, 14, 33, 47

         const express = require('express');
         const bodyParser = require('body-parser');

         // Use the latest drivers by installing & importing them
         const MongoClient = require('mongodb').MongoClient;

         const app = express();
         app.use(bodyParser.json());
         app.use(bodyParser.urlencoded({ extended: true }));

         const uri = "mongodb+srv://<db_username>:<db_password>@cluster0-111xx.mongodb.net/test?retryWrites=true&w=majority";

         const client = new MongoClient(uri, {
             useNewUrlParser: true,
             useUnifiedTopology: true
         });

         // ----- API routes ----- //
         app.get('/', (req, res) => res.send('Welcome to my API!'));

         app.get('/users', (req, res) => {
             const collection = client.db("test").collection("users");

             collection
             .find({})
             .maxTimeMS(5000)
             .toArray((err, data) => {
                 if (err) {
                     res.send("The request has timed out. Please check your connection and try again.");
                 }
                 return res.json(data);
             });
         });

         app.post('/users', (req, res) => {
             const collection = client.db("test").collection("users");
             collection.insertOne({ name: req.body.name })
             .then(result => {
                 res.send("User successfully added!");
             }, err => {
                 res.send("An application error has occurred. Please try again.");
             })
         });
         // ----- End of API routes ----- //

         app.listen(3000, () => {
             console.log(`Listening on port 3000.`);
             client.connect(err => {
                 if (err) {
                     console.log("Not connected: ", err);
                     process.exit(0);
                 }
                 console.log('Connected.');
             });
         });
        
   .. tab::
      :tabid: python

      .. note::
         The following web application uses `FastAPI 
         <https://github.com/tiangolo/fastapi>`__. To create a new application,
         use the `FastAPI sample file 
         <https://github.com/tiangolo/fastapi#example>`__ structure.

      .. code-block:: python
         :linenos:

         # File: main.py

         from fastapi import FastAPI, Body, Request, Response, HTTPException, status
         from fastapi.encoders import jsonable_encoder

         from typing import List
         from models import User

         import pymongo
         from pymongo import MongoClient
         from pymongo import errors
 
         # Replace the uri string with your |service| connection string
         uri = "<atlas-connection-string>"
         db = "test"

         app = FastAPI()

         @app.on_event("startup")
         def startup_db_client():
             app.mongodb_client = MongoClient(uri)
             app.database = app.mongodb_client[db]

         @app.on_event("shutdown")
         def shutdown_db_client():
             app.mongodb_client.close()

         ##### API ROUTES #####
         @app.get("/users", response_description="List all users", response_model=List[User])
         def list_users(request: Request):
             try: 
                 users = list(request.app.database["users"].find().max_time_ms(5000))
                 return users
             except pymongo.errors.ExecutionTimeout: 
                 raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="The request has timed out. Please check your connection and try again.")

         @app.post("/users", response_description="Create a new user", status_code=status.HTTP_201_CREATED)
         def new_user(request: Request, user: User = Body(...)):
             user = jsonable_encoder(user)
             try: 
                 new_user = request.app.database["users"].insert_one(user)
                 return {"message":"User successfully added!"}
             except pymongo.errors.DuplicateKeyError:
                 raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not create user due to existing '_id' value in the collection. Try again with a different '_id' value.")
                

   .. tab::
      :tabid: java-sync

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