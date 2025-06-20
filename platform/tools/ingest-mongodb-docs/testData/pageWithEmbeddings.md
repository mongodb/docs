# Atlas Vector Search Quick Start

This quick start describes how to load sample documents that contain vector embeddings into an Atlas cluster or local Atlas deployment, create an Atlas Vector Search index on those embeddings, and then perform semantic search to return documents that are similar to your query.

*Time required: 15 minutes*

<Tabs>

<Tab name="Atlas UI">

</Tab>

<Tab name="MongoDB Shell">

</Tab>

<Tab name="C">

</Tab>

<Tab name="C++11">

</Tab>

<Tab name="C#">

</Tab>

<Tab name="Go">

</Tab>

<Tab name="Java (Sync)">

</Tab>

<Tab name="Kotlin (Coroutine)">

</Tab>

<Tab name="Kotlin (Sync)">

</Tab>

<Tab name="Node.js">

</Tab>

<Tab name="PHP">

</Tab>

<Tab name="Python">

Work with a runnable version of this tutorial as a Python notebook.

</Tab>

<Tab name="Ruby">

</Tab>

<Tab name="Rust">

</Tab>

<Tab name="Scala">

</Tab>

</Tabs>

## Objectives

In this quick start, you will do the following steps:

1. Create an index definition for the `sample_mflix.embedded_movies` collection that indexes the `plot_embedding` field as the `vector` type. The `plot_embedding` field contains embeddings created using OpenAI\'s `text-embedding-ada-002` embedding model. The index definition specifies `1536` vector dimensions and measures similarity using `dotProduct`.

2. Run an Atlas Vector Search query that searches the sample `sample_mflix.embedded_movies` collection. The query uses the `$vectorSearch` stage to search the `plot_embedding` field, which contains embeddings created using OpenAI\'s `text-embedding-ada-002` embedding model. The query searches the `plot_embedding` field using vector embeddings for the string *time travel*. It considers up to `150` nearest neighbors, and returns `10` documents in the results.

To learn more, see Learning Summary.

## Create a Vector Search Index

➤➤ To set the client you use to run the examples on this page, use the **Select your language** drop-down menu in the right navigation pane.

createSupported ClientsIn this section, you create an Atlas Vector Search index on sample data that you load into an Atlas cluster or a deployment hosted on your local computer:

<Tabs>

<Tab name="Atlas Cluster">

### Set up your Atlas cluster.

- Create a free Atlas account or sign in to an existing account.

- If you don\'t yet have an Atlas cluster, create a free M0 cluster. To learn more about creating an Atlas cluster, see Create a Cluster.

  If you are working with an existing cluster, you must have `Project Data Access Admin` or higher access to your Atlas project.

  If you create a new cluster, you have the necessary permissions by default.

  You can create only one `M0` Free cluster per project.

- In the left sidebar, click Atlas Search. Choose your cluster from the Select data source menu and click Go to Atlas Search.

- If you haven\'t yet loaded the sample dataset onto your cluster, click Load a Sample Dataset. In the Load Sample Dataset dialog box, click Load Sample Dataset to confirm.

  If you already loaded the sample dataset, check that the `sample_mflix` database contains the `embedded_movies` collection. If it doesn\'t, drop the sample databases and reload the sample dataset.

  Loading the sample dataset can take several minutes to complete.

### Create a Vector Search index.

You can use the `mongosh` command or driver helper methods to create
Atlas Search indexes on all Atlas cluster tiers. For a list of supported driver versions, see Supported Clients.

<Tabs>

<Tab name="Atlas UI">

- When the sample data finishes loading, click Create Search Index.

- Under the Atlas Vector Search section, select the JSON Editor and click Next.

- In the Database and Collection section, expand the `sample_mflix` database and select the `embedded_movies` collection.

  Each document in this collection contains information about a movie, including a summary of the movie\'s plot as a string, which has also been converted to and stored as a vector embedding in the document\'s `plot_embedding` field.

- In the Index Name field, specify `vector_index`.

- Copy and paste the following vector search index definition into the JSON Editor.

  ```
  {
      "fields": [{
      "type": "vector",
      "path": "plot_embedding",
      "numDimensions": 1536,
      "similarity": "dotProduct"
      }]
  }
  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

- Click Next.

- Click Create Search Index.

  The index should take about one minute to build. When your vector index is finished building, the Status column reads Active.

</Tab>

<Tab name="MongoDB Shell">

- Connect to the Atlas cluster using `mongosh`.

  Open `mongosh` in a terminal window and connect to your Atlas cluster. For detailed instructions on connecting, see Connect via mongosh.

- Switch to the database that contains the collection for which you want to create the index.

  ```shell
  use sample_mflix
  ```

  ```shell
  switched to db sample_mflix
  ```

- Run the `db.collection.createSearchIndex()` method.

  ```shell
  db.embedded_movies.createSearchIndex(
    "vector_index",
    "vectorSearch",
    {
      "fields": [
        {
          "type": "vector",
          "path": "plot_embedding",
          "numDimensions": 1536,
          "similarity": "dotProduct"
        }
      ]
    }
  );
  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

</Tab>

<Tab name="C">

- Install the MongoDB C Driver.

  For detailed installation instructions, refer to the MongoDB C Driver documentation.

- Create a new directory called `query-quick-start`.

  ```bash
  mkdir query-quick-start
  ```

- Enter the directory, and create a `CMakeLists.txt` file.

  ```bash
  cd query-quick-start
  touch CMakeLists.txt
  ```

  Copy and paste the following lines into the `CMakeLists.txt` file:

  ```console
  cmake_minimum_required(VERSION 3.30)

  project(atlas-vector-search-quick-start)

  # Specify the minimum version for creating a vector index.
  find_package (mongoc-1.0 1.28.0 REQUIRED)

  add_executable(atlas-vector-search-quick-start
    vector_index.c
  )

  target_link_libraries (atlas-vector-search-quick-start PRIVATE mongo::mongoc_shared)
  ```

- Define the index.

  Create a file named `vector_index.c`. Copy and paste the following code into the file.

  ```c
  #include <bson/bson.h>
  #include <mongoc/mongoc.h>
  #include <stdio.h>

  int main(void) {
    mongoc_client_t *client;
    mongoc_collection_t *collection;
    bson_error_t error;
    char database_name[] = "sample_mflix";
    char collection_name[] = "embedded_movies";
    char index_name[] = "vector_index";

    mongoc_init();

    // Replace the placeholder with your Atlas connection string
    client =  mongoc_client_new("<connection-string>");

    // Connect to your Atlas cluster
    collection = mongoc_client_get_collection (client, database_name, collection_name);

    bson_t cmd;
    // Create search index command.
    {
      char *cmd_str = bson_strdup_printf (
          BSON_STR ({
                      "createSearchIndexes" : "%s",
                      "indexes" : [{
                        "definition": {
                          "fields": [{
                            "type": "vector",
                            "path": "plot_embedding",
                            "numDimensions": 1536,
                            "similarity": "dotProduct"
                          }]
                        },
                        "name": "%s",
                        "type": "vectorSearch"
                      }]
                    }),
          collection_name, index_name);
      if (!bson_init_from_json(&cmd, cmd_str, -1, &error)) {
        printf("Failed to initialize BSON: %s\
", error.message);
        bson_free(cmd_str);
        return 1;
      }
      bson_free (cmd_str);
    }
    if (!mongoc_collection_command_simple (collection, &cmd, NULL /* read_prefs */, NULL /* reply */, &error)) {
      bson_destroy (&cmd);
      printf ("Failed to run createSearchIndexes: %s", error.message);
      return 1;
    } else {
      printf ("New search index named %s is building.\
", index_name);
      bson_destroy (&cmd);
    }

    // Polling for index status
    printf("Polling to check if the index is ready. This may take up to a minute.\
");
    int queryable = 0;
    while (!queryable) {
      const char *pipeline_str = "{\\"pipeline\\": [{\\"$listSearchIndexes\\": {}}]}";
      bson_t pipeline;
      if (!bson_init_from_json(&pipeline, pipeline_str, -1, &error)) {
        printf("Failed to initialize pipeline BSON: %s\
", error.message);
        break; // Exit the loop on error
      }
      mongoc_cursor_t *cursor = mongoc_collection_aggregate(collection, MONGOC_QUERY_NONE, &pipeline, NULL, NULL);
      const bson_t *got;
      // Check if the cursor returns any documents
      int found_index = 0;
      while (mongoc_cursor_next(cursor, &got)) {
        bson_iter_t iter;
        if (bson_iter_init(&iter, got) && bson_iter_find(&iter, "name")) {
          const char *name = bson_iter_utf8(&iter, NULL);
          if (strcmp(name, index_name) == 0) {
            found_index = 1; // Index found
            bson_iter_find(&iter, "queryable");
            queryable = bson_iter_bool(&iter);
            break; // Exit the loop since we found the index
          }
        }
      }
      if (mongoc_cursor_error(cursor, &error)) {
        printf("Failed to run $listSearchIndexes: %s\
", error.message);
        break; // Exit the loop on error
      }
      if (!found_index) {
        printf("Index %s not found yet. Retrying...\
", index_name);
      }
      bson_destroy(&pipeline);
      mongoc_cursor_destroy(cursor);
      sleep(5); // Sleep for 5 seconds before checking again
    }
    if (queryable) {
      printf("%s is ready for querying.\
", index_name);
    } else {
      printf("Error occurred or index not found.\
");
    }

    // Cleanup
    mongoc_collection_destroy(collection);
    mongoc_client_destroy(client);
    mongoc_cleanup();

    return 0;
  }
  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Create and enter the `/build` directory:

  ```bash
  mkdir build && cd build
  ```

- Prepare the project.

  ```bash
  cmake ../
  ```

- Build the app.

  ```bash
  cmake --build .
  ```

- Execute the app to create the index.

  ```bash
  ./atlas-vector-search-quick-start
  ```

  ```sh
  New search index named vector_index is building.
  Polling to check if the index is ready. This may take up to a minute.
  vector_index is ready for querying.

  ```

</Tab>

<Tab name="C++11">

- Install the MongoDB C++ Driver.

  For detailed installation instructions, refer to the MongoDB C++ Driver documentation.

- Create a new directory called `query-quick-start`.

  ```bash
  mkdir query-quick-start
  ```

- Enter the directory, and create a `CMakeLists.txt` file.

  ```bash
  cd query-quick-start
  touch CMakeLists.txt
  ```

  Copy and paste the following lines into the `CMakeLists.txt` file:

  ```console
  cmake_minimum_required(VERSION 3.30)

  project(query_quick_start)

  set(CMAKE_CXX_STANDARD 17)

  # Specify the minimum version for creating a vector index.
  find_package(mongocxx 3.11.0 REQUIRED)
  find_package(bsoncxx REQUIRED)

  add_executable(query_quick_start
    vector_index.cpp
  )

  target_link_libraries(query_quick_start PRIVATE mongo::mongocxx_shared)
  target_link_libraries(query_quick_start PRIVATE mongo::bsoncxx_shared)
  ```

- Define the index.

  Create a file named `vector_index.cpp`. Copy and paste the following code into the file.

  ```cpp
  #include <bsoncxx/builder/basic/document.hpp>
  #include <iostream>
  #include <mongocxx/client.hpp>
  #include <mongocxx/instance.hpp>
  #include <mongocxx/search_index_view.hpp>
  #include <mongocxx/uri.hpp>
  #include <thread>

  using bsoncxx::builder::basic::kvp;
  using bsoncxx::builder::basic::make_array;
  using bsoncxx::builder::basic::make_document;

  int main() {
    try {
      mongocxx::instance inst{};

      // Replace the placeholder with your Atlas connection string
      const auto uri = mongocxx::uri{"<connection-string>"};

      // Connect to your Atlas cluster
      mongocxx::client conn{uri};
      auto db = conn["sample_mflix"];
      auto collection = db["embedded_movies"];

      auto siv = collection.search_indexes();
      std::string name = "vector_index";
      auto type = "vectorSearch";
      auto definition = make_document(
          kvp("fields",
              make_array(make_document(
                  kvp("type", "vector"), kvp("path", "plot_embedding"),
                  kvp("numDimensions", 1536), kvp("similarity", "dotProduct")))));
      auto model =
          mongocxx::search_index_model(name, definition.view()).type(type);
      siv.create_one(model);
      std::cout << "New search index named " << name << " is building."
                << std::endl;

      // Polling for index status
      std::cout << "Polling to check if the index is ready. This may take up to "
                   "a minute."
                << std::endl;
      bool queryable = false;
      while (!queryable) {
        auto indexes = siv.list();
        for (const auto& index : indexes) {
          if (index["name"].get_value() == name) {
            queryable = index["queryable"].get_bool();
          }
        }
        if (!queryable) {
          std::this_thread::sleep_for(std::chrono::seconds(5));
        }
      }
      std::cout << name << " is ready for querying." << std::endl;
    } catch (const std::exception& e) {
      std::cout << "Exception: " << e.what() << std::endl;
    }
    return 0;
  }

  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Create and enter the `/build` directory:

  ```bash
  mkdir build && cd build
  ```

- Prepare the project.

  ```bash
  cmake ../
  ```

- Build the app.

  ```bash
  cmake --build .
  ```

- Execute the app to create the index.

  ```bash
  ./query_quick_start
  ```

  ```sh
  New search index named vector_index is building.
  Polling to check if the index is ready. This may take up to a minute.
  vector_index is ready for querying.

  ```

</Tab>

<Tab name="C#">

- called `query-quick-start` and initialize your .NET/C# project.

  ```bash
  mkdir query-quick-start
  cd query-quick-start
  dotnet new console
  ```

- Run the following command to add the .NET/C# Driver to your project as a dependency.

  ```bash
  dotnet add package MongoDB.Driver
  ```

  For more detailed installation instructions, see the MongoDB C# Driver documentation.

- Define the index.

  Create a file named `IndexService.cs`. Copy and paste the following code into the file.

  ```csharp
  namespace query_quick_start;

  using MongoDB.Bson;
  using MongoDB.Driver;
  using System;
  using System.Threading;

  public class IndexService
  {
      // Replace the placeholder with your Atlas connection string
      private const string MongoConnectionString = "<connection-string>";
      public void CreateVectorIndex()
      {
          try
          {
              // Connect to your Atlas cluster
              var client = new MongoClient(MongoConnectionString);
              var database = client.GetDatabase("sample_mflix");
              var collection = database.GetCollection<BsonDocument>("embedded_movies");

              var searchIndexView = collection.SearchIndexes;
              var name = "vector_index";
              var type = SearchIndexType.VectorSearch;

              var definition = new BsonDocument
              {
                  { "fields", new BsonArray
                      {
                          new BsonDocument
                          {
                              { "type", "vector" },
                              { "path", "plot_embedding" },
                              { "numDimensions", 1536 },
                              { "similarity", "dotProduct" }
                          }
                      }
                  }
              };

              var model = new CreateSearchIndexModel(name, type, definition);

              searchIndexView.CreateOne(model);
              Console.WriteLine($"New search index named {name} is building.");

              // Polling for index status
              Console.WriteLine("Polling to check if the index is ready. This may take up to a minute.");
              bool queryable = false;
              while (!queryable)
              {
                  var indexes = searchIndexView.List();
                  foreach (var index in indexes.ToEnumerable())
                  {
                      if (index["name"] == name)
                      {
                          queryable = index["queryable"].AsBoolean;
                      }
                  }
                  if (!queryable)
                  {
                      Thread.Sleep(5000);
                  }
              }
              Console.WriteLine($"{name} is ready for querying.");
          }
          catch (Exception e)
          {
              Console.WriteLine($"Exception: {e.Message}");
          }
      }
  }

  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Initialize the class and call the method to create the index in your `Program.cs` file:

  ```csharp
  using query_quick_start;

  var indexService = new IndexService();
  indexService.CreateVectorIndex();
  ```

- Compile and run your project to create the index.

  ```bash
  dotnet run query-quick-start.csproj
  ```

  ```sh
  New search index named vector_index is building.
  Polling to check if the index is ready. This may take up to a minute.
  vector_index is ready for querying.

  ```

</Tab>

<Tab name="Go">

- Initialize your Go module:

  ```sh
  mkdir go-vector-quickstart && cd go-vector-quickstart
  go mod init go-vector-quickstart
  ```

- Add the Go Driver as a dependency in your project:

  ```sh
  go get go.mongodb.org/mongo-driver/mongo
  ```

  For more detailed installation instructions, see the MongoDB Go Driver documentation.

- Define the index.

  Create a file named `vector-index.go`. Copy and paste the following code into the file.

  ```go
  package main

  import (
  \t"context"
  \t"fmt"
  \t"log"
  \t"time"

  \t"go.mongodb.org/mongo-driver/bson"
  \t"go.mongodb.org/mongo-driver/mongo"
  \t"go.mongodb.org/mongo-driver/mongo/options"
  )

  func main() {
  \tctx := context.Background()

  \t// Replace the placeholder with your Atlas connection string
  \tconst uri = "<connectionString>"

  \t// Connect to your Atlas cluster
  \tclientOptions := options.Client().ApplyURI(uri)
  \tclient, err := mongo.Connect(ctx, clientOptions)
  \tif err != nil {
  \t\tlog.Fatalf("failed to connect to the server: %v", err)
  \t}
  \tdefer func() { _ = client.Disconnect(ctx) }()

  \t// Set the namespace
  \tcoll := client.Database("sample_mflix").Collection("embedded_movies")

  \t// Define the index details
  \ttype vectorDefinitionField struct {
  \t\tType          string `bson:"type"`
  \t\tPath          string `bson:"path"`
  \t\tNumDimensions int    `bson:"numDimensions"`
  \t\tSimilarity    string `bson:"similarity"`
  \t}

  \ttype vectorDefinition struct {
  \t\tFields []vectorDefinitionField `bson:"fields"`
  \t}

  \tindexName := "vector_index"
  \topts := options.SearchIndexes().SetName(indexName).SetType("vectorSearch")

  \tindexModel := mongo.SearchIndexModel{
  \t\tDefinition: vectorDefinition{
  \t\t\tFields: []vectorDefinitionField{{
  \t\t\t\tType:          "vector",
  \t\t\t\tPath:          "plot_embedding",
  \t\t\t\tNumDimensions: 1536,
  \t\t\t\tSimilarity:    "dotProduct"}},
  \t\t},
  \t\tOptions: opts,
  \t}

  \t// Create the index
  \tsearchIndexName, err := coll.SearchIndexes().CreateOne(ctx, indexModel)
  \tif err != nil {
  \t\tlog.Fatalf("failed to create the search index: %v", err)
  \t}
  \tlog.Println("New search index named " + searchIndexName + " is building.")

  \t// Await the creation of the index.
  \tlog.Println("Polling to check if the index is ready. This may take up to a minute.")
  \tsearchIndexes := coll.SearchIndexes()
  \tvar doc bson.Raw
  \tfor doc == nil {
  \t\tcursor, err := searchIndexes.List(ctx, options.SearchIndexes().SetName(searchIndexName))
  \t\tif err != nil {
  \t\t\tfmt.Errorf("failed to list search indexes: %w", err)
  \t\t}

  \t\tif !cursor.Next(ctx) {
  \t\t\tbreak
  \t\t}

  \t\tname := cursor.Current.Lookup("name").StringValue()
  \t\tqueryable := cursor.Current.Lookup("queryable").Boolean()
  \t\tif name == searchIndexName && queryable {
  \t\t\tdoc = cursor.Current
  \t\t} else {
  \t\t\ttime.Sleep(5 * time.Second)
  \t\t}
  \t}

  \tlog.Println(searchIndexName + " is ready for querying.")
  }

  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Run the following command to create the index.

  ```shell
  go run vector-index.go
  ```

  ```console
  2024/10/17 09:38:21 New search index named vector_index is building.
  2024/10/17 09:38:22 Polling to check if the index is ready. This may take up to a minute.
  2024/10/17 09:38:48 vector_index is ready for querying.
  ```

</Tab>

<Tab name="Java (Sync)">

- Add the Java driver version 5.2 or higher as a dependency in your project. Select one of the following tabs, depending on your package manager:

  <Tabs>

  <Tab name="Maven">

  If you are using Maven, add the following dependencies to the `dependencies` array in your project\'s `pom.xml` file:

  ```xml
  <dependencies>
     <!-- MongoDB Java Sync Driver v5.2.0 or later -->
     dependency>
        <groupId>org.mongodb</groupId>
        <artifactId>mongodb-driver-sync</artifactId>
        <version>[5.2.0,)</version>
     </dependency>
  </dependencies>
  ```

  </Tab>

  </Tabs>

  <Tab name="Gradle">

  If you are using Gradle, add the following to the `dependencies` array in your project\'s `build.gradle` file:

  ```json
  dependencies {
     // MongoDB Java Sync Driver v5.2.0 or later
     implementation \'org.mongodb:mongodb-driver-sync:[5.2.0,)\'
  }
  ```

  </Tab>

- Run your package manager to install the dependencies to your project.

  For more detailed installation instructions and version compatibility, see the MongoDB Java Driver documentation.

- Create a file named `VectorIndex.java`. Copy and paste the following code into the file.

  ```java
  import com.mongodb.client.ListSearchIndexesIterable;
  import com.mongodb.client.MongoClient;
  import com.mongodb.client.MongoClients;
  import com.mongodb.client.MongoCollection;
  import com.mongodb.client.MongoCursor;
  import com.mongodb.client.MongoDatabase;
  import com.mongodb.client.model.SearchIndexModel;
  import com.mongodb.client.model.SearchIndexType;
  import org.bson.Document;
  import org.bson.conversions.Bson;

  import java.util.Collections;
  import java.util.List;

  public class VectorIndex {

      public static void main(String[] args) {

          // Replace the placeholder with your Atlas connection string
          String uri = "<connectionString>";

          // Connect to your Atlas cluster
          try (MongoClient mongoClient = MongoClients.create(uri)) {

              // Set the namespace
              MongoDatabase database = mongoClient.getDatabase("sample_mflix");
              MongoCollection<Document> collection = database.getCollection("embedded_movies");

              // Define the index details
              String indexName = "vector_index";
              Bson definition = new Document(
                  "fields",
                  Collections.singletonList(
                      new Document("type", "vector")
                          .append("path", "plot_embedding")
                          .append("numDimensions", 1536)
                          .append("similarity", "dotProduct")));

              // Define the index model
              SearchIndexModel indexModel = new SearchIndexModel(
                  indexName,
                  definition,
                  SearchIndexType.vectorSearch());

              // Create the index
              try {
                  List<String> result = collection.createSearchIndexes(Collections.singletonList(indexModel));
                  System.out.println("New search index named " + result.get(0) + " is building.");
              } catch (Exception e) {
                  throw new RuntimeException("Error creating index: " + e);
              }

              // Wait for Atlas to build the index
              System.out.println("Polling to check if the index is ready. This may take up to a minute.");

              ListSearchIndexesIterable<Document> searchIndexes = collection.listSearchIndexes();
              Document doc = null;
              while (doc == null) {
                  try (MongoCursor<Document> cursor = searchIndexes.iterator()) {
                      if (!cursor.hasNext()) {
                          break;
                      }
                      Document current = cursor.next();
                      String name = current.getString("name");
                      // When the index completes building, it becomes `queryable`
                      boolean queryable = current.getBoolean("queryable");
                      if (name.equals(indexName) && queryable) {
                          doc = current;
                      } else {
                          Thread.sleep(500);
                      }
                  } catch (Exception e) {
                      throw new RuntimeException("Failed to list search indexes: " + e);
                  }
              }
              System.out.println(indexName + " is ready for querying.");

          } catch (Exception e) {
              throw new RuntimeException("Error connecting to MongoDB: " + e);
          }
      }
  }

  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Run the file in your IDE, or execute a command from the command line to run the code.

  ```shell
  javac VectorIndex.java
  java VectorIndex
  ```

  ```console
  New search index named vector_index is building.
  Polling to check if the index is ready. This may take up to a minute.
  vector_index is ready for querying.

  ```

</Tab>

<Tab name="Kotlin (Coroutine)">

- Install the MongoDB Kotlin Coroutine Driver.

  For more detailed installation instructions and version compatibility, see the MongoDB Kotlin Coroutine Driver documentation.

- Define the index.

  Create a file named `VectorIndex.kt`. Copy and paste the following code into the file.

  ```kotlin
  import com.mongodb.MongoException
  import com.mongodb.client.model.SearchIndexModel
  import com.mongodb.client.model.SearchIndexType
  import com.mongodb.kotlin.client.coroutine.MongoClient
  import kotlinx.coroutines.delay
  import kotlinx.coroutines.flow.toList
  import org.bson.Document
  import kotlinx.coroutines.runBlocking

  fun main() {
      // Replace the placeholder with your MongoDB deployment\'s connection string
      val uri = "<connection-string>"
      val mongoClient = MongoClient.create(uri)
      val database = mongoClient.getDatabase("sample_mflix")
      val collection = database.getCollection<Document>("embedded_movies")
      val indexName = "vector_index"
      val searchIndexModel = SearchIndexModel(
          indexName,
          Document(
              "fields",
              listOf(
                  Document("type", "vector")
                      .append("path", "plot_embedding")
                      .append("numDimensions", 1536)
                      .append("similarity", "dotProduct")
              )
          ),
          SearchIndexType.vectorSearch()
      )

      runBlocking {
          try {
              collection.createSearchIndexes(listOf(searchIndexModel))
                  .collect { result ->
                      println("New search index named $result is building.")
                  }

              // Polling to check if the index is queryable
              println("Polling to check if the index is ready. This may take up to a minute.")
              var isQueryable = false
              while (!isQueryable) {
                  delay(5000L) // Poll every 5 seconds

                  val indexes = collection.listSearchIndexes().toList()
                  isQueryable = indexes.any { index ->
                      index.getString("name") == indexName && index.getBoolean("queryable")
                  }
                  if (isQueryable) {
                      println("$indexName is ready for querying.")
                  }
              }
          } catch (me: MongoException) {
              System.err.println("An error occurred: $me")
          }
      }
      mongoClient.close()
  }
  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Run the `VectorIndex.kt` file in your IDE. The output should resemble the following:

  ```
  New search index named vector_index is building.
  Polling to check if the index is ready. This may take up to a minute.
  vector_index is ready for querying.

  ```

</Tab>

<Tab name="Kotlin (Sync)">

- Install the MongoDB Kotlin Sync Driver.

  For more detailed installation instructions and version compatibility, see the MongoDB Kotlin Sync Driver documentation.

- Define the index.

  Create a file named `VectorIndex.kt`. Copy and paste the following code into the file.

  ```kotlin
  import com.mongodb.MongoException
  import com.mongodb.client.model.SearchIndexModel
  import com.mongodb.client.model.SearchIndexType
  import com.mongodb.kotlin.client.MongoClient
  import org.bson.Document

  fun main() {
      // Replace the placeholder with your MongoDB deployment\'s connection string
      val uri = "<connection-string>"
      val mongoClient = MongoClient.create(uri)
      val database = mongoClient.getDatabase("sample_mflix")
      val collection = database.getCollection<Document>("embedded_movies")
      val indexName = "vector_index"
      val searchIndexModel = SearchIndexModel(
          indexName,
          Document(
              "fields",
              listOf(
                  Document("type", "vector")
                      .append("path", "plot_embedding")
                      .append("numDimensions", 1536)
                      .append("similarity", "dotProduct")
              )
          ),
          SearchIndexType.vectorSearch()
      )

      try {
          val result = collection.createSearchIndexes(
              listOf(searchIndexModel)
          )
          println("New search index named ${result.get(0)} is building.")

          // Polling to check if the index is queryable
          println("Polling to check if the index is ready. This may take up to a minute.")
          var isQueryable = false
          while (!isQueryable) {
              val results = collection.listSearchIndexes()
              results.forEach { result ->
                  if (result.getString("name") == indexName && result.getBoolean("queryable")) {
                      println("$indexName is ready for querying.")
                      isQueryable = true
                  } else {
                      Thread.sleep(5000) // Poll every 5 seconds
                  }
              }
          }
      } catch (me: MongoException) {
          System.err.println("An error occurred: $me")
      }
      mongoClient.close()
  }

  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Run the `VectorIndex.kt` file in your IDE. The output should resemble the following:

  ```
  New search index named vector_index is building.
  Polling to check if the index is ready. This may take up to a minute.
  vector_index is ready for querying.

  ```

</Tab>

<Tab name="Node.js">

- Add the MongoDB Node Driver as a dependency in your project:

  ```sh
  npm install mongodb
  ```

  The examples on this page assume your project manages modules as CommonJS modules. If you\'re using ES modules, instead, you must modify the import syntax.

- Define the index.

  Create a file named `vector-index.js`. Copy and paste the following code into the file.

  ```javascript
  const { MongoClient } = require("mongodb");

  // connect to your Atlas deployment
  const uri =  "<connectionString>";

  const client = new MongoClient(uri);

  async function run() {
     try {
       const database = client.db("sample_mflix");
       const collection = database.collection("embedded_movies");

       // define your Atlas Vector Search index
       const index = {
           name: "vector_index",
           type: "vectorSearch",
           definition: {
             "fields": [
               {
                 "type": "vector",
                 "numDimensions": 1536,
                 "path": "plot_embedding",
                 "similarity": "dotProduct"
               }
             ]
           }
       }

       // run the helper method
       const result = await collection.createSearchIndex(index);
       console.log(`New search index named ${result} is building.`);

       // wait for the index to be ready to query
       console.log("Polling to check if the index is ready. This may take up to a minute.")
       let isQueryable = false;
       while (!isQueryable) {
         const cursor = collection.listSearchIndexes();
         for await (const index of cursor) {
           if (index.name === result) {
             if (index.queryable) {
               console.log(`${result} is ready for querying.`);
               isQueryable = true;
             } else {
               await new Promise(resolve => setTimeout(resolve, 5000));
             }
           }
         }
       }
     } finally {
       await client.close();
     }
  }
  run().catch(console.dir);

  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Run the following command to create the index.

  ```shell
  node vector-index.js
  ```

  ```console
  New search index named vector_index is building.
  Polling to check if the index is ready. This may take up to a minute.
  vector_index is ready for querying.

  ```

</Tab>

<Tab name="PHP">

- Install the MongoDB PHP Driver.

  For detailed installation instructions, see the MongoDB PHP Library documentation.

- Define the index.

  Create a file named `vector-index.php`. Copy and paste the following code into the file.

  ```php
  <?php

  require \'vendor/autoload.php\';

  // Replace the placeholder with your Atlas connection string
  $uri = "<connection-string>";
  $client = new MongoDB\\Client($uri);
  $collection = $client->sample_mflix->embedded_movies;
  $indexName = "vector_index";
  try {
      $result = $collection->createSearchIndexes(
          [[
              \'name\' => $indexName,
              \'type\' => \'vectorSearch\',
              \'definition\' => [
                  \'fields\' => [[
                      \'type\' => \'vector\',
                      \'path\' => \'plot_embedding\',
                      \'numDimensions\' => 1536,
                      \'similarity\' => \'dotProduct\'
                  ]]
              ],
          ]]
      );
      echo "New search index named $result[0] is building." .PHP_EOL;

      // Polling for the index to become queryable
      echo "Polling to check if the index is ready. This may take up to a minute." .PHP_EOL;
      $isIndexQueryable = false;
      while (!$isIndexQueryable) {
          // List the search indexes
          $searchIndexes = $collection->listSearchIndexes();
          // Check if the index is present and queryable
          foreach ($searchIndexes as $index) {
              if ($index->name === $indexName) {
                  $isIndexQueryable = $index->queryable;
              }
          }
          if (!$isIndexQueryable) {
              sleep(5); // Wait for 5 seconds before polling again
          }
      }
      echo "$indexName is ready for querying." .PHP_EOL;
  }
  catch (MongoDB\\Driver\\Exception\\Exception $e) {
      print \'Error creating the index: \' .$e->getMessage() .PHP_EOL;
  }

  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Run the following command to create the index.

  ```shell
  php vector-index.php
  ```

  ```console
  New search index named vector_index is building.
  Polling to check if the index is ready. This may take up to a minute.
  vector_index is ready for querying.

  ```

</Tab>

<Tab name="Python">

- Add the PyMongo Driver as a dependency in your project:

  ```sh
  pip install pymongo
  ```

  For more detailed installation instructions, see the MongoDB Python Driver documentation.

- Define the index.

  Create a file named `vector-index.py`. Copy and paste the following code into the file.

  ```python
  from pymongo.mongo_client import MongoClient
  from pymongo.operations import SearchIndexModel
  import time

  # Connect to your Atlas deployment
  uri = "<connectionString>"
  client = MongoClient(uri)

  # Access your database and collection
  database = client["sample_mflix"]
  collection = database["embedded_movies"]

  # Create your index model, then create the search index
  search_index_model = SearchIndexModel(
    definition={
      "fields": [
        {
          "type": "vector",
          "path": "plot_embedding",
          "numDimensions": 1536,
          "similarity": "dotProduct"
        }
      ]
    },
    name="vector_index",
    type="vectorSearch",
  )

  result = collection.create_search_index(model=search_index_model)
  print("New search index named " + result + " is building.")

  # Wait for initial sync to complete
  print("Polling to check if the index is ready. This may take up to a minute.")
  predicate=None
  if predicate is None:
    predicate = lambda index: index.get("queryable") is True

  while True:
    indices = list(collection.list_search_indexes(result))
    if len(indices) and predicate(indices[0]):
      break
    time.sleep(5)
  print(result + " is ready for querying.")

  client.close()

  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Run the following command to create the index.

  ```shell
  python vector-index.py
  ```

  ```console
  New search index named vector_index is building.
  Polling to check if the index is ready. This may take up to a minute.
  vector_index is ready for querying.

  ```

</Tab>

<Tab name="Ruby">

- When the sample data finishes loading, click Create Search Index.

- Under the Atlas Vector Search section, select the JSON Editor and click Next.

- In the Database and Collection section, expand the `sample_mflix` database and select the `embedded_movies` collection.

  Each document in this collection contains information about a movie, including a summary of the movie\'s plot as a string, which has also been converted to and stored as a vector embedding in the document\'s `plot_embedding` field.

- In the Index Name field, specify `vector_index`.

- Copy and paste the following vector search index definition into the JSON Editor.

  ```
  {
      "fields": [{
      "type": "vector",
      "path": "plot_embedding",
      "numDimensions": 1536,
      "similarity": "dotProduct"
      }]
  }
  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

- Click Next.

- Click Create Search Index.

  The index should take about one minute to build. When your vector index is finished building, the Status column reads Active.

</Tab>

<Tab name="Rust">

- Install the Rust driver for MongoDB.

  For more detailed installation instructions, see the MongoDB Rust Driver documentation.

- Define the index.

  In the `/src` directory of your project, create a file named `vector_index.rs`. Copy and paste the following code into the file.

  <Tabs>

  <Tab name="">

  ```rust
  use std::ops::Index;
  use std::time::Duration;
  use futures::{TryStreamExt};
  use mongodb::{bson::{Document, doc}, Client, Collection, SearchIndexModel};
  use mongodb::SearchIndexType::VectorSearch;
  use tokio::time::sleep;

  #[tokio::main]
  pub(crate) async fn vector_index() {
      // Replace the placeholder with your Atlas connection string
      let uri = "<connection_string>";

      // Create a new client and connect to the server
      let client = Client::with_uri_str(uri).await.unwrap();

      // Get a handle on the movies collection
      let database = client.database("sample_mflix");
      let my_coll: Collection<Document> = database.collection("embedded_movies");

      let index_name = "vector_index";
      let search_index_def = SearchIndexModel::builder()
          .definition(doc! {
              "fields": vec! {doc! {
                  "type": "vector",
                  "path": "plot_embedding",
                  "numDimensions": 1536,
                  "similarity": "dotProduct"
              }}
          })
          .name(index_name.to_string())
          .index_type(VectorSearch)
          .build();

      let models = vec![search_index_def];
      let result = my_coll.create_search_indexes(models).await;
      if let Err(e) = result {
          eprintln!("There was an error creating the search index: {}", e);
          std::process::exit(1)
      } else {
          println!("New search index named {} is building.", result.unwrap().index(0));
      }

      // Polling for the index to become queryable
      println!("Polling to check if the index is ready. This may take up to a minute.");
      let mut is_index_queryable = false;
      while !is_index_queryable {
          // List the search indexes
          let mut search_indexes = my_coll.list_search_indexes().await.unwrap();
          // Check if the index is present and queryable
          while let Some(index) = search_indexes.try_next().await.unwrap() {
              let retrieved_name = index.get_str("name");
              if retrieved_name.unwrap().to_string() == index_name {
                  is_index_queryable = index.get_bool("queryable").unwrap();
              }
          }
          if !is_index_queryable {
              sleep(Duration::from_secs(5)).await; // Wait for 5 seconds before polling again
          }
      }
      println!("{} is ready for querying.", index_name);
  }

  ```

  </Tab>

  <Tab name="">

  ```rust
  use std::ops::Index;
  use std::time::Duration;
  use std::thread::sleep;
  use mongodb::{
      bson::{doc, Document},
      Client, Collection, SearchIndexModel,
  };
  use mongodb::options::ClientOptions;
  use mongodb::SearchIndexType::VectorSearch;

  pub(crate) fn vector_index() {
      // Replace the placeholder with your Atlas connection string
      let uri = "<connection_string>";

      // Create a new client and connect to the server
      let options = ClientOptions::parse(uri).run().unwrap();
      let client = Client::with_options(options).unwrap();

      // Get a handle on the movies collection
      let database = client.database("sample_mflix");
      let my_coll: Collection<Document> = database.collection("embedded_movies");

      let index_name = "vector_index";
      let search_index_def = SearchIndexModel::builder()
          .definition(doc! {
              "fields": vec! {doc! {
                  "type": "vector",
                  "path": "plot_embedding",
                  "numDimensions": 1536,
                  "similarity": "dotProduct"
              }}
          })
          .name(index_name.to_string())
          .index_type(VectorSearch)
          .build();

      let models = vec![search_index_def];
      let result = my_coll.create_search_indexes(models).run();
      if let Err(e) = result {
          eprintln!("There was an error creating the search index: {}", e);
          std::process::exit(1)
      } else {
          println!("New search index named {} is building.", result.unwrap().index(0));
      }

      // Polling for the index to become queryable
      println!("Polling to check if the index is ready. This may take up to a minute.");
      let mut is_index_queryable = false;
      while !is_index_queryable {
          // List the search indexes
          let search_indexes = my_coll.list_search_indexes().run().unwrap();

          // Check if the index is present and queryable
          for index in search_indexes {
              let unwrapped_index = index.unwrap();
              let retrieved_name = unwrapped_index.get_str("name").unwrap();
              if retrieved_name == index_name {
                  is_index_queryable = unwrapped_index.get_bool("queryable").unwrap_or(false);
              }
          }

          if !is_index_queryable {
              sleep(Duration::from_secs(5)); // Wait for 5 seconds before polling again
          }
      }
      println!("{} is ready for querying.", index_name);
  }

  ```

  </Tab>

  </Tabs>

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Call the function from your `main.rs`.

  ```rust
  mod vector_index;

  fn main() {
     vector_index::vector_index();
  }
  ```

- Run the file in your IDE, or execute a command from the command line to run the code.

  ```shell
  cargo run
  ```

  ```console
  New search index named vector_index is building.
  Polling to check if the index is ready. This may take up to a minute.
  vector_index is ready for querying.

  ```

</Tab>

<Tab name="Scala">

- Install the MongoDB Scala Driver.

  For installation instructions based on your environment and the version of Scala you are using, refer to the MongoDB Scala Driver documentation.

- Create a new Scala project with the tools you normally use. For this quick start, we create a project named `quick-start`, by using sbt.

  ```sh
  sbt new scala/hello-world.g8
  ```

  When prompted, name the application `quick-start`.

- Navigate to your `quick-start` project and create a file named `VectorIndex.scala`. Copy and paste the following code into the file.

  ```scala
  import org.mongodb.scala._
  import org.mongodb.scala.model._
  import com.mongodb.client.model.SearchIndexType

  class VectorIndex {
    def createIndex(): Unit = {
      val collection =
        MongoClient("<connection-string>")
          .getDatabase("sample_mflix")
          .getCollection("embedded_movies")
      val indexName = "vector_index"
      val indexNameAsOption = Option(indexName)
      val indexDefinition = Document(
        "fields" -> List(
          Document(
            "type" -> "vector",
            "path" -> "plot_embedding",
            "numDimensions" -> 1536,
            "similarity" -> "dotProduct"
          )
        )
      )
      val indexType = Option(SearchIndexType.vectorSearch())
      val indexModel: SearchIndexModel = SearchIndexModel(
        indexNameAsOption, indexDefinition, indexType
      )
      collection.createSearchIndexes(List(indexModel)).foreach { doc => println(s"New search index named $doc is building.") }
      Thread.sleep(2000)
      println("Polling to check if the index is ready. This may take up to a minute.")
      var indexReady = false
      while (!indexReady) {
        val searchIndexes = collection.listSearchIndexes()
        searchIndexes.foreach { current =>
          val document = current.toBsonDocument()
          val name = document.get("name").asString().getValue
          val queryable = document.get("queryable").asBoolean().getValue
          if (name == indexName && queryable) {
            indexReady = true
          }
        }
        if (!indexReady) {
          Thread.sleep(5000)
        }
      }
      println(s"$indexName is ready for querying.")
    }
  }
  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Create a class instance and call the function in your project\'s `Main.scala` file.

  ```scala
  object Main extends App {
     private val indexInstance = new VectorIndex
     indexInstance.createIndex()
  }
  ```

- Run the file in your IDE, or execute a command from the command line to run the code.

  There are many tools and environments in which Scala runs. In this example, we run the new Scala project by starting the sbt server with the `sbt` command, then typing `~run`.

  ```shell
  sbt:quick-start> ~run
  ```

  ```console
  New search index named vector_index is building.
  Polling to check if the index is ready. This may take up to a minute.
  vector_index is ready for querying.

  ```

</Tab>

</Tabs>

</Tab>

<Tab name="Local Deployment">

### Install the dependencies.

For detailed instructions, see Prerequisites.

- Install the Atlas CLI.

  If you use Homebrew, you can run the following command in your terminal:

  ```
  brew install mongodb-atlas-cli
  ```

  For installation instructions on other operating systems, see Install the Atlas CLI

- Install Docker.

  Docker requires a network connection for pulling and caching MongoDB images.

  - For MacOS or Windows, install Docker Desktop v4.31+.

  - For Linux, install Docker Engine v27.0+.

  - For RHEL, you can also use Podman v5.0+.

### Set up your local Atlas deployment.

- If you don\'t have an existing Atlas account, run `atlas setup` in your terminal or create a new account.

- Run `atlas deployments setup` and follow the prompts to create a local deployment. When prompted to connect to the deployment, select `skip`.

  For detailed instructions, see Create a Local Atlas Deployment.

### Load the sample data.

- Run the following command in your terminal to download the sample data:

  ```
  curl  https://atlas-education.s3.amazonaws.com/sampledata.archive -o sampledata.archive
  ```

- Run the following command to load the data into your deployment, replacing `<port-number>` with the port where you\'re hosting the deployment:

  ```
  mongorestore --archive=sampledata.archive --port=<port-number>
  ```

### Create a Vector Search index.

<Tabs>

<Tab name="Atlas UI">

- Create a file named `vector-index.json`

- Copy and paste the following index definition into the JSON (Javascript Object Notation) file.

  ```
  {
      "database": "sample_mflix",
      "collectionName": "embedded_movies",
      "type": "vectorSearch",
      "name": "vector_index",
      "fields": [
          {
          "type": "vector",
          "path": "plot_embedding",
          "numDimensions": 1536,
          "similarity": "dotProduct"
          }
      ]
  }
  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

- Save the file, and then run the following command in your terminal, replacing `<path-to-file>` with the path to the `vector-index.json` file that you created.

  ```
  atlas deployments search indexes create --file <path-to-file>
  ```

</Tab>

<Tab name="MongoDB Shell">

- Connect to the Atlas cluster using `mongosh`.

  In a terminal window, run `atlas deployments connect` and follow the prompts to connect to your local Atlas deployment via `mongosh`. For detailed instructions on connecting, see Manage a Local Atlas Deployment.

- Switch to the database that contains the collection for which you want to create the index.

  ```shell
  use sample_mflix
  ```

  ```shell
  switched to db sample_mflix
  ```

- Run the `db.collection.createSearchIndex()` method.

  ```shell
  db.embedded_movies.createSearchIndex(
    "vector_index",
    "vectorSearch",
    {
      "fields": [
        {
          "type": "vector",
          "path": "plot_embedding",
          "numDimensions": 1536,
          "similarity": "dotProduct"
        }
      ]
    }
  );
  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

</Tab>

<Tab name="C">

- Install the MongoDB C Driver.

  For detailed installation instructions, refer to the MongoDB C Driver documentation.

- Create a new directory called `query-quick-start`.

  ```bash
  mkdir query-quick-start
  ```

- Enter the directory, and create a `CMakeLists.txt` file.

  ```bash
  cd query-quick-start
  touch CMakeLists.txt
  ```

  Copy and paste the following lines into the `CMakeLists.txt` file:

  ```console
  cmake_minimum_required(VERSION 3.30)

  project(atlas-vector-search-quick-start)

  # Specify the minimum version for creating a vector index.
  find_package (mongoc-1.0 1.28.0 REQUIRED)

  add_executable(atlas-vector-search-quick-start
    vector_index.c
  )

  target_link_libraries (atlas-vector-search-quick-start PRIVATE mongo::mongoc_shared)
  ```

- Define the index.

  Create a file named `vector_index.c`. Copy and paste the following code into the file.

  ```c
  #include <bson/bson.h>
  #include <mongoc/mongoc.h>
  #include <stdio.h>

  int main(void) {
    mongoc_client_t *client;
    mongoc_collection_t *collection;
    bson_error_t error;
    char database_name[] = "sample_mflix";
    char collection_name[] = "embedded_movies";
    char index_name[] = "vector_index";

    mongoc_init();

    // Replace the placeholder with your Atlas connection string
    client =  mongoc_client_new("<connection-string>");

    // Connect to your Atlas cluster
    collection = mongoc_client_get_collection (client, database_name, collection_name);

    bson_t cmd;
    // Create search index command.
    {
      char *cmd_str = bson_strdup_printf (
          BSON_STR ({
                      "createSearchIndexes" : "%s",
                      "indexes" : [{
                        "definition": {
                          "fields": [{
                            "type": "vector",
                            "path": "plot_embedding",
                            "numDimensions": 1536,
                            "similarity": "dotProduct"
                          }]
                        },
                        "name": "%s",
                        "type": "vectorSearch"
                      }]
                    }),
          collection_name, index_name);
      if (!bson_init_from_json(&cmd, cmd_str, -1, &error)) {
        printf("Failed to initialize BSON: %s\
", error.message);
        bson_free(cmd_str);
        return 1;
      }
      bson_free (cmd_str);
    }
    if (!mongoc_collection_command_simple (collection, &cmd, NULL /* read_prefs */, NULL /* reply */, &error)) {
      bson_destroy (&cmd);
      printf ("Failed to run createSearchIndexes: %s", error.message);
      return 1;
    } else {
      printf ("New search index named %s is building.\
", index_name);
      bson_destroy (&cmd);
    }

    // Polling for index status
    printf("Polling to check if the index is ready. This may take up to a minute.\
");
    int queryable = 0;
    while (!queryable) {
      const char *pipeline_str = "{\\"pipeline\\": [{\\"$listSearchIndexes\\": {}}]}";
      bson_t pipeline;
      if (!bson_init_from_json(&pipeline, pipeline_str, -1, &error)) {
        printf("Failed to initialize pipeline BSON: %s\
", error.message);
        break; // Exit the loop on error
      }
      mongoc_cursor_t *cursor = mongoc_collection_aggregate(collection, MONGOC_QUERY_NONE, &pipeline, NULL, NULL);
      const bson_t *got;
      // Check if the cursor returns any documents
      int found_index = 0;
      while (mongoc_cursor_next(cursor, &got)) {
        bson_iter_t iter;
        if (bson_iter_init(&iter, got) && bson_iter_find(&iter, "name")) {
          const char *name = bson_iter_utf8(&iter, NULL);
          if (strcmp(name, index_name) == 0) {
            found_index = 1; // Index found
            bson_iter_find(&iter, "queryable");
            queryable = bson_iter_bool(&iter);
            break; // Exit the loop since we found the index
          }
        }
      }
      if (mongoc_cursor_error(cursor, &error)) {
        printf("Failed to run $listSearchIndexes: %s\
", error.message);
        break; // Exit the loop on error
      }
      if (!found_index) {
        printf("Index %s not found yet. Retrying...\
", index_name);
      }
      bson_destroy(&pipeline);
      mongoc_cursor_destroy(cursor);
      sleep(5); // Sleep for 5 seconds before checking again
    }
    if (queryable) {
      printf("%s is ready for querying.\
", index_name);
    } else {
      printf("Error occurred or index not found.\
");
    }

    // Cleanup
    mongoc_collection_destroy(collection);
    mongoc_client_destroy(client);
    mongoc_cleanup();

    return 0;
  }
  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Create and enter the `/build` directory:

  ```bash
  mkdir build && cd build
  ```

- Prepare the project.

  ```bash
  cmake ../
  ```

- Build the app.

  ```bash
  cmake --build .
  ```

- Execute the app to create the index.

  ```bash
  ./atlas-vector-search-quick-start
  ```

  ```sh
  New search index named vector_index is building.
  Polling to check if the index is ready. This may take up to a minute.
  vector_index is ready for querying.

  ```

</Tab>

<Tab name="C++11">

- Install the MongoDB C++ Driver.

  For detailed installation instructions, refer to the MongoDB C++ Driver documentation.

- Create a new directory called `query-quick-start`.

  ```bash
  mkdir query-quick-start
  ```

- Enter the directory, and create a `CMakeLists.txt` file.

  ```bash
  cd query-quick-start
  touch CMakeLists.txt
  ```

  Copy and paste the following lines into the `CMakeLists.txt` file:

  ```console
  cmake_minimum_required(VERSION 3.30)

  project(query_quick_start)

  set(CMAKE_CXX_STANDARD 17)

  # Specify the minimum version for creating a vector index.
  find_package(mongocxx 3.11.0 REQUIRED)
  find_package(bsoncxx REQUIRED)

  add_executable(query_quick_start
    vector_index.cpp
  )

  target_link_libraries(query_quick_start PRIVATE mongo::mongocxx_shared)
  target_link_libraries(query_quick_start PRIVATE mongo::bsoncxx_shared)
  ```

- Define the index.

  Create a file named `vector_index.cpp`. Copy and paste the following code into the file.

  ```cpp
  #include <bsoncxx/builder/basic/document.hpp>
  #include <iostream>
  #include <mongocxx/client.hpp>
  #include <mongocxx/instance.hpp>
  #include <mongocxx/search_index_view.hpp>
  #include <mongocxx/uri.hpp>
  #include <thread>

  using bsoncxx::builder::basic::kvp;
  using bsoncxx::builder::basic::make_array;
  using bsoncxx::builder::basic::make_document;

  int main() {
    try {
      mongocxx::instance inst{};

      // Replace the placeholder with your Atlas connection string
      const auto uri = mongocxx::uri{"<connection-string>"};

      // Connect to your Atlas cluster
      mongocxx::client conn{uri};
      auto db = conn["sample_mflix"];
      auto collection = db["embedded_movies"];

      auto siv = collection.search_indexes();
      std::string name = "vector_index";
      auto type = "vectorSearch";
      auto definition = make_document(
          kvp("fields",
              make_array(make_document(
                  kvp("type", "vector"), kvp("path", "plot_embedding"),
                  kvp("numDimensions", 1536), kvp("similarity", "dotProduct")))));
      auto model =
          mongocxx::search_index_model(name, definition.view()).type(type);
      siv.create_one(model);
      std::cout << "New search index named " << name << " is building."
                << std::endl;

      // Polling for index status
      std::cout << "Polling to check if the index is ready. This may take up to "
                   "a minute."
                << std::endl;
      bool queryable = false;
      while (!queryable) {
        auto indexes = siv.list();
        for (const auto& index : indexes) {
          if (index["name"].get_value() == name) {
            queryable = index["queryable"].get_bool();
          }
        }
        if (!queryable) {
          std::this_thread::sleep_for(std::chrono::seconds(5));
        }
      }
      std::cout << name << " is ready for querying." << std::endl;
    } catch (const std::exception& e) {
      std::cout << "Exception: " << e.what() << std::endl;
    }
    return 0;
  }

  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Create and enter the `/build` directory:

  ```bash
  mkdir build && cd build
  ```

- Prepare the project.

  ```bash
  cmake ../
  ```

- Build the app.

  ```bash
  cmake --build .
  ```

- Execute the app to create the index.

  ```bash
  ./query_quick_start
  ```

  ```sh
  New search index named vector_index is building.
  Polling to check if the index is ready. This may take up to a minute.
  vector_index is ready for querying.

  ```

</Tab>

<Tab name="C#">

- called `query-quick-start` and initialize your .NET/C# project.

  ```bash
  mkdir query-quick-start
  cd query-quick-start
  dotnet new console
  ```

- Run the following command to add the .NET/C# Driver to your project as a dependency.

  ```bash
  dotnet add package MongoDB.Driver
  ```

  For more detailed installation instructions, see the MongoDB C# Driver documentation.

- Define the index.

  Create a file named `IndexService.cs`. Copy and paste the following code into the file.

  ```csharp
  namespace query_quick_start;

  using MongoDB.Bson;
  using MongoDB.Driver;
  using System;
  using System.Threading;

  public class IndexService
  {
      // Replace the placeholder with your Atlas connection string
      private const string MongoConnectionString = "<connection-string>";
      public void CreateVectorIndex()
      {
          try
          {
              // Connect to your Atlas cluster
              var client = new MongoClient(MongoConnectionString);
              var database = client.GetDatabase("sample_mflix");
              var collection = database.GetCollection<BsonDocument>("embedded_movies");

              var searchIndexView = collection.SearchIndexes;
              var name = "vector_index";
              var type = SearchIndexType.VectorSearch;

              var definition = new BsonDocument
              {
                  { "fields", new BsonArray
                      {
                          new BsonDocument
                          {
                              { "type", "vector" },
                              { "path", "plot_embedding" },
                              { "numDimensions", 1536 },
                              { "similarity", "dotProduct" }
                          }
                      }
                  }
              };

              var model = new CreateSearchIndexModel(name, type, definition);

              searchIndexView.CreateOne(model);
              Console.WriteLine($"New search index named {name} is building.");

              // Polling for index status
              Console.WriteLine("Polling to check if the index is ready. This may take up to a minute.");
              bool queryable = false;
              while (!queryable)
              {
                  var indexes = searchIndexView.List();
                  foreach (var index in indexes.ToEnumerable())
                  {
                      if (index["name"] == name)
                      {
                          queryable = index["queryable"].AsBoolean;
                      }
                  }
                  if (!queryable)
                  {
                      Thread.Sleep(5000);
                  }
              }
              Console.WriteLine($"{name} is ready for querying.");
          }
          catch (Exception e)
          {
              Console.WriteLine($"Exception: {e.Message}");
          }
      }
  }

  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Initialize the class and call the method to create the index in your `Program.cs` file:

  ```csharp
  using query_quick_start;

  var indexService = new IndexService();
  indexService.CreateVectorIndex();
  ```

- Compile and run your project to create the index.

  ```bash
  dotnet run query-quick-start.csproj
  ```

  ```sh
  New search index named vector_index is building.
  Polling to check if the index is ready. This may take up to a minute.
  vector_index is ready for querying.

  ```

</Tab>

<Tab name="Go">

- Initialize your Go module:

  ```sh
  mkdir go-vector-quickstart && cd go-vector-quickstart
  go mod init go-vector-quickstart
  ```

- Add the Go Driver as a dependency in your project:

  ```sh
  go get go.mongodb.org/mongo-driver/mongo
  ```

  For more detailed installation instructions, see the MongoDB Go Driver documentation.

- Define the index.

  Create a file named `vector-index.go`. Copy and paste the following code into the file.

  ```go
  package main

  import (
  \t"context"
  \t"fmt"
  \t"log"
  \t"time"

  \t"go.mongodb.org/mongo-driver/bson"
  \t"go.mongodb.org/mongo-driver/mongo"
  \t"go.mongodb.org/mongo-driver/mongo/options"
  )

  func main() {
  \tctx := context.Background()

  \t// Replace the placeholder with your Atlas connection string
  \tconst uri = "<connectionString>"

  \t// Connect to your Atlas cluster
  \tclientOptions := options.Client().ApplyURI(uri)
  \tclient, err := mongo.Connect(ctx, clientOptions)
  \tif err != nil {
  \t\tlog.Fatalf("failed to connect to the server: %v", err)
  \t}
  \tdefer func() { _ = client.Disconnect(ctx) }()

  \t// Set the namespace
  \tcoll := client.Database("sample_mflix").Collection("embedded_movies")

  \t// Define the index details
  \ttype vectorDefinitionField struct {
  \t\tType          string `bson:"type"`
  \t\tPath          string `bson:"path"`
  \t\tNumDimensions int    `bson:"numDimensions"`
  \t\tSimilarity    string `bson:"similarity"`
  \t}

  \ttype vectorDefinition struct {
  \t\tFields []vectorDefinitionField `bson:"fields"`
  \t}

  \tindexName := "vector_index"
  \topts := options.SearchIndexes().SetName(indexName).SetType("vectorSearch")

  \tindexModel := mongo.SearchIndexModel{
  \t\tDefinition: vectorDefinition{
  \t\t\tFields: []vectorDefinitionField{{
  \t\t\t\tType:          "vector",
  \t\t\t\tPath:          "plot_embedding",
  \t\t\t\tNumDimensions: 1536,
  \t\t\t\tSimilarity:    "dotProduct"}},
  \t\t},
  \t\tOptions: opts,
  \t}

  \t// Create the index
  \tsearchIndexName, err := coll.SearchIndexes().CreateOne(ctx, indexModel)
  \tif err != nil {
  \t\tlog.Fatalf("failed to create the search index: %v", err)
  \t}
  \tlog.Println("New search index named " + searchIndexName + " is building.")

  \t// Await the creation of the index.
  \tlog.Println("Polling to check if the index is ready. This may take up to a minute.")
  \tsearchIndexes := coll.SearchIndexes()
  \tvar doc bson.Raw
  \tfor doc == nil {
  \t\tcursor, err := searchIndexes.List(ctx, options.SearchIndexes().SetName(searchIndexName))
  \t\tif err != nil {
  \t\t\tfmt.Errorf("failed to list search indexes: %w", err)
  \t\t}

  \t\tif !cursor.Next(ctx) {
  \t\t\tbreak
  \t\t}

  \t\tname := cursor.Current.Lookup("name").StringValue()
  \t\tqueryable := cursor.Current.Lookup("queryable").Boolean()
  \t\tif name == searchIndexName && queryable {
  \t\t\tdoc = cursor.Current
  \t\t} else {
  \t\t\ttime.Sleep(5 * time.Second)
  \t\t}
  \t}

  \tlog.Println(searchIndexName + " is ready for querying.")
  }

  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Run the following command to create the index.

  ```shell
  go run vector-index.go
  ```

  ```console
  2024/10/17 09:38:21 New search index named vector_index is building.
  2024/10/17 09:38:22 Polling to check if the index is ready. This may take up to a minute.
  2024/10/17 09:38:48 vector_index is ready for querying.
  ```

</Tab>

<Tab name="Java (Sync)">

- Add the Java driver version 5.2 or higher as a dependency in your project. Select one of the following tabs, depending on your package manager:

  <Tabs>

  <Tab name="Maven">

  If you are using Maven, add the following dependencies to the `dependencies` array in your project\'s `pom.xml` file:

  ```xml
  <dependencies>
     <!-- MongoDB Java Sync Driver v5.2.0 or later -->
     dependency>
        <groupId>org.mongodb</groupId>
        <artifactId>mongodb-driver-sync</artifactId>
        <version>[5.2.0,)</version>
     </dependency>
  </dependencies>
  ```

  </Tab>

  </Tabs>

  <Tab name="Gradle">

  If you are using Gradle, add the following to the `dependencies` array in your project\'s `build.gradle` file:

  ```json
  dependencies {
     // MongoDB Java Sync Driver v5.2.0 or later
     implementation \'org.mongodb:mongodb-driver-sync:[5.2.0,)\'
  }
  ```

  </Tab>

- Run your package manager to install the dependencies to your project.

  For more detailed installation instructions and version compatibility, see the MongoDB Java Driver documentation.

- Create a file named `VectorIndex.java`. Copy and paste the following code into the file.

  ```java
  import com.mongodb.client.ListSearchIndexesIterable;
  import com.mongodb.client.MongoClient;
  import com.mongodb.client.MongoClients;
  import com.mongodb.client.MongoCollection;
  import com.mongodb.client.MongoCursor;
  import com.mongodb.client.MongoDatabase;
  import com.mongodb.client.model.SearchIndexModel;
  import com.mongodb.client.model.SearchIndexType;
  import org.bson.Document;
  import org.bson.conversions.Bson;

  import java.util.Collections;
  import java.util.List;

  public class VectorIndex {

      public static void main(String[] args) {

          // Replace the placeholder with your Atlas connection string
          String uri = "<connectionString>";

          // Connect to your Atlas cluster
          try (MongoClient mongoClient = MongoClients.create(uri)) {

              // Set the namespace
              MongoDatabase database = mongoClient.getDatabase("sample_mflix");
              MongoCollection<Document> collection = database.getCollection("embedded_movies");

              // Define the index details
              String indexName = "vector_index";
              Bson definition = new Document(
                  "fields",
                  Collections.singletonList(
                      new Document("type", "vector")
                          .append("path", "plot_embedding")
                          .append("numDimensions", 1536)
                          .append("similarity", "dotProduct")));

              // Define the index model
              SearchIndexModel indexModel = new SearchIndexModel(
                  indexName,
                  definition,
                  SearchIndexType.vectorSearch());

              // Create the index
              try {
                  List<String> result = collection.createSearchIndexes(Collections.singletonList(indexModel));
                  System.out.println("New search index named " + result.get(0) + " is building.");
              } catch (Exception e) {
                  throw new RuntimeException("Error creating index: " + e);
              }

              // Wait for Atlas to build the index
              System.out.println("Polling to check if the index is ready. This may take up to a minute.");

              ListSearchIndexesIterable<Document> searchIndexes = collection.listSearchIndexes();
              Document doc = null;
              while (doc == null) {
                  try (MongoCursor<Document> cursor = searchIndexes.iterator()) {
                      if (!cursor.hasNext()) {
                          break;
                      }
                      Document current = cursor.next();
                      String name = current.getString("name");
                      // When the index completes building, it becomes `queryable`
                      boolean queryable = current.getBoolean("queryable");
                      if (name.equals(indexName) && queryable) {
                          doc = current;
                      } else {
                          Thread.sleep(500);
                      }
                  } catch (Exception e) {
                      throw new RuntimeException("Failed to list search indexes: " + e);
                  }
              }
              System.out.println(indexName + " is ready for querying.");

          } catch (Exception e) {
              throw new RuntimeException("Error connecting to MongoDB: " + e);
          }
      }
  }

  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Run the file in your IDE, or execute a command from the command line to run the code.

  ```shell
  javac VectorIndex.java
  java VectorIndex
  ```

  ```console
  New search index named vector_index is building.
  Polling to check if the index is ready. This may take up to a minute.
  vector_index is ready for querying.

  ```

</Tab>

<Tab name="Kotlin (Coroutine)">

- Install the MongoDB Kotlin Coroutine Driver.

  For more detailed installation instructions and version compatibility, see the MongoDB Kotlin Coroutine Driver documentation.

- Define the index.

  Create a file named `VectorIndex.kt`. Copy and paste the following code into the file.

  ```kotlin
  import com.mongodb.MongoException
  import com.mongodb.client.model.SearchIndexModel
  import com.mongodb.client.model.SearchIndexType
  import com.mongodb.kotlin.client.coroutine.MongoClient
  import kotlinx.coroutines.delay
  import kotlinx.coroutines.flow.toList
  import org.bson.Document
  import kotlinx.coroutines.runBlocking

  fun main() {
      // Replace the placeholder with your MongoDB deployment\'s connection string
      val uri = "<connection-string>"
      val mongoClient = MongoClient.create(uri)
      val database = mongoClient.getDatabase("sample_mflix")
      val collection = database.getCollection<Document>("embedded_movies")
      val indexName = "vector_index"
      val searchIndexModel = SearchIndexModel(
          indexName,
          Document(
              "fields",
              listOf(
                  Document("type", "vector")
                      .append("path", "plot_embedding")
                      .append("numDimensions", 1536)
                      .append("similarity", "dotProduct")
              )
          ),
          SearchIndexType.vectorSearch()
      )

      runBlocking {
          try {
              collection.createSearchIndexes(listOf(searchIndexModel))
                  .collect { result ->
                      println("New search index named $result is building.")
                  }

              // Polling to check if the index is queryable
              println("Polling to check if the index is ready. This may take up to a minute.")
              var isQueryable = false
              while (!isQueryable) {
                  delay(5000L) // Poll every 5 seconds

                  val indexes = collection.listSearchIndexes().toList()
                  isQueryable = indexes.any { index ->
                      index.getString("name") == indexName && index.getBoolean("queryable")
                  }
                  if (isQueryable) {
                      println("$indexName is ready for querying.")
                  }
              }
          } catch (me: MongoException) {
              System.err.println("An error occurred: $me")
          }
      }
      mongoClient.close()
  }
  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Run the `VectorIndex.kt` file in your IDE. The output should resemble the following:

  ```
  New search index named vector_index is building.
  Polling to check if the index is ready. This may take up to a minute.
  vector_index is ready for querying.

  ```

</Tab>

<Tab name="Kotlin (Sync)">

- Install the MongoDB Kotlin Sync Driver.

  For more detailed installation instructions and version compatibility, see the MongoDB Kotlin Sync Driver documentation.

- Define the index.

  Create a file named `VectorIndex.kt`. Copy and paste the following code into the file.

  ```kotlin
  import com.mongodb.MongoException
  import com.mongodb.client.model.SearchIndexModel
  import com.mongodb.client.model.SearchIndexType
  import com.mongodb.kotlin.client.MongoClient
  import org.bson.Document

  fun main() {
      // Replace the placeholder with your MongoDB deployment\'s connection string
      val uri = "<connection-string>"
      val mongoClient = MongoClient.create(uri)
      val database = mongoClient.getDatabase("sample_mflix")
      val collection = database.getCollection<Document>("embedded_movies")
      val indexName = "vector_index"
      val searchIndexModel = SearchIndexModel(
          indexName,
          Document(
              "fields",
              listOf(
                  Document("type", "vector")
                      .append("path", "plot_embedding")
                      .append("numDimensions", 1536)
                      .append("similarity", "dotProduct")
              )
          ),
          SearchIndexType.vectorSearch()
      )

      try {
          val result = collection.createSearchIndexes(
              listOf(searchIndexModel)
          )
          println("New search index named ${result.get(0)} is building.")

          // Polling to check if the index is queryable
          println("Polling to check if the index is ready. This may take up to a minute.")
          var isQueryable = false
          while (!isQueryable) {
              val results = collection.listSearchIndexes()
              results.forEach { result ->
                  if (result.getString("name") == indexName && result.getBoolean("queryable")) {
                      println("$indexName is ready for querying.")
                      isQueryable = true
                  } else {
                      Thread.sleep(5000) // Poll every 5 seconds
                  }
              }
          }
      } catch (me: MongoException) {
          System.err.println("An error occurred: $me")
      }
      mongoClient.close()
  }

  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Run the `VectorIndex.kt` file in your IDE. The output should resemble the following:

  ```
  New search index named vector_index is building.
  Polling to check if the index is ready. This may take up to a minute.
  vector_index is ready for querying.

  ```

</Tab>

<Tab name="Node.js">

- Add the MongoDB Node Driver as a dependency in your project:

  ```sh
  npm install mongodb
  ```

  The examples on this page assume your project manages modules as CommonJS modules. If you\'re using ES modules, instead, you must modify the import syntax.

- Define the index.

  Create a file named `vector-index.js`. Copy and paste the following code into the file.

  ```javascript
  const { MongoClient } = require("mongodb");

  // connect to your Atlas deployment
  const uri =  "<connectionString>";

  const client = new MongoClient(uri);

  async function run() {
     try {
       const database = client.db("sample_mflix");
       const collection = database.collection("embedded_movies");

       // define your Atlas Vector Search index
       const index = {
           name: "vector_index",
           type: "vectorSearch",
           definition: {
             "fields": [
               {
                 "type": "vector",
                 "numDimensions": 1536,
                 "path": "plot_embedding",
                 "similarity": "dotProduct"
               }
             ]
           }
       }

       // run the helper method
       const result = await collection.createSearchIndex(index);
       console.log(`New search index named ${result} is building.`);

       // wait for the index to be ready to query
       console.log("Polling to check if the index is ready. This may take up to a minute.")
       let isQueryable = false;
       while (!isQueryable) {
         const cursor = collection.listSearchIndexes();
         for await (const index of cursor) {
           if (index.name === result) {
             if (index.queryable) {
               console.log(`${result} is ready for querying.`);
               isQueryable = true;
             } else {
               await new Promise(resolve => setTimeout(resolve, 5000));
             }
           }
         }
       }
     } finally {
       await client.close();
     }
  }
  run().catch(console.dir);

  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Run the following command to create the index.

  ```shell
  node vector-index.js
  ```

  ```console
  New search index named vector_index is building.
  Polling to check if the index is ready. This may take up to a minute.
  vector_index is ready for querying.

  ```

</Tab>

<Tab name="PHP">

- Install the MongoDB PHP Driver.

  For detailed installation instructions, see the MongoDB PHP Library documentation.

- Define the index.

  Create a file named `vector-index.php`. Copy and paste the following code into the file.

  ```php
  <?php

  require \'vendor/autoload.php\';

  // Replace the placeholder with your Atlas connection string
  $uri = "<connection-string>";
  $client = new MongoDB\\Client($uri);
  $collection = $client->sample_mflix->embedded_movies;
  $indexName = "vector_index";
  try {
      $result = $collection->createSearchIndexes(
          [[
              \'name\' => $indexName,
              \'type\' => \'vectorSearch\',
              \'definition\' => [
                  \'fields\' => [[
                      \'type\' => \'vector\',
                      \'path\' => \'plot_embedding\',
                      \'numDimensions\' => 1536,
                      \'similarity\' => \'dotProduct\'
                  ]]
              ],
          ]]
      );
      echo "New search index named $result[0] is building." .PHP_EOL;

      // Polling for the index to become queryable
      echo "Polling to check if the index is ready. This may take up to a minute." .PHP_EOL;
      $isIndexQueryable = false;
      while (!$isIndexQueryable) {
          // List the search indexes
          $searchIndexes = $collection->listSearchIndexes();
          // Check if the index is present and queryable
          foreach ($searchIndexes as $index) {
              if ($index->name === $indexName) {
                  $isIndexQueryable = $index->queryable;
              }
          }
          if (!$isIndexQueryable) {
              sleep(5); // Wait for 5 seconds before polling again
          }
      }
      echo "$indexName is ready for querying." .PHP_EOL;
  }
  catch (MongoDB\\Driver\\Exception\\Exception $e) {
      print \'Error creating the index: \' .$e->getMessage() .PHP_EOL;
  }

  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Run the following command to create the index.

  ```shell
  php vector-index.php
  ```

  ```console
  New search index named vector_index is building.
  Polling to check if the index is ready. This may take up to a minute.
  vector_index is ready for querying.

  ```

</Tab>

<Tab name="Python">

- Add the PyMongo Driver as a dependency in your project:

  ```sh
  pip install pymongo
  ```

  For more detailed installation instructions, see the MongoDB Python Driver documentation.

- Define the index.

  Create a file named `vector-index.py`. Copy and paste the following code into the file.

  ```python
  from pymongo.mongo_client import MongoClient
  from pymongo.operations import SearchIndexModel
  import time

  # Connect to your Atlas deployment
  uri = "<connectionString>"
  client = MongoClient(uri)

  # Access your database and collection
  database = client["sample_mflix"]
  collection = database["embedded_movies"]

  # Create your index model, then create the search index
  search_index_model = SearchIndexModel(
    definition={
      "fields": [
        {
          "type": "vector",
          "path": "plot_embedding",
          "numDimensions": 1536,
          "similarity": "dotProduct"
        }
      ]
    },
    name="vector_index",
    type="vectorSearch",
  )

  result = collection.create_search_index(model=search_index_model)
  print("New search index named " + result + " is building.")

  # Wait for initial sync to complete
  print("Polling to check if the index is ready. This may take up to a minute.")
  predicate=None
  if predicate is None:
    predicate = lambda index: index.get("queryable") is True

  while True:
    indices = list(collection.list_search_indexes(result))
    if len(indices) and predicate(indices[0]):
      break
    time.sleep(5)
  print(result + " is ready for querying.")

  client.close()

  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Run the following command to create the index.

  ```shell
  python vector-index.py
  ```

  ```console
  New search index named vector_index is building.
  Polling to check if the index is ready. This may take up to a minute.
  vector_index is ready for querying.

  ```

</Tab>

<Tab name="Ruby">

- Create a file named `vector-index.json`

- Copy and paste the following index definition into the JSON (Javascript Object Notation) file.

  ```
  {
      "database": "sample_mflix",
      "collectionName": "embedded_movies",
      "type": "vectorSearch",
      "name": "vector_index",
      "fields": [
          {
          "type": "vector",
          "path": "plot_embedding",
          "numDimensions": 1536,
          "similarity": "dotProduct"
          }
      ]
  }
  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

- Save the file, and then run the following command in your terminal, replacing `<path-to-file>` with the path to the `vector-index.json` file that you created.

  ```
  atlas deployments search indexes create --file <path-to-file>
  ```

</Tab>

<Tab name="Rust">

- Install the Rust driver for MongoDB.

  For more detailed installation instructions, see the MongoDB Rust Driver documentation.

- Define the index.

  In the `/src` directory of your project, create a file named `vector_index.rs`. Copy and paste the following code into the file.

  <Tabs>

  <Tab name="">

  ```rust
  use std::ops::Index;
  use std::time::Duration;
  use futures::{TryStreamExt};
  use mongodb::{bson::{Document, doc}, Client, Collection, SearchIndexModel};
  use mongodb::SearchIndexType::VectorSearch;
  use tokio::time::sleep;

  #[tokio::main]
  pub(crate) async fn vector_index() {
      // Replace the placeholder with your Atlas connection string
      let uri = "<connection_string>";

      // Create a new client and connect to the server
      let client = Client::with_uri_str(uri).await.unwrap();

      // Get a handle on the movies collection
      let database = client.database("sample_mflix");
      let my_coll: Collection<Document> = database.collection("embedded_movies");

      let index_name = "vector_index";
      let search_index_def = SearchIndexModel::builder()
          .definition(doc! {
              "fields": vec! {doc! {
                  "type": "vector",
                  "path": "plot_embedding",
                  "numDimensions": 1536,
                  "similarity": "dotProduct"
              }}
          })
          .name(index_name.to_string())
          .index_type(VectorSearch)
          .build();

      let models = vec![search_index_def];
      let result = my_coll.create_search_indexes(models).await;
      if let Err(e) = result {
          eprintln!("There was an error creating the search index: {}", e);
          std::process::exit(1)
      } else {
          println!("New search index named {} is building.", result.unwrap().index(0));
      }

      // Polling for the index to become queryable
      println!("Polling to check if the index is ready. This may take up to a minute.");
      let mut is_index_queryable = false;
      while !is_index_queryable {
          // List the search indexes
          let mut search_indexes = my_coll.list_search_indexes().await.unwrap();
          // Check if the index is present and queryable
          while let Some(index) = search_indexes.try_next().await.unwrap() {
              let retrieved_name = index.get_str("name");
              if retrieved_name.unwrap().to_string() == index_name {
                  is_index_queryable = index.get_bool("queryable").unwrap();
              }
          }
          if !is_index_queryable {
              sleep(Duration::from_secs(5)).await; // Wait for 5 seconds before polling again
          }
      }
      println!("{} is ready for querying.", index_name);
  }

  ```

  </Tab>

  <Tab name="">

  ```rust
  use std::ops::Index;
  use std::time::Duration;
  use std::thread::sleep;
  use mongodb::{
      bson::{doc, Document},
      Client, Collection, SearchIndexModel,
  };
  use mongodb::options::ClientOptions;
  use mongodb::SearchIndexType::VectorSearch;

  pub(crate) fn vector_index() {
      // Replace the placeholder with your Atlas connection string
      let uri = "<connection_string>";

      // Create a new client and connect to the server
      let options = ClientOptions::parse(uri).run().unwrap();
      let client = Client::with_options(options).unwrap();

      // Get a handle on the movies collection
      let database = client.database("sample_mflix");
      let my_coll: Collection<Document> = database.collection("embedded_movies");

      let index_name = "vector_index";
      let search_index_def = SearchIndexModel::builder()
          .definition(doc! {
              "fields": vec! {doc! {
                  "type": "vector",
                  "path": "plot_embedding",
                  "numDimensions": 1536,
                  "similarity": "dotProduct"
              }}
          })
          .name(index_name.to_string())
          .index_type(VectorSearch)
          .build();

      let models = vec![search_index_def];
      let result = my_coll.create_search_indexes(models).run();
      if let Err(e) = result {
          eprintln!("There was an error creating the search index: {}", e);
          std::process::exit(1)
      } else {
          println!("New search index named {} is building.", result.unwrap().index(0));
      }

      // Polling for the index to become queryable
      println!("Polling to check if the index is ready. This may take up to a minute.");
      let mut is_index_queryable = false;
      while !is_index_queryable {
          // List the search indexes
          let search_indexes = my_coll.list_search_indexes().run().unwrap();

          // Check if the index is present and queryable
          for index in search_indexes {
              let unwrapped_index = index.unwrap();
              let retrieved_name = unwrapped_index.get_str("name").unwrap();
              if retrieved_name == index_name {
                  is_index_queryable = unwrapped_index.get_bool("queryable").unwrap_or(false);
              }
          }

          if !is_index_queryable {
              sleep(Duration::from_secs(5)); // Wait for 5 seconds before polling again
          }
      }
      println!("{} is ready for querying.", index_name);
  }

  ```

  </Tab>

  </Tabs>

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Call the function from your `main.rs`.

  ```rust
  mod vector_index;

  fn main() {
     vector_index::vector_index();
  }
  ```

- Run the file in your IDE, or execute a command from the command line to run the code.

  ```shell
  cargo run
  ```

  ```console
  New search index named vector_index is building.
  Polling to check if the index is ready. This may take up to a minute.
  vector_index is ready for querying.

  ```

</Tab>

<Tab name="Scala">

- Install the MongoDB Scala Driver.

  For installation instructions based on your environment and the version of Scala you are using, refer to the MongoDB Scala Driver documentation.

- Create a new Scala project with the tools you normally use. For this quick start, we create a project named `quick-start`, by using sbt.

  ```sh
  sbt new scala/hello-world.g8
  ```

  When prompted, name the application `quick-start`.

- Navigate to your `quick-start` project and create a file named `VectorIndex.scala`. Copy and paste the following code into the file.

  ```scala
  import org.mongodb.scala._
  import org.mongodb.scala.model._
  import com.mongodb.client.model.SearchIndexType

  class VectorIndex {
    def createIndex(): Unit = {
      val collection =
        MongoClient("<connection-string>")
          .getDatabase("sample_mflix")
          .getCollection("embedded_movies")
      val indexName = "vector_index"
      val indexNameAsOption = Option(indexName)
      val indexDefinition = Document(
        "fields" -> List(
          Document(
            "type" -> "vector",
            "path" -> "plot_embedding",
            "numDimensions" -> 1536,
            "similarity" -> "dotProduct"
          )
        )
      )
      val indexType = Option(SearchIndexType.vectorSearch())
      val indexModel: SearchIndexModel = SearchIndexModel(
        indexNameAsOption, indexDefinition, indexType
      )
      collection.createSearchIndexes(List(indexModel)).foreach { doc => println(s"New search index named $doc is building.") }
      Thread.sleep(2000)
      println("Polling to check if the index is ready. This may take up to a minute.")
      var indexReady = false
      while (!indexReady) {
        val searchIndexes = collection.listSearchIndexes()
        searchIndexes.foreach { current =>
          val document = current.toBsonDocument()
          val name = document.get("name").asString().getValue
          val queryable = document.get("queryable").asBoolean().getValue
          if (name == indexName && queryable) {
            indexReady = true
          }
        }
        if (!indexReady) {
          Thread.sleep(5000)
        }
      }
      println(s"$indexName is ready for querying.")
    }
  }
  ```

  This index definition:

  - Indexes the `plot_embedding` field as the `vector` type. This field contains vector embeddings that represent the summary of a movie\'s plot.

    - Specifies `1536` vector dimensions.

    - Measures similarity using `dotProduct` similarity.

  This code also includes a polling mechanism to check if the index is ready to use.

- Specify the `<connection-string>`.

  Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

  <Tabs>

  <Tab name="Atlas Cluster">

  Your connection string should use the following format:

  ```
  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
  ```

  Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

  </Tab>

  <Tab name="Local Deployment">

  Your connection string should use the following format:

  ```
  mongodb://localhost:<port-number>/?directConnection=true
  ```

  </Tab>

  </Tabs>

- Create a class instance and call the function in your project\'s `Main.scala` file.

  ```scala
  object Main extends App {
     private val indexInstance = new VectorIndex
     indexInstance.createIndex()
  }
  ```

- Run the file in your IDE, or execute a command from the command line to run the code.

  There are many tools and environments in which Scala runs. In this example, we run the new Scala project by starting the sbt server with the `sbt` command, then typing `~run`.

  ```shell
  sbt:quick-start> ~run
  ```

  ```console
  New search index named vector_index is building.
  Polling to check if the index is ready. This may take up to a minute.
  vector_index is ready for querying.

  ```

</Tab>

</Tabs>

</Tab>

</Tabs>

## Run a Vector Search Query

In this section, you run a sample vector search query on your indexed embeddings.

<Tabs>

<Tab name="Atlas UI">

### Click the Collections tab in the Atlas UI.

### Go to the Aggregation tab for the collection.

- Expand `sample_mflix` under the list of databases and select `embedded_movies` from the list of collections in that database.

- Click the Aggregation tab for the `sample_mflix.embedded_movies` collection.

### Construct and run your vector search query.

- In the aggregation pipeline pane, click the </> Text toggle to enable text mode for pipeline editing.

- Copy and paste the following sample query into the text editor.

  This query searches for documents that include text in the `plot` field that is semantically related to the term "time travel".

```json
[
  {
    "$vectorSearch": {
      "index": "vector_index",
      "path": "plot_embedding",
      "queryVector": [-0.0016261312,-0.028070757,-0.011342932,-0.012775794,-0.0027440966,0.008683807,-0.02575152,-0.02020668,-0.010283281,-0.0041719596,0.021392956,0.028657231,-0.006634482,0.007490867,0.018593878,0.0038187427,0.029590257,-0.01451522,0.016061379,0.00008528442,-0.008943722,0.01627464,0.024311995,-0.025911469,0.00022596726,-0.008863748,0.008823762,-0.034921836,0.007910728,-0.01515501,0.035801545,-0.0035688248,-0.020299982,-0.03145631,-0.032256044,-0.028763862,-0.0071576433,-0.012769129,0.012322609,-0.006621153,0.010583182,0.024085402,-0.001623632,0.007864078,-0.021406285,0.002554159,0.012229307,-0.011762793,0.0051682983,0.0048484034,0.018087378,0.024325324,-0.037694257,-0.026537929,-0.008803768,-0.017767483,-0.012642504,-0.0062712682,0.0009771782,-0.010409906,0.017754154,-0.004671795,-0.030469967,0.008477209,-0.005218282,-0.0058480743,-0.020153364,-0.0032805866,0.004248601,0.0051449724,0.006791097,0.007650814,0.003458861,-0.0031223053,-0.01932697,-0.033615597,0.00745088,0.006321252,-0.0038154104,0.014555207,0.027697546,-0.02828402,0.0066711367,0.0077107945,0.01794076,0.011349596,-0.0052715978,0.014755142,-0.019753495,-0.011156326,0.011202978,0.022126047,0.00846388,0.030549942,-0.0041386373,0.018847128,-0.00033655585,0.024925126,-0.003555496,-0.019300312,0.010749794,0.0075308536,-0.018287312,-0.016567878,-0.012869096,-0.015528221,0.0078107617,-0.011156326,0.013522214,-0.020646535,-0.01211601,0.055928253,0.011596181,-0.017247654,0.0005939711,-0.026977783,-0.003942035,-0.009583511,-0.0055248477,-0.028737204,0.023179034,0.003995351,0.0219661,-0.008470545,0.023392297,0.010469886,-0.015874773,0.007890735,-0.009690142,-0.00024970944,0.012775794,0.0114762215,0.013422247,0.010429899,-0.03686786,-0.006717788,-0.027484283,0.011556195,-0.036068123,-0.013915418,-0.0016327957,0.0151016945,-0.020473259,0.004671795,-0.012555866,0.0209531,0.01982014,0.024485271,0.0105431955,-0.005178295,0.033162415,-0.013795458,0.007150979,0.010243294,0.005644808,0.017260984,-0.0045618312,0.0024725192,0.004305249,-0.008197301,0.0014203656,0.0018460588,0.005015015,-0.011142998,0.01439526,0.022965772,0.02552493,0.007757446,-0.0019726837,0.009503538,-0.032042783,0.008403899,-0.04609149,0.013808787,0.011749465,0.036388017,0.016314628,0.021939443,-0.0250051,-0.017354285,-0.012962398,0.00006107364,0.019113706,0.03081652,-0.018114036,-0.0084572155,0.009643491,-0.0034721901,0.0072642746,-0.0090636825,0.01642126,0.013428912,0.027724205,0.0071243206,-0.6858542,-0.031029783,-0.014595194,-0.011449563,0.017514233,0.01743426,0.009950057,0.0029706885,-0.015714826,-0.001806072,0.011856096,0.026444625,-0.0010663156,-0.006474535,0.0016161345,-0.020313311,0.0148351155,-0.0018393943,0.0057347785,0.018300641,-0.018647194,0.03345565,-0.008070676,0.0071443142,0.014301958,0.0044818576,0.003838736,-0.007350913,-0.024525259,-0.001142124,-0.018620536,0.017247654,0.007037683,0.010236629,0.06046009,0.0138887605,-0.012122675,0.037694257,0.0055081863,0.042492677,0.00021784494,-0.011656162,0.010276617,0.022325981,0.005984696,-0.009496873,0.013382261,-0.0010563189,0.0026507939,-0.041639622,0.008637156,0.026471283,-0.008403899,0.024858482,-0.00066686375,-0.0016252982,0.027590916,0.0051449724,0.0058647357,-0.008743787,-0.014968405,0.027724205,-0.011596181,0.0047650975,-0.015381602,0.0043718936,0.002159289,0.035908177,-0.008243952,-0.030443309,0.027564257,0.042625964,-0.0033688906,0.01843393,0.019087048,0.024578573,0.03268257,-0.015608194,-0.014128681,-0.0033538956,-0.0028757197,-0.004121976,-0.032389335,0.0034322033,0.058807302,0.010943064,-0.030523283,0.008903735,0.017500903,0.00871713,-0.0029406983,0.013995391,-0.03132302,-0.019660193,-0.00770413,-0.0038853872,0.0015894766,-0.0015294964,-0.006251275,-0.021099718,-0.010256623,-0.008863748,0.028550599,0.02020668,-0.0012962399,-0.003415542,-0.0022509254,0.0119360695,0.027590916,-0.046971202,-0.0015194997,-0.022405956,0.0016677842,-0.00018535563,-0.015421589,-0.031802863,0.03814744,0.0065411795,0.016567878,-0.015621523,0.022899127,-0.011076353,0.02841731,-0.002679118,-0.002342562,0.015341615,0.01804739,-0.020566562,-0.012989056,-0.002990682,0.01643459,0.00042527664,0.008243952,-0.013715484,-0.004835075,-0.009803439,0.03129636,-0.021432944,0.0012087687,-0.015741484,-0.0052016205,0.00080890034,-0.01755422,0.004811749,-0.017967418,-0.026684547,-0.014128681,0.0041386373,-0.013742141,-0.010056688,-0.013268964,-0.0110630235,-0.028337335,0.015981404,-0.00997005,-0.02424535,-0.013968734,-0.028310679,-0.027750863,-0.020699851,0.02235264,0.001057985,0.00081639783,-0.0099367285,0.013522214,-0.012016043,-0.00086471526,0.013568865,0.0019376953,-0.019020405,0.017460918,-0.023045745,0.008503866,0.0064678704,-0.011509543,0.018727167,-0.003372223,-0.0028690554,-0.0027024434,-0.011902748,-0.012182655,-0.015714826,-0.0098634185,0.00593138,0.018753825,0.0010146659,0.013029044,0.0003521757,-0.017620865,0.04102649,0.00552818,0.024485271,-0.009630162,-0.015608194,0.0006718621,-0.0008418062,0.012395918,0.0057980907,0.016221326,0.010616505,0.004838407,-0.012402583,0.019900113,-0.0034521967,0.000247002,-0.03153628,0.0011038032,-0.020819811,0.016234655,-0.00330058,-0.0032289368,0.00078973995,-0.021952773,-0.022459272,0.03118973,0.03673457,-0.021472929,0.0072109587,-0.015075036,0.004855068,-0.0008151483,0.0069643734,0.010023367,-0.010276617,-0.023019087,0.0068244194,-0.0012520878,-0.0015086699,0.022046074,-0.034148756,-0.0022192693,0.002427534,-0.0027124402,0.0060346797,0.015461575,0.0137554705,0.009230294,-0.009583511,0.032629255,0.015994733,-0.019167023,-0.009203636,0.03393549,-0.017274313,-0.012042701,-0.0009930064,0.026777849,-0.013582194,-0.0027590916,-0.017594207,-0.026804507,-0.0014236979,-0.022032745,0.0091236625,-0.0042419364,-0.00858384,-0.0033905501,-0.020739838,0.016821127,0.022539245,0.015381602,0.015141681,0.028817179,-0.019726837,-0.0051283115,-0.011489551,-0.013208984,-0.0047017853,-0.0072309524,0.01767418,0.0025658219,-0.010323267,0.012609182,-0.028097415,0.026871152,-0.010276617,0.021912785,0.0022542577,0.005124979,-0.0019710176,0.004518512,-0.040360045,0.010969722,-0.0031539614,-0.020366628,-0.025778178,-0.0110030435,-0.016221326,0.0036587953,0.016207997,0.003007343,-0.0032555948,0.0044052163,-0.022046074,-0.0008822095,-0.009363583,0.028230704,-0.024538586,0.0029840174,0.0016044717,-0.014181997,0.031349678,-0.014381931,-0.027750863,0.02613806,0.0004136138,-0.005748107,-0.01868718,-0.0010138329,0.0054348772,0.010703143,-0.003682121,0.0030856507,-0.004275259,-0.010403241,0.021113047,-0.022685863,-0.023032416,0.031429652,0.001792743,-0.005644808,-0.011842767,-0.04078657,-0.0026874484,0.06915057,-0.00056939584,-0.013995391,0.010703143,-0.013728813,-0.022939114,-0.015261642,-0.022485929,0.016807798,0.007964044,0.0144219175,0.016821127,0.0076241563,0.005461535,-0.013248971,0.015301628,0.0085171955,-0.004318578,0.011136333,-0.0059047225,-0.010249958,-0.018207338,0.024645219,0.021752838,0.0007614159,-0.013648839,0.01111634,-0.010503208,-0.0038487327,-0.008203966,-0.00397869,0.0029740208,0.008530525,0.005261601,0.01642126,-0.0038753906,-0.013222313,0.026537929,0.024671877,-0.043505676,0.014195326,0.024778508,0.0056914594,-0.025951454,0.017620865,-0.0021359634,0.008643821,0.021299653,0.0041686273,-0.009017031,0.04044002,0.024378639,-0.027777521,-0.014208655,0.0028623908,0.042119466,0.005801423,-0.028124074,-0.03129636,0.022139376,-0.022179363,-0.04067994,0.013688826,0.013328944,0.0046184794,-0.02828402,-0.0063412455,-0.0046184794,-0.011756129,-0.010383247,-0.0018543894,-0.0018593877,-0.00052024535,0.004815081,0.014781799,0.018007403,0.01306903,-0.020433271,0.009043689,0.033189073,-0.006844413,-0.019766824,-0.018767154,0.00533491,-0.0024575242,0.018727167,0.0058080875,-0.013835444,0.0040719924,0.004881726,0.012029372,0.005664801,0.03193615,0.0058047553,0.002695779,0.009290274,0.02361889,0.017834127,0.0049017193,-0.0036388019,0.010776452,-0.019793482,0.0067777685,-0.014208655,-0.024911797,0.002385881,0.0034988478,0.020899786,-0.0025858153,-0.011849431,0.033189073,-0.021312982,0.024965113,-0.014635181,0.014048708,-0.0035921505,-0.003347231,0.030869836,-0.0017161017,-0.0061346465,0.009203636,-0.025165047,0.0068510775,0.021499587,0.013782129,-0.0024475274,-0.0051149824,-0.024445284,0.006167969,0.0068844,-0.00076183246,0.030150073,-0.0055948244,-0.011162991,-0.02057989,-0.009703471,-0.020646535,0.008004031,0.0066378145,-0.019900113,-0.012169327,-0.01439526,0.0044252095,-0.004018677,0.014621852,-0.025085073,-0.013715484,-0.017980747,0.0071043274,0.011456228,-0.01010334,-0.0035321703,-0.03801415,-0.012036037,-0.0028990454,-0.05419549,-0.024058744,-0.024272008,0.015221654,0.027964126,0.03182952,-0.015354944,0.004855068,0.011522872,0.004771762,0.0027874154,0.023405626,0.0004242353,-0.03132302,0.007057676,0.008763781,-0.0027057757,0.023005757,-0.0071176565,-0.005238275,0.029110415,-0.010989714,0.013728813,-0.009630162,-0.029137073,-0.0049317093,-0.0008630492,-0.015248313,0.0043219104,-0.0055681667,-0.013175662,0.029723546,0.025098402,0.012849103,-0.0009996708,0.03118973,-0.0021709518,0.0260181,-0.020526575,0.028097415,-0.016141351,0.010509873,-0.022965772,0.002865723,0.0020493253,0.0020509914,-0.0041419696,-0.00039695262,0.017287642,0.0038987163,0.014795128,-0.014661839,-0.008950386,0.004431874,-0.009383577,0.0012604183,-0.023019087,0.0029273694,-0.033135757,0.009176978,-0.011023037,-0.002102641,0.02663123,-0.03849399,-0.0044152127,0.0004527676,-0.0026924468,0.02828402,0.017727496,0.035135098,0.02728435,-0.005348239,-0.001467017,-0.019766824,0.014715155,0.011982721,0.0045651635,0.023458943,-0.0010046692,-0.0031373003,-0.0006972704,0.0019043729,-0.018967088,-0.024311995,0.0011546199,0.007977373,-0.004755101,-0.010016702,-0.02780418,-0.004688456,0.013022379,-0.005484861,0.0017227661,-0.015394931,-0.028763862,-0.026684547,0.0030589928,-0.018513903,0.028363993,0.0044818576,-0.009270281,0.038920518,-0.016008062,0.0093902415,0.004815081,-0.021059733,0.01451522,-0.0051583014,0.023765508,-0.017874114,-0.016821127,-0.012522544,-0.0028390652,0.0040886537,0.020259995,-0.031216389,-0.014115352,-0.009176978,0.010303274,0.020313311,0.0064112223,-0.02235264,-0.022872468,0.0052449396,0.0005723116,0.0037321046,0.016807798,-0.018527232,-0.009303603,0.0024858483,-0.0012662497,-0.007110992,0.011976057,-0.007790768,-0.042999174,-0.006727785,-0.011829439,0.007024354,0.005278262,-0.017740825,-0.0041519664,0.0085905045,0.027750863,-0.038387362,0.024391968,0.00087721116,0.010509873,-0.00038508154,-0.006857742,0.0183273,-0.0037054466,0.015461575,0.0017394272,-0.0017944091,0.014181997,-0.0052682655,0.009023695,0.00719763,-0.013522214,0.0034422,0.014941746,-0.0016711164,-0.025298337,-0.017634194,0.0058714002,-0.005321581,0.017834127,0.0110630235,-0.03369557,0.029190388,-0.008943722,0.009363583,-0.0034222065,-0.026111402,-0.007037683,-0.006561173,0.02473852,-0.007084334,-0.010110005,-0.008577175,0.0030439978,-0.022712521,0.0054582027,-0.0012620845,-0.0011954397,-0.015741484,0.0129557345,-0.00042111133,0.00846388,0.008930393,0.016487904,0.010469886,-0.007917393,-0.011762793,-0.0214596,0.000917198,0.021672864,0.010269952,-0.007737452,-0.010243294,-0.0067244526,-0.015488233,-0.021552904,0.017127695,0.011109675,0.038067464,0.00871713,-0.0025591573,0.021312982,-0.006237946,0.034628596,-0.0045251767,0.008357248,0.020686522,0.0010696478,0.0076708077,0.03772091,-0.018700508,-0.0020676525,-0.008923728,-0.023298996,0.018233996,-0.010256623,0.0017860786,0.009796774,-0.00897038,-0.01269582,-0.018527232,0.009190307,-0.02372552,-0.042119466,0.008097334,-0.0066778013,-0.021046404,0.0019593548,0.011083017,-0.0016028056,0.012662497,-0.000059095124,0.0071043274,-0.014675168,0.024831824,-0.053582355,0.038387362,0.0005698124,0.015954746,0.021552904,0.031589597,-0.009230294,-0.0006147976,0.002625802,-0.011749465,-0.034362018,-0.0067844326,-0.018793812,0.011442899,-0.008743787,0.017474247,-0.021619547,0.01831397,-0.009037024,-0.0057247817,-0.02728435,0.010363255,0.034415334,-0.024032086,-0.0020126705,-0.0045518344,-0.019353628,-0.018340627,-0.03129636,-0.0034038792,-0.006321252,-0.0016161345,0.033642255,-0.000056075285,-0.005005019,0.004571828,-0.0024075406,-0.00010215386,0.0098634185,0.1980148,-0.003825407,-0.025191706,0.035161756,0.005358236,0.025111731,0.023485601,0.0023342315,-0.011882754,0.018287312,-0.0068910643,0.003912045,0.009243623,-0.001355387,-0.028603915,-0.012802451,-0.030150073,-0.014795128,-0.028630573,-0.0013487226,0.002667455,0.00985009,-0.0033972147,-0.021486258,0.009503538,-0.017847456,0.013062365,-0.014341944,0.005078328,0.025165047,-0.015594865,-0.025924796,-0.0018177348,0.010996379,-0.02993681,0.007324255,0.014475234,-0.028577257,0.005494857,0.00011725306,-0.013315615,0.015941417,0.009376912,0.0025158382,0.008743787,0.023832154,-0.008084005,-0.014195326,-0.008823762,0.0033455652,-0.032362677,-0.021552904,-0.0056081535,0.023298996,-0.025444955,0.0097301295,0.009736794,0.015274971,-0.0012937407,-0.018087378,-0.0039387033,0.008637156,-0.011189649,-0.00023846315,-0.011582852,0.0066411467,-0.018220667,0.0060846633,0.0376676,-0.002709108,0.0072776037,0.0034188742,-0.010249958,-0.0007747449,-0.00795738,-0.022192692,0.03910712,0.032122757,0.023898797,0.0076241563,-0.007397564,-0.003655463,0.011442899,-0.014115352,-0.00505167,-0.031163072,0.030336678,-0.006857742,-0.022259338,0.004048667,0.02072651,0.0030156737,-0.0042119464,0.00041861215,-0.005731446,0.011103011,0.013822115,0.021512916,0.009216965,-0.006537847,-0.027057758,-0.04054665,0.010403241,-0.0056281467,-0.005701456,-0.002709108,-0.00745088,-0.0024841821,0.009356919,-0.022659205,0.004061996,-0.013175662,0.017074378,-0.006141311,-0.014541878,0.02993681,-0.00028448965,-0.025271678,0.011689484,-0.014528549,0.004398552,-0.017274313,0.0045751603,0.012455898,0.004121976,-0.025458284,-0.006744446,0.011822774,-0.015035049,-0.03257594,0.014675168,-0.0039187097,0.019726837,-0.0047251107,0.0022825818,0.011829439,0.005391558,-0.016781142,-0.0058747325,0.010309938,-0.013049036,0.01186276,-0.0011246296,0.0062112883,0.0028190718,-0.021739509,0.009883412,-0.0073175905,-0.012715813,-0.017181009,-0.016607866,-0.042492677,-0.0014478565,-0.01794076,0.012302616,-0.015194997,-0.04433207,-0.020606548,0.009696807,0.010303274,-0.01694109,-0.004018677,0.019353628,-0.001991011,0.000058938927,0.010536531,-0.17274313,0.010143327,0.014235313,-0.024152048,0.025684876,-0.0012504216,0.036601283,-0.003698782,0.0007310093,0.004165295,-0.0029157067,0.017101036,-0.046891227,-0.017460918,0.022965772,0.020233337,-0.024072073,0.017220996,0.009370248,0.0010363255,0.0194336,-0.019606877,0.01818068,-0.020819811,0.007410893,0.0019326969,0.017887443,0.006651143,0.00067394477,-0.011889419,-0.025058415,-0.008543854,0.021579562,0.0047484366,0.014062037,0.0075508473,-0.009510202,-0.009143656,0.0046817916,0.013982063,-0.0027990784,0.011782787,0.014541878,-0.015701497,-0.029350337,0.021979429,0.01332228,-0.026244693,-0.0123492675,-0.003895384,0.0071576433,-0.035454992,-0.00046984528,0.0033522295,0.039347045,0.0005119148,0.00476843,-0.012995721,0.0024042083,-0.006931051,-0.014461905,-0.0127558,0.0034555288,-0.0074842023,-0.030256703,-0.007057676,-0.00807734,0.007804097,-0.006957709,0.017181009,-0.034575284,-0.008603834,-0.005008351,-0.015834786,0.02943031,0.016861115,-0.0050849924,0.014235313,0.0051449724,0.0025924798,-0.0025741523,0.04289254,-0.002104307,0.012969063,-0.008310596,0.00423194,0.0074975314,0.0018810473,-0.014248641,-0.024725191,0.0151016945,-0.017527562,0.0018727167,0.0002830318,0.015168339,0.0144219175,-0.004048667,-0.004358565,0.011836103,-0.010343261,-0.005911387,0.0022825818,0.0073175905,0.00403867,0.013188991,0.03334902,0.006111321,0.008597169,0.030123414,-0.015474904,0.0017877447,-0.024551915,0.013155668,0.023525586,-0.0255116,0.017220996,0.004358565,-0.00934359,0.0099967085,0.011162991,0.03092315,-0.021046404,-0.015514892,0.0011946067,-0.01816735,0.010876419,-0.10124666,-0.03550831,0.0056348112,0.013942076,0.005951374,0.020419942,-0.006857742,-0.020873128,-0.021259667,0.0137554705,0.0057880944,-0.029163731,-0.018767154,-0.021392956,0.030896494,-0.005494857,-0.0027307675,-0.006801094,-0.014821786,0.021392956,-0.0018110704,-0.0018843795,-0.012362596,-0.0072176233,-0.017194338,-0.018713837,-0.024272008,0.03801415,0.00015880188,0.0044951867,-0.028630573,-0.0014070367,-0.00916365,-0.026537929,-0.009576847,-0.013995391,-0.0077107945,0.0050016865,0.00578143,-0.04467862,0.008363913,0.010136662,-0.0006268769,-0.006591163,0.015341615,-0.027377652,-0.00093136,0.029243704,-0.020886457,-0.01041657,-0.02424535,0.005291591,-0.02980352,-0.009190307,0.019460259,-0.0041286405,0.004801752,0.0011787785,-0.001257086,-0.011216307,-0.013395589,0.00088137644,-0.0051616337,0.03876057,-0.0033455652,0.00075850025,-0.006951045,-0.0062112883,0.018140694,-0.006351242,-0.008263946,0.018154023,-0.012189319,0.0075508473,-0.044358727,-0.0040153447,0.0093302615,-0.010636497,0.032789204,-0.005264933,-0.014235313,-0.018393943,0.007297597,-0.016114693,0.015021721,0.020033404,0.0137688,0.0011046362,0.010616505,-0.0039453674,0.012109346,0.021099718,-0.0072842683,-0.019153694,-0.003768759,0.039320387,-0.006747778,-0.0016852784,0.018154023,0.0010963057,-0.015035049,-0.021033075,-0.04345236,0.017287642,0.016341286,-0.008610498,0.00236922,0.009290274,0.028950468,-0.014475234,-0.0035654926,0.015434918,-0.03372223,0.004501851,-0.012929076,-0.008483873,-0.0044685286,-0.0102233,0.01615468,0.0022792495,0.010876419,-0.0059647025,0.01895376,-0.0069976957,-0.0042952523,0.017207667,-0.00036133936,0.0085905045,0.008084005,0.03129636,-0.016994404,-0.014915089,0.020100048,-0.012009379,-0.006684466,0.01306903,0.00015765642,-0.00530492,0.0005277429,0.015421589,0.015528221,0.032202728,-0.003485519,-0.0014286962,0.033908837,0.001367883,0.010509873,0.025271678,-0.020993087,0.019846799,0.006897729,-0.010216636,-0.00725761,0.01818068,-0.028443968,-0.011242964,-0.014435247,-0.013688826,0.006101324,-0.0022509254,0.013848773,-0.0019077052,0.017181009,0.03422873,0.005324913,-0.0035188415,0.014128681,-0.004898387,0.005038341,0.0012320944,-0.005561502,-0.017847456,0.0008538855,-0.0047884234,0.011849431,0.015421589,-0.013942076,0.0029790192,-0.013702155,0.0001199605,-0.024431955,0.019926772,0.022179363,-0.016487904,-0.03964028,0.0050849924,0.017487574,0.022792496,0.0012504216,0.004048667,-0.00997005,0.0076041627,-0.014328616,-0.020259995,0.0005598157,-0.010469886,0.0016852784,0.01716768,-0.008990373,-0.001987679,0.026417969,0.023792166,0.0046917885,-0.0071909656,-0.00032051947,-0.023259008,-0.009170313,0.02071318,-0.03156294,-0.030869836,-0.006324584,0.013795458,-0.00047151142,0.016874444,0.00947688,0.00985009,-0.029883493,0.024205362,-0.013522214,-0.015075036,-0.030603256,0.029270362,0.010503208,0.021539574,0.01743426,-0.023898797,0.022019416,-0.0068777353,0.027857494,-0.021259667,0.0025758184,0.006197959,0.006447877,-0.00025200035,-0.004941706,-0.021246338,-0.005504854,-0.008390571,-0.0097301295,0.027244363,-0.04446536,0.05216949,0.010243294,-0.016008062,0.0122493,-0.0199401,0.009077012,0.019753495,0.006431216,-0.037960835,-0.027377652,0.016381273,-0.0038620618,0.022512587,-0.010996379,-0.0015211658,-0.0102233,0.007071005,0.008230623,-0.009490209,-0.010083347,0.024431955,0.002427534,0.02828402,0.0035721571,-0.022192692,-0.011882754,0.010056688,0.0011904413,-0.01426197,-0.017500903,-0.00010985966,0.005591492,-0.0077707744,-0.012049366,0.011869425,0.00858384,-0.024698535,-0.030283362,0.020140035,0.011949399,-0.013968734,0.042732596,-0.011649498,-0.011982721,-0.016967745,-0.0060913274,-0.007130985,-0.013109017,-0.009710136],
      "numCandidates": 150,
      "limit": 10
    }
  },
  {
    "$project": {
      "_id": 0,
      "plot": 1,
      "title": 1,
      "score": { $meta: "vectorSearchScore" }
    }
  }
]

```

```javascript
{
    "score": 0.9332506656646729,
    "plot": "A reporter, learning of time travelers visiting 20th century disasters, tries to change the history they know by averting upcoming disasters.",
    "title": "Thrill Seekers"
}
{
    "plot": "At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.",
    "title": "About Time",
    "score": 0.9312690496444702
}
{
    "plot": "Hoping to alter the events of the past, a 19th century inventor instead travels 800,000 years into the future, where he finds humankind divided into two warring races.",
    "title": "The Time Machine",
    "score": 0.929530143737793
}
{
    "plot": "After using his mother\'s newly built time machine, Dolf gets stuck involuntary in the year 1212. He ends up in a children\'s crusade where he confronts his new friends with modern techniques...",
    "title": "Crusade in Jeans",
    "score": 0.9290417432785034
}
{
    "title": "Timecop",
    "score": 0.9283161759376526,
    "plot": "An officer for a security agency that regulates time travel, must fend for his life against a shady politician who has a tie to his past."
}
{
    "plot": "A time-travel experiment in which a robot probe is sent from the year 2073 to the year 1973 goes terribly wrong thrusting one of the project scientists, a man named Nicholas Sinclair into a...",
    "title": "A.P.E.X.",
    "score": 0.9266218543052673
}
{
    "plot": "Agent J travels in time to M.I.B.\'s early days in 1969 to stop an alien from assassinating his friend Agent K and changing history.",
    "title": "Men in Black 3",
    "score": 0.9258455038070679
}
{
    "score": 0.9240515828132629,
    "plot": "Bound by a shared destiny, a teen bursting with scientific curiosity and a former boy-genius inventor embark on a mission to unearth the secrets of a place somewhere in time and space that exists in their collective memory.",
    "title": "Tomorrowland"
}
{
    "plot": "With the help of his uncle, a man travels to the future to try and bring his girlfriend back to life.",
    "title": "Love Story 2050",
    "score": 0.923175573348999
}
{
    "plot": "A dimension-traveling wizard gets stuck in the 21st century because cell-phone radiation interferes with his magic. With his home world on the brink of war, he seeks help from a jaded ...",
    "title": "The Portal",
    "score": 0.9228089451789856
}

```

This query uses the `$vectorSearch` stage to:

- Compare vector embeddings of the search term against vector embeddings of movie plots in the `plot_embedding` field of the `sample_mflix.embedded_movies` collection.

- Consider up to the 150 most similar movie plots and return the top 10 results.

It uses the `$project` stage to:

- Only include the movie `plot` and `title` fields in the results.

- Add a `score` field to show the relevance of each result to the search term.

The Pipeline Output pane displays the results of your query.

To learn more about this pipeline stage, see Run Vector Search Queries.

</Tab>

<Tab name="MongoDB Shell">

### Construct and run your vector search query.

- Copy and paste the following sample query into your terminal and then run it using `mongosh`. `mongosh` might lag slightly when you paste in the query due to the number of characters in the vector embedding.

  This query searches for documents that include text in the `plot` field that is semantically related to the term "time travel".

```json
db.embedded_movies.aggregate([
  {
    "$vectorSearch": {
      "index": "vector_index",
      "path": "plot_embedding",
      "queryVector": [-0.0016261312,-0.028070757,-0.011342932,-0.012775794,-0.0027440966,0.008683807,-0.02575152,-0.02020668,-0.010283281,-0.0041719596,0.021392956,0.028657231,-0.006634482,0.007490867,0.018593878,0.0038187427,0.029590257,-0.01451522,0.016061379,0.00008528442,-0.008943722,0.01627464,0.024311995,-0.025911469,0.00022596726,-0.008863748,0.008823762,-0.034921836,0.007910728,-0.01515501,0.035801545,-0.0035688248,-0.020299982,-0.03145631,-0.032256044,-0.028763862,-0.0071576433,-0.012769129,0.012322609,-0.006621153,0.010583182,0.024085402,-0.001623632,0.007864078,-0.021406285,0.002554159,0.012229307,-0.011762793,0.0051682983,0.0048484034,0.018087378,0.024325324,-0.037694257,-0.026537929,-0.008803768,-0.017767483,-0.012642504,-0.0062712682,0.0009771782,-0.010409906,0.017754154,-0.004671795,-0.030469967,0.008477209,-0.005218282,-0.0058480743,-0.020153364,-0.0032805866,0.004248601,0.0051449724,0.006791097,0.007650814,0.003458861,-0.0031223053,-0.01932697,-0.033615597,0.00745088,0.006321252,-0.0038154104,0.014555207,0.027697546,-0.02828402,0.0066711367,0.0077107945,0.01794076,0.011349596,-0.0052715978,0.014755142,-0.019753495,-0.011156326,0.011202978,0.022126047,0.00846388,0.030549942,-0.0041386373,0.018847128,-0.00033655585,0.024925126,-0.003555496,-0.019300312,0.010749794,0.0075308536,-0.018287312,-0.016567878,-0.012869096,-0.015528221,0.0078107617,-0.011156326,0.013522214,-0.020646535,-0.01211601,0.055928253,0.011596181,-0.017247654,0.0005939711,-0.026977783,-0.003942035,-0.009583511,-0.0055248477,-0.028737204,0.023179034,0.003995351,0.0219661,-0.008470545,0.023392297,0.010469886,-0.015874773,0.007890735,-0.009690142,-0.00024970944,0.012775794,0.0114762215,0.013422247,0.010429899,-0.03686786,-0.006717788,-0.027484283,0.011556195,-0.036068123,-0.013915418,-0.0016327957,0.0151016945,-0.020473259,0.004671795,-0.012555866,0.0209531,0.01982014,0.024485271,0.0105431955,-0.005178295,0.033162415,-0.013795458,0.007150979,0.010243294,0.005644808,0.017260984,-0.0045618312,0.0024725192,0.004305249,-0.008197301,0.0014203656,0.0018460588,0.005015015,-0.011142998,0.01439526,0.022965772,0.02552493,0.007757446,-0.0019726837,0.009503538,-0.032042783,0.008403899,-0.04609149,0.013808787,0.011749465,0.036388017,0.016314628,0.021939443,-0.0250051,-0.017354285,-0.012962398,0.00006107364,0.019113706,0.03081652,-0.018114036,-0.0084572155,0.009643491,-0.0034721901,0.0072642746,-0.0090636825,0.01642126,0.013428912,0.027724205,0.0071243206,-0.6858542,-0.031029783,-0.014595194,-0.011449563,0.017514233,0.01743426,0.009950057,0.0029706885,-0.015714826,-0.001806072,0.011856096,0.026444625,-0.0010663156,-0.006474535,0.0016161345,-0.020313311,0.0148351155,-0.0018393943,0.0057347785,0.018300641,-0.018647194,0.03345565,-0.008070676,0.0071443142,0.014301958,0.0044818576,0.003838736,-0.007350913,-0.024525259,-0.001142124,-0.018620536,0.017247654,0.007037683,0.010236629,0.06046009,0.0138887605,-0.012122675,0.037694257,0.0055081863,0.042492677,0.00021784494,-0.011656162,0.010276617,0.022325981,0.005984696,-0.009496873,0.013382261,-0.0010563189,0.0026507939,-0.041639622,0.008637156,0.026471283,-0.008403899,0.024858482,-0.00066686375,-0.0016252982,0.027590916,0.0051449724,0.0058647357,-0.008743787,-0.014968405,0.027724205,-0.011596181,0.0047650975,-0.015381602,0.0043718936,0.002159289,0.035908177,-0.008243952,-0.030443309,0.027564257,0.042625964,-0.0033688906,0.01843393,0.019087048,0.024578573,0.03268257,-0.015608194,-0.014128681,-0.0033538956,-0.0028757197,-0.004121976,-0.032389335,0.0034322033,0.058807302,0.010943064,-0.030523283,0.008903735,0.017500903,0.00871713,-0.0029406983,0.013995391,-0.03132302,-0.019660193,-0.00770413,-0.0038853872,0.0015894766,-0.0015294964,-0.006251275,-0.021099718,-0.010256623,-0.008863748,0.028550599,0.02020668,-0.0012962399,-0.003415542,-0.0022509254,0.0119360695,0.027590916,-0.046971202,-0.0015194997,-0.022405956,0.0016677842,-0.00018535563,-0.015421589,-0.031802863,0.03814744,0.0065411795,0.016567878,-0.015621523,0.022899127,-0.011076353,0.02841731,-0.002679118,-0.002342562,0.015341615,0.01804739,-0.020566562,-0.012989056,-0.002990682,0.01643459,0.00042527664,0.008243952,-0.013715484,-0.004835075,-0.009803439,0.03129636,-0.021432944,0.0012087687,-0.015741484,-0.0052016205,0.00080890034,-0.01755422,0.004811749,-0.017967418,-0.026684547,-0.014128681,0.0041386373,-0.013742141,-0.010056688,-0.013268964,-0.0110630235,-0.028337335,0.015981404,-0.00997005,-0.02424535,-0.013968734,-0.028310679,-0.027750863,-0.020699851,0.02235264,0.001057985,0.00081639783,-0.0099367285,0.013522214,-0.012016043,-0.00086471526,0.013568865,0.0019376953,-0.019020405,0.017460918,-0.023045745,0.008503866,0.0064678704,-0.011509543,0.018727167,-0.003372223,-0.0028690554,-0.0027024434,-0.011902748,-0.012182655,-0.015714826,-0.0098634185,0.00593138,0.018753825,0.0010146659,0.013029044,0.0003521757,-0.017620865,0.04102649,0.00552818,0.024485271,-0.009630162,-0.015608194,0.0006718621,-0.0008418062,0.012395918,0.0057980907,0.016221326,0.010616505,0.004838407,-0.012402583,0.019900113,-0.0034521967,0.000247002,-0.03153628,0.0011038032,-0.020819811,0.016234655,-0.00330058,-0.0032289368,0.00078973995,-0.021952773,-0.022459272,0.03118973,0.03673457,-0.021472929,0.0072109587,-0.015075036,0.004855068,-0.0008151483,0.0069643734,0.010023367,-0.010276617,-0.023019087,0.0068244194,-0.0012520878,-0.0015086699,0.022046074,-0.034148756,-0.0022192693,0.002427534,-0.0027124402,0.0060346797,0.015461575,0.0137554705,0.009230294,-0.009583511,0.032629255,0.015994733,-0.019167023,-0.009203636,0.03393549,-0.017274313,-0.012042701,-0.0009930064,0.026777849,-0.013582194,-0.0027590916,-0.017594207,-0.026804507,-0.0014236979,-0.022032745,0.0091236625,-0.0042419364,-0.00858384,-0.0033905501,-0.020739838,0.016821127,0.022539245,0.015381602,0.015141681,0.028817179,-0.019726837,-0.0051283115,-0.011489551,-0.013208984,-0.0047017853,-0.0072309524,0.01767418,0.0025658219,-0.010323267,0.012609182,-0.028097415,0.026871152,-0.010276617,0.021912785,0.0022542577,0.005124979,-0.0019710176,0.004518512,-0.040360045,0.010969722,-0.0031539614,-0.020366628,-0.025778178,-0.0110030435,-0.016221326,0.0036587953,0.016207997,0.003007343,-0.0032555948,0.0044052163,-0.022046074,-0.0008822095,-0.009363583,0.028230704,-0.024538586,0.0029840174,0.0016044717,-0.014181997,0.031349678,-0.014381931,-0.027750863,0.02613806,0.0004136138,-0.005748107,-0.01868718,-0.0010138329,0.0054348772,0.010703143,-0.003682121,0.0030856507,-0.004275259,-0.010403241,0.021113047,-0.022685863,-0.023032416,0.031429652,0.001792743,-0.005644808,-0.011842767,-0.04078657,-0.0026874484,0.06915057,-0.00056939584,-0.013995391,0.010703143,-0.013728813,-0.022939114,-0.015261642,-0.022485929,0.016807798,0.007964044,0.0144219175,0.016821127,0.0076241563,0.005461535,-0.013248971,0.015301628,0.0085171955,-0.004318578,0.011136333,-0.0059047225,-0.010249958,-0.018207338,0.024645219,0.021752838,0.0007614159,-0.013648839,0.01111634,-0.010503208,-0.0038487327,-0.008203966,-0.00397869,0.0029740208,0.008530525,0.005261601,0.01642126,-0.0038753906,-0.013222313,0.026537929,0.024671877,-0.043505676,0.014195326,0.024778508,0.0056914594,-0.025951454,0.017620865,-0.0021359634,0.008643821,0.021299653,0.0041686273,-0.009017031,0.04044002,0.024378639,-0.027777521,-0.014208655,0.0028623908,0.042119466,0.005801423,-0.028124074,-0.03129636,0.022139376,-0.022179363,-0.04067994,0.013688826,0.013328944,0.0046184794,-0.02828402,-0.0063412455,-0.0046184794,-0.011756129,-0.010383247,-0.0018543894,-0.0018593877,-0.00052024535,0.004815081,0.014781799,0.018007403,0.01306903,-0.020433271,0.009043689,0.033189073,-0.006844413,-0.019766824,-0.018767154,0.00533491,-0.0024575242,0.018727167,0.0058080875,-0.013835444,0.0040719924,0.004881726,0.012029372,0.005664801,0.03193615,0.0058047553,0.002695779,0.009290274,0.02361889,0.017834127,0.0049017193,-0.0036388019,0.010776452,-0.019793482,0.0067777685,-0.014208655,-0.024911797,0.002385881,0.0034988478,0.020899786,-0.0025858153,-0.011849431,0.033189073,-0.021312982,0.024965113,-0.014635181,0.014048708,-0.0035921505,-0.003347231,0.030869836,-0.0017161017,-0.0061346465,0.009203636,-0.025165047,0.0068510775,0.021499587,0.013782129,-0.0024475274,-0.0051149824,-0.024445284,0.006167969,0.0068844,-0.00076183246,0.030150073,-0.0055948244,-0.011162991,-0.02057989,-0.009703471,-0.020646535,0.008004031,0.0066378145,-0.019900113,-0.012169327,-0.01439526,0.0044252095,-0.004018677,0.014621852,-0.025085073,-0.013715484,-0.017980747,0.0071043274,0.011456228,-0.01010334,-0.0035321703,-0.03801415,-0.012036037,-0.0028990454,-0.05419549,-0.024058744,-0.024272008,0.015221654,0.027964126,0.03182952,-0.015354944,0.004855068,0.011522872,0.004771762,0.0027874154,0.023405626,0.0004242353,-0.03132302,0.007057676,0.008763781,-0.0027057757,0.023005757,-0.0071176565,-0.005238275,0.029110415,-0.010989714,0.013728813,-0.009630162,-0.029137073,-0.0049317093,-0.0008630492,-0.015248313,0.0043219104,-0.0055681667,-0.013175662,0.029723546,0.025098402,0.012849103,-0.0009996708,0.03118973,-0.0021709518,0.0260181,-0.020526575,0.028097415,-0.016141351,0.010509873,-0.022965772,0.002865723,0.0020493253,0.0020509914,-0.0041419696,-0.00039695262,0.017287642,0.0038987163,0.014795128,-0.014661839,-0.008950386,0.004431874,-0.009383577,0.0012604183,-0.023019087,0.0029273694,-0.033135757,0.009176978,-0.011023037,-0.002102641,0.02663123,-0.03849399,-0.0044152127,0.0004527676,-0.0026924468,0.02828402,0.017727496,0.035135098,0.02728435,-0.005348239,-0.001467017,-0.019766824,0.014715155,0.011982721,0.0045651635,0.023458943,-0.0010046692,-0.0031373003,-0.0006972704,0.0019043729,-0.018967088,-0.024311995,0.0011546199,0.007977373,-0.004755101,-0.010016702,-0.02780418,-0.004688456,0.013022379,-0.005484861,0.0017227661,-0.015394931,-0.028763862,-0.026684547,0.0030589928,-0.018513903,0.028363993,0.0044818576,-0.009270281,0.038920518,-0.016008062,0.0093902415,0.004815081,-0.021059733,0.01451522,-0.0051583014,0.023765508,-0.017874114,-0.016821127,-0.012522544,-0.0028390652,0.0040886537,0.020259995,-0.031216389,-0.014115352,-0.009176978,0.010303274,0.020313311,0.0064112223,-0.02235264,-0.022872468,0.0052449396,0.0005723116,0.0037321046,0.016807798,-0.018527232,-0.009303603,0.0024858483,-0.0012662497,-0.007110992,0.011976057,-0.007790768,-0.042999174,-0.006727785,-0.011829439,0.007024354,0.005278262,-0.017740825,-0.0041519664,0.0085905045,0.027750863,-0.038387362,0.024391968,0.00087721116,0.010509873,-0.00038508154,-0.006857742,0.0183273,-0.0037054466,0.015461575,0.0017394272,-0.0017944091,0.014181997,-0.0052682655,0.009023695,0.00719763,-0.013522214,0.0034422,0.014941746,-0.0016711164,-0.025298337,-0.017634194,0.0058714002,-0.005321581,0.017834127,0.0110630235,-0.03369557,0.029190388,-0.008943722,0.009363583,-0.0034222065,-0.026111402,-0.007037683,-0.006561173,0.02473852,-0.007084334,-0.010110005,-0.008577175,0.0030439978,-0.022712521,0.0054582027,-0.0012620845,-0.0011954397,-0.015741484,0.0129557345,-0.00042111133,0.00846388,0.008930393,0.016487904,0.010469886,-0.007917393,-0.011762793,-0.0214596,0.000917198,0.021672864,0.010269952,-0.007737452,-0.010243294,-0.0067244526,-0.015488233,-0.021552904,0.017127695,0.011109675,0.038067464,0.00871713,-0.0025591573,0.021312982,-0.006237946,0.034628596,-0.0045251767,0.008357248,0.020686522,0.0010696478,0.0076708077,0.03772091,-0.018700508,-0.0020676525,-0.008923728,-0.023298996,0.018233996,-0.010256623,0.0017860786,0.009796774,-0.00897038,-0.01269582,-0.018527232,0.009190307,-0.02372552,-0.042119466,0.008097334,-0.0066778013,-0.021046404,0.0019593548,0.011083017,-0.0016028056,0.012662497,-0.000059095124,0.0071043274,-0.014675168,0.024831824,-0.053582355,0.038387362,0.0005698124,0.015954746,0.021552904,0.031589597,-0.009230294,-0.0006147976,0.002625802,-0.011749465,-0.034362018,-0.0067844326,-0.018793812,0.011442899,-0.008743787,0.017474247,-0.021619547,0.01831397,-0.009037024,-0.0057247817,-0.02728435,0.010363255,0.034415334,-0.024032086,-0.0020126705,-0.0045518344,-0.019353628,-0.018340627,-0.03129636,-0.0034038792,-0.006321252,-0.0016161345,0.033642255,-0.000056075285,-0.005005019,0.004571828,-0.0024075406,-0.00010215386,0.0098634185,0.1980148,-0.003825407,-0.025191706,0.035161756,0.005358236,0.025111731,0.023485601,0.0023342315,-0.011882754,0.018287312,-0.0068910643,0.003912045,0.009243623,-0.001355387,-0.028603915,-0.012802451,-0.030150073,-0.014795128,-0.028630573,-0.0013487226,0.002667455,0.00985009,-0.0033972147,-0.021486258,0.009503538,-0.017847456,0.013062365,-0.014341944,0.005078328,0.025165047,-0.015594865,-0.025924796,-0.0018177348,0.010996379,-0.02993681,0.007324255,0.014475234,-0.028577257,0.005494857,0.00011725306,-0.013315615,0.015941417,0.009376912,0.0025158382,0.008743787,0.023832154,-0.008084005,-0.014195326,-0.008823762,0.0033455652,-0.032362677,-0.021552904,-0.0056081535,0.023298996,-0.025444955,0.0097301295,0.009736794,0.015274971,-0.0012937407,-0.018087378,-0.0039387033,0.008637156,-0.011189649,-0.00023846315,-0.011582852,0.0066411467,-0.018220667,0.0060846633,0.0376676,-0.002709108,0.0072776037,0.0034188742,-0.010249958,-0.0007747449,-0.00795738,-0.022192692,0.03910712,0.032122757,0.023898797,0.0076241563,-0.007397564,-0.003655463,0.011442899,-0.014115352,-0.00505167,-0.031163072,0.030336678,-0.006857742,-0.022259338,0.004048667,0.02072651,0.0030156737,-0.0042119464,0.00041861215,-0.005731446,0.011103011,0.013822115,0.021512916,0.009216965,-0.006537847,-0.027057758,-0.04054665,0.010403241,-0.0056281467,-0.005701456,-0.002709108,-0.00745088,-0.0024841821,0.009356919,-0.022659205,0.004061996,-0.013175662,0.017074378,-0.006141311,-0.014541878,0.02993681,-0.00028448965,-0.025271678,0.011689484,-0.014528549,0.004398552,-0.017274313,0.0045751603,0.012455898,0.004121976,-0.025458284,-0.006744446,0.011822774,-0.015035049,-0.03257594,0.014675168,-0.0039187097,0.019726837,-0.0047251107,0.0022825818,0.011829439,0.005391558,-0.016781142,-0.0058747325,0.010309938,-0.013049036,0.01186276,-0.0011246296,0.0062112883,0.0028190718,-0.021739509,0.009883412,-0.0073175905,-0.012715813,-0.017181009,-0.016607866,-0.042492677,-0.0014478565,-0.01794076,0.012302616,-0.015194997,-0.04433207,-0.020606548,0.009696807,0.010303274,-0.01694109,-0.004018677,0.019353628,-0.001991011,0.000058938927,0.010536531,-0.17274313,0.010143327,0.014235313,-0.024152048,0.025684876,-0.0012504216,0.036601283,-0.003698782,0.0007310093,0.004165295,-0.0029157067,0.017101036,-0.046891227,-0.017460918,0.022965772,0.020233337,-0.024072073,0.017220996,0.009370248,0.0010363255,0.0194336,-0.019606877,0.01818068,-0.020819811,0.007410893,0.0019326969,0.017887443,0.006651143,0.00067394477,-0.011889419,-0.025058415,-0.008543854,0.021579562,0.0047484366,0.014062037,0.0075508473,-0.009510202,-0.009143656,0.0046817916,0.013982063,-0.0027990784,0.011782787,0.014541878,-0.015701497,-0.029350337,0.021979429,0.01332228,-0.026244693,-0.0123492675,-0.003895384,0.0071576433,-0.035454992,-0.00046984528,0.0033522295,0.039347045,0.0005119148,0.00476843,-0.012995721,0.0024042083,-0.006931051,-0.014461905,-0.0127558,0.0034555288,-0.0074842023,-0.030256703,-0.007057676,-0.00807734,0.007804097,-0.006957709,0.017181009,-0.034575284,-0.008603834,-0.005008351,-0.015834786,0.02943031,0.016861115,-0.0050849924,0.014235313,0.0051449724,0.0025924798,-0.0025741523,0.04289254,-0.002104307,0.012969063,-0.008310596,0.00423194,0.0074975314,0.0018810473,-0.014248641,-0.024725191,0.0151016945,-0.017527562,0.0018727167,0.0002830318,0.015168339,0.0144219175,-0.004048667,-0.004358565,0.011836103,-0.010343261,-0.005911387,0.0022825818,0.0073175905,0.00403867,0.013188991,0.03334902,0.006111321,0.008597169,0.030123414,-0.015474904,0.0017877447,-0.024551915,0.013155668,0.023525586,-0.0255116,0.017220996,0.004358565,-0.00934359,0.0099967085,0.011162991,0.03092315,-0.021046404,-0.015514892,0.0011946067,-0.01816735,0.010876419,-0.10124666,-0.03550831,0.0056348112,0.013942076,0.005951374,0.020419942,-0.006857742,-0.020873128,-0.021259667,0.0137554705,0.0057880944,-0.029163731,-0.018767154,-0.021392956,0.030896494,-0.005494857,-0.0027307675,-0.006801094,-0.014821786,0.021392956,-0.0018110704,-0.0018843795,-0.012362596,-0.0072176233,-0.017194338,-0.018713837,-0.024272008,0.03801415,0.00015880188,0.0044951867,-0.028630573,-0.0014070367,-0.00916365,-0.026537929,-0.009576847,-0.013995391,-0.0077107945,0.0050016865,0.00578143,-0.04467862,0.008363913,0.010136662,-0.0006268769,-0.006591163,0.015341615,-0.027377652,-0.00093136,0.029243704,-0.020886457,-0.01041657,-0.02424535,0.005291591,-0.02980352,-0.009190307,0.019460259,-0.0041286405,0.004801752,0.0011787785,-0.001257086,-0.011216307,-0.013395589,0.00088137644,-0.0051616337,0.03876057,-0.0033455652,0.00075850025,-0.006951045,-0.0062112883,0.018140694,-0.006351242,-0.008263946,0.018154023,-0.012189319,0.0075508473,-0.044358727,-0.0040153447,0.0093302615,-0.010636497,0.032789204,-0.005264933,-0.014235313,-0.018393943,0.007297597,-0.016114693,0.015021721,0.020033404,0.0137688,0.0011046362,0.010616505,-0.0039453674,0.012109346,0.021099718,-0.0072842683,-0.019153694,-0.003768759,0.039320387,-0.006747778,-0.0016852784,0.018154023,0.0010963057,-0.015035049,-0.021033075,-0.04345236,0.017287642,0.016341286,-0.008610498,0.00236922,0.009290274,0.028950468,-0.014475234,-0.0035654926,0.015434918,-0.03372223,0.004501851,-0.012929076,-0.008483873,-0.0044685286,-0.0102233,0.01615468,0.0022792495,0.010876419,-0.0059647025,0.01895376,-0.0069976957,-0.0042952523,0.017207667,-0.00036133936,0.0085905045,0.008084005,0.03129636,-0.016994404,-0.014915089,0.020100048,-0.012009379,-0.006684466,0.01306903,0.00015765642,-0.00530492,0.0005277429,0.015421589,0.015528221,0.032202728,-0.003485519,-0.0014286962,0.033908837,0.001367883,0.010509873,0.025271678,-0.020993087,0.019846799,0.006897729,-0.010216636,-0.00725761,0.01818068,-0.028443968,-0.011242964,-0.014435247,-0.013688826,0.006101324,-0.0022509254,0.013848773,-0.0019077052,0.017181009,0.03422873,0.005324913,-0.0035188415,0.014128681,-0.004898387,0.005038341,0.0012320944,-0.005561502,-0.017847456,0.0008538855,-0.0047884234,0.011849431,0.015421589,-0.013942076,0.0029790192,-0.013702155,0.0001199605,-0.024431955,0.019926772,0.022179363,-0.016487904,-0.03964028,0.0050849924,0.017487574,0.022792496,0.0012504216,0.004048667,-0.00997005,0.0076041627,-0.014328616,-0.020259995,0.0005598157,-0.010469886,0.0016852784,0.01716768,-0.008990373,-0.001987679,0.026417969,0.023792166,0.0046917885,-0.0071909656,-0.00032051947,-0.023259008,-0.009170313,0.02071318,-0.03156294,-0.030869836,-0.006324584,0.013795458,-0.00047151142,0.016874444,0.00947688,0.00985009,-0.029883493,0.024205362,-0.013522214,-0.015075036,-0.030603256,0.029270362,0.010503208,0.021539574,0.01743426,-0.023898797,0.022019416,-0.0068777353,0.027857494,-0.021259667,0.0025758184,0.006197959,0.006447877,-0.00025200035,-0.004941706,-0.021246338,-0.005504854,-0.008390571,-0.0097301295,0.027244363,-0.04446536,0.05216949,0.010243294,-0.016008062,0.0122493,-0.0199401,0.009077012,0.019753495,0.006431216,-0.037960835,-0.027377652,0.016381273,-0.0038620618,0.022512587,-0.010996379,-0.0015211658,-0.0102233,0.007071005,0.008230623,-0.009490209,-0.010083347,0.024431955,0.002427534,0.02828402,0.0035721571,-0.022192692,-0.011882754,0.010056688,0.0011904413,-0.01426197,-0.017500903,-0.00010985966,0.005591492,-0.0077707744,-0.012049366,0.011869425,0.00858384,-0.024698535,-0.030283362,0.020140035,0.011949399,-0.013968734,0.042732596,-0.011649498,-0.011982721,-0.016967745,-0.0060913274,-0.007130985,-0.013109017,-0.009710136],
      "numCandidates": 150,
      "limit": 10
    }
  },
  {
    "$project": {
      "_id": 0,
      "plot": 1,
      "title": 1,
      "score": { $meta: "vectorSearchScore" }
    }
  }
])

```

```js
[
  {
    plot: \'A reporter, learning of time travelers visiting 20th century disasters, tries to change the history they know by averting upcoming disasters.\',
    title: \'Thrill Seekers\',
    score: 0.7892671227455139
  },
  {
    plot: \'At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.\',
    title: \'About Time\',
    score: 0.7843604683876038
  },
  {
    plot: \'Hoping to alter the events of the past, a 19th century inventor instead travels 800,000 years into the future, where he finds humankind divided into two warring races.\',
    title: \'The Time Machine\',
    score: 0.7801066637039185
  },
  {
    plot: "After using his mother\'s newly built time machine, Dolf gets stuck involuntary in the year 1212. He ends up in a children\'s crusade where he confronts his new friends with modern techniques...",
    title: \'Crusade in Jeans\',
    score: 0.7789170742034912
  },
  {
    plot: \'An officer for a security agency that regulates time travel, must fend for his life against a shady politician who has a tie to his past.\',
    title: \'Timecop\',
    score: 0.7771612405776978
  },
  {
    plot: \'A time-travel experiment in which a robot probe is sent from the year 2073 to the year 1973 goes terribly wrong thrusting one of the project scientists, a man named Nicholas Sinclair into a...\',
    title: \'A.P.E.X.\',
    score: 0.7730885744094849
  },
  {
    plot: "Agent J travels in time to M.I.B.\'s early days in 1969 to stop an alien from assassinating his friend Agent K and changing history.",
    title: \'Men in Black 3\',
    score: 0.7712380886077881
  },
  {
    plot: \'Bound by a shared destiny, a teen bursting with scientific curiosity and a former boy-genius inventor embark on a mission to unearth the secrets of a place somewhere in time and space that exists in their collective memory.\',
    title: \'Tomorrowland\',
    score: 0.7669923901557922
  },
  {
    plot: \'With the help of his uncle, a man travels to the future to try and bring his girlfriend back to life.\',
    title: \'Love Story 2050\',
    score: 0.7649372816085815
  },
  {
    plot: \'A dimension-traveling wizard gets stuck in the 21st century because cell-phone radiation interferes with his magic. With his home world on the brink of war, he seeks help from a jaded ...\',
    title: \'The Portal\',
    score: 0.7640786170959473
  }
]
```

This query uses the `$vectorSearch` stage to:

- Compare vector embeddings of the search term against vector embeddings of movie plots in the `plot_embedding` field of the `sample_mflix.embedded_movies` collection.

- Consider up to the 150 most similar movie plots and return the top 10 results.

It uses the `$project` stage to:

- Only include the movie `plot` and `title` fields in the results.

- Add a `score` field to show the relevance of each result to the search term.

To learn more about this pipeline stage, see Run Vector Search Queries.

</Tab>

<Tab name="C">

### Construct your vector search query.

This query searches for documents that include text in the `plot` field that is semantically related to the term "time travel".

- Create a file named `atlas-vector-search-quick-start.c` and copy and paste the following sample query into the file:

  ```c
  #include <bson/bson.h>
  #include <mongoc/mongoc.h>
  #include <stdio.h>

  int main(void) {

      mongoc_client_t *client;
      mongoc_collection_t *collection;
      mongoc_cursor_t *cursor;
      bson_array_builder_t *builder;
      bson_t *pipeline;
      bson_t query_vector;
      bson_error_t error;
      const bson_t *doc;
      char *str;

      int arrSize = 1536; // This collection has a vector array of 1536 dimensions; depending on your vector embedding model, this mary vary
      double embeddings[] = {-0.0016261312,-0.028070757,-0.011342932,-0.012775794,-0.0027440966,0.008683807,-0.02575152,-0.02020668,-0.010283281,-0.0041719596,0.021392956,0.028657231,-0.006634482,0.007490867,0.018593878,0.0038187427,0.029590257,-0.01451522,0.016061379,0.00008528442,-0.008943722,0.01627464,0.024311995,-0.025911469,0.00022596726,-0.008863748,0.008823762,-0.034921836,0.007910728,-0.01515501,0.035801545,-0.0035688248,-0.020299982,-0.03145631,-0.032256044,-0.028763862,-0.0071576433,-0.012769129,0.012322609,-0.006621153,0.010583182,0.024085402,-0.001623632,0.007864078,-0.021406285,0.002554159,0.012229307,-0.011762793,0.0051682983,0.0048484034,0.018087378,0.024325324,-0.037694257,-0.026537929,-0.008803768,-0.017767483,-0.012642504,-0.0062712682,0.0009771782,-0.010409906,0.017754154,-0.004671795,-0.030469967,0.008477209,-0.005218282,-0.0058480743,-0.020153364,-0.0032805866,0.004248601,0.0051449724,0.006791097,0.007650814,0.003458861,-0.0031223053,-0.01932697,-0.033615597,0.00745088,0.006321252,-0.0038154104,0.014555207,0.027697546,-0.02828402,0.0066711367,0.0077107945,0.01794076,0.011349596,-0.0052715978,0.014755142,-0.019753495,-0.011156326,0.011202978,0.022126047,0.00846388,0.030549942,-0.0041386373,0.018847128,-0.00033655585,0.024925126,-0.003555496,-0.019300312,0.010749794,0.0075308536,-0.018287312,-0.016567878,-0.012869096,-0.015528221,0.0078107617,-0.011156326,0.013522214,-0.020646535,-0.01211601,0.055928253,0.011596181,-0.017247654,0.0005939711,-0.026977783,-0.003942035,-0.009583511,-0.0055248477,-0.028737204,0.023179034,0.003995351,0.0219661,-0.008470545,0.023392297,0.010469886,-0.015874773,0.007890735,-0.009690142,-0.00024970944,0.012775794,0.0114762215,0.013422247,0.010429899,-0.03686786,-0.006717788,-0.027484283,0.011556195,-0.036068123,-0.013915418,-0.0016327957,0.0151016945,-0.020473259,0.004671795,-0.012555866,0.0209531,0.01982014,0.024485271,0.0105431955,-0.005178295,0.033162415,-0.013795458,0.007150979,0.010243294,0.005644808,0.017260984,-0.0045618312,0.0024725192,0.004305249,-0.008197301,0.0014203656,0.0018460588,0.005015015,-0.011142998,0.01439526,0.022965772,0.02552493,0.007757446,-0.0019726837,0.009503538,-0.032042783,0.008403899,-0.04609149,0.013808787,0.011749465,0.036388017,0.016314628,0.021939443,-0.0250051,-0.017354285,-0.012962398,0.00006107364,0.019113706,0.03081652,-0.018114036,-0.0084572155,0.009643491,-0.0034721901,0.0072642746,-0.0090636825,0.01642126,0.013428912,0.027724205,0.0071243206,-0.6858542,-0.031029783,-0.014595194,-0.011449563,0.017514233,0.01743426,0.009950057,0.0029706885,-0.015714826,-0.001806072,0.011856096,0.026444625,-0.0010663156,-0.006474535,0.0016161345,-0.020313311,0.0148351155,-0.0018393943,0.0057347785,0.018300641,-0.018647194,0.03345565,-0.008070676,0.0071443142,0.014301958,0.0044818576,0.003838736,-0.007350913,-0.024525259,-0.001142124,-0.018620536,0.017247654,0.007037683,0.010236629,0.06046009,0.0138887605,-0.012122675,0.037694257,0.0055081863,0.042492677,0.00021784494,-0.011656162,0.010276617,0.022325981,0.005984696,-0.009496873,0.013382261,-0.0010563189,0.0026507939,-0.041639622,0.008637156,0.026471283,-0.008403899,0.024858482,-0.00066686375,-0.0016252982,0.027590916,0.0051449724,0.0058647357,-0.008743787,-0.014968405,0.027724205,-0.011596181,0.0047650975,-0.015381602,0.0043718936,0.002159289,0.035908177,-0.008243952,-0.030443309,0.027564257,0.042625964,-0.0033688906,0.01843393,0.019087048,0.024578573,0.03268257,-0.015608194,-0.014128681,-0.0033538956,-0.0028757197,-0.004121976,-0.032389335,0.0034322033,0.058807302,0.010943064,-0.030523283,0.008903735,0.017500903,0.00871713,-0.0029406983,0.013995391,-0.03132302,-0.019660193,-0.00770413,-0.0038853872,0.0015894766,-0.0015294964,-0.006251275,-0.021099718,-0.010256623,-0.008863748,0.028550599,0.02020668,-0.0012962399,-0.003415542,-0.0022509254,0.0119360695,0.027590916,-0.046971202,-0.0015194997,-0.022405956,0.0016677842,-0.00018535563,-0.015421589,-0.031802863,0.03814744,0.0065411795,0.016567878,-0.015621523,0.022899127,-0.011076353,0.02841731,-0.002679118,-0.002342562,0.015341615,0.01804739,-0.020566562,-0.012989056,-0.002990682,0.01643459,0.00042527664,0.008243952,-0.013715484,-0.004835075,-0.009803439,0.03129636,-0.021432944,0.0012087687,-0.015741484,-0.0052016205,0.00080890034,-0.01755422,0.004811749,-0.017967418,-0.026684547,-0.014128681,0.0041386373,-0.013742141,-0.010056688,-0.013268964,-0.0110630235,-0.028337335,0.015981404,-0.00997005,-0.02424535,-0.013968734,-0.028310679,-0.027750863,-0.020699851,0.02235264,0.001057985,0.00081639783,-0.0099367285,0.013522214,-0.012016043,-0.00086471526,0.013568865,0.0019376953,-0.019020405,0.017460918,-0.023045745,0.008503866,0.0064678704,-0.011509543,0.018727167,-0.003372223,-0.0028690554,-0.0027024434,-0.011902748,-0.012182655,-0.015714826,-0.0098634185,0.00593138,0.018753825,0.0010146659,0.013029044,0.0003521757,-0.017620865,0.04102649,0.00552818,0.024485271,-0.009630162,-0.015608194,0.0006718621,-0.0008418062,0.012395918,0.0057980907,0.016221326,0.010616505,0.004838407,-0.012402583,0.019900113,-0.0034521967,0.000247002,-0.03153628,0.0011038032,-0.020819811,0.016234655,-0.00330058,-0.0032289368,0.00078973995,-0.021952773,-0.022459272,0.03118973,0.03673457,-0.021472929,0.0072109587,-0.015075036,0.004855068,-0.0008151483,0.0069643734,0.010023367,-0.010276617,-0.023019087,0.0068244194,-0.0012520878,-0.0015086699,0.022046074,-0.034148756,-0.0022192693,0.002427534,-0.0027124402,0.0060346797,0.015461575,0.0137554705,0.009230294,-0.009583511,0.032629255,0.015994733,-0.019167023,-0.009203636,0.03393549,-0.017274313,-0.012042701,-0.0009930064,0.026777849,-0.013582194,-0.0027590916,-0.017594207,-0.026804507,-0.0014236979,-0.022032745,0.0091236625,-0.0042419364,-0.00858384,-0.0033905501,-0.020739838,0.016821127,0.022539245,0.015381602,0.015141681,0.028817179,-0.019726837,-0.0051283115,-0.011489551,-0.013208984,-0.0047017853,-0.0072309524,0.01767418,0.0025658219,-0.010323267,0.012609182,-0.028097415,0.026871152,-0.010276617,0.021912785,0.0022542577,0.005124979,-0.0019710176,0.004518512,-0.040360045,0.010969722,-0.0031539614,-0.020366628,-0.025778178,-0.0110030435,-0.016221326,0.0036587953,0.016207997,0.003007343,-0.0032555948,0.0044052163,-0.022046074,-0.0008822095,-0.009363583,0.028230704,-0.024538586,0.0029840174,0.0016044717,-0.014181997,0.031349678,-0.014381931,-0.027750863,0.02613806,0.0004136138,-0.005748107,-0.01868718,-0.0010138329,0.0054348772,0.010703143,-0.003682121,0.0030856507,-0.004275259,-0.010403241,0.021113047,-0.022685863,-0.023032416,0.031429652,0.001792743,-0.005644808,-0.011842767,-0.04078657,-0.0026874484,0.06915057,-0.00056939584,-0.013995391,0.010703143,-0.013728813,-0.022939114,-0.015261642,-0.022485929,0.016807798,0.007964044,0.0144219175,0.016821127,0.0076241563,0.005461535,-0.013248971,0.015301628,0.0085171955,-0.004318578,0.011136333,-0.0059047225,-0.010249958,-0.018207338,0.024645219,0.021752838,0.0007614159,-0.013648839,0.01111634,-0.010503208,-0.0038487327,-0.008203966,-0.00397869,0.0029740208,0.008530525,0.005261601,0.01642126,-0.0038753906,-0.013222313,0.026537929,0.024671877,-0.043505676,0.014195326,0.024778508,0.0056914594,-0.025951454,0.017620865,-0.0021359634,0.008643821,0.021299653,0.0041686273,-0.009017031,0.04044002,0.024378639,-0.027777521,-0.014208655,0.0028623908,0.042119466,0.005801423,-0.028124074,-0.03129636,0.022139376,-0.022179363,-0.04067994,0.013688826,0.013328944,0.0046184794,-0.02828402,-0.0063412455,-0.0046184794,-0.011756129,-0.010383247,-0.0018543894,-0.0018593877,-0.00052024535,0.004815081,0.014781799,0.018007403,0.01306903,-0.020433271,0.009043689,0.033189073,-0.006844413,-0.019766824,-0.018767154,0.00533491,-0.0024575242,0.018727167,0.0058080875,-0.013835444,0.0040719924,0.004881726,0.012029372,0.005664801,0.03193615,0.0058047553,0.002695779,0.009290274,0.02361889,0.017834127,0.0049017193,-0.0036388019,0.010776452,-0.019793482,0.0067777685,-0.014208655,-0.024911797,0.002385881,0.0034988478,0.020899786,-0.0025858153,-0.011849431,0.033189073,-0.021312982,0.024965113,-0.014635181,0.014048708,-0.0035921505,-0.003347231,0.030869836,-0.0017161017,-0.0061346465,0.009203636,-0.025165047,0.0068510775,0.021499587,0.013782129,-0.0024475274,-0.0051149824,-0.024445284,0.006167969,0.0068844,-0.00076183246,0.030150073,-0.0055948244,-0.011162991,-0.02057989,-0.009703471,-0.020646535,0.008004031,0.0066378145,-0.019900113,-0.012169327,-0.01439526,0.0044252095,-0.004018677,0.014621852,-0.025085073,-0.013715484,-0.017980747,0.0071043274,0.011456228,-0.01010334,-0.0035321703,-0.03801415,-0.012036037,-0.0028990454,-0.05419549,-0.024058744,-0.024272008,0.015221654,0.027964126,0.03182952,-0.015354944,0.004855068,0.011522872,0.004771762,0.0027874154,0.023405626,0.0004242353,-0.03132302,0.007057676,0.008763781,-0.0027057757,0.023005757,-0.0071176565,-0.005238275,0.029110415,-0.010989714,0.013728813,-0.009630162,-0.029137073,-0.0049317093,-0.0008630492,-0.015248313,0.0043219104,-0.0055681667,-0.013175662,0.029723546,0.025098402,0.012849103,-0.0009996708,0.03118973,-0.0021709518,0.0260181,-0.020526575,0.028097415,-0.016141351,0.010509873,-0.022965772,0.002865723,0.0020493253,0.0020509914,-0.0041419696,-0.00039695262,0.017287642,0.0038987163,0.014795128,-0.014661839,-0.008950386,0.004431874,-0.009383577,0.0012604183,-0.023019087,0.0029273694,-0.033135757,0.009176978,-0.011023037,-0.002102641,0.02663123,-0.03849399,-0.0044152127,0.0004527676,-0.0026924468,0.02828402,0.017727496,0.035135098,0.02728435,-0.005348239,-0.001467017,-0.019766824,0.014715155,0.011982721,0.0045651635,0.023458943,-0.0010046692,-0.0031373003,-0.0006972704,0.0019043729,-0.018967088,-0.024311995,0.0011546199,0.007977373,-0.004755101,-0.010016702,-0.02780418,-0.004688456,0.013022379,-0.005484861,0.0017227661,-0.015394931,-0.028763862,-0.026684547,0.0030589928,-0.018513903,0.028363993,0.0044818576,-0.009270281,0.038920518,-0.016008062,0.0093902415,0.004815081,-0.021059733,0.01451522,-0.0051583014,0.023765508,-0.017874114,-0.016821127,-0.012522544,-0.0028390652,0.0040886537,0.020259995,-0.031216389,-0.014115352,-0.009176978,0.010303274,0.020313311,0.0064112223,-0.02235264,-0.022872468,0.0052449396,0.0005723116,0.0037321046,0.016807798,-0.018527232,-0.009303603,0.0024858483,-0.0012662497,-0.007110992,0.011976057,-0.007790768,-0.042999174,-0.006727785,-0.011829439,0.007024354,0.005278262,-0.017740825,-0.0041519664,0.0085905045,0.027750863,-0.038387362,0.024391968,0.00087721116,0.010509873,-0.00038508154,-0.006857742,0.0183273,-0.0037054466,0.015461575,0.0017394272,-0.0017944091,0.014181997,-0.0052682655,0.009023695,0.00719763,-0.013522214,0.0034422,0.014941746,-0.0016711164,-0.025298337,-0.017634194,0.0058714002,-0.005321581,0.017834127,0.0110630235,-0.03369557,0.029190388,-0.008943722,0.009363583,-0.0034222065,-0.026111402,-0.007037683,-0.006561173,0.02473852,-0.007084334,-0.010110005,-0.008577175,0.0030439978,-0.022712521,0.0054582027,-0.0012620845,-0.0011954397,-0.015741484,0.0129557345,-0.00042111133,0.00846388,0.008930393,0.016487904,0.010469886,-0.007917393,-0.011762793,-0.0214596,0.000917198,0.021672864,0.010269952,-0.007737452,-0.010243294,-0.0067244526,-0.015488233,-0.021552904,0.017127695,0.011109675,0.038067464,0.00871713,-0.0025591573,0.021312982,-0.006237946,0.034628596,-0.0045251767,0.008357248,0.020686522,0.0010696478,0.0076708077,0.03772091,-0.018700508,-0.0020676525,-0.008923728,-0.023298996,0.018233996,-0.010256623,0.0017860786,0.009796774,-0.00897038,-0.01269582,-0.018527232,0.009190307,-0.02372552,-0.042119466,0.008097334,-0.0066778013,-0.021046404,0.0019593548,0.011083017,-0.0016028056,0.012662497,-0.000059095124,0.0071043274,-0.014675168,0.024831824,-0.053582355,0.038387362,0.0005698124,0.015954746,0.021552904,0.031589597,-0.009230294,-0.0006147976,0.002625802,-0.011749465,-0.034362018,-0.0067844326,-0.018793812,0.011442899,-0.008743787,0.017474247,-0.021619547,0.01831397,-0.009037024,-0.0057247817,-0.02728435,0.010363255,0.034415334,-0.024032086,-0.0020126705,-0.0045518344,-0.019353628,-0.018340627,-0.03129636,-0.0034038792,-0.006321252,-0.0016161345,0.033642255,-0.000056075285,-0.005005019,0.004571828,-0.0024075406,-0.00010215386,0.0098634185,0.1980148,-0.003825407,-0.025191706,0.035161756,0.005358236,0.025111731,0.023485601,0.0023342315,-0.011882754,0.018287312,-0.0068910643,0.003912045,0.009243623,-0.001355387,-0.028603915,-0.012802451,-0.030150073,-0.014795128,-0.028630573,-0.0013487226,0.002667455,0.00985009,-0.0033972147,-0.021486258,0.009503538,-0.017847456,0.013062365,-0.014341944,0.005078328,0.025165047,-0.015594865,-0.025924796,-0.0018177348,0.010996379,-0.02993681,0.007324255,0.014475234,-0.028577257,0.005494857,0.00011725306,-0.013315615,0.015941417,0.009376912,0.0025158382,0.008743787,0.023832154,-0.008084005,-0.014195326,-0.008823762,0.0033455652,-0.032362677,-0.021552904,-0.0056081535,0.023298996,-0.025444955,0.0097301295,0.009736794,0.015274971,-0.0012937407,-0.018087378,-0.0039387033,0.008637156,-0.011189649,-0.00023846315,-0.011582852,0.0066411467,-0.018220667,0.0060846633,0.0376676,-0.002709108,0.0072776037,0.0034188742,-0.010249958,-0.0007747449,-0.00795738,-0.022192692,0.03910712,0.032122757,0.023898797,0.0076241563,-0.007397564,-0.003655463,0.011442899,-0.014115352,-0.00505167,-0.031163072,0.030336678,-0.006857742,-0.022259338,0.004048667,0.02072651,0.0030156737,-0.0042119464,0.00041861215,-0.005731446,0.011103011,0.013822115,0.021512916,0.009216965,-0.006537847,-0.027057758,-0.04054665,0.010403241,-0.0056281467,-0.005701456,-0.002709108,-0.00745088,-0.0024841821,0.009356919,-0.022659205,0.004061996,-0.013175662,0.017074378,-0.006141311,-0.014541878,0.02993681,-0.00028448965,-0.025271678,0.011689484,-0.014528549,0.004398552,-0.017274313,0.0045751603,0.012455898,0.004121976,-0.025458284,-0.006744446,0.011822774,-0.015035049,-0.03257594,0.014675168,-0.0039187097,0.019726837,-0.0047251107,0.0022825818,0.011829439,0.005391558,-0.016781142,-0.0058747325,0.010309938,-0.013049036,0.01186276,-0.0011246296,0.0062112883,0.0028190718,-0.021739509,0.009883412,-0.0073175905,-0.012715813,-0.017181009,-0.016607866,-0.042492677,-0.0014478565,-0.01794076,0.012302616,-0.015194997,-0.04433207,-0.020606548,0.009696807,0.010303274,-0.01694109,-0.004018677,0.019353628,-0.001991011,0.000058938927,0.010536531,-0.17274313,0.010143327,0.014235313,-0.024152048,0.025684876,-0.0012504216,0.036601283,-0.003698782,0.0007310093,0.004165295,-0.0029157067,0.017101036,-0.046891227,-0.017460918,0.022965772,0.020233337,-0.024072073,0.017220996,0.009370248,0.0010363255,0.0194336,-0.019606877,0.01818068,-0.020819811,0.007410893,0.0019326969,0.017887443,0.006651143,0.00067394477,-0.011889419,-0.025058415,-0.008543854,0.021579562,0.0047484366,0.014062037,0.0075508473,-0.009510202,-0.009143656,0.0046817916,0.013982063,-0.0027990784,0.011782787,0.014541878,-0.015701497,-0.029350337,0.021979429,0.01332228,-0.026244693,-0.0123492675,-0.003895384,0.0071576433,-0.035454992,-0.00046984528,0.0033522295,0.039347045,0.0005119148,0.00476843,-0.012995721,0.0024042083,-0.006931051,-0.014461905,-0.0127558,0.0034555288,-0.0074842023,-0.030256703,-0.007057676,-0.00807734,0.007804097,-0.006957709,0.017181009,-0.034575284,-0.008603834,-0.005008351,-0.015834786,0.02943031,0.016861115,-0.0050849924,0.014235313,0.0051449724,0.0025924798,-0.0025741523,0.04289254,-0.002104307,0.012969063,-0.008310596,0.00423194,0.0074975314,0.0018810473,-0.014248641,-0.024725191,0.0151016945,-0.017527562,0.0018727167,0.0002830318,0.015168339,0.0144219175,-0.004048667,-0.004358565,0.011836103,-0.010343261,-0.005911387,0.0022825818,0.0073175905,0.00403867,0.013188991,0.03334902,0.006111321,0.008597169,0.030123414,-0.015474904,0.0017877447,-0.024551915,0.013155668,0.023525586,-0.0255116,0.017220996,0.004358565,-0.00934359,0.0099967085,0.011162991,0.03092315,-0.021046404,-0.015514892,0.0011946067,-0.01816735,0.010876419,-0.10124666,-0.03550831,0.0056348112,0.013942076,0.005951374,0.020419942,-0.006857742,-0.020873128,-0.021259667,0.0137554705,0.0057880944,-0.029163731,-0.018767154,-0.021392956,0.030896494,-0.005494857,-0.0027307675,-0.006801094,-0.014821786,0.021392956,-0.0018110704,-0.0018843795,-0.012362596,-0.0072176233,-0.017194338,-0.018713837,-0.024272008,0.03801415,0.00015880188,0.0044951867,-0.028630573,-0.0014070367,-0.00916365,-0.026537929,-0.009576847,-0.013995391,-0.0077107945,0.0050016865,0.00578143,-0.04467862,0.008363913,0.010136662,-0.0006268769,-0.006591163,0.015341615,-0.027377652,-0.00093136,0.029243704,-0.020886457,-0.01041657,-0.02424535,0.005291591,-0.02980352,-0.009190307,0.019460259,-0.0041286405,0.004801752,0.0011787785,-0.001257086,-0.011216307,-0.013395589,0.00088137644,-0.0051616337,0.03876057,-0.0033455652,0.00075850025,-0.006951045,-0.0062112883,0.018140694,-0.006351242,-0.008263946,0.018154023,-0.012189319,0.0075508473,-0.044358727,-0.0040153447,0.0093302615,-0.010636497,0.032789204,-0.005264933,-0.014235313,-0.018393943,0.007297597,-0.016114693,0.015021721,0.020033404,0.0137688,0.0011046362,0.010616505,-0.0039453674,0.012109346,0.021099718,-0.0072842683,-0.019153694,-0.003768759,0.039320387,-0.006747778,-0.0016852784,0.018154023,0.0010963057,-0.015035049,-0.021033075,-0.04345236,0.017287642,0.016341286,-0.008610498,0.00236922,0.009290274,0.028950468,-0.014475234,-0.0035654926,0.015434918,-0.03372223,0.004501851,-0.012929076,-0.008483873,-0.0044685286,-0.0102233,0.01615468,0.0022792495,0.010876419,-0.0059647025,0.01895376,-0.0069976957,-0.0042952523,0.017207667,-0.00036133936,0.0085905045,0.008084005,0.03129636,-0.016994404,-0.014915089,0.020100048,-0.012009379,-0.006684466,0.01306903,0.00015765642,-0.00530492,0.0005277429,0.015421589,0.015528221,0.032202728,-0.003485519,-0.0014286962,0.033908837,0.001367883,0.010509873,0.025271678,-0.020993087,0.019846799,0.006897729,-0.010216636,-0.00725761,0.01818068,-0.028443968,-0.011242964,-0.014435247,-0.013688826,0.006101324,-0.0022509254,0.013848773,-0.0019077052,0.017181009,0.03422873,0.005324913,-0.0035188415,0.014128681,-0.004898387,0.005038341,0.0012320944,-0.005561502,-0.017847456,0.0008538855,-0.0047884234,0.011849431,0.015421589,-0.013942076,0.0029790192,-0.013702155,0.0001199605,-0.024431955,0.019926772,0.022179363,-0.016487904,-0.03964028,0.0050849924,0.017487574,0.022792496,0.0012504216,0.004048667,-0.00997005,0.0076041627,-0.014328616,-0.020259995,0.0005598157,-0.010469886,0.0016852784,0.01716768,-0.008990373,-0.001987679,0.026417969,0.023792166,0.0046917885,-0.0071909656,-0.00032051947,-0.023259008,-0.009170313,0.02071318,-0.03156294,-0.030869836,-0.006324584,0.013795458,-0.00047151142,0.016874444,0.00947688,0.00985009,-0.029883493,0.024205362,-0.013522214,-0.015075036,-0.030603256,0.029270362,0.010503208,0.021539574,0.01743426,-0.023898797,0.022019416,-0.0068777353,0.027857494,-0.021259667,0.0025758184,0.006197959,0.006447877,-0.00025200035,-0.004941706,-0.021246338,-0.005504854,-0.008390571,-0.0097301295,0.027244363,-0.04446536,0.05216949,0.010243294,-0.016008062,0.0122493,-0.0199401,0.009077012,0.019753495,0.006431216,-0.037960835,-0.027377652,0.016381273,-0.0038620618,0.022512587,-0.010996379,-0.0015211658,-0.0102233,0.007071005,0.008230623,-0.009490209,-0.010083347,0.024431955,0.002427534,0.02828402,0.0035721571,-0.022192692,-0.011882754,0.010056688,0.0011904413,-0.01426197,-0.017500903,-0.00010985966,0.005591492,-0.0077707744,-0.012049366,0.011869425,0.00858384,-0.024698535,-0.030283362,0.020140035,0.011949399,-0.013968734,0.042732596,-0.011649498,-0.011982721,-0.016967745,-0.0060913274,-0.007130985,-0.013109017,-0.009710136};

      // Initialize the MongoDB C Driver
      mongoc_init();

      // Connect to your Atlas collection
      client =  mongoc_client_new("<connection-string>");
      collection = mongoc_client_get_collection (client, "sample_mflix", "embedded_movies");

      // Build query vector array
      builder = bson_array_builder_new();

      for(int i = 0; i < arrSize; i++){
          bson_array_builder_append_double(builder, embeddings[i]);
      }

      bson_array_builder_build(builder, &query_vector);
      bson_array_builder_destroy(builder);

      // Create aggregation pipeline for Vector Search
      pipeline = BCON_NEW(
          "pipeline",
          "[",
              "{",
                  "$vectorSearch", "{",
                      "index", "vector_index",
                      "path", "plot_embedding",
                      "queryVector", BCON_ARRAY(&query_vector),
                      "numCandidates", BCON_INT32(150),
                      "limit", BCON_INT32(10),
                  "}",
              "}",
              "{",
                  "$project", "{",
                      "title", BCON_BOOL(true),
                      "plot", BCON_BOOL(true),
                      "_id", BCON_BOOL(false),
                      "score", "{",
                          "$meta", "vectorSearchScore",
                      "}",
                  "}",
              "}",
          "]"
      );

      // Run query
      cursor = mongoc_collection_aggregate(collection, MONGOC_QUERY_NONE, pipeline, NULL, NULL );

      // Print results
      while (mongoc_cursor_next (cursor, &doc)) {
          str = bson_as_canonical_extended_json (doc, NULL);
          printf ("%s\
", str);
          bson_free (str);
      }

      // Cleanup
      bson_destroy(pipeline);
      mongoc_cursor_destroy(cursor);
      mongoc_collection_destroy(collection);
      mongoc_client_destroy(client);
      mongoc_cleanup();

      return 0;
  }
  ```

  This query uses the `$vectorSearch` stage to:

  - Compare vector embeddings of the search term against vector embeddings of movie plots in the `plot_embedding` field of the `sample_mflix.embedded_movies` collection.

  - Consider up to the 150 most similar movie plots and return the top 10 results.

  It uses the `$project` stage to:

  - Only include the movie `plot` and `title` fields in the results.

  - Add a `score` field to show the relevance of each result to the search term.

### Specify the `<connection-string>`.

Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

<Tabs>

<Tab name="Atlas Cluster">

Your connection string should use the following format:

```
mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
```

Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

</Tab>

<Tab name="Local Deployment">

Your connection string should use the following format:

```
mongodb://localhost:<port-number>/?directConnection=true
```

</Tab>

</Tabs>

### Update CMake for your project.

- Replace the `vector_index.c` file name in your `CMakeLists.txt` file with your new `atlas-vector-search-quick-start.c` filename.

- Navigate to the `/build` directory, and prepare the project.

  ```bash
  cd build
  cmake ../
  ```

### Run your query.

From your `build` directory, compile and run the `atlas-vector-search-quick-start.c` file.

```shell
cmake --build .
./atlas-vector-search-quick-start
```

```js
{ "plot" : "A reporter, learning of time travelers visiting 20th century disasters, tries to change the history they know by averting upcoming disasters.", "title" : "Thrill Seekers", "score" : { "$numberDouble" : "0.78926712274551391602" } }
{ "plot" : "At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.", "title" : "About Time", "score" : { "$numberDouble" : "0.78436046838760375977" } }
{ "plot" : "Hoping to alter the events of the past, a 19th century inventor instead travels 800,000 years into the future, where he finds humankind divided into two warring races.", "title" : "The Time Machine", "score" : { "$numberDouble" : "0.78010666370391845703" } }
{ "plot" : "After using his mother\'s newly built time machine, Dolf gets stuck involuntary in the year 1212. He ends up in a children\'s crusade where he confronts his new friends with modern techniques...", "title" : "Crusade in Jeans", "score" : { "$numberDouble" : "0.77891707420349121094" } }
{ "plot" : "An officer for a security agency that regulates time travel, must fend for his life against a shady politician who has a tie to his past.", "title" : "Timecop", "score" : { "$numberDouble" : "0.77716124057769775391" } }
{ "plot" : "A time-travel experiment in which a robot probe is sent from the year 2073 to the year 1973 goes terribly wrong thrusting one of the project scientists, a man named Nicholas Sinclair into a...", "title" : "A.P.E.X.", "score" : { "$numberDouble" : "0.77308857440948486328" } }
{ "plot" : "Agent J travels in time to M.I.B.\'s early days in 1969 to stop an alien from assassinating his friend Agent K and changing history.", "title" : "Men in Black 3", "score" : { "$numberDouble" : "0.77123808860778808594" } }
{ "plot" : "Bound by a shared destiny, a teen bursting with scientific curiosity and a former boy-genius inventor embark on a mission to unearth the secrets of a place somewhere in time and space that exists in their collective memory.", "title" : "Tomorrowland", "score" : { "$numberDouble" : "0.76699239015579223633" } }
{ "plot" : "With the help of his uncle, a man travels to the future to try and bring his girlfriend back to life.", "title" : "Love Story 2050", "score" : { "$numberDouble" : "0.76493728160858154297" } }
{ "plot" : "A dimension-traveling wizard gets stuck in the 21st century because cell-phone radiation interferes with his magic. With his home world on the brink of war, he seeks help from a jaded ...", "title" : "The Portal", "score" : { "$numberDouble" : "0.76407861709594726562" } }
```

</Tab>

<Tab name="C++11">

### Construct your vector search query.

This query searches for documents that include text in the `plot` field that is semantically related to the term "time travel".

- Create a file named `atlas_vector_search_quick_start.cpp` .

- Copy and paste the following sample query into the `atlas_vector_search_quick_start.cpp` file:

  ```cpp
  #include <bsoncxx/builder/basic/document.hpp>
  #include <bsoncxx/builder/list.hpp>
  #include <bsoncxx/json.hpp>
  #include <mongocxx/client.hpp>
  #include <mongocxx/instance.hpp>
  #include <mongocxx/uri.hpp>

  using bsoncxx::builder::basic::kvp;
  using bsoncxx::builder::basic::make_document;

  int main() {
    try {
      mongocxx::instance inst{};

      // Replace the placeholder with your Atlas connection string
      const auto uri = mongocxx::uri{"<connection-string>"};

      // Connect to your Atlas cluster
      auto client = mongocxx::client{uri};
      auto db = client["sample_mflix"];
      auto collection = db["embedded_movies"];

      // Define vector embeddings to search
      auto vectors = bsoncxx::builder::list{
        -0.0016261312, -0.028070757, -0.011342932, -0.012775794, -0.0027440966, 0.008683807, -0.02575152, -0.02020668, -0.010283281, -0.0041719596, 0.021392956, 0.028657231, -0.006634482, 0.007490867, 0.018593878, 0.0038187427, 0.029590257, -0.01451522, 0.016061379, 0.00008528442, -0.008943722, 0.01627464, 0.024311995, -0.025911469, 0.00022596726, -0.008863748, 0.008823762, -0.034921836, 0.007910728, -0.01515501, 0.035801545, -0.0035688248, -0.020299982, -0.03145631, -0.032256044, -0.028763862, -0.0071576433, -0.012769129, 0.012322609, -0.006621153, 0.010583182, 0.024085402, -0.001623632, 0.007864078, -0.021406285, 0.002554159, 0.012229307, -0.011762793, 0.0051682983, 0.0048484034, 0.018087378, 0.024325324, -0.037694257, -0.026537929, -0.008803768, -0.017767483, -0.012642504, -0.0062712682, 0.0009771782, -0.010409906, 0.017754154, -0.004671795, -0.030469967, 0.008477209, -0.005218282, -0.0058480743, -0.020153364, -0.0032805866, 0.004248601, 0.0051449724, 0.006791097, 0.007650814, 0.003458861, -0.0031223053, -0.01932697, -0.033615597, 0.00745088, 0.006321252, -0.0038154104, 0.014555207, 0.027697546, -0.02828402, 0.0066711367, 0.0077107945, 0.01794076, 0.011349596, -0.0052715978, 0.014755142, -0.019753495, -0.011156326, 0.011202978, 0.022126047, 0.00846388, 0.030549942, -0.0041386373, 0.018847128, -0.00033655585, 0.024925126, -0.003555496, -0.019300312, 0.010749794, 0.0075308536, -0.018287312, -0.016567878, -0.012869096, -0.015528221, 0.0078107617, -0.011156326, 0.013522214, -0.020646535, -0.01211601, 0.055928253, 0.011596181, -0.017247654, 0.0005939711, -0.026977783, -0.003942035, -0.009583511, -0.0055248477, -0.028737204, 0.023179034, 0.003995351, 0.0219661, -0.008470545, 0.023392297, 0.010469886, -0.015874773, 0.007890735, -0.009690142, -0.00024970944, 0.012775794, 0.0114762215, 0.013422247, 0.010429899, -0.03686786, -0.006717788, -0.027484283, 0.011556195, -0.036068123, -0.013915418, -0.0016327957, 0.0151016945, -0.020473259, 0.004671795, -0.012555866, 0.0209531, 0.01982014, 0.024485271, 0.0105431955, -0.005178295, 0.033162415, -0.013795458, 0.007150979, 0.010243294, 0.005644808, 0.017260984, -0.0045618312, 0.0024725192, 0.004305249, -0.008197301, 0.0014203656, 0.0018460588, 0.005015015, -0.011142998, 0.01439526, 0.022965772, 0.02552493, 0.007757446, -0.0019726837, 0.009503538, -0.032042783, 0.008403899, -0.04609149, 0.013808787, 0.011749465, 0.036388017, 0.016314628, 0.021939443, -0.0250051, -0.017354285, -0.012962398, 0.00006107364, 0.019113706, 0.03081652, -0.018114036, -0.0084572155, 0.009643491, -0.0034721901, 0.0072642746, -0.0090636825, 0.01642126, 0.013428912, 0.027724205, 0.0071243206, -0.6858542, -0.031029783, -0.014595194, -0.011449563, 0.017514233, 0.01743426, 0.009950057, 0.0029706885, -0.015714826, -0.001806072, 0.011856096, 0.026444625, -0.0010663156, -0.006474535, 0.0016161345, -0.020313311, 0.0148351155, -0.0018393943, 0.0057347785, 0.018300641, -0.018647194, 0.03345565, -0.008070676, 0.0071443142, 0.014301958, 0.0044818576, 0.003838736, -0.007350913, -0.024525259, -0.001142124, -0.018620536, 0.017247654, 0.007037683, 0.010236629, 0.06046009, 0.0138887605, -0.012122675, 0.037694257, 0.0055081863, 0.042492677, 0.00021784494, -0.011656162, 0.010276617, 0.022325981, 0.005984696, -0.009496873, 0.013382261, -0.0010563189, 0.0026507939, -0.041639622, 0.008637156, 0.026471283, -0.008403899, 0.024858482, -0.00066686375, -0.0016252982, 0.027590916, 0.0051449724, 0.0058647357, -0.008743787, -0.014968405, 0.027724205, -0.011596181, 0.0047650975, -0.015381602, 0.0043718936, 0.002159289, 0.035908177, -0.008243952, -0.030443309, 0.027564257, 0.042625964, -0.0033688906, 0.01843393, 0.019087048, 0.024578573, 0.03268257, -0.015608194, -0.014128681, -0.0033538956, -0.0028757197, -0.004121976, -0.032389335, 0.0034322033, 0.058807302, 0.010943064, -0.030523283, 0.008903735, 0.017500903, 0.00871713, -0.0029406983, 0.013995391, -0.03132302, -0.019660193, -0.00770413, -0.0038853872, 0.0015894766, -0.0015294964, -0.006251275, -0.021099718, -0.010256623, -0.008863748, 0.028550599, 0.02020668, -0.0012962399, -0.003415542, -0.0022509254, 0.0119360695, 0.027590916, -0.046971202, -0.0015194997, -0.022405956, 0.0016677842, -0.00018535563, -0.015421589, -0.031802863, 0.03814744, 0.0065411795, 0.016567878, -0.015621523, 0.022899127, -0.011076353, 0.02841731, -0.002679118, -0.002342562, 0.015341615, 0.01804739, -0.020566562, -0.012989056, -0.002990682, 0.01643459, 0.00042527664, 0.008243952, -0.013715484, -0.004835075, -0.009803439, 0.03129636, -0.021432944, 0.0012087687, -0.015741484, -0.0052016205, 0.00080890034, -0.01755422, 0.004811749, -0.017967418, -0.026684547, -0.014128681, 0.0041386373, -0.013742141, -0.010056688, -0.013268964, -0.0110630235, -0.028337335, 0.015981404, -0.00997005, -0.02424535, -0.013968734, -0.028310679, -0.027750863, -0.020699851, 0.02235264, 0.001057985, 0.00081639783, -0.0099367285, 0.013522214, -0.012016043, -0.00086471526, 0.013568865, 0.0019376953, -0.019020405, 0.017460918, -0.023045745, 0.008503866, 0.0064678704, -0.011509543, 0.018727167, -0.003372223, -0.0028690554, -0.0027024434, -0.011902748, -0.012182655, -0.015714826, -0.0098634185, 0.00593138, 0.018753825, 0.0010146659, 0.013029044, 0.0003521757, -0.017620865, 0.04102649, 0.00552818, 0.024485271, -0.009630162, -0.015608194, 0.0006718621, -0.0008418062, 0.012395918, 0.0057980907, 0.016221326, 0.010616505, 0.004838407, -0.012402583, 0.019900113, -0.0034521967, 0.000247002, -0.03153628, 0.0011038032, -0.020819811, 0.016234655, -0.00330058, -0.0032289368, 0.00078973995, -0.021952773, -0.022459272, 0.03118973, 0.03673457, -0.021472929, 0.0072109587, -0.015075036, 0.004855068, -0.0008151483, 0.0069643734, 0.010023367, -0.010276617, -0.023019087, 0.0068244194, -0.0012520878, -0.0015086699, 0.022046074, -0.034148756, -0.0022192693, 0.002427534, -0.0027124402, 0.0060346797, 0.015461575, 0.0137554705, 0.009230294, -0.009583511, 0.032629255, 0.015994733, -0.019167023, -0.009203636, 0.03393549, -0.017274313, -0.012042701, -0.0009930064, 0.026777849, -0.013582194, -0.0027590916, -0.017594207, -0.026804507, -0.0014236979, -0.022032745, 0.0091236625, -0.0042419364, -0.00858384, -0.0033905501, -0.020739838, 0.016821127, 0.022539245, 0.015381602, 0.015141681, 0.028817179, -0.019726837, -0.0051283115, -0.011489551, -0.013208984, -0.0047017853, -0.0072309524, 0.01767418, 0.0025658219, -0.010323267, 0.012609182, -0.028097415, 0.026871152, -0.010276617, 0.021912785, 0.0022542577, 0.005124979, -0.0019710176, 0.004518512, -0.040360045, 0.010969722, -0.0031539614, -0.020366628, -0.025778178, -0.0110030435, -0.016221326, 0.0036587953, 0.016207997, 0.003007343, -0.0032555948, 0.0044052163, -0.022046074, -0.0008822095, -0.009363583, 0.028230704, -0.024538586, 0.0029840174, 0.0016044717, -0.014181997, 0.031349678, -0.014381931, -0.027750863, 0.02613806, 0.0004136138, -0.005748107, -0.01868718, -0.0010138329, 0.0054348772, 0.010703143, -0.003682121, 0.0030856507, -0.004275259, -0.010403241, 0.021113047, -0.022685863, -0.023032416, 0.031429652, 0.001792743, -0.005644808, -0.011842767, -0.04078657, -0.0026874484, 0.06915057, -0.00056939584, -0.013995391, 0.010703143, -0.013728813, -0.022939114, -0.015261642, -0.022485929, 0.016807798, 0.007964044, 0.0144219175, 0.016821127, 0.0076241563, 0.005461535, -0.013248971, 0.015301628, 0.0085171955, -0.004318578, 0.011136333, -0.0059047225, -0.010249958, -0.018207338, 0.024645219, 0.021752838, 0.0007614159, -0.013648839, 0.01111634, -0.010503208, -0.0038487327, -0.008203966, -0.00397869, 0.0029740208, 0.008530525, 0.005261601, 0.01642126, -0.0038753906, -0.013222313, 0.026537929, 0.024671877, -0.043505676, 0.014195326, 0.024778508, 0.0056914594, -0.025951454, 0.017620865, -0.0021359634, 0.008643821, 0.021299653, 0.0041686273, -0.009017031, 0.04044002, 0.024378639, -0.027777521, -0.014208655, 0.0028623908, 0.042119466, 0.005801423, -0.028124074, -0.03129636, 0.022139376, -0.022179363, -0.04067994, 0.013688826, 0.013328944, 0.0046184794, -0.02828402, -0.0063412455, -0.0046184794, -0.011756129, -0.010383247, -0.0018543894, -0.0018593877, -0.00052024535, 0.004815081, 0.014781799, 0.018007403, 0.01306903, -0.020433271, 0.009043689, 0.033189073, -0.006844413, -0.019766824, -0.018767154, 0.00533491, -0.0024575242, 0.018727167, 0.0058080875, -0.013835444, 0.0040719924, 0.004881726, 0.012029372, 0.005664801, 0.03193615, 0.0058047553, 0.002695779, 0.009290274, 0.02361889, 0.017834127, 0.0049017193, -0.0036388019, 0.010776452, -0.019793482, 0.0067777685, -0.014208655, -0.024911797, 0.002385881, 0.0034988478, 0.020899786, -0.0025858153, -0.011849431, 0.033189073, -0.021312982, 0.024965113, -0.014635181, 0.014048708, -0.0035921505, -0.003347231, 0.030869836, -0.0017161017, -0.0061346465, 0.009203636, -0.025165047, 0.0068510775, 0.021499587, 0.013782129, -0.0024475274, -0.0051149824, -0.024445284, 0.006167969, 0.0068844, -0.00076183246, 0.030150073, -0.0055948244, -0.011162991, -0.02057989, -0.009703471, -0.020646535, 0.008004031, 0.0066378145, -0.019900113, -0.012169327, -0.01439526, 0.0044252095, -0.004018677, 0.014621852, -0.025085073, -0.013715484, -0.017980747, 0.0071043274, 0.011456228, -0.01010334, -0.0035321703, -0.03801415, -0.012036037, -0.0028990454, -0.05419549, -0.024058744, -0.024272008, 0.015221654, 0.027964126, 0.03182952, -0.015354944, 0.004855068, 0.011522872, 0.004771762, 0.0027874154, 0.023405626, 0.0004242353, -0.03132302, 0.007057676, 0.008763781, -0.0027057757, 0.023005757, -0.0071176565, -0.005238275, 0.029110415, -0.010989714, 0.013728813, -0.009630162, -0.029137073, -0.0049317093, -0.0008630492, -0.015248313, 0.0043219104, -0.0055681667, -0.013175662, 0.029723546, 0.025098402, 0.012849103, -0.0009996708, 0.03118973, -0.0021709518, 0.0260181, -0.020526575, 0.028097415, -0.016141351, 0.010509873, -0.022965772, 0.002865723, 0.0020493253, 0.0020509914, -0.0041419696, -0.00039695262, 0.017287642, 0.0038987163, 0.014795128, -0.014661839, -0.008950386, 0.004431874, -0.009383577, 0.0012604183, -0.023019087, 0.0029273694, -0.033135757, 0.009176978, -0.011023037, -0.002102641, 0.02663123, -0.03849399, -0.0044152127, 0.0004527676, -0.0026924468, 0.02828402, 0.017727496, 0.035135098, 0.02728435, -0.005348239, -0.001467017, -0.019766824, 0.014715155, 0.011982721, 0.0045651635, 0.023458943, -0.0010046692, -0.0031373003, -0.0006972704, 0.0019043729, -0.018967088, -0.024311995, 0.0011546199, 0.007977373, -0.004755101, -0.010016702, -0.02780418, -0.004688456, 0.013022379, -0.005484861, 0.0017227661, -0.015394931, -0.028763862, -0.026684547, 0.0030589928, -0.018513903, 0.028363993, 0.0044818576, -0.009270281, 0.038920518, -0.016008062, 0.0093902415, 0.004815081, -0.021059733, 0.01451522, -0.0051583014, 0.023765508, -0.017874114, -0.016821127, -0.012522544, -0.0028390652, 0.0040886537, 0.020259995, -0.031216389, -0.014115352, -0.009176978, 0.010303274, 0.020313311, 0.0064112223, -0.02235264, -0.022872468, 0.0052449396, 0.0005723116, 0.0037321046, 0.016807798, -0.018527232, -0.009303603, 0.0024858483, -0.0012662497, -0.007110992, 0.011976057, -0.007790768, -0.042999174, -0.006727785, -0.011829439, 0.007024354, 0.005278262, -0.017740825, -0.0041519664, 0.0085905045, 0.027750863, -0.038387362, 0.024391968, 0.00087721116, 0.010509873, -0.00038508154, -0.006857742, 0.0183273, -0.0037054466, 0.015461575, 0.0017394272, -0.0017944091, 0.014181997, -0.0052682655, 0.009023695, 0.00719763, -0.013522214, 0.0034422, 0.014941746, -0.0016711164, -0.025298337, -0.017634194, 0.0058714002, -0.005321581, 0.017834127, 0.0110630235, -0.03369557, 0.029190388, -0.008943722, 0.009363583, -0.0034222065, -0.026111402, -0.007037683, -0.006561173, 0.02473852, -0.007084334, -0.010110005, -0.008577175, 0.0030439978, -0.022712521, 0.0054582027, -0.0012620845, -0.0011954397, -0.015741484, 0.0129557345, -0.00042111133, 0.00846388, 0.008930393, 0.016487904, 0.010469886, -0.007917393, -0.011762793, -0.0214596, 0.000917198, 0.021672864, 0.010269952, -0.007737452, -0.010243294, -0.0067244526, -0.015488233, -0.021552904, 0.017127695, 0.011109675, 0.038067464, 0.00871713, -0.0025591573, 0.021312982, -0.006237946, 0.034628596, -0.0045251767, 0.008357248, 0.020686522, 0.0010696478, 0.0076708077, 0.03772091, -0.018700508, -0.0020676525, -0.008923728, -0.023298996, 0.018233996, -0.010256623, 0.0017860786, 0.009796774, -0.00897038, -0.01269582, -0.018527232, 0.009190307, -0.02372552, -0.042119466, 0.008097334, -0.0066778013, -0.021046404, 0.0019593548, 0.011083017, -0.0016028056, 0.012662497, -0.000059095124, 0.0071043274, -0.014675168, 0.024831824, -0.053582355, 0.038387362, 0.0005698124, 0.015954746, 0.021552904, 0.031589597, -0.009230294, -0.0006147976, 0.002625802, -0.011749465, -0.034362018, -0.0067844326, -0.018793812, 0.011442899, -0.008743787, 0.017474247, -0.021619547, 0.01831397, -0.009037024, -0.0057247817, -0.02728435, 0.010363255, 0.034415334, -0.024032086, -0.0020126705, -0.0045518344, -0.019353628, -0.018340627, -0.03129636, -0.0034038792, -0.006321252, -0.0016161345, 0.033642255, -0.000056075285, -0.005005019, 0.004571828, -0.0024075406, -0.00010215386, 0.0098634185, 0.1980148, -0.003825407, -0.025191706, 0.035161756, 0.005358236, 0.025111731, 0.023485601, 0.0023342315, -0.011882754, 0.018287312, -0.0068910643, 0.003912045, 0.009243623, -0.001355387, -0.028603915, -0.012802451, -0.030150073, -0.014795128, -0.028630573, -0.0013487226, 0.002667455, 0.00985009, -0.0033972147, -0.021486258, 0.009503538, -0.017847456, 0.013062365, -0.014341944, 0.005078328, 0.025165047, -0.015594865, -0.025924796, -0.0018177348, 0.010996379, -0.02993681, 0.007324255, 0.014475234, -0.028577257, 0.005494857, 0.00011725306, -0.013315615, 0.015941417, 0.009376912, 0.0025158382, 0.008743787, 0.023832154, -0.008084005, -0.014195326, -0.008823762, 0.0033455652, -0.032362677, -0.021552904, -0.0056081535, 0.023298996, -0.025444955, 0.0097301295, 0.009736794, 0.015274971, -0.0012937407, -0.018087378, -0.0039387033, 0.008637156, -0.011189649, -0.00023846315, -0.011582852, 0.0066411467, -0.018220667, 0.0060846633, 0.0376676, -0.002709108, 0.0072776037, 0.0034188742, -0.010249958, -0.0007747449, -0.00795738, -0.022192692, 0.03910712, 0.032122757, 0.023898797, 0.0076241563, -0.007397564, -0.003655463, 0.011442899, -0.014115352, -0.00505167, -0.031163072, 0.030336678, -0.006857742, -0.022259338, 0.004048667, 0.02072651, 0.0030156737, -0.0042119464, 0.00041861215, -0.005731446, 0.011103011, 0.013822115, 0.021512916, 0.009216965, -0.006537847, -0.027057758, -0.04054665, 0.010403241, -0.0056281467, -0.005701456, -0.002709108, -0.00745088, -0.0024841821, 0.009356919, -0.022659205, 0.004061996, -0.013175662, 0.017074378, -0.006141311, -0.014541878, 0.02993681, -0.00028448965, -0.025271678, 0.011689484, -0.014528549, 0.004398552, -0.017274313, 0.0045751603, 0.012455898, 0.004121976, -0.025458284, -0.006744446, 0.011822774, -0.015035049, -0.03257594, 0.014675168, -0.0039187097, 0.019726837, -0.0047251107, 0.0022825818, 0.011829439, 0.005391558, -0.016781142, -0.0058747325, 0.010309938, -0.013049036, 0.01186276, -0.0011246296, 0.0062112883, 0.0028190718, -0.021739509, 0.009883412, -0.0073175905, -0.012715813, -0.017181009, -0.016607866, -0.042492677, -0.0014478565, -0.01794076, 0.012302616, -0.015194997, -0.04433207, -0.020606548, 0.009696807, 0.010303274, -0.01694109, -0.004018677, 0.019353628, -0.001991011, 0.000058938927, 0.010536531, -0.17274313, 0.010143327, 0.014235313, -0.024152048, 0.025684876, -0.0012504216, 0.036601283, -0.003698782, 0.0007310093, 0.004165295, -0.0029157067, 0.017101036, -0.046891227, -0.017460918, 0.022965772, 0.020233337, -0.024072073, 0.017220996, 0.009370248, 0.0010363255, 0.0194336, -0.019606877, 0.01818068, -0.020819811, 0.007410893, 0.0019326969, 0.017887443, 0.006651143, 0.00067394477, -0.011889419, -0.025058415, -0.008543854, 0.021579562, 0.0047484366, 0.014062037, 0.0075508473, -0.009510202, -0.009143656, 0.0046817916, 0.013982063, -0.0027990784, 0.011782787, 0.014541878, -0.015701497, -0.029350337, 0.021979429, 0.01332228, -0.026244693, -0.0123492675, -0.003895384, 0.0071576433, -0.035454992, -0.00046984528, 0.0033522295, 0.039347045, 0.0005119148, 0.00476843, -0.012995721, 0.0024042083, -0.006931051, -0.014461905, -0.0127558, 0.0034555288, -0.0074842023, -0.030256703, -0.007057676, -0.00807734, 0.007804097, -0.006957709, 0.017181009, -0.034575284, -0.008603834, -0.005008351, -0.015834786, 0.02943031, 0.016861115, -0.0050849924, 0.014235313, 0.0051449724, 0.0025924798, -0.0025741523, 0.04289254, -0.002104307, 0.012969063, -0.008310596, 0.00423194, 0.0074975314, 0.0018810473, -0.014248641, -0.024725191, 0.0151016945, -0.017527562, 0.0018727167, 0.0002830318, 0.015168339, 0.0144219175, -0.004048667, -0.004358565, 0.011836103, -0.010343261, -0.005911387, 0.0022825818, 0.0073175905, 0.00403867, 0.013188991, 0.03334902, 0.006111321, 0.008597169, 0.030123414, -0.015474904, 0.0017877447, -0.024551915, 0.013155668, 0.023525586, -0.0255116, 0.017220996, 0.004358565, -0.00934359, 0.0099967085, 0.011162991, 0.03092315, -0.021046404, -0.015514892, 0.0011946067, -0.01816735, 0.010876419, -0.10124666, -0.03550831, 0.0056348112, 0.013942076, 0.005951374, 0.020419942, -0.006857742, -0.020873128, -0.021259667, 0.0137554705, 0.0057880944, -0.029163731, -0.018767154, -0.021392956, 0.030896494, -0.005494857, -0.0027307675, -0.006801094, -0.014821786, 0.021392956, -0.0018110704, -0.0018843795, -0.012362596, -0.0072176233, -0.017194338, -0.018713837, -0.024272008, 0.03801415, 0.00015880188, 0.0044951867, -0.028630573, -0.0014070367, -0.00916365, -0.026537929, -0.009576847, -0.013995391, -0.0077107945, 0.0050016865, 0.00578143, -0.04467862, 0.008363913, 0.010136662, -0.0006268769, -0.006591163, 0.015341615, -0.027377652, -0.00093136, 0.029243704, -0.020886457, -0.01041657, -0.02424535, 0.005291591, -0.02980352, -0.009190307, 0.019460259, -0.0041286405, 0.004801752, 0.0011787785, -0.001257086, -0.011216307, -0.013395589, 0.00088137644, -0.0051616337, 0.03876057, -0.0033455652, 0.00075850025, -0.006951045, -0.0062112883, 0.018140694, -0.006351242, -0.008263946, 0.018154023, -0.012189319, 0.0075508473, -0.044358727, -0.0040153447, 0.0093302615, -0.010636497, 0.032789204, -0.005264933, -0.014235313, -0.018393943, 0.007297597, -0.016114693, 0.015021721, 0.020033404, 0.0137688, 0.0011046362, 0.010616505, -0.0039453674, 0.012109346, 0.021099718, -0.0072842683, -0.019153694, -0.003768759, 0.039320387, -0.006747778, -0.0016852784, 0.018154023, 0.0010963057, -0.015035049, -0.021033075, -0.04345236, 0.017287642, 0.016341286, -0.008610498, 0.00236922, 0.009290274, 0.028950468, -0.014475234, -0.0035654926, 0.015434918, -0.03372223, 0.004501851, -0.012929076, -0.008483873, -0.0044685286, -0.0102233, 0.01615468, 0.0022792495, 0.010876419, -0.0059647025, 0.01895376, -0.0069976957, -0.0042952523, 0.017207667, -0.00036133936, 0.0085905045, 0.008084005, 0.03129636, -0.016994404, -0.014915089, 0.020100048, -0.012009379, -0.006684466, 0.01306903, 0.00015765642, -0.00530492, 0.0005277429, 0.015421589, 0.015528221, 0.032202728, -0.003485519, -0.0014286962, 0.033908837, 0.001367883, 0.010509873, 0.025271678, -0.020993087, 0.019846799, 0.006897729, -0.010216636, -0.00725761, 0.01818068, -0.028443968, -0.011242964, -0.014435247, -0.013688826, 0.006101324, -0.0022509254, 0.013848773, -0.0019077052, 0.017181009, 0.03422873, 0.005324913, -0.0035188415, 0.014128681, -0.004898387, 0.005038341, 0.0012320944, -0.005561502, -0.017847456, 0.0008538855, -0.0047884234, 0.011849431, 0.015421589, -0.013942076, 0.0029790192, -0.013702155, 0.0001199605, -0.024431955, 0.019926772, 0.022179363, -0.016487904, -0.03964028, 0.0050849924, 0.017487574, 0.022792496, 0.0012504216, 0.004048667, -0.00997005, 0.0076041627, -0.014328616, -0.020259995, 0.0005598157, -0.010469886, 0.0016852784, 0.01716768, -0.008990373, -0.001987679, 0.026417969, 0.023792166, 0.0046917885, -0.0071909656, -0.00032051947, -0.023259008, -0.009170313, 0.02071318, -0.03156294, -0.030869836, -0.006324584, 0.013795458, -0.00047151142, 0.016874444, 0.00947688, 0.00985009, -0.029883493, 0.024205362, -0.013522214, -0.015075036, -0.030603256, 0.029270362, 0.010503208, 0.021539574, 0.01743426, -0.023898797, 0.022019416, -0.0068777353, 0.027857494, -0.021259667, 0.0025758184, 0.006197959, 0.006447877, -0.00025200035, -0.004941706, -0.021246338, -0.005504854, -0.008390571, -0.0097301295, 0.027244363, -0.04446536, 0.05216949, 0.010243294, -0.016008062, 0.0122493, -0.0199401, 0.009077012, 0.019753495, 0.006431216, -0.037960835, -0.027377652, 0.016381273, -0.0038620618, 0.022512587, -0.010996379, -0.0015211658, -0.0102233, 0.007071005, 0.008230623, -0.009490209, -0.010083347, 0.024431955, 0.002427534, 0.02828402, 0.0035721571, -0.022192692, -0.011882754, 0.010056688, 0.0011904413, -0.01426197, -0.017500903, -0.00010985966, 0.005591492, -0.0077707744, -0.012049366, 0.011869425, 0.00858384, -0.024698535, -0.030283362, 0.020140035, 0.011949399, -0.013968734, 0.042732596, -0.011649498, -0.011982721, -0.016967745, -0.0060913274, -0.007130985, -0.013109017, -0.009710136
      };

      // Define the pipeline with vectorSearch query options
      mongocxx::pipeline stages;

      stages
          .append_stage(make_document(
              kvp("$vectorSearch",
                  make_document(kvp("index", "vector_index"),
                                kvp("path", "plot_embedding"),
                                kvp("queryVector", vectors),
                                kvp("numCandidates", 150), kvp("limit", 10)))))
          .project(make_document(
              kvp("_id", 0), kvp("plot", 1), kvp("title", 1),
              kvp("score", make_document(kvp("$meta", "vectorSearchScore")))));

      auto cursor = collection.aggregate(stages);

      for (auto&& doc : cursor) {
        std::cout << bsoncxx::to_json(doc) << std::endl;
      }
    } catch (const std::exception& e) {
      std::cout << "Exception: " << e.what() << std::endl;
    }
    return 0;
  }

  ```

This query uses the `$vectorSearch` stage to:

- Compare vector embeddings of the search term against vector embeddings of movie plots in the `plot_embedding` field of the `sample_mflix.embedded_movies` collection.

- Consider up to the 150 most similar movie plots and return the top 10 results.

It uses the `$project` stage to:

- Only include the movie `plot` and `title` fields in the results.

- Add a `score` field to show the relevance of each result to the search term.

To learn more about this pipeline stage, see Run Vector Search Queries.

### Specify the `<connection-string>`.

Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

<Tabs>

<Tab name="Atlas Cluster">

Your connection string should use the following format:

```
mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
```

Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

</Tab>

<Tab name="Local Deployment">

Your connection string should use the following format:

```
mongodb://localhost:<port-number>/?directConnection=true
```

</Tab>

</Tabs>

### Compile and run your query.

- Replace the `vector_index.cpp` file name in your `CMakeLists.txt` file with your new `atlas_vector_search_quick_start.cpp` filename.

- Navigate to the `/build` directory, and prepare the project.

  ```bash
  cmake ../
  ```

- Build the app.

  ```bash
  cmake --build .
  ```

- Execute the app to run the query.

  ```bash
  ./query_quick_start
  ```

  ```js
  \'{"plot":"A reporter, learning of time travelers visiting 20th century disasters, tries to change the history they know by averting upcoming disasters.","title":"Thrill Seekers","score":0.7892671227455139}\'
  \'{"plot":"At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.","title":"About Time","score":0.7843604683876038}\'
  \'{"plot":"Hoping to alter the events of the past, a 19th century inventor instead travels 800,000 years into the future, where he finds humankind divided into two warring races.","title":"The Time Machine","score":0.7801066637039185}\'
  `{"plot":"After using his mother\'s newly built time machine, Dolf gets stuck involuntary in the year 1212. He ends up in a children\'s crusade where he confronts his new friends with modern techniques...","title":"Crusade in Jeans","score":0.7789170742034912}`
  \'{"plot":"An officer for a security agency that regulates time travel, must fend for his life against a shady politician who has a tie to his past.","title":"Timecop","score":0.7771612405776978}\'
  \'{"plot":"A time-travel experiment in which a robot probe is sent from the year 2073 to the year 1973 goes terribly wrong thrusting one of the project scientists, a man named Nicholas Sinclair into a...","title":"A.P.E.X.","score":0.7730885744094849}\'
  `{"plot":"Agent J travels in time to M.I.B.\'s early days in 1969 to stop an alien from assassinating his friend Agent K and changing history.","title":"Men in Black 3","score":0.7712380886077881}`
  \'{"plot":"Bound by a shared destiny, a teen bursting with scientific curiosity and a former boy-genius inventor embark on a mission to unearth the secrets of a place somewhere in time and space that exists in their collective memory.","title":"Tomorrowland","score":0.7669923901557922}\'
  \'{"plot":"With the help of his uncle, a man travels to the future to try and bring his girlfriend back to life.","title":"Love Story 2050","score":0.7649372816085815}\'
  \'{"plot":"A dimension-traveling wizard gets stuck in the 21st century because cell-phone radiation interferes with his magic. With his home world on the brink of war, he seeks help from a jaded ...","title":"The Portal","score":0.7640786170959473}\'

  ```

</Tab>

<Tab name="C#">

### Construct your vector search query.

This query searches for documents that include text in the `plot` field that is semantically related to the term "time travel".

- Create a new file called `DatabaseService.cs`.

- Copy and paste the following sample query into the `DatabaseService.cs` file:

  ```csharp
  namespace query_quick_start;

  using MongoDB.Bson;
  using MongoDB.Bson.Serialization.Attributes;
  using MongoDB.Bson.Serialization.Conventions;
  using MongoDB.Driver;

  public class DatabaseService
  {
    // Replace the placeholder with your Atlas connection string
    private const string MongoConnectionString = "<connection-string>";

    public void RunVectorQuery(){
      var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
      ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

      // connect to your Atlas cluster
      var mongoClient = new MongoClient(MongoConnectionString);

      // define namespace
      var moviesDatabase = mongoClient.GetDatabase("sample_mflix");
      var moviesCollection = moviesDatabase.GetCollection<EmbeddedMovie>("embedded_movies");

      // define vector embeddings to search
      var vector = new[] {-0.0016261312,-0.028070757,-0.011342932,-0.012775794,-0.0027440966,0.008683807,-0.02575152,-0.02020668,-0.010283281,-0.0041719596,0.021392956,0.028657231,-0.006634482,0.007490867,0.018593878,0.0038187427,0.029590257,-0.01451522,0.016061379,0.00008528442,-0.008943722,0.01627464,0.024311995,-0.025911469,0.00022596726,-0.008863748,0.008823762,-0.034921836,0.007910728,-0.01515501,0.035801545,-0.0035688248,-0.020299982,-0.03145631,-0.032256044,-0.028763862,-0.0071576433,-0.012769129,0.012322609,-0.006621153,0.010583182,0.024085402,-0.001623632,0.007864078,-0.021406285,0.002554159,0.012229307,-0.011762793,0.0051682983,0.0048484034,0.018087378,0.024325324,-0.037694257,-0.026537929,-0.008803768,-0.017767483,-0.012642504,-0.0062712682,0.0009771782,-0.010409906,0.017754154,-0.004671795,-0.030469967,0.008477209,-0.005218282,-0.0058480743,-0.020153364,-0.0032805866,0.004248601,0.0051449724,0.006791097,0.007650814,0.003458861,-0.0031223053,-0.01932697,-0.033615597,0.00745088,0.006321252,-0.0038154104,0.014555207,0.027697546,-0.02828402,0.0066711367,0.0077107945,0.01794076,0.011349596,-0.0052715978,0.014755142,-0.019753495,-0.011156326,0.011202978,0.022126047,0.00846388,0.030549942,-0.0041386373,0.018847128,-0.00033655585,0.024925126,-0.003555496,-0.019300312,0.010749794,0.0075308536,-0.018287312,-0.016567878,-0.012869096,-0.015528221,0.0078107617,-0.011156326,0.013522214,-0.020646535,-0.01211601,0.055928253,0.011596181,-0.017247654,0.0005939711,-0.026977783,-0.003942035,-0.009583511,-0.0055248477,-0.028737204,0.023179034,0.003995351,0.0219661,-0.008470545,0.023392297,0.010469886,-0.015874773,0.007890735,-0.009690142,-0.00024970944,0.012775794,0.0114762215,0.013422247,0.010429899,-0.03686786,-0.006717788,-0.027484283,0.011556195,-0.036068123,-0.013915418,-0.0016327957,0.0151016945,-0.020473259,0.004671795,-0.012555866,0.0209531,0.01982014,0.024485271,0.0105431955,-0.005178295,0.033162415,-0.013795458,0.007150979,0.010243294,0.005644808,0.017260984,-0.0045618312,0.0024725192,0.004305249,-0.008197301,0.0014203656,0.0018460588,0.005015015,-0.011142998,0.01439526,0.022965772,0.02552493,0.007757446,-0.0019726837,0.009503538,-0.032042783,0.008403899,-0.04609149,0.013808787,0.011749465,0.036388017,0.016314628,0.021939443,-0.0250051,-0.017354285,-0.012962398,0.00006107364,0.019113706,0.03081652,-0.018114036,-0.0084572155,0.009643491,-0.0034721901,0.0072642746,-0.0090636825,0.01642126,0.013428912,0.027724205,0.0071243206,-0.6858542,-0.031029783,-0.014595194,-0.011449563,0.017514233,0.01743426,0.009950057,0.0029706885,-0.015714826,-0.001806072,0.011856096,0.026444625,-0.0010663156,-0.006474535,0.0016161345,-0.020313311,0.0148351155,-0.0018393943,0.0057347785,0.018300641,-0.018647194,0.03345565,-0.008070676,0.0071443142,0.014301958,0.0044818576,0.003838736,-0.007350913,-0.024525259,-0.001142124,-0.018620536,0.017247654,0.007037683,0.010236629,0.06046009,0.0138887605,-0.012122675,0.037694257,0.0055081863,0.042492677,0.00021784494,-0.011656162,0.010276617,0.022325981,0.005984696,-0.009496873,0.013382261,-0.0010563189,0.0026507939,-0.041639622,0.008637156,0.026471283,-0.008403899,0.024858482,-0.00066686375,-0.0016252982,0.027590916,0.0051449724,0.0058647357,-0.008743787,-0.014968405,0.027724205,-0.011596181,0.0047650975,-0.015381602,0.0043718936,0.002159289,0.035908177,-0.008243952,-0.030443309,0.027564257,0.042625964,-0.0033688906,0.01843393,0.019087048,0.024578573,0.03268257,-0.015608194,-0.014128681,-0.0033538956,-0.0028757197,-0.004121976,-0.032389335,0.0034322033,0.058807302,0.010943064,-0.030523283,0.008903735,0.017500903,0.00871713,-0.0029406983,0.013995391,-0.03132302,-0.019660193,-0.00770413,-0.0038853872,0.0015894766,-0.0015294964,-0.006251275,-0.021099718,-0.010256623,-0.008863748,0.028550599,0.02020668,-0.0012962399,-0.003415542,-0.0022509254,0.0119360695,0.027590916,-0.046971202,-0.0015194997,-0.022405956,0.0016677842,-0.00018535563,-0.015421589,-0.031802863,0.03814744,0.0065411795,0.016567878,-0.015621523,0.022899127,-0.011076353,0.02841731,-0.002679118,-0.002342562,0.015341615,0.01804739,-0.020566562,-0.012989056,-0.002990682,0.01643459,0.00042527664,0.008243952,-0.013715484,-0.004835075,-0.009803439,0.03129636,-0.021432944,0.0012087687,-0.015741484,-0.0052016205,0.00080890034,-0.01755422,0.004811749,-0.017967418,-0.026684547,-0.014128681,0.0041386373,-0.013742141,-0.010056688,-0.013268964,-0.0110630235,-0.028337335,0.015981404,-0.00997005,-0.02424535,-0.013968734,-0.028310679,-0.027750863,-0.020699851,0.02235264,0.001057985,0.00081639783,-0.0099367285,0.013522214,-0.012016043,-0.00086471526,0.013568865,0.0019376953,-0.019020405,0.017460918,-0.023045745,0.008503866,0.0064678704,-0.011509543,0.018727167,-0.003372223,-0.0028690554,-0.0027024434,-0.011902748,-0.012182655,-0.015714826,-0.0098634185,0.00593138,0.018753825,0.0010146659,0.013029044,0.0003521757,-0.017620865,0.04102649,0.00552818,0.024485271,-0.009630162,-0.015608194,0.0006718621,-0.0008418062,0.012395918,0.0057980907,0.016221326,0.010616505,0.004838407,-0.012402583,0.019900113,-0.0034521967,0.000247002,-0.03153628,0.0011038032,-0.020819811,0.016234655,-0.00330058,-0.0032289368,0.00078973995,-0.021952773,-0.022459272,0.03118973,0.03673457,-0.021472929,0.0072109587,-0.015075036,0.004855068,-0.0008151483,0.0069643734,0.010023367,-0.010276617,-0.023019087,0.0068244194,-0.0012520878,-0.0015086699,0.022046074,-0.034148756,-0.0022192693,0.002427534,-0.0027124402,0.0060346797,0.015461575,0.0137554705,0.009230294,-0.009583511,0.032629255,0.015994733,-0.019167023,-0.009203636,0.03393549,-0.017274313,-0.012042701,-0.0009930064,0.026777849,-0.013582194,-0.0027590916,-0.017594207,-0.026804507,-0.0014236979,-0.022032745,0.0091236625,-0.0042419364,-0.00858384,-0.0033905501,-0.020739838,0.016821127,0.022539245,0.015381602,0.015141681,0.028817179,-0.019726837,-0.0051283115,-0.011489551,-0.013208984,-0.0047017853,-0.0072309524,0.01767418,0.0025658219,-0.010323267,0.012609182,-0.028097415,0.026871152,-0.010276617,0.021912785,0.0022542577,0.005124979,-0.0019710176,0.004518512,-0.040360045,0.010969722,-0.0031539614,-0.020366628,-0.025778178,-0.0110030435,-0.016221326,0.0036587953,0.016207997,0.003007343,-0.0032555948,0.0044052163,-0.022046074,-0.0008822095,-0.009363583,0.028230704,-0.024538586,0.0029840174,0.0016044717,-0.014181997,0.031349678,-0.014381931,-0.027750863,0.02613806,0.0004136138,-0.005748107,-0.01868718,-0.0010138329,0.0054348772,0.010703143,-0.003682121,0.0030856507,-0.004275259,-0.010403241,0.021113047,-0.022685863,-0.023032416,0.031429652,0.001792743,-0.005644808,-0.011842767,-0.04078657,-0.0026874484,0.06915057,-0.00056939584,-0.013995391,0.010703143,-0.013728813,-0.022939114,-0.015261642,-0.022485929,0.016807798,0.007964044,0.0144219175,0.016821127,0.0076241563,0.005461535,-0.013248971,0.015301628,0.0085171955,-0.004318578,0.011136333,-0.0059047225,-0.010249958,-0.018207338,0.024645219,0.021752838,0.0007614159,-0.013648839,0.01111634,-0.010503208,-0.0038487327,-0.008203966,-0.00397869,0.0029740208,0.008530525,0.005261601,0.01642126,-0.0038753906,-0.013222313,0.026537929,0.024671877,-0.043505676,0.014195326,0.024778508,0.0056914594,-0.025951454,0.017620865,-0.0021359634,0.008643821,0.021299653,0.0041686273,-0.009017031,0.04044002,0.024378639,-0.027777521,-0.014208655,0.0028623908,0.042119466,0.005801423,-0.028124074,-0.03129636,0.022139376,-0.022179363,-0.04067994,0.013688826,0.013328944,0.0046184794,-0.02828402,-0.0063412455,-0.0046184794,-0.011756129,-0.010383247,-0.0018543894,-0.0018593877,-0.00052024535,0.004815081,0.014781799,0.018007403,0.01306903,-0.020433271,0.009043689,0.033189073,-0.006844413,-0.019766824,-0.018767154,0.00533491,-0.0024575242,0.018727167,0.0058080875,-0.013835444,0.0040719924,0.004881726,0.012029372,0.005664801,0.03193615,0.0058047553,0.002695779,0.009290274,0.02361889,0.017834127,0.0049017193,-0.0036388019,0.010776452,-0.019793482,0.0067777685,-0.014208655,-0.024911797,0.002385881,0.0034988478,0.020899786,-0.0025858153,-0.011849431,0.033189073,-0.021312982,0.024965113,-0.014635181,0.014048708,-0.0035921505,-0.003347231,0.030869836,-0.0017161017,-0.0061346465,0.009203636,-0.025165047,0.0068510775,0.021499587,0.013782129,-0.0024475274,-0.0051149824,-0.024445284,0.006167969,0.0068844,-0.00076183246,0.030150073,-0.0055948244,-0.011162991,-0.02057989,-0.009703471,-0.020646535,0.008004031,0.0066378145,-0.019900113,-0.012169327,-0.01439526,0.0044252095,-0.004018677,0.014621852,-0.025085073,-0.013715484,-0.017980747,0.0071043274,0.011456228,-0.01010334,-0.0035321703,-0.03801415,-0.012036037,-0.0028990454,-0.05419549,-0.024058744,-0.024272008,0.015221654,0.027964126,0.03182952,-0.015354944,0.004855068,0.011522872,0.004771762,0.0027874154,0.023405626,0.0004242353,-0.03132302,0.007057676,0.008763781,-0.0027057757,0.023005757,-0.0071176565,-0.005238275,0.029110415,-0.010989714,0.013728813,-0.009630162,-0.029137073,-0.0049317093,-0.0008630492,-0.015248313,0.0043219104,-0.0055681667,-0.013175662,0.029723546,0.025098402,0.012849103,-0.0009996708,0.03118973,-0.0021709518,0.0260181,-0.020526575,0.028097415,-0.016141351,0.010509873,-0.022965772,0.002865723,0.0020493253,0.0020509914,-0.0041419696,-0.00039695262,0.017287642,0.0038987163,0.014795128,-0.014661839,-0.008950386,0.004431874,-0.009383577,0.0012604183,-0.023019087,0.0029273694,-0.033135757,0.009176978,-0.011023037,-0.002102641,0.02663123,-0.03849399,-0.0044152127,0.0004527676,-0.0026924468,0.02828402,0.017727496,0.035135098,0.02728435,-0.005348239,-0.001467017,-0.019766824,0.014715155,0.011982721,0.0045651635,0.023458943,-0.0010046692,-0.0031373003,-0.0006972704,0.0019043729,-0.018967088,-0.024311995,0.0011546199,0.007977373,-0.004755101,-0.010016702,-0.02780418,-0.004688456,0.013022379,-0.005484861,0.0017227661,-0.015394931,-0.028763862,-0.026684547,0.0030589928,-0.018513903,0.028363993,0.0044818576,-0.009270281,0.038920518,-0.016008062,0.0093902415,0.004815081,-0.021059733,0.01451522,-0.0051583014,0.023765508,-0.017874114,-0.016821127,-0.012522544,-0.0028390652,0.0040886537,0.020259995,-0.031216389,-0.014115352,-0.009176978,0.010303274,0.020313311,0.0064112223,-0.02235264,-0.022872468,0.0052449396,0.0005723116,0.0037321046,0.016807798,-0.018527232,-0.009303603,0.0024858483,-0.0012662497,-0.007110992,0.011976057,-0.007790768,-0.042999174,-0.006727785,-0.011829439,0.007024354,0.005278262,-0.017740825,-0.0041519664,0.0085905045,0.027750863,-0.038387362,0.024391968,0.00087721116,0.010509873,-0.00038508154,-0.006857742,0.0183273,-0.0037054466,0.015461575,0.0017394272,-0.0017944091,0.014181997,-0.0052682655,0.009023695,0.00719763,-0.013522214,0.0034422,0.014941746,-0.0016711164,-0.025298337,-0.017634194,0.0058714002,-0.005321581,0.017834127,0.0110630235,-0.03369557,0.029190388,-0.008943722,0.009363583,-0.0034222065,-0.026111402,-0.007037683,-0.006561173,0.02473852,-0.007084334,-0.010110005,-0.008577175,0.0030439978,-0.022712521,0.0054582027,-0.0012620845,-0.0011954397,-0.015741484,0.0129557345,-0.00042111133,0.00846388,0.008930393,0.016487904,0.010469886,-0.007917393,-0.011762793,-0.0214596,0.000917198,0.021672864,0.010269952,-0.007737452,-0.010243294,-0.0067244526,-0.015488233,-0.021552904,0.017127695,0.011109675,0.038067464,0.00871713,-0.0025591573,0.021312982,-0.006237946,0.034628596,-0.0045251767,0.008357248,0.020686522,0.0010696478,0.0076708077,0.03772091,-0.018700508,-0.0020676525,-0.008923728,-0.023298996,0.018233996,-0.010256623,0.0017860786,0.009796774,-0.00897038,-0.01269582,-0.018527232,0.009190307,-0.02372552,-0.042119466,0.008097334,-0.0066778013,-0.021046404,0.0019593548,0.011083017,-0.0016028056,0.012662497,-0.000059095124,0.0071043274,-0.014675168,0.024831824,-0.053582355,0.038387362,0.0005698124,0.015954746,0.021552904,0.031589597,-0.009230294,-0.0006147976,0.002625802,-0.011749465,-0.034362018,-0.0067844326,-0.018793812,0.011442899,-0.008743787,0.017474247,-0.021619547,0.01831397,-0.009037024,-0.0057247817,-0.02728435,0.010363255,0.034415334,-0.024032086,-0.0020126705,-0.0045518344,-0.019353628,-0.018340627,-0.03129636,-0.0034038792,-0.006321252,-0.0016161345,0.033642255,-0.000056075285,-0.005005019,0.004571828,-0.0024075406,-0.00010215386,0.0098634185,0.1980148,-0.003825407,-0.025191706,0.035161756,0.005358236,0.025111731,0.023485601,0.0023342315,-0.011882754,0.018287312,-0.0068910643,0.003912045,0.009243623,-0.001355387,-0.028603915,-0.012802451,-0.030150073,-0.014795128,-0.028630573,-0.0013487226,0.002667455,0.00985009,-0.0033972147,-0.021486258,0.009503538,-0.017847456,0.013062365,-0.014341944,0.005078328,0.025165047,-0.015594865,-0.025924796,-0.0018177348,0.010996379,-0.02993681,0.007324255,0.014475234,-0.028577257,0.005494857,0.00011725306,-0.013315615,0.015941417,0.009376912,0.0025158382,0.008743787,0.023832154,-0.008084005,-0.014195326,-0.008823762,0.0033455652,-0.032362677,-0.021552904,-0.0056081535,0.023298996,-0.025444955,0.0097301295,0.009736794,0.015274971,-0.0012937407,-0.018087378,-0.0039387033,0.008637156,-0.011189649,-0.00023846315,-0.011582852,0.0066411467,-0.018220667,0.0060846633,0.0376676,-0.002709108,0.0072776037,0.0034188742,-0.010249958,-0.0007747449,-0.00795738,-0.022192692,0.03910712,0.032122757,0.023898797,0.0076241563,-0.007397564,-0.003655463,0.011442899,-0.014115352,-0.00505167,-0.031163072,0.030336678,-0.006857742,-0.022259338,0.004048667,0.02072651,0.0030156737,-0.0042119464,0.00041861215,-0.005731446,0.011103011,0.013822115,0.021512916,0.009216965,-0.006537847,-0.027057758,-0.04054665,0.010403241,-0.0056281467,-0.005701456,-0.002709108,-0.00745088,-0.0024841821,0.009356919,-0.022659205,0.004061996,-0.013175662,0.017074378,-0.006141311,-0.014541878,0.02993681,-0.00028448965,-0.025271678,0.011689484,-0.014528549,0.004398552,-0.017274313,0.0045751603,0.012455898,0.004121976,-0.025458284,-0.006744446,0.011822774,-0.015035049,-0.03257594,0.014675168,-0.0039187097,0.019726837,-0.0047251107,0.0022825818,0.011829439,0.005391558,-0.016781142,-0.0058747325,0.010309938,-0.013049036,0.01186276,-0.0011246296,0.0062112883,0.0028190718,-0.021739509,0.009883412,-0.0073175905,-0.012715813,-0.017181009,-0.016607866,-0.042492677,-0.0014478565,-0.01794076,0.012302616,-0.015194997,-0.04433207,-0.020606548,0.009696807,0.010303274,-0.01694109,-0.004018677,0.019353628,-0.001991011,0.000058938927,0.010536531,-0.17274313,0.010143327,0.014235313,-0.024152048,0.025684876,-0.0012504216,0.036601283,-0.003698782,0.0007310093,0.004165295,-0.0029157067,0.017101036,-0.046891227,-0.017460918,0.022965772,0.020233337,-0.024072073,0.017220996,0.009370248,0.0010363255,0.0194336,-0.019606877,0.01818068,-0.020819811,0.007410893,0.0019326969,0.017887443,0.006651143,0.00067394477,-0.011889419,-0.025058415,-0.008543854,0.021579562,0.0047484366,0.014062037,0.0075508473,-0.009510202,-0.009143656,0.0046817916,0.013982063,-0.0027990784,0.011782787,0.014541878,-0.015701497,-0.029350337,0.021979429,0.01332228,-0.026244693,-0.0123492675,-0.003895384,0.0071576433,-0.035454992,-0.00046984528,0.0033522295,0.039347045,0.0005119148,0.00476843,-0.012995721,0.0024042083,-0.006931051,-0.014461905,-0.0127558,0.0034555288,-0.0074842023,-0.030256703,-0.007057676,-0.00807734,0.007804097,-0.006957709,0.017181009,-0.034575284,-0.008603834,-0.005008351,-0.015834786,0.02943031,0.016861115,-0.0050849924,0.014235313,0.0051449724,0.0025924798,-0.0025741523,0.04289254,-0.002104307,0.012969063,-0.008310596,0.00423194,0.0074975314,0.0018810473,-0.014248641,-0.024725191,0.0151016945,-0.017527562,0.0018727167,0.0002830318,0.015168339,0.0144219175,-0.004048667,-0.004358565,0.011836103,-0.010343261,-0.005911387,0.0022825818,0.0073175905,0.00403867,0.013188991,0.03334902,0.006111321,0.008597169,0.030123414,-0.015474904,0.0017877447,-0.024551915,0.013155668,0.023525586,-0.0255116,0.017220996,0.004358565,-0.00934359,0.0099967085,0.011162991,0.03092315,-0.021046404,-0.015514892,0.0011946067,-0.01816735,0.010876419,-0.10124666,-0.03550831,0.0056348112,0.013942076,0.005951374,0.020419942,-0.006857742,-0.020873128,-0.021259667,0.0137554705,0.0057880944,-0.029163731,-0.018767154,-0.021392956,0.030896494,-0.005494857,-0.0027307675,-0.006801094,-0.014821786,0.021392956,-0.0018110704,-0.0018843795,-0.012362596,-0.0072176233,-0.017194338,-0.018713837,-0.024272008,0.03801415,0.00015880188,0.0044951867,-0.028630573,-0.0014070367,-0.00916365,-0.026537929,-0.009576847,-0.013995391,-0.0077107945,0.0050016865,0.00578143,-0.04467862,0.008363913,0.010136662,-0.0006268769,-0.006591163,0.015341615,-0.027377652,-0.00093136,0.029243704,-0.020886457,-0.01041657,-0.02424535,0.005291591,-0.02980352,-0.009190307,0.019460259,-0.0041286405,0.004801752,0.0011787785,-0.001257086,-0.011216307,-0.013395589,0.00088137644,-0.0051616337,0.03876057,-0.0033455652,0.00075850025,-0.006951045,-0.0062112883,0.018140694,-0.006351242,-0.008263946,0.018154023,-0.012189319,0.0075508473,-0.044358727,-0.0040153447,0.0093302615,-0.010636497,0.032789204,-0.005264933,-0.014235313,-0.018393943,0.007297597,-0.016114693,0.015021721,0.020033404,0.0137688,0.0011046362,0.010616505,-0.0039453674,0.012109346,0.021099718,-0.0072842683,-0.019153694,-0.003768759,0.039320387,-0.006747778,-0.0016852784,0.018154023,0.0010963057,-0.015035049,-0.021033075,-0.04345236,0.017287642,0.016341286,-0.008610498,0.00236922,0.009290274,0.028950468,-0.014475234,-0.0035654926,0.015434918,-0.03372223,0.004501851,-0.012929076,-0.008483873,-0.0044685286,-0.0102233,0.01615468,0.0022792495,0.010876419,-0.0059647025,0.01895376,-0.0069976957,-0.0042952523,0.017207667,-0.00036133936,0.0085905045,0.008084005,0.03129636,-0.016994404,-0.014915089,0.020100048,-0.012009379,-0.006684466,0.01306903,0.00015765642,-0.00530492,0.0005277429,0.015421589,0.015528221,0.032202728,-0.003485519,-0.0014286962,0.033908837,0.001367883,0.010509873,0.025271678,-0.020993087,0.019846799,0.006897729,-0.010216636,-0.00725761,0.01818068,-0.028443968,-0.011242964,-0.014435247,-0.013688826,0.006101324,-0.0022509254,0.013848773,-0.0019077052,0.017181009,0.03422873,0.005324913,-0.0035188415,0.014128681,-0.004898387,0.005038341,0.0012320944,-0.005561502,-0.017847456,0.0008538855,-0.0047884234,0.011849431,0.015421589,-0.013942076,0.0029790192,-0.013702155,0.0001199605,-0.024431955,0.019926772,0.022179363,-0.016487904,-0.03964028,0.0050849924,0.017487574,0.022792496,0.0012504216,0.004048667,-0.00997005,0.0076041627,-0.014328616,-0.020259995,0.0005598157,-0.010469886,0.0016852784,0.01716768,-0.008990373,-0.001987679,0.026417969,0.023792166,0.0046917885,-0.0071909656,-0.00032051947,-0.023259008,-0.009170313,0.02071318,-0.03156294,-0.030869836,-0.006324584,0.013795458,-0.00047151142,0.016874444,0.00947688,0.00985009,-0.029883493,0.024205362,-0.013522214,-0.015075036,-0.030603256,0.029270362,0.010503208,0.021539574,0.01743426,-0.023898797,0.022019416,-0.0068777353,0.027857494,-0.021259667,0.0025758184,0.006197959,0.006447877,-0.00025200035,-0.004941706,-0.021246338,-0.005504854,-0.008390571,-0.0097301295,0.027244363,-0.04446536,0.05216949,0.010243294,-0.016008062,0.0122493,-0.0199401,0.009077012,0.019753495,0.006431216,-0.037960835,-0.027377652,0.016381273,-0.0038620618,0.022512587,-0.010996379,-0.0015211658,-0.0102233,0.007071005,0.008230623,-0.009490209,-0.010083347,0.024431955,0.002427534,0.02828402,0.0035721571,-0.022192692,-0.011882754,0.010056688,0.0011904413,-0.01426197,-0.017500903,-0.00010985966,0.005591492,-0.0077707744,-0.012049366,0.011869425,0.00858384,-0.024698535,-0.030283362,0.020140035,0.011949399,-0.013968734,0.042732596,-0.011649498,-0.011982721,-0.016967745,-0.0060913274,-0.007130985,-0.013109017,-0.009710136};
      var options = new VectorSearchOptions<EmbeddedMovie>() {
          IndexName = "vector_index",
          NumberOfCandidates = 150
      };

      // run query
      var results = moviesCollection.Aggregate()
                  .VectorSearch(movie => movie.Embedding, vector, 10, options)
                  .Project(Builders<EmbeddedMovie>.Projection
                    .Include(movie => movie.Title)
                    .Include(movie => movie.Plot)
                    .Exclude(movie => movie.Id)
                    .MetaVectorSearchScore(movie => movie.Score))
                  .ToList();

      // print results
      foreach (var movie in results)
        {
          Console.WriteLine(movie.ToJson());
        }
    }
  }

  [BsonIgnoreExtraElements]
  public class EmbeddedMovie
  {
      [BsonIgnoreIfDefault]
      public ObjectId Id { get; set; }
      public string? Title { get; set; }
      public string? Plot { get; set; }
      [BsonElement("plot_embedding")]
      public double[]? Embedding { get; set; }
      public double Score { get; set; }
  }
  ```

This query uses the `$vectorSearch` stage to:

- Compare vector embeddings of the search term against vector embeddings of movie plots in the `plot_embedding` field of the `sample_mflix.embedded_movies` collection.

- Consider up to the 150 most similar movie plots and return the top 10 results.

It uses the `$project` stage to:

- Only include the movie `plot` and `title` fields in the results.

- Add a `score` field to show the relevance of each result to the search term.

To learn more about this pipeline stage, see Run Vector Search Queries.

### Specify the `<connection-string>`.

Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

<Tabs>

<Tab name="Atlas Cluster">

Your connection string should use the following format:

```
mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
```

Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

</Tab>

<Tab name="Local Deployment">

Your connection string should use the following format:

```
mongodb://localhost:<port-number>/?directConnection=true
```

</Tab>

</Tabs>

### Update your `Program.cs` file.

Remove the index creation code from your `Program.cs` file. Instead, initialize the `DatabaseService` object and call the method to run the query:

```csharp
using query_quick_start;

var databaseService = new DatabaseService();
databaseService.RunVectorQuery();
```

### Run your query.

Compile and run your project.

```shell
dotnet run query-quick-start.csproj
```

```js
{ "plot" : "A reporter, learning of time travelers visiting 20th century disasters, tries to change the history they know by averting upcoming disasters.", "title" : "Thrill Seekers", "score" : 0.78926712274551392 }
{ "plot" : "At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.", "title" : "About Time", "score" : 0.78436046838760376 }
{ "plot" : "Hoping to alter the events of the past, a 19th century inventor instead travels 800,000 years into the future, where he finds humankind divided into two warring races.", "title" : "The Time Machine", "score" : 0.78010666370391846 }
{ "plot" : "After using his mother\'s newly built time machine, Dolf gets stuck involuntary in the year 1212. He ends up in a children\'s crusade where he confronts his new friends with modern techniques...", "title" : "Crusade in Jeans", "score" : 0.77891707420349121 }
{ "plot" : "An officer for a security agency that regulates time travel, must fend for his life against a shady politician who has a tie to his past.", "title" : "Timecop", "score" : 0.77716124057769775 }
{ "plot" : "A time-travel experiment in which a robot probe is sent from the year 2073 to the year 1973 goes terribly wrong thrusting one of the project scientists, a man named Nicholas Sinclair into a...", "title" : "A.P.E.X.", "score" : 0.77308857440948486 }
{ "plot" : "Agent J travels in time to M.I.B.\'s early days in 1969 to stop an alien from assassinating his friend Agent K and changing history.", "title" : "Men in Black 3", "score" : 0.77123808860778809 }
{ "plot" : "Bound by a shared destiny, a teen bursting with scientific curiosity and a former boy-genius inventor embark on a mission to unearth the secrets of a place somewhere in time and space that exists in their collective memory.", "title" : "Tomorrowland", "score" : 0.76699239015579224 }
{ "plot" : "With the help of his uncle, a man travels to the future to try and bring his girlfriend back to life.", "title" : "Love Story 2050", "score" : 0.76493728160858154 }
{ "plot" : "A dimension-traveling wizard gets stuck in the 21st century because cell-phone radiation interferes with his magic. With his home world on the brink of war, he seeks help from a jaded ...", "title" : "The Portal", "score" : 0.76407861709594727 }

```

</Tab>

<Tab name="Go">

### Construct your vector search query.

This query searches for documents that include text in the `plot` field that is semantically related to the term "time travel".

- Create a file named `atlas_vector_search_quick_start.go` .

- Copy and paste the following sample query into the `atlas_vector_search_quick_start.go` file:

  ```go
  package main

  import (
  \t"context"
  \t"encoding/json"
  \t"fmt"
  \t"log"

  \t"go.mongodb.org/mongo-driver/bson"
  \t"go.mongodb.org/mongo-driver/mongo"
  \t"go.mongodb.org/mongo-driver/mongo/options"
  )

  func main() {
  \tctx := context.Background()

  \t// Replace the placeholder with your Atlas connection string
  \tconst uri = "<connection-string>"

  \t// Connect to your Atlas cluster
  \tclientOptions := options.Client().ApplyURI(uri)
  \tclient, err := mongo.Connect(ctx, clientOptions)
  \tif err != nil {
  \t\tlog.Fatalf("failed to connect to the server: %v", err)
  \t}
  \tdefer func() { _ = client.Disconnect(ctx) }()

  \t// Set the namespace
  \tcoll := client.Database("sample_mflix").Collection("embedded_movies")

  \t// Define the pipeline with $vectorSearch query options
  \tqueryVectorValues := []float64{
  \t\t-0.0016261312, -0.028070757, -0.011342932, -0.012775794, -0.0027440966, 0.008683807, -0.02575152, -0.02020668, -0.010283281, -0.0041719596, 0.021392956, 0.028657231, -0.006634482, 0.007490867, 0.018593878, 0.0038187427, 0.029590257, -0.01451522, 0.016061379, 0.00008528442, -0.008943722, 0.01627464, 0.024311995, -0.025911469, 0.00022596726, -0.008863748, 0.008823762, -0.034921836, 0.007910728, -0.01515501, 0.035801545, -0.0035688248, -0.020299982, -0.03145631, -0.032256044, -0.028763862, -0.0071576433, -0.012769129, 0.012322609, -0.006621153, 0.010583182, 0.024085402, -0.001623632, 0.007864078, -0.021406285, 0.002554159, 0.012229307, -0.011762793, 0.0051682983, 0.0048484034, 0.018087378, 0.024325324, -0.037694257, -0.026537929, -0.008803768, -0.017767483, -0.012642504, -0.0062712682, 0.0009771782, -0.010409906, 0.017754154, -0.004671795, -0.030469967, 0.008477209, -0.005218282, -0.0058480743, -0.020153364, -0.0032805866, 0.004248601, 0.0051449724, 0.006791097, 0.007650814, 0.003458861, -0.0031223053, -0.01932697, -0.033615597, 0.00745088, 0.006321252, -0.0038154104, 0.014555207, 0.027697546, -0.02828402, 0.0066711367, 0.0077107945, 0.01794076, 0.011349596, -0.0052715978, 0.014755142, -0.019753495, -0.011156326, 0.011202978, 0.022126047, 0.00846388, 0.030549942, -0.0041386373, 0.018847128, -0.00033655585, 0.024925126, -0.003555496, -0.019300312, 0.010749794, 0.0075308536, -0.018287312, -0.016567878, -0.012869096, -0.015528221, 0.0078107617, -0.011156326, 0.013522214, -0.020646535, -0.01211601, 0.055928253, 0.011596181, -0.017247654, 0.0005939711, -0.026977783, -0.003942035, -0.009583511, -0.0055248477, -0.028737204, 0.023179034, 0.003995351, 0.0219661, -0.008470545, 0.023392297, 0.010469886, -0.015874773, 0.007890735, -0.009690142, -0.00024970944, 0.012775794, 0.0114762215, 0.013422247, 0.010429899, -0.03686786, -0.006717788, -0.027484283, 0.011556195, -0.036068123, -0.013915418, -0.0016327957, 0.0151016945, -0.020473259, 0.004671795, -0.012555866, 0.0209531, 0.01982014, 0.024485271, 0.0105431955, -0.005178295, 0.033162415, -0.013795458, 0.007150979, 0.010243294, 0.005644808, 0.017260984, -0.0045618312, 0.0024725192, 0.004305249, -0.008197301, 0.0014203656, 0.0018460588, 0.005015015, -0.011142998, 0.01439526, 0.022965772, 0.02552493, 0.007757446, -0.0019726837, 0.009503538, -0.032042783, 0.008403899, -0.04609149, 0.013808787, 0.011749465, 0.036388017, 0.016314628, 0.021939443, -0.0250051, -0.017354285, -0.012962398, 0.00006107364, 0.019113706, 0.03081652, -0.018114036, -0.0084572155, 0.009643491, -0.0034721901, 0.0072642746, -0.0090636825, 0.01642126, 0.013428912, 0.027724205, 0.0071243206, -0.6858542, -0.031029783, -0.014595194, -0.011449563, 0.017514233, 0.01743426, 0.009950057, 0.0029706885, -0.015714826, -0.001806072, 0.011856096, 0.026444625, -0.0010663156, -0.006474535, 0.0016161345, -0.020313311, 0.0148351155, -0.0018393943, 0.0057347785, 0.018300641, -0.018647194, 0.03345565, -0.008070676, 0.0071443142, 0.014301958, 0.0044818576, 0.003838736, -0.007350913, -0.024525259, -0.001142124, -0.018620536, 0.017247654, 0.007037683, 0.010236629, 0.06046009, 0.0138887605, -0.012122675, 0.037694257, 0.0055081863, 0.042492677, 0.00021784494, -0.011656162, 0.010276617, 0.022325981, 0.005984696, -0.009496873, 0.013382261, -0.0010563189, 0.0026507939, -0.041639622, 0.008637156, 0.026471283, -0.008403899, 0.024858482, -0.00066686375, -0.0016252982, 0.027590916, 0.0051449724, 0.0058647357, -0.008743787, -0.014968405, 0.027724205, -0.011596181, 0.0047650975, -0.015381602, 0.0043718936, 0.002159289, 0.035908177, -0.008243952, -0.030443309, 0.027564257, 0.042625964, -0.0033688906, 0.01843393, 0.019087048, 0.024578573, 0.03268257, -0.015608194, -0.014128681, -0.0033538956, -0.0028757197, -0.004121976, -0.032389335, 0.0034322033, 0.058807302, 0.010943064, -0.030523283, 0.008903735, 0.017500903, 0.00871713, -0.0029406983, 0.013995391, -0.03132302, -0.019660193, -0.00770413, -0.0038853872, 0.0015894766, -0.0015294964, -0.006251275, -0.021099718, -0.010256623, -0.008863748, 0.028550599, 0.02020668, -0.0012962399, -0.003415542, -0.0022509254, 0.0119360695, 0.027590916, -0.046971202, -0.0015194997, -0.022405956, 0.0016677842, -0.00018535563, -0.015421589, -0.031802863, 0.03814744, 0.0065411795, 0.016567878, -0.015621523, 0.022899127, -0.011076353, 0.02841731, -0.002679118, -0.002342562, 0.015341615, 0.01804739, -0.020566562, -0.012989056, -0.002990682, 0.01643459, 0.00042527664, 0.008243952, -0.013715484, -0.004835075, -0.009803439, 0.03129636, -0.021432944, 0.0012087687, -0.015741484, -0.0052016205, 0.00080890034, -0.01755422, 0.004811749, -0.017967418, -0.026684547, -0.014128681, 0.0041386373, -0.013742141, -0.010056688, -0.013268964, -0.0110630235, -0.028337335, 0.015981404, -0.00997005, -0.02424535, -0.013968734, -0.028310679, -0.027750863, -0.020699851, 0.02235264, 0.001057985, 0.00081639783, -0.0099367285, 0.013522214, -0.012016043, -0.00086471526, 0.013568865, 0.0019376953, -0.019020405, 0.017460918, -0.023045745, 0.008503866, 0.0064678704, -0.011509543, 0.018727167, -0.003372223, -0.0028690554, -0.0027024434, -0.011902748, -0.012182655, -0.015714826, -0.0098634185, 0.00593138, 0.018753825, 0.0010146659, 0.013029044, 0.0003521757, -0.017620865, 0.04102649, 0.00552818, 0.024485271, -0.009630162, -0.015608194, 0.0006718621, -0.0008418062, 0.012395918, 0.0057980907, 0.016221326, 0.010616505, 0.004838407, -0.012402583, 0.019900113, -0.0034521967, 0.000247002, -0.03153628, 0.0011038032, -0.020819811, 0.016234655, -0.00330058, -0.0032289368, 0.00078973995, -0.021952773, -0.022459272, 0.03118973, 0.03673457, -0.021472929, 0.0072109587, -0.015075036, 0.004855068, -0.0008151483, 0.0069643734, 0.010023367, -0.010276617, -0.023019087, 0.0068244194, -0.0012520878, -0.0015086699, 0.022046074, -0.034148756, -0.0022192693, 0.002427534, -0.0027124402, 0.0060346797, 0.015461575, 0.0137554705, 0.009230294, -0.009583511, 0.032629255, 0.015994733, -0.019167023, -0.009203636, 0.03393549, -0.017274313, -0.012042701, -0.0009930064, 0.026777849, -0.013582194, -0.0027590916, -0.017594207, -0.026804507, -0.0014236979, -0.022032745, 0.0091236625, -0.0042419364, -0.00858384, -0.0033905501, -0.020739838, 0.016821127, 0.022539245, 0.015381602, 0.015141681, 0.028817179, -0.019726837, -0.0051283115, -0.011489551, -0.013208984, -0.0047017853, -0.0072309524, 0.01767418, 0.0025658219, -0.010323267, 0.012609182, -0.028097415, 0.026871152, -0.010276617, 0.021912785, 0.0022542577, 0.005124979, -0.0019710176, 0.004518512, -0.040360045, 0.010969722, -0.0031539614, -0.020366628, -0.025778178, -0.0110030435, -0.016221326, 0.0036587953, 0.016207997, 0.003007343, -0.0032555948, 0.0044052163, -0.022046074, -0.0008822095, -0.009363583, 0.028230704, -0.024538586, 0.0029840174, 0.0016044717, -0.014181997, 0.031349678, -0.014381931, -0.027750863, 0.02613806, 0.0004136138, -0.005748107, -0.01868718, -0.0010138329, 0.0054348772, 0.010703143, -0.003682121, 0.0030856507, -0.004275259, -0.010403241, 0.021113047, -0.022685863, -0.023032416, 0.031429652, 0.001792743, -0.005644808, -0.011842767, -0.04078657, -0.0026874484, 0.06915057, -0.00056939584, -0.013995391, 0.010703143, -0.013728813, -0.022939114, -0.015261642, -0.022485929, 0.016807798, 0.007964044, 0.0144219175, 0.016821127, 0.0076241563, 0.005461535, -0.013248971, 0.015301628, 0.0085171955, -0.004318578, 0.011136333, -0.0059047225, -0.010249958, -0.018207338, 0.024645219, 0.021752838, 0.0007614159, -0.013648839, 0.01111634, -0.010503208, -0.0038487327, -0.008203966, -0.00397869, 0.0029740208, 0.008530525, 0.005261601, 0.01642126, -0.0038753906, -0.013222313, 0.026537929, 0.024671877, -0.043505676, 0.014195326, 0.024778508, 0.0056914594, -0.025951454, 0.017620865, -0.0021359634, 0.008643821, 0.021299653, 0.0041686273, -0.009017031, 0.04044002, 0.024378639, -0.027777521, -0.014208655, 0.0028623908, 0.042119466, 0.005801423, -0.028124074, -0.03129636, 0.022139376, -0.022179363, -0.04067994, 0.013688826, 0.013328944, 0.0046184794, -0.02828402, -0.0063412455, -0.0046184794, -0.011756129, -0.010383247, -0.0018543894, -0.0018593877, -0.00052024535, 0.004815081, 0.014781799, 0.018007403, 0.01306903, -0.020433271, 0.009043689, 0.033189073, -0.006844413, -0.019766824, -0.018767154, 0.00533491, -0.0024575242, 0.018727167, 0.0058080875, -0.013835444, 0.0040719924, 0.004881726, 0.012029372, 0.005664801, 0.03193615, 0.0058047553, 0.002695779, 0.009290274, 0.02361889, 0.017834127, 0.0049017193, -0.0036388019, 0.010776452, -0.019793482, 0.0067777685, -0.014208655, -0.024911797, 0.002385881, 0.0034988478, 0.020899786, -0.0025858153, -0.011849431, 0.033189073, -0.021312982, 0.024965113, -0.014635181, 0.014048708, -0.0035921505, -0.003347231, 0.030869836, -0.0017161017, -0.0061346465, 0.009203636, -0.025165047, 0.0068510775, 0.021499587, 0.013782129, -0.0024475274, -0.0051149824, -0.024445284, 0.006167969, 0.0068844, -0.00076183246, 0.030150073, -0.0055948244, -0.011162991, -0.02057989, -0.009703471, -0.020646535, 0.008004031, 0.0066378145, -0.019900113, -0.012169327, -0.01439526, 0.0044252095, -0.004018677, 0.014621852, -0.025085073, -0.013715484, -0.017980747, 0.0071043274, 0.011456228, -0.01010334, -0.0035321703, -0.03801415, -0.012036037, -0.0028990454, -0.05419549, -0.024058744, -0.024272008, 0.015221654, 0.027964126, 0.03182952, -0.015354944, 0.004855068, 0.011522872, 0.004771762, 0.0027874154, 0.023405626, 0.0004242353, -0.03132302, 0.007057676, 0.008763781, -0.0027057757, 0.023005757, -0.0071176565, -0.005238275, 0.029110415, -0.010989714, 0.013728813, -0.009630162, -0.029137073, -0.0049317093, -0.0008630492, -0.015248313, 0.0043219104, -0.0055681667, -0.013175662, 0.029723546, 0.025098402, 0.012849103, -0.0009996708, 0.03118973, -0.0021709518, 0.0260181, -0.020526575, 0.028097415, -0.016141351, 0.010509873, -0.022965772, 0.002865723, 0.0020493253, 0.0020509914, -0.0041419696, -0.00039695262, 0.017287642, 0.0038987163, 0.014795128, -0.014661839, -0.008950386, 0.004431874, -0.009383577, 0.0012604183, -0.023019087, 0.0029273694, -0.033135757, 0.009176978, -0.011023037, -0.002102641, 0.02663123, -0.03849399, -0.0044152127, 0.0004527676, -0.0026924468, 0.02828402, 0.017727496, 0.035135098, 0.02728435, -0.005348239, -0.001467017, -0.019766824, 0.014715155, 0.011982721, 0.0045651635, 0.023458943, -0.0010046692, -0.0031373003, -0.0006972704, 0.0019043729, -0.018967088, -0.024311995, 0.0011546199, 0.007977373, -0.004755101, -0.010016702, -0.02780418, -0.004688456, 0.013022379, -0.005484861, 0.0017227661, -0.015394931, -0.028763862, -0.026684547, 0.0030589928, -0.018513903, 0.028363993, 0.0044818576, -0.009270281, 0.038920518, -0.016008062, 0.0093902415, 0.004815081, -0.021059733, 0.01451522, -0.0051583014, 0.023765508, -0.017874114, -0.016821127, -0.012522544, -0.0028390652, 0.0040886537, 0.020259995, -0.031216389, -0.014115352, -0.009176978, 0.010303274, 0.020313311, 0.0064112223, -0.02235264, -0.022872468, 0.0052449396, 0.0005723116, 0.0037321046, 0.016807798, -0.018527232, -0.009303603, 0.0024858483, -0.0012662497, -0.007110992, 0.011976057, -0.007790768, -0.042999174, -0.006727785, -0.011829439, 0.007024354, 0.005278262, -0.017740825, -0.0041519664, 0.0085905045, 0.027750863, -0.038387362, 0.024391968, 0.00087721116, 0.010509873, -0.00038508154, -0.006857742, 0.0183273, -0.0037054466, 0.015461575, 0.0017394272, -0.0017944091, 0.014181997, -0.0052682655, 0.009023695, 0.00719763, -0.013522214, 0.0034422, 0.014941746, -0.0016711164, -0.025298337, -0.017634194, 0.0058714002, -0.005321581, 0.017834127, 0.0110630235, -0.03369557, 0.029190388, -0.008943722, 0.009363583, -0.0034222065, -0.026111402, -0.007037683, -0.006561173, 0.02473852, -0.007084334, -0.010110005, -0.008577175, 0.0030439978, -0.022712521, 0.0054582027, -0.0012620845, -0.0011954397, -0.015741484, 0.0129557345, -0.00042111133, 0.00846388, 0.008930393, 0.016487904, 0.010469886, -0.007917393, -0.011762793, -0.0214596, 0.000917198, 0.021672864, 0.010269952, -0.007737452, -0.010243294, -0.0067244526, -0.015488233, -0.021552904, 0.017127695, 0.011109675, 0.038067464, 0.00871713, -0.0025591573, 0.021312982, -0.006237946, 0.034628596, -0.0045251767, 0.008357248, 0.020686522, 0.0010696478, 0.0076708077, 0.03772091, -0.018700508, -0.0020676525, -0.008923728, -0.023298996, 0.018233996, -0.010256623, 0.0017860786, 0.009796774, -0.00897038, -0.01269582, -0.018527232, 0.009190307, -0.02372552, -0.042119466, 0.008097334, -0.0066778013, -0.021046404, 0.0019593548, 0.011083017, -0.0016028056, 0.012662497, -0.000059095124, 0.0071043274, -0.014675168, 0.024831824, -0.053582355, 0.038387362, 0.0005698124, 0.015954746, 0.021552904, 0.031589597, -0.009230294, -0.0006147976, 0.002625802, -0.011749465, -0.034362018, -0.0067844326, -0.018793812, 0.011442899, -0.008743787, 0.017474247, -0.021619547, 0.01831397, -0.009037024, -0.0057247817, -0.02728435, 0.010363255, 0.034415334, -0.024032086, -0.0020126705, -0.0045518344, -0.019353628, -0.018340627, -0.03129636, -0.0034038792, -0.006321252, -0.0016161345, 0.033642255, -0.000056075285, -0.005005019, 0.004571828, -0.0024075406, -0.00010215386, 0.0098634185, 0.1980148, -0.003825407, -0.025191706, 0.035161756, 0.005358236, 0.025111731, 0.023485601, 0.0023342315, -0.011882754, 0.018287312, -0.0068910643, 0.003912045, 0.009243623, -0.001355387, -0.028603915, -0.012802451, -0.030150073, -0.014795128, -0.028630573, -0.0013487226, 0.002667455, 0.00985009, -0.0033972147, -0.021486258, 0.009503538, -0.017847456, 0.013062365, -0.014341944, 0.005078328, 0.025165047, -0.015594865, -0.025924796, -0.0018177348, 0.010996379, -0.02993681, 0.007324255, 0.014475234, -0.028577257, 0.005494857, 0.00011725306, -0.013315615, 0.015941417, 0.009376912, 0.0025158382, 0.008743787, 0.023832154, -0.008084005, -0.014195326, -0.008823762, 0.0033455652, -0.032362677, -0.021552904, -0.0056081535, 0.023298996, -0.025444955, 0.0097301295, 0.009736794, 0.015274971, -0.0012937407, -0.018087378, -0.0039387033, 0.008637156, -0.011189649, -0.00023846315, -0.011582852, 0.0066411467, -0.018220667, 0.0060846633, 0.0376676, -0.002709108, 0.0072776037, 0.0034188742, -0.010249958, -0.0007747449, -0.00795738, -0.022192692, 0.03910712, 0.032122757, 0.023898797, 0.0076241563, -0.007397564, -0.003655463, 0.011442899, -0.014115352, -0.00505167, -0.031163072, 0.030336678, -0.006857742, -0.022259338, 0.004048667, 0.02072651, 0.0030156737, -0.0042119464, 0.00041861215, -0.005731446, 0.011103011, 0.013822115, 0.021512916, 0.009216965, -0.006537847, -0.027057758, -0.04054665, 0.010403241, -0.0056281467, -0.005701456, -0.002709108, -0.00745088, -0.0024841821, 0.009356919, -0.022659205, 0.004061996, -0.013175662, 0.017074378, -0.006141311, -0.014541878, 0.02993681, -0.00028448965, -0.025271678, 0.011689484, -0.014528549, 0.004398552, -0.017274313, 0.0045751603, 0.012455898, 0.004121976, -0.025458284, -0.006744446, 0.011822774, -0.015035049, -0.03257594, 0.014675168, -0.0039187097, 0.019726837, -0.0047251107, 0.0022825818, 0.011829439, 0.005391558, -0.016781142, -0.0058747325, 0.010309938, -0.013049036, 0.01186276, -0.0011246296, 0.0062112883, 0.0028190718, -0.021739509, 0.009883412, -0.0073175905, -0.012715813, -0.017181009, -0.016607866, -0.042492677, -0.0014478565, -0.01794076, 0.012302616, -0.015194997, -0.04433207, -0.020606548, 0.009696807, 0.010303274, -0.01694109, -0.004018677, 0.019353628, -0.001991011, 0.000058938927, 0.010536531, -0.17274313, 0.010143327, 0.014235313, -0.024152048, 0.025684876, -0.0012504216, 0.036601283, -0.003698782, 0.0007310093, 0.004165295, -0.0029157067, 0.017101036, -0.046891227, -0.017460918, 0.022965772, 0.020233337, -0.024072073, 0.017220996, 0.009370248, 0.0010363255, 0.0194336, -0.019606877, 0.01818068, -0.020819811, 0.007410893, 0.0019326969, 0.017887443, 0.006651143, 0.00067394477, -0.011889419, -0.025058415, -0.008543854, 0.021579562, 0.0047484366, 0.014062037, 0.0075508473, -0.009510202, -0.009143656, 0.0046817916, 0.013982063, -0.0027990784, 0.011782787, 0.014541878, -0.015701497, -0.029350337, 0.021979429, 0.01332228, -0.026244693, -0.0123492675, -0.003895384, 0.0071576433, -0.035454992, -0.00046984528, 0.0033522295, 0.039347045, 0.0005119148, 0.00476843, -0.012995721, 0.0024042083, -0.006931051, -0.014461905, -0.0127558, 0.0034555288, -0.0074842023, -0.030256703, -0.007057676, -0.00807734, 0.007804097, -0.006957709, 0.017181009, -0.034575284, -0.008603834, -0.005008351, -0.015834786, 0.02943031, 0.016861115, -0.0050849924, 0.014235313, 0.0051449724, 0.0025924798, -0.0025741523, 0.04289254, -0.002104307, 0.012969063, -0.008310596, 0.00423194, 0.0074975314, 0.0018810473, -0.014248641, -0.024725191, 0.0151016945, -0.017527562, 0.0018727167, 0.0002830318, 0.015168339, 0.0144219175, -0.004048667, -0.004358565, 0.011836103, -0.010343261, -0.005911387, 0.0022825818, 0.0073175905, 0.00403867, 0.013188991, 0.03334902, 0.006111321, 0.008597169, 0.030123414, -0.015474904, 0.0017877447, -0.024551915, 0.013155668, 0.023525586, -0.0255116, 0.017220996, 0.004358565, -0.00934359, 0.0099967085, 0.011162991, 0.03092315, -0.021046404, -0.015514892, 0.0011946067, -0.01816735, 0.010876419, -0.10124666, -0.03550831, 0.0056348112, 0.013942076, 0.005951374, 0.020419942, -0.006857742, -0.020873128, -0.021259667, 0.0137554705, 0.0057880944, -0.029163731, -0.018767154, -0.021392956, 0.030896494, -0.005494857, -0.0027307675, -0.006801094, -0.014821786, 0.021392956, -0.0018110704, -0.0018843795, -0.012362596, -0.0072176233, -0.017194338, -0.018713837, -0.024272008, 0.03801415, 0.00015880188, 0.0044951867, -0.028630573, -0.0014070367, -0.00916365, -0.026537929, -0.009576847, -0.013995391, -0.0077107945, 0.0050016865, 0.00578143, -0.04467862, 0.008363913, 0.010136662, -0.0006268769, -0.006591163, 0.015341615, -0.027377652, -0.00093136, 0.029243704, -0.020886457, -0.01041657, -0.02424535, 0.005291591, -0.02980352, -0.009190307, 0.019460259, -0.0041286405, 0.004801752, 0.0011787785, -0.001257086, -0.011216307, -0.013395589, 0.00088137644, -0.0051616337, 0.03876057, -0.0033455652, 0.00075850025, -0.006951045, -0.0062112883, 0.018140694, -0.006351242, -0.008263946, 0.018154023, -0.012189319, 0.0075508473, -0.044358727, -0.0040153447, 0.0093302615, -0.010636497, 0.032789204, -0.005264933, -0.014235313, -0.018393943, 0.007297597, -0.016114693, 0.015021721, 0.020033404, 0.0137688, 0.0011046362, 0.010616505, -0.0039453674, 0.012109346, 0.021099718, -0.0072842683, -0.019153694, -0.003768759, 0.039320387, -0.006747778, -0.0016852784, 0.018154023, 0.0010963057, -0.015035049, -0.021033075, -0.04345236, 0.017287642, 0.016341286, -0.008610498, 0.00236922, 0.009290274, 0.028950468, -0.014475234, -0.0035654926, 0.015434918, -0.03372223, 0.004501851, -0.012929076, -0.008483873, -0.0044685286, -0.0102233, 0.01615468, 0.0022792495, 0.010876419, -0.0059647025, 0.01895376, -0.0069976957, -0.0042952523, 0.017207667, -0.00036133936, 0.0085905045, 0.008084005, 0.03129636, -0.016994404, -0.014915089, 0.020100048, -0.012009379, -0.006684466, 0.01306903, 0.00015765642, -0.00530492, 0.0005277429, 0.015421589, 0.015528221, 0.032202728, -0.003485519, -0.0014286962, 0.033908837, 0.001367883, 0.010509873, 0.025271678, -0.020993087, 0.019846799, 0.006897729, -0.010216636, -0.00725761, 0.01818068, -0.028443968, -0.011242964, -0.014435247, -0.013688826, 0.006101324, -0.0022509254, 0.013848773, -0.0019077052, 0.017181009, 0.03422873, 0.005324913, -0.0035188415, 0.014128681, -0.004898387, 0.005038341, 0.0012320944, -0.005561502, -0.017847456, 0.0008538855, -0.0047884234, 0.011849431, 0.015421589, -0.013942076, 0.0029790192, -0.013702155, 0.0001199605, -0.024431955, 0.019926772, 0.022179363, -0.016487904, -0.03964028, 0.0050849924, 0.017487574, 0.022792496, 0.0012504216, 0.004048667, -0.00997005, 0.0076041627, -0.014328616, -0.020259995, 0.0005598157, -0.010469886, 0.0016852784, 0.01716768, -0.008990373, -0.001987679, 0.026417969, 0.023792166, 0.0046917885, -0.0071909656, -0.00032051947, -0.023259008, -0.009170313, 0.02071318, -0.03156294, -0.030869836, -0.006324584, 0.013795458, -0.00047151142, 0.016874444, 0.00947688, 0.00985009, -0.029883493, 0.024205362, -0.013522214, -0.015075036, -0.030603256, 0.029270362, 0.010503208, 0.021539574, 0.01743426, -0.023898797, 0.022019416, -0.0068777353, 0.027857494, -0.021259667, 0.0025758184, 0.006197959, 0.006447877, -0.00025200035, -0.004941706, -0.021246338, -0.005504854, -0.008390571, -0.0097301295, 0.027244363, -0.04446536, 0.05216949, 0.010243294, -0.016008062, 0.0122493, -0.0199401, 0.009077012, 0.019753495, 0.006431216, -0.037960835, -0.027377652, 0.016381273, -0.0038620618, 0.022512587, -0.010996379, -0.0015211658, -0.0102233, 0.007071005, 0.008230623, -0.009490209, -0.010083347, 0.024431955, 0.002427534, 0.02828402, 0.0035721571, -0.022192692, -0.011882754, 0.010056688, 0.0011904413, -0.01426197, -0.017500903, -0.00010985966, 0.005591492, -0.0077707744, -0.012049366, 0.011869425, 0.00858384, -0.024698535, -0.030283362, 0.020140035, 0.011949399, -0.013968734, 0.042732596, -0.011649498, -0.011982721, -0.016967745, -0.0060913274, -0.007130985, -0.013109017, -0.009710136,
  \t}

  \tpipeline := mongo.Pipeline{
  \t\tbson.D{
  \t\t\t{"$vectorSearch", bson.D{
  \t\t\t\t{"queryVector", queryVectorValues},
  \t\t\t\t{"index", "vector_index"},
  \t\t\t\t{"path", "plot_embedding"},
  \t\t\t\t{"numCandidates", 150},
  \t\t\t\t{"limit", 10},
  \t\t\t}},
  \t\t},
  \t\tbson.D{
  \t\t\t{"$project", bson.D{
  \t\t\t\t{"_id", 0},
  \t\t\t\t{"plot", 1},
  \t\t\t\t{"title", 1},
  \t\t\t\t{"score", bson.D{
  \t\t\t\t\t{"$meta", "vectorSearchScore"},
  \t\t\t\t}},
  \t\t\t}},
  \t\t},
  \t}

  \t// Run the pipeline
  \tcursor, err := coll.Aggregate(ctx, pipeline)
  \tif err != nil {
  \t\tlog.Fatalf("Failed to run aggregation: %v", err)
  \t}
  \tdefer cursor.Close(ctx)

  \t// Print results
  \tfor cursor.Next(ctx) {
  \t\tvar doc bson.M
  \t\tif err := cursor.Decode(&doc); err != nil {
  \t\t\tlog.Fatalf("Failed to decode document: %v", err)
  \t\t}
  \t\tjsonDoc, err := json.Marshal(doc)
  \t\tif err != nil {
  \t\t\tlog.Fatalf("Failed to marshal document to JSON: %v", err)
  \t\t}
  \t\tfmt.Println(string(jsonDoc))
  \t}

  \tif err := cursor.Err(); err != nil {
  \t\tlog.Fatalf("Cursor error: %v", err)
  \t}
  }

  ```

This query uses the `$vectorSearch` stage to:

- Compare vector embeddings of the search term against vector embeddings of movie plots in the `plot_embedding` field of the `sample_mflix.embedded_movies` collection.

- Consider up to the 150 most similar movie plots and return the top 10 results.

It uses the `$project` stage to:

- Only include the movie `plot` and `title` fields in the results.

- Add a `score` field to show the relevance of each result to the search term.

To learn more about this pipeline stage, see Run Vector Search Queries.

### Specify the `<connection-string>`.

Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

<Tabs>

<Tab name="Atlas Cluster">

Your connection string should use the following format:

```
mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
```

Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

</Tab>

<Tab name="Local Deployment">

Your connection string should use the following format:

```
mongodb://localhost:<port-number>/?directConnection=true
```

</Tab>

</Tabs>

### Run your query.

Run the following command to query your collection:

```bash
go run atlas_vector_search_quick_start.go
```

```js
\'{"plot":"A reporter, learning of time travelers visiting 20th century disasters, tries to change the history they know by averting upcoming disasters.","title":"Thrill Seekers","score":0.7892671227455139}\'
\'{"plot":"At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.","title":"About Time","score":0.7843604683876038}\'
\'{"plot":"Hoping to alter the events of the past, a 19th century inventor instead travels 800,000 years into the future, where he finds humankind divided into two warring races.","title":"The Time Machine","score":0.7801066637039185}\'
`{"plot":"After using his mother\'s newly built time machine, Dolf gets stuck involuntary in the year 1212. He ends up in a children\'s crusade where he confronts his new friends with modern techniques...","title":"Crusade in Jeans","score":0.7789170742034912}`
\'{"plot":"An officer for a security agency that regulates time travel, must fend for his life against a shady politician who has a tie to his past.","title":"Timecop","score":0.7771612405776978}\'
\'{"plot":"A time-travel experiment in which a robot probe is sent from the year 2073 to the year 1973 goes terribly wrong thrusting one of the project scientists, a man named Nicholas Sinclair into a...","title":"A.P.E.X.","score":0.7730885744094849}\'
`{"plot":"Agent J travels in time to M.I.B.\'s early days in 1969 to stop an alien from assassinating his friend Agent K and changing history.","title":"Men in Black 3","score":0.7712380886077881}`
\'{"plot":"Bound by a shared destiny, a teen bursting with scientific curiosity and a former boy-genius inventor embark on a mission to unearth the secrets of a place somewhere in time and space that exists in their collective memory.","title":"Tomorrowland","score":0.7669923901557922}\'
\'{"plot":"With the help of his uncle, a man travels to the future to try and bring his girlfriend back to life.","title":"Love Story 2050","score":0.7649372816085815}\'
\'{"plot":"A dimension-traveling wizard gets stuck in the 21st century because cell-phone radiation interferes with his magic. With his home world on the brink of war, he seeks help from a jaded ...","title":"The Portal","score":0.7640786170959473}\'

```

</Tab>

<Tab name="Java (Sync)">

### Construct your vector search query.

This query searches for documents that include text in the `plot` field that is semantically related to the term "time travel".

- Create a file named `BasicQuery.java`.

- Copy and paste the following sample query into the `BasicQuery.java` file:

  ```java
  import com.mongodb.client.MongoClient;
  import com.mongodb.client.MongoClients;
  import com.mongodb.client.MongoCollection;
  import com.mongodb.client.MongoDatabase;
  import com.mongodb.client.model.search.FieldSearchPath;
  import org.bson.Document;
  import org.bson.conversions.Bson;

  import java.util.List;

  import static com.mongodb.client.model.Aggregates.project;
  import static com.mongodb.client.model.Aggregates.vectorSearch;
  import static com.mongodb.client.model.Projections.fields;
  import static com.mongodb.client.model.Projections.include;
  import static com.mongodb.client.model.Projections.exclude;
  import static com.mongodb.client.model.Projections.metaVectorSearchScore;
  import static com.mongodb.client.model.search.SearchPath.fieldPath;
  import static com.mongodb.client.model.search.VectorSearchOptions.approximateVectorSearchOptions;
  import static java.util.Arrays.asList;

  public class BasicQuery {
    public static void main( String[] args ) {
      // specify connection
      String uri = "<connection-string>";

      // establish connection and set namespace
      try (MongoClient mongoClient = MongoClients.create(uri)) {
        MongoDatabase database = mongoClient.getDatabase("sample_mflix");
        MongoCollection<Document> collection = database.getCollection("embedded_movies");

        // define $vectorSearch query options
        List<Double> queryVector = (asList(-0.0016261312d, -0.028070757d, -0.011342932d, -0.012775794d, -0.0027440966d, 0.008683807d, -0.02575152d, -0.02020668d, -0.010283281d, -0.0041719596d, 0.021392956d, 0.028657231d, -0.006634482d, 0.007490867d, 0.018593878d, 0.0038187427d, 0.029590257d, -0.01451522d, 0.016061379d, 0.00008528442d, -0.008943722d, 0.01627464d, 0.024311995d, -0.025911469d, 0.00022596726d, -0.008863748d, 0.008823762d, -0.034921836d, 0.007910728d, -0.01515501d, 0.035801545d, -0.0035688248d, -0.020299982d, -0.03145631d, -0.032256044d, -0.028763862d, -0.0071576433d, -0.012769129d, 0.012322609d, -0.006621153d, 0.010583182d, 0.024085402d, -0.001623632d, 0.007864078d, -0.021406285d, 0.002554159d, 0.012229307d, -0.011762793d, 0.0051682983d, 0.0048484034d, 0.018087378d, 0.024325324d, -0.037694257d, -0.026537929d, -0.008803768d, -0.017767483d, -0.012642504d, -0.0062712682d, 0.0009771782d, -0.010409906d, 0.017754154d, -0.004671795d, -0.030469967d, 0.008477209d, -0.005218282d, -0.0058480743d, -0.020153364d, -0.0032805866d, 0.004248601d, 0.0051449724d, 0.006791097d, 0.007650814d, 0.003458861d, -0.0031223053d, -0.01932697d, -0.033615597d, 0.00745088d, 0.006321252d, -0.0038154104d, 0.014555207d, 0.027697546d, -0.02828402d, 0.0066711367d, 0.0077107945d, 0.01794076d, 0.011349596d, -0.0052715978d, 0.014755142d, -0.019753495d, -0.011156326d, 0.011202978d, 0.022126047d, 0.00846388d, 0.030549942d, -0.0041386373d, 0.018847128d, -0.00033655585d, 0.024925126d, -0.003555496d, -0.019300312d, 0.010749794d, 0.0075308536d, -0.018287312d, -0.016567878d, -0.012869096d, -0.015528221d, 0.0078107617d, -0.011156326d, 0.013522214d, -0.020646535d, -0.01211601d, 0.055928253d, 0.011596181d, -0.017247654d, 0.0005939711d, -0.026977783d, -0.003942035d, -0.009583511d, -0.0055248477d, -0.028737204d, 0.023179034d, 0.003995351d, 0.0219661d, -0.008470545d, 0.023392297d, 0.010469886d, -0.015874773d, 0.007890735d, -0.009690142d, -0.00024970944d, 0.012775794d, 0.0114762215d, 0.013422247d, 0.010429899d, -0.03686786d, -0.006717788d, -0.027484283d, 0.011556195d, -0.036068123d, -0.013915418d, -0.0016327957d, 0.0151016945d, -0.020473259d, 0.004671795d, -0.012555866d, 0.0209531d, 0.01982014d, 0.024485271d, 0.0105431955d, -0.005178295d, 0.033162415d, -0.013795458d, 0.007150979d, 0.010243294d, 0.005644808d, 0.017260984d, -0.0045618312d, 0.0024725192d, 0.004305249d, -0.008197301d, 0.0014203656d, 0.0018460588d, 0.005015015d, -0.011142998d, 0.01439526d, 0.022965772d, 0.02552493d, 0.007757446d, -0.0019726837d, 0.009503538d, -0.032042783d, 0.008403899d, -0.04609149d, 0.013808787d, 0.011749465d, 0.036388017d, 0.016314628d, 0.021939443d, -0.0250051d, -0.017354285d, -0.012962398d, 0.00006107364d, 0.019113706d, 0.03081652d, -0.018114036d, -0.0084572155d, 0.009643491d, -0.0034721901d, 0.0072642746d, -0.0090636825d, 0.01642126d, 0.013428912d, 0.027724205d, 0.0071243206d, -0.6858542d, -0.031029783d, -0.014595194d, -0.011449563d, 0.017514233d, 0.01743426d, 0.009950057d, 0.0029706885d, -0.015714826d, -0.001806072d, 0.011856096d, 0.026444625d, -0.0010663156d, -0.006474535d, 0.0016161345d, -0.020313311d, 0.0148351155d, -0.0018393943d, 0.0057347785d, 0.018300641d, -0.018647194d, 0.03345565d, -0.008070676d, 0.0071443142d, 0.014301958d, 0.0044818576d, 0.003838736d, -0.007350913d, -0.024525259d, -0.001142124d, -0.018620536d, 0.017247654d, 0.007037683d, 0.010236629d, 0.06046009d, 0.0138887605d, -0.012122675d, 0.037694257d, 0.0055081863d, 0.042492677d, 0.00021784494d, -0.011656162d, 0.010276617d, 0.022325981d, 0.005984696d, -0.009496873d, 0.013382261d, -0.0010563189d, 0.0026507939d, -0.041639622d, 0.008637156d, 0.026471283d, -0.008403899d, 0.024858482d, -0.00066686375d, -0.0016252982d, 0.027590916d, 0.0051449724d, 0.0058647357d, -0.008743787d, -0.014968405d, 0.027724205d, -0.011596181d, 0.0047650975d, -0.015381602d, 0.0043718936d, 0.002159289d, 0.035908177d, -0.008243952d, -0.030443309d, 0.027564257d, 0.042625964d, -0.0033688906d, 0.01843393d, 0.019087048d, 0.024578573d, 0.03268257d, -0.015608194d, -0.014128681d, -0.0033538956d, -0.0028757197d, -0.004121976d, -0.032389335d, 0.0034322033d, 0.058807302d, 0.010943064d, -0.030523283d, 0.008903735d, 0.017500903d, 0.00871713d, -0.0029406983d, 0.013995391d, -0.03132302d, -0.019660193d, -0.00770413d, -0.0038853872d, 0.0015894766d, -0.0015294964d, -0.006251275d, -0.021099718d, -0.010256623d, -0.008863748d, 0.028550599d, 0.02020668d, -0.0012962399d, -0.003415542d, -0.0022509254d, 0.0119360695d, 0.027590916d, -0.046971202d, -0.0015194997d, -0.022405956d, 0.0016677842d, -0.00018535563d, -0.015421589d, -0.031802863d, 0.03814744d, 0.0065411795d, 0.016567878d, -0.015621523d, 0.022899127d, -0.011076353d, 0.02841731d, -0.002679118d, -0.002342562d, 0.015341615d, 0.01804739d, -0.020566562d, -0.012989056d, -0.002990682d, 0.01643459d, 0.00042527664d, 0.008243952d, -0.013715484d, -0.004835075d, -0.009803439d, 0.03129636d, -0.021432944d, 0.0012087687d, -0.015741484d, -0.0052016205d, 0.00080890034d, -0.01755422d, 0.004811749d, -0.017967418d, -0.026684547d, -0.014128681d, 0.0041386373d, -0.013742141d, -0.010056688d, -0.013268964d, -0.0110630235d, -0.028337335d, 0.015981404d, -0.00997005d, -0.02424535d, -0.013968734d, -0.028310679d, -0.027750863d, -0.020699851d, 0.02235264d, 0.001057985d, 0.00081639783d, -0.0099367285d, 0.013522214d, -0.012016043d, -0.00086471526d, 0.013568865d, 0.0019376953d, -0.019020405d, 0.017460918d, -0.023045745d, 0.008503866d, 0.0064678704d, -0.011509543d, 0.018727167d, -0.003372223d, -0.0028690554d, -0.0027024434d, -0.011902748d, -0.012182655d, -0.015714826d, -0.0098634185d, 0.00593138d, 0.018753825d, 0.0010146659d, 0.013029044d, 0.0003521757d, -0.017620865d, 0.04102649d, 0.00552818d, 0.024485271d, -0.009630162d, -0.015608194d, 0.0006718621d, -0.0008418062d, 0.012395918d, 0.0057980907d, 0.016221326d, 0.010616505d, 0.004838407d, -0.012402583d, 0.019900113d, -0.0034521967d, 0.000247002d, -0.03153628d, 0.0011038032d, -0.020819811d, 0.016234655d, -0.00330058d, -0.0032289368d, 0.00078973995d, -0.021952773d, -0.022459272d, 0.03118973d, 0.03673457d, -0.021472929d, 0.0072109587d, -0.015075036d, 0.004855068d, -0.0008151483d, 0.0069643734d, 0.010023367d, -0.010276617d, -0.023019087d, 0.0068244194d, -0.0012520878d, -0.0015086699d, 0.022046074d, -0.034148756d, -0.0022192693d, 0.002427534d, -0.0027124402d, 0.0060346797d, 0.015461575d, 0.0137554705d, 0.009230294d, -0.009583511d, 0.032629255d, 0.015994733d, -0.019167023d, -0.009203636d, 0.03393549d, -0.017274313d, -0.012042701d, -0.0009930064d, 0.026777849d, -0.013582194d, -0.0027590916d, -0.017594207d, -0.026804507d, -0.0014236979d, -0.022032745d, 0.0091236625d, -0.0042419364d, -0.00858384d, -0.0033905501d, -0.020739838d, 0.016821127d, 0.022539245d, 0.015381602d, 0.015141681d, 0.028817179d, -0.019726837d, -0.0051283115d, -0.011489551d, -0.013208984d, -0.0047017853d, -0.0072309524d, 0.01767418d, 0.0025658219d, -0.010323267d, 0.012609182d, -0.028097415d, 0.026871152d, -0.010276617d, 0.021912785d, 0.0022542577d, 0.005124979d, -0.0019710176d, 0.004518512d, -0.040360045d, 0.010969722d, -0.0031539614d, -0.020366628d, -0.025778178d, -0.0110030435d, -0.016221326d, 0.0036587953d, 0.016207997d, 0.003007343d, -0.0032555948d, 0.0044052163d, -0.022046074d, -0.0008822095d, -0.009363583d, 0.028230704d, -0.024538586d, 0.0029840174d, 0.0016044717d, -0.014181997d, 0.031349678d, -0.014381931d, -0.027750863d, 0.02613806d, 0.0004136138d, -0.005748107d, -0.01868718d, -0.0010138329d, 0.0054348772d, 0.010703143d, -0.003682121d, 0.0030856507d, -0.004275259d, -0.010403241d, 0.021113047d, -0.022685863d, -0.023032416d, 0.031429652d, 0.001792743d, -0.005644808d, -0.011842767d, -0.04078657d, -0.0026874484d, 0.06915057d, -0.00056939584d, -0.013995391d, 0.010703143d, -0.013728813d, -0.022939114d, -0.015261642d, -0.022485929d, 0.016807798d, 0.007964044d, 0.0144219175d, 0.016821127d, 0.0076241563d, 0.005461535d, -0.013248971d, 0.015301628d, 0.0085171955d, -0.004318578d, 0.011136333d, -0.0059047225d, -0.010249958d, -0.018207338d, 0.024645219d, 0.021752838d, 0.0007614159d, -0.013648839d, 0.01111634d, -0.010503208d, -0.0038487327d, -0.008203966d, -0.00397869d, 0.0029740208d, 0.008530525d, 0.005261601d, 0.01642126d, -0.0038753906d, -0.013222313d, 0.026537929d, 0.024671877d, -0.043505676d, 0.014195326d, 0.024778508d, 0.0056914594d, -0.025951454d, 0.017620865d, -0.0021359634d, 0.008643821d, 0.021299653d, 0.0041686273d, -0.009017031d, 0.04044002d, 0.024378639d, -0.027777521d, -0.014208655d, 0.0028623908d, 0.042119466d, 0.005801423d, -0.028124074d, -0.03129636d, 0.022139376d, -0.022179363d, -0.04067994d, 0.013688826d, 0.013328944d, 0.0046184794d, -0.02828402d, -0.0063412455d, -0.0046184794d, -0.011756129d, -0.010383247d, -0.0018543894d, -0.0018593877d, -0.00052024535d, 0.004815081d, 0.014781799d, 0.018007403d, 0.01306903d, -0.020433271d, 0.009043689d, 0.033189073d, -0.006844413d, -0.019766824d, -0.018767154d, 0.00533491d, -0.0024575242d, 0.018727167d, 0.0058080875d, -0.013835444d, 0.0040719924d, 0.004881726d, 0.012029372d, 0.005664801d, 0.03193615d, 0.0058047553d, 0.002695779d, 0.009290274d, 0.02361889d, 0.017834127d, 0.0049017193d, -0.0036388019d, 0.010776452d, -0.019793482d, 0.0067777685d, -0.014208655d, -0.024911797d, 0.002385881d, 0.0034988478d, 0.020899786d, -0.0025858153d, -0.011849431d, 0.033189073d, -0.021312982d, 0.024965113d, -0.014635181d, 0.014048708d, -0.0035921505d, -0.003347231d, 0.030869836d, -0.0017161017d, -0.0061346465d, 0.009203636d, -0.025165047d, 0.0068510775d, 0.021499587d, 0.013782129d, -0.0024475274d, -0.0051149824d, -0.024445284d, 0.006167969d, 0.0068844d, -0.00076183246d, 0.030150073d, -0.0055948244d, -0.011162991d, -0.02057989d, -0.009703471d, -0.020646535d, 0.008004031d, 0.0066378145d, -0.019900113d, -0.012169327d, -0.01439526d, 0.0044252095d, -0.004018677d, 0.014621852d, -0.025085073d, -0.013715484d, -0.017980747d, 0.0071043274d, 0.011456228d, -0.01010334d, -0.0035321703d, -0.03801415d, -0.012036037d, -0.0028990454d, -0.05419549d, -0.024058744d, -0.024272008d, 0.015221654d, 0.027964126d, 0.03182952d, -0.015354944d, 0.004855068d, 0.011522872d, 0.004771762d, 0.0027874154d, 0.023405626d, 0.0004242353d, -0.03132302d, 0.007057676d, 0.008763781d, -0.0027057757d, 0.023005757d, -0.0071176565d, -0.005238275d, 0.029110415d, -0.010989714d, 0.013728813d, -0.009630162d, -0.029137073d, -0.0049317093d, -0.0008630492d, -0.015248313d, 0.0043219104d, -0.0055681667d, -0.013175662d, 0.029723546d, 0.025098402d, 0.012849103d, -0.0009996708d, 0.03118973d, -0.0021709518d, 0.0260181d, -0.020526575d, 0.028097415d, -0.016141351d, 0.010509873d, -0.022965772d, 0.002865723d, 0.0020493253d, 0.0020509914d, -0.0041419696d, -0.00039695262d, 0.017287642d, 0.0038987163d, 0.014795128d, -0.014661839d, -0.008950386d, 0.004431874d, -0.009383577d, 0.0012604183d, -0.023019087d, 0.0029273694d, -0.033135757d, 0.009176978d, -0.011023037d, -0.002102641d, 0.02663123d, -0.03849399d, -0.0044152127d, 0.0004527676d, -0.0026924468d, 0.02828402d, 0.017727496d, 0.035135098d, 0.02728435d, -0.005348239d, -0.001467017d, -0.019766824d, 0.014715155d, 0.011982721d, 0.0045651635d, 0.023458943d, -0.0010046692d, -0.0031373003d, -0.0006972704d, 0.0019043729d, -0.018967088d, -0.024311995d, 0.0011546199d, 0.007977373d, -0.004755101d, -0.010016702d, -0.02780418d, -0.004688456d, 0.013022379d, -0.005484861d, 0.0017227661d, -0.015394931d, -0.028763862d, -0.026684547d, 0.0030589928d, -0.018513903d, 0.028363993d, 0.0044818576d, -0.009270281d, 0.038920518d, -0.016008062d, 0.0093902415d, 0.004815081d, -0.021059733d, 0.01451522d, -0.0051583014d, 0.023765508d, -0.017874114d, -0.016821127d, -0.012522544d, -0.0028390652d, 0.0040886537d, 0.020259995d, -0.031216389d, -0.014115352d, -0.009176978d, 0.010303274d, 0.020313311d, 0.0064112223d, -0.02235264d, -0.022872468d, 0.0052449396d, 0.0005723116d, 0.0037321046d, 0.016807798d, -0.018527232d, -0.009303603d, 0.0024858483d, -0.0012662497d, -0.007110992d, 0.011976057d, -0.007790768d, -0.042999174d, -0.006727785d, -0.011829439d, 0.007024354d, 0.005278262d, -0.017740825d, -0.0041519664d, 0.0085905045d, 0.027750863d, -0.038387362d, 0.024391968d, 0.00087721116d, 0.010509873d, -0.00038508154d, -0.006857742d, 0.0183273d, -0.0037054466d, 0.015461575d, 0.0017394272d, -0.0017944091d, 0.014181997d, -0.0052682655d, 0.009023695d, 0.00719763d, -0.013522214d, 0.0034422d, 0.014941746d, -0.0016711164d, -0.025298337d, -0.017634194d, 0.0058714002d, -0.005321581d, 0.017834127d, 0.0110630235d, -0.03369557d, 0.029190388d, -0.008943722d, 0.009363583d, -0.0034222065d, -0.026111402d, -0.007037683d, -0.006561173d, 0.02473852d, -0.007084334d, -0.010110005d, -0.008577175d, 0.0030439978d, -0.022712521d, 0.0054582027d, -0.0012620845d, -0.0011954397d, -0.015741484d, 0.0129557345d, -0.00042111133d, 0.00846388d, 0.008930393d, 0.016487904d, 0.010469886d, -0.007917393d, -0.011762793d, -0.0214596d, 0.000917198d, 0.021672864d, 0.010269952d, -0.007737452d, -0.010243294d, -0.0067244526d, -0.015488233d, -0.021552904d, 0.017127695d, 0.011109675d, 0.038067464d, 0.00871713d, -0.0025591573d, 0.021312982d, -0.006237946d, 0.034628596d, -0.0045251767d, 0.008357248d, 0.020686522d, 0.0010696478d, 0.0076708077d, 0.03772091d, -0.018700508d, -0.0020676525d, -0.008923728d, -0.023298996d, 0.018233996d, -0.010256623d, 0.0017860786d, 0.009796774d, -0.00897038d, -0.01269582d, -0.018527232d, 0.009190307d, -0.02372552d, -0.042119466d, 0.008097334d, -0.0066778013d, -0.021046404d, 0.0019593548d, 0.011083017d, -0.0016028056d, 0.012662497d, -0.000059095124d, 0.0071043274d, -0.014675168d, 0.024831824d, -0.053582355d, 0.038387362d, 0.0005698124d, 0.015954746d, 0.021552904d, 0.031589597d, -0.009230294d, -0.0006147976d, 0.002625802d, -0.011749465d, -0.034362018d, -0.0067844326d, -0.018793812d, 0.011442899d, -0.008743787d, 0.017474247d, -0.021619547d, 0.01831397d, -0.009037024d, -0.0057247817d, -0.02728435d, 0.010363255d, 0.034415334d, -0.024032086d, -0.0020126705d, -0.0045518344d, -0.019353628d, -0.018340627d, -0.03129636d, -0.0034038792d, -0.006321252d, -0.0016161345d, 0.033642255d, -0.000056075285d, -0.005005019d, 0.004571828d, -0.0024075406d, -0.00010215386d, 0.0098634185d, 0.1980148d, -0.003825407d, -0.025191706d, 0.035161756d, 0.005358236d, 0.025111731d, 0.023485601d, 0.0023342315d, -0.011882754d, 0.018287312d, -0.0068910643d, 0.003912045d, 0.009243623d, -0.001355387d, -0.028603915d, -0.012802451d, -0.030150073d, -0.014795128d, -0.028630573d, -0.0013487226d, 0.002667455d, 0.00985009d, -0.0033972147d, -0.021486258d, 0.009503538d, -0.017847456d, 0.013062365d, -0.014341944d, 0.005078328d, 0.025165047d, -0.015594865d, -0.025924796d, -0.0018177348d, 0.010996379d, -0.02993681d, 0.007324255d, 0.014475234d, -0.028577257d, 0.005494857d, 0.00011725306d, -0.013315615d, 0.015941417d, 0.009376912d, 0.0025158382d, 0.008743787d, 0.023832154d, -0.008084005d, -0.014195326d, -0.008823762d, 0.0033455652d, -0.032362677d, -0.021552904d, -0.0056081535d, 0.023298996d, -0.025444955d, 0.0097301295d, 0.009736794d, 0.015274971d, -0.0012937407d, -0.018087378d, -0.0039387033d, 0.008637156d, -0.011189649d, -0.00023846315d, -0.011582852d, 0.0066411467d, -0.018220667d, 0.0060846633d, 0.0376676d, -0.002709108d, 0.0072776037d, 0.0034188742d, -0.010249958d, -0.0007747449d, -0.00795738d, -0.022192692d, 0.03910712d, 0.032122757d, 0.023898797d, 0.0076241563d, -0.007397564d, -0.003655463d, 0.011442899d, -0.014115352d, -0.00505167d, -0.031163072d, 0.030336678d, -0.006857742d, -0.022259338d, 0.004048667d, 0.02072651d, 0.0030156737d, -0.0042119464d, 0.00041861215d, -0.005731446d, 0.011103011d, 0.013822115d, 0.021512916d, 0.009216965d, -0.006537847d, -0.027057758d, -0.04054665d, 0.010403241d, -0.0056281467d, -0.005701456d, -0.002709108d, -0.00745088d, -0.0024841821d, 0.009356919d, -0.022659205d, 0.004061996d, -0.013175662d, 0.017074378d, -0.006141311d, -0.014541878d, 0.02993681d, -0.00028448965d, -0.025271678d, 0.011689484d, -0.014528549d, 0.004398552d, -0.017274313d, 0.0045751603d, 0.012455898d, 0.004121976d, -0.025458284d, -0.006744446d, 0.011822774d, -0.015035049d, -0.03257594d, 0.014675168d, -0.0039187097d, 0.019726837d, -0.0047251107d, 0.0022825818d, 0.011829439d, 0.005391558d, -0.016781142d, -0.0058747325d, 0.010309938d, -0.013049036d, 0.01186276d, -0.0011246296d, 0.0062112883d, 0.0028190718d, -0.021739509d, 0.009883412d, -0.0073175905d, -0.012715813d, -0.017181009d, -0.016607866d, -0.042492677d, -0.0014478565d, -0.01794076d, 0.012302616d, -0.015194997d, -0.04433207d, -0.020606548d, 0.009696807d, 0.010303274d, -0.01694109d, -0.004018677d, 0.019353628d, -0.001991011d, 0.000058938927d, 0.010536531d, -0.17274313d, 0.010143327d, 0.014235313d, -0.024152048d, 0.025684876d, -0.0012504216d, 0.036601283d, -0.003698782d, 0.0007310093d, 0.004165295d, -0.0029157067d, 0.017101036d, -0.046891227d, -0.017460918d, 0.022965772d, 0.020233337d, -0.024072073d, 0.017220996d, 0.009370248d, 0.0010363255d, 0.0194336d, -0.019606877d, 0.01818068d, -0.020819811d, 0.007410893d, 0.0019326969d, 0.017887443d, 0.006651143d, 0.00067394477d, -0.011889419d, -0.025058415d, -0.008543854d, 0.021579562d, 0.0047484366d, 0.014062037d, 0.0075508473d, -0.009510202d, -0.009143656d, 0.0046817916d, 0.013982063d, -0.0027990784d, 0.011782787d, 0.014541878d, -0.015701497d, -0.029350337d, 0.021979429d, 0.01332228d, -0.026244693d, -0.0123492675d, -0.003895384d, 0.0071576433d, -0.035454992d, -0.00046984528d, 0.0033522295d, 0.039347045d, 0.0005119148d, 0.00476843d, -0.012995721d, 0.0024042083d, -0.006931051d, -0.014461905d, -0.0127558d, 0.0034555288d, -0.0074842023d, -0.030256703d, -0.007057676d, -0.00807734d, 0.007804097d, -0.006957709d, 0.017181009d, -0.034575284d, -0.008603834d, -0.005008351d, -0.015834786d, 0.02943031d, 0.016861115d, -0.0050849924d, 0.014235313d, 0.0051449724d, 0.0025924798d, -0.0025741523d, 0.04289254d, -0.002104307d, 0.012969063d, -0.008310596d, 0.00423194d, 0.0074975314d, 0.0018810473d, -0.014248641d, -0.024725191d, 0.0151016945d, -0.017527562d, 0.0018727167d, 0.0002830318d, 0.015168339d, 0.0144219175d, -0.004048667d, -0.004358565d, 0.011836103d, -0.010343261d, -0.005911387d, 0.0022825818d, 0.0073175905d, 0.00403867d, 0.013188991d, 0.03334902d, 0.006111321d, 0.008597169d, 0.030123414d, -0.015474904d, 0.0017877447d, -0.024551915d, 0.013155668d, 0.023525586d, -0.0255116d, 0.017220996d, 0.004358565d, -0.00934359d, 0.0099967085d, 0.011162991d, 0.03092315d, -0.021046404d, -0.015514892d, 0.0011946067d, -0.01816735d, 0.010876419d, -0.10124666d, -0.03550831d, 0.0056348112d, 0.013942076d, 0.005951374d, 0.020419942d, -0.006857742d, -0.020873128d, -0.021259667d, 0.0137554705d, 0.0057880944d, -0.029163731d, -0.018767154d, -0.021392956d, 0.030896494d, -0.005494857d, -0.0027307675d, -0.006801094d, -0.014821786d, 0.021392956d, -0.0018110704d, -0.0018843795d, -0.012362596d, -0.0072176233d, -0.017194338d, -0.018713837d, -0.024272008d, 0.03801415d, 0.00015880188d, 0.0044951867d, -0.028630573d, -0.0014070367d, -0.00916365d, -0.026537929d, -0.009576847d, -0.013995391d, -0.0077107945d, 0.0050016865d, 0.00578143d, -0.04467862d, 0.008363913d, 0.010136662d, -0.0006268769d, -0.006591163d, 0.015341615d, -0.027377652d, -0.00093136d, 0.029243704d, -0.020886457d, -0.01041657d, -0.02424535d, 0.005291591d, -0.02980352d, -0.009190307d, 0.019460259d, -0.0041286405d, 0.004801752d, 0.0011787785d, -0.001257086d, -0.011216307d, -0.013395589d, 0.00088137644d, -0.0051616337d, 0.03876057d, -0.0033455652d, 0.00075850025d, -0.006951045d, -0.0062112883d, 0.018140694d, -0.006351242d, -0.008263946d, 0.018154023d, -0.012189319d, 0.0075508473d, -0.044358727d, -0.0040153447d, 0.0093302615d, -0.010636497d, 0.032789204d, -0.005264933d, -0.014235313d, -0.018393943d, 0.007297597d, -0.016114693d, 0.015021721d, 0.020033404d, 0.0137688d, 0.0011046362d, 0.010616505d, -0.0039453674d, 0.012109346d, 0.021099718d, -0.0072842683d, -0.019153694d, -0.003768759d, 0.039320387d, -0.006747778d, -0.0016852784d, 0.018154023d, 0.0010963057d, -0.015035049d, -0.021033075d, -0.04345236d, 0.017287642d, 0.016341286d, -0.008610498d, 0.00236922d, 0.009290274d, 0.028950468d, -0.014475234d, -0.0035654926d, 0.015434918d, -0.03372223d, 0.004501851d, -0.012929076d, -0.008483873d, -0.0044685286d, -0.0102233d, 0.01615468d, 0.0022792495d, 0.010876419d, -0.0059647025d, 0.01895376d, -0.0069976957d, -0.0042952523d, 0.017207667d, -0.00036133936d, 0.0085905045d, 0.008084005d, 0.03129636d, -0.016994404d, -0.014915089d, 0.020100048d, -0.012009379d, -0.006684466d, 0.01306903d, 0.00015765642d, -0.00530492d, 0.0005277429d, 0.015421589d, 0.015528221d, 0.032202728d, -0.003485519d, -0.0014286962d, 0.033908837d, 0.001367883d, 0.010509873d, 0.025271678d, -0.020993087d, 0.019846799d, 0.006897729d, -0.010216636d, -0.00725761d, 0.01818068d, -0.028443968d, -0.011242964d, -0.014435247d, -0.013688826d, 0.006101324d, -0.0022509254d, 0.013848773d, -0.0019077052d, 0.017181009d, 0.03422873d, 0.005324913d, -0.0035188415d, 0.014128681d, -0.004898387d, 0.005038341d, 0.0012320944d, -0.005561502d, -0.017847456d, 0.0008538855d, -0.0047884234d, 0.011849431d, 0.015421589d, -0.013942076d, 0.0029790192d, -0.013702155d, 0.0001199605d, -0.024431955d, 0.019926772d, 0.022179363d, -0.016487904d, -0.03964028d, 0.0050849924d, 0.017487574d, 0.022792496d, 0.0012504216d, 0.004048667d, -0.00997005d, 0.0076041627d, -0.014328616d, -0.020259995d, 0.0005598157d, -0.010469886d, 0.0016852784d, 0.01716768d, -0.008990373d, -0.001987679d, 0.026417969d, 0.023792166d, 0.0046917885d, -0.0071909656d, -0.00032051947d, -0.023259008d, -0.009170313d, 0.02071318d, -0.03156294d, -0.030869836d, -0.006324584d, 0.013795458d, -0.00047151142d, 0.016874444d, 0.00947688d, 0.00985009d, -0.029883493d, 0.024205362d, -0.013522214d, -0.015075036d, -0.030603256d, 0.029270362d, 0.010503208d, 0.021539574d, 0.01743426d, -0.023898797d, 0.022019416d, -0.0068777353d, 0.027857494d, -0.021259667d, 0.0025758184d, 0.006197959d, 0.006447877d, -0.00025200035d, -0.004941706d, -0.021246338d, -0.005504854d, -0.008390571d, -0.0097301295d, 0.027244363d, -0.04446536d, 0.05216949d, 0.010243294d, -0.016008062d, 0.0122493d, -0.0199401d, 0.009077012d, 0.019753495d, 0.006431216d, -0.037960835d, -0.027377652d, 0.016381273d, -0.0038620618d, 0.022512587d, -0.010996379d, -0.0015211658d, -0.0102233d, 0.007071005d, 0.008230623d, -0.009490209d, -0.010083347d, 0.024431955d, 0.002427534d, 0.02828402d, 0.0035721571d, -0.022192692d, -0.011882754d, 0.010056688d, 0.0011904413d, -0.01426197d, -0.017500903d, -0.00010985966d, 0.005591492d, -0.0077707744d, -0.012049366d, 0.011869425d, 0.00858384d, -0.024698535d, -0.030283362d, 0.020140035d, 0.011949399d, -0.013968734d, 0.042732596d, -0.011649498d, -0.011982721d, -0.016967745d, -0.0060913274d, -0.007130985d, -0.013109017d, -0.009710136d));
        String indexName = "vector_index";
        FieldSearchPath fieldSearchPath = fieldPath("plot_embedding");
        int limit = 10;
        int numCandidates = 150;

        // define pipeline
        List<Bson> pipeline = asList(
          vectorSearch(
            fieldSearchPath,
            queryVector,
            indexName,
            limit,
            approximateVectorSearchOptions(numCandidates)),
          project(
            fields(exclude("_id"), include("title"), include("plot"),
            metaVectorSearchScore("score"))));

        // run query and print results
        collection.aggregate(pipeline)
          .forEach(doc -> System.out.println(doc.toJson()));\t
      }
    }
  }

  ```

This query uses the `$vectorSearch` stage to:

- Compare vector embeddings of the search term against vector embeddings of movie plots in the `plot_embedding` field of the `sample_mflix.embedded_movies` collection.

- Consider up to the 150 most similar movie plots and return the top 10 results.

It uses the `$project` stage to:

- Only include the movie `plot` and `title` fields in the results.

- Add a `score` field to show the relevance of each result to the search term.

To learn more about this pipeline stage, see Run Vector Search Queries.

### Specify the `<connection-string>`.

Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

<Tabs>

<Tab name="Atlas Cluster">

Your connection string should use the following format:

```
mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
```

Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

</Tab>

<Tab name="Local Deployment">

Your connection string should use the following format:

```
mongodb://localhost:<port-number>/?directConnection=true
```

</Tab>

</Tabs>

### Run your query.

Compile and run the `BasicQuery.java` file:

```shell
javac BasicQuery.java
java BasicQuery
```

```js
{"plot": "A reporter, learning of time travelers visiting 20th century disasters, tries to change the history they know by averting upcoming disasters.", "title": "Thrill Seekers", "score": 0.7892671227455139}
{"plot": "At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.", "title": "About Time", "score": 0.7843604683876038}
{"plot": "Hoping to alter the events of the past, a 19th century inventor instead travels 800,000 years into the future, where he finds humankind divided into two warring races.", "title": "The Time Machine", "score": 0.7801066637039185}
{"plot": "After using his mother\'s newly built time machine, Dolf gets stuck involuntary in the year 1212. He ends up in a children\'s crusade where he confronts his new friends with modern techniques...", "title": "Crusade in Jeans", "score": 0.7789170742034912}
{"plot": "An officer for a security agency that regulates time travel, must fend for his life against a shady politician who has a tie to his past.", "title": "Timecop", "score": 0.7771612405776978}
{"plot": "A time-travel experiment in which a robot probe is sent from the year 2073 to the year 1973 goes terribly wrong thrusting one of the project scientists, a man named Nicholas Sinclair into a...", "title": "A.P.E.X.", "score": 0.7730885744094849}
{"plot": "Agent J travels in time to M.I.B.\'s early days in 1969 to stop an alien from assassinating his friend Agent K and changing history.", "title": "Men in Black 3", "score": 0.7712380886077881}
{"plot": "Bound by a shared destiny, a teen bursting with scientific curiosity and a former boy-genius inventor embark on a mission to unearth the secrets of a place somewhere in time and space that exists in their collective memory.", "title": "Tomorrowland", "score": 0.7669923901557922}
{"plot": "With the help of his uncle, a man travels to the future to try and bring his girlfriend back to life.", "title": "Love Story 2050", "score": 0.7649372816085815}
{"plot": "A dimension-traveling wizard gets stuck in the 21st century because cell-phone radiation interferes with his magic. With his home world on the brink of war, he seeks help from a jaded ...", "title": "The Portal", "score": 0.7640786170959473}

```

</Tab>

<Tab name="Kotlin (Coroutine)">

### Construct your vector search query.

This query searches for documents that include text in the `plot` field that is semantically related to the term "time travel".

- Create a file named `atlasVectorSearchQuery.kt`.

- Copy and paste the following sample query into the `atlasVectorSearchQuery.kt` file:

  ```kotlin
  import com.mongodb.client.model.Aggregates
  import com.mongodb.client.model.Projections
  import com.mongodb.client.model.search.SearchPath.fieldPath
  import com.mongodb.client.model.search.VectorSearchOptions
  import com.mongodb.kotlin.client.coroutine.MongoClient
  import kotlinx.coroutines.flow.count
  import org.bson.Document

  data class Movie(val title: String, val plot: String, val score: Double?)

  suspend fun main() {

      // Replace the placeholder with your Atlas connection string
      val uri = "<connection-string>"
      val client = MongoClient.create(uri)

      try {
          // Connect to your Atlas cluster
          val database = client.getDatabase("sample_mflix")
          val collection = database.getCollection<Movie>("embedded_movies")

          // Define the pipeline with $vectorSearch query options
          val queryVector = listOf(
              -0.0016261312, -0.028070757, -0.011342932, -0.012775794, -0.0027440966, 0.008683807, -0.02575152, -0.02020668, -0.010283281, -0.0041719596, 0.021392956, 0.028657231, -0.006634482, 0.007490867, 0.018593878, 0.0038187427, 0.029590257, -0.01451522, 0.016061379, 0.00008528442, -0.008943722, 0.01627464, 0.024311995, -0.025911469, 0.00022596726, -0.008863748, 0.008823762, -0.034921836, 0.007910728, -0.01515501, 0.035801545, -0.0035688248, -0.020299982, -0.03145631, -0.032256044, -0.028763862, -0.0071576433, -0.012769129, 0.012322609, -0.006621153, 0.010583182, 0.024085402, -0.001623632, 0.007864078, -0.021406285, 0.002554159, 0.012229307, -0.011762793, 0.0051682983, 0.0048484034, 0.018087378, 0.024325324, -0.037694257, -0.026537929, -0.008803768, -0.017767483, -0.012642504, -0.0062712682, 0.0009771782, -0.010409906, 0.017754154, -0.004671795, -0.030469967, 0.008477209, -0.005218282, -0.0058480743, -0.020153364, -0.0032805866, 0.004248601, 0.0051449724, 0.006791097, 0.007650814, 0.003458861, -0.0031223053, -0.01932697, -0.033615597, 0.00745088, 0.006321252, -0.0038154104, 0.014555207, 0.027697546, -0.02828402, 0.0066711367, 0.0077107945, 0.01794076, 0.011349596, -0.0052715978, 0.014755142, -0.019753495, -0.011156326, 0.011202978, 0.022126047, 0.00846388, 0.030549942, -0.0041386373, 0.018847128, -0.00033655585, 0.024925126, -0.003555496, -0.019300312, 0.010749794, 0.0075308536, -0.018287312, -0.016567878, -0.012869096, -0.015528221, 0.0078107617, -0.011156326, 0.013522214, -0.020646535, -0.01211601, 0.055928253, 0.011596181, -0.017247654, 0.0005939711, -0.026977783, -0.003942035, -0.009583511, -0.0055248477, -0.028737204, 0.023179034, 0.003995351, 0.0219661, -0.008470545, 0.023392297, 0.010469886, -0.015874773, 0.007890735, -0.009690142, -0.00024970944, 0.012775794, 0.0114762215, 0.013422247, 0.010429899, -0.03686786, -0.006717788, -0.027484283, 0.011556195, -0.036068123, -0.013915418, -0.0016327957, 0.0151016945, -0.020473259, 0.004671795, -0.012555866, 0.0209531, 0.01982014, 0.024485271, 0.0105431955, -0.005178295, 0.033162415, -0.013795458, 0.007150979, 0.010243294, 0.005644808, 0.017260984, -0.0045618312, 0.0024725192, 0.004305249, -0.008197301, 0.0014203656, 0.0018460588, 0.005015015, -0.011142998, 0.01439526, 0.022965772, 0.02552493, 0.007757446, -0.0019726837, 0.009503538, -0.032042783, 0.008403899, -0.04609149, 0.013808787, 0.011749465, 0.036388017, 0.016314628, 0.021939443, -0.0250051, -0.017354285, -0.012962398, 0.00006107364, 0.019113706, 0.03081652, -0.018114036, -0.0084572155, 0.009643491, -0.0034721901, 0.0072642746, -0.0090636825, 0.01642126, 0.013428912, 0.027724205, 0.0071243206, -0.6858542, -0.031029783, -0.014595194, -0.011449563, 0.017514233, 0.01743426, 0.009950057, 0.0029706885, -0.015714826, -0.001806072, 0.011856096, 0.026444625, -0.0010663156, -0.006474535, 0.0016161345, -0.020313311, 0.0148351155, -0.0018393943, 0.0057347785, 0.018300641, -0.018647194, 0.03345565, -0.008070676, 0.0071443142, 0.014301958, 0.0044818576, 0.003838736, -0.007350913, -0.024525259, -0.001142124, -0.018620536, 0.017247654, 0.007037683, 0.010236629, 0.06046009, 0.0138887605, -0.012122675, 0.037694257, 0.0055081863, 0.042492677, 0.00021784494, -0.011656162, 0.010276617, 0.022325981, 0.005984696, -0.009496873, 0.013382261, -0.0010563189, 0.0026507939, -0.041639622, 0.008637156, 0.026471283, -0.008403899, 0.024858482, -0.00066686375, -0.0016252982, 0.027590916, 0.0051449724, 0.0058647357, -0.008743787, -0.014968405, 0.027724205, -0.011596181, 0.0047650975, -0.015381602, 0.0043718936, 0.002159289, 0.035908177, -0.008243952, -0.030443309, 0.027564257, 0.042625964, -0.0033688906, 0.01843393, 0.019087048, 0.024578573, 0.03268257, -0.015608194, -0.014128681, -0.0033538956, -0.0028757197, -0.004121976, -0.032389335, 0.0034322033, 0.058807302, 0.010943064, -0.030523283, 0.008903735, 0.017500903, 0.00871713, -0.0029406983, 0.013995391, -0.03132302, -0.019660193, -0.00770413, -0.0038853872, 0.0015894766, -0.0015294964, -0.006251275, -0.021099718, -0.010256623, -0.008863748, 0.028550599, 0.02020668, -0.0012962399, -0.003415542, -0.0022509254, 0.0119360695, 0.027590916, -0.046971202, -0.0015194997, -0.022405956, 0.0016677842, -0.00018535563, -0.015421589, -0.031802863, 0.03814744, 0.0065411795, 0.016567878, -0.015621523, 0.022899127, -0.011076353, 0.02841731, -0.002679118, -0.002342562, 0.015341615, 0.01804739, -0.020566562, -0.012989056, -0.002990682, 0.01643459, 0.00042527664, 0.008243952, -0.013715484, -0.004835075, -0.009803439, 0.03129636, -0.021432944, 0.0012087687, -0.015741484, -0.0052016205, 0.00080890034, -0.01755422, 0.004811749, -0.017967418, -0.026684547, -0.014128681, 0.0041386373, -0.013742141, -0.010056688, -0.013268964, -0.0110630235, -0.028337335, 0.015981404, -0.00997005, -0.02424535, -0.013968734, -0.028310679, -0.027750863, -0.020699851, 0.02235264, 0.001057985, 0.00081639783, -0.0099367285, 0.013522214, -0.012016043, -0.00086471526, 0.013568865, 0.0019376953, -0.019020405, 0.017460918, -0.023045745, 0.008503866, 0.0064678704, -0.011509543, 0.018727167, -0.003372223, -0.0028690554, -0.0027024434, -0.011902748, -0.012182655, -0.015714826, -0.0098634185, 0.00593138, 0.018753825, 0.0010146659, 0.013029044, 0.0003521757, -0.017620865, 0.04102649, 0.00552818, 0.024485271, -0.009630162, -0.015608194, 0.0006718621, -0.0008418062, 0.012395918, 0.0057980907, 0.016221326, 0.010616505, 0.004838407, -0.012402583, 0.019900113, -0.0034521967, 0.000247002, -0.03153628, 0.0011038032, -0.020819811, 0.016234655, -0.00330058, -0.0032289368, 0.00078973995, -0.021952773, -0.022459272, 0.03118973, 0.03673457, -0.021472929, 0.0072109587, -0.015075036, 0.004855068, -0.0008151483, 0.0069643734, 0.010023367, -0.010276617, -0.023019087, 0.0068244194, -0.0012520878, -0.0015086699, 0.022046074, -0.034148756, -0.0022192693, 0.002427534, -0.0027124402, 0.0060346797, 0.015461575, 0.0137554705, 0.009230294, -0.009583511, 0.032629255, 0.015994733, -0.019167023, -0.009203636, 0.03393549, -0.017274313, -0.012042701, -0.0009930064, 0.026777849, -0.013582194, -0.0027590916, -0.017594207, -0.026804507, -0.0014236979, -0.022032745, 0.0091236625, -0.0042419364, -0.00858384, -0.0033905501, -0.020739838, 0.016821127, 0.022539245, 0.015381602, 0.015141681, 0.028817179, -0.019726837, -0.0051283115, -0.011489551, -0.013208984, -0.0047017853, -0.0072309524, 0.01767418, 0.0025658219, -0.010323267, 0.012609182, -0.028097415, 0.026871152, -0.010276617, 0.021912785, 0.0022542577, 0.005124979, -0.0019710176, 0.004518512, -0.040360045, 0.010969722, -0.0031539614, -0.020366628, -0.025778178, -0.0110030435, -0.016221326, 0.0036587953, 0.016207997, 0.003007343, -0.0032555948, 0.0044052163, -0.022046074, -0.0008822095, -0.009363583, 0.028230704, -0.024538586, 0.0029840174, 0.0016044717, -0.014181997, 0.031349678, -0.014381931, -0.027750863, 0.02613806, 0.0004136138, -0.005748107, -0.01868718, -0.0010138329, 0.0054348772, 0.010703143, -0.003682121, 0.0030856507, -0.004275259, -0.010403241, 0.021113047, -0.022685863, -0.023032416, 0.031429652, 0.001792743, -0.005644808, -0.011842767, -0.04078657, -0.0026874484, 0.06915057, -0.00056939584, -0.013995391, 0.010703143, -0.013728813, -0.022939114, -0.015261642, -0.022485929, 0.016807798, 0.007964044, 0.0144219175, 0.016821127, 0.0076241563, 0.005461535, -0.013248971, 0.015301628, 0.0085171955, -0.004318578, 0.011136333, -0.0059047225, -0.010249958, -0.018207338, 0.024645219, 0.021752838, 0.0007614159, -0.013648839, 0.01111634, -0.010503208, -0.0038487327, -0.008203966, -0.00397869, 0.0029740208, 0.008530525, 0.005261601, 0.01642126, -0.0038753906, -0.013222313, 0.026537929, 0.024671877, -0.043505676, 0.014195326, 0.024778508, 0.0056914594, -0.025951454, 0.017620865, -0.0021359634, 0.008643821, 0.021299653, 0.0041686273, -0.009017031, 0.04044002, 0.024378639, -0.027777521, -0.014208655, 0.0028623908, 0.042119466, 0.005801423, -0.028124074, -0.03129636, 0.022139376, -0.022179363, -0.04067994, 0.013688826, 0.013328944, 0.0046184794, -0.02828402, -0.0063412455, -0.0046184794, -0.011756129, -0.010383247, -0.0018543894, -0.0018593877, -0.00052024535, 0.004815081, 0.014781799, 0.018007403, 0.01306903, -0.020433271, 0.009043689, 0.033189073, -0.006844413, -0.019766824, -0.018767154, 0.00533491, -0.0024575242, 0.018727167, 0.0058080875, -0.013835444, 0.0040719924, 0.004881726, 0.012029372, 0.005664801, 0.03193615, 0.0058047553, 0.002695779, 0.009290274, 0.02361889, 0.017834127, 0.0049017193, -0.0036388019, 0.010776452, -0.019793482, 0.0067777685, -0.014208655, -0.024911797, 0.002385881, 0.0034988478, 0.020899786, -0.0025858153, -0.011849431, 0.033189073, -0.021312982, 0.024965113, -0.014635181, 0.014048708, -0.0035921505, -0.003347231, 0.030869836, -0.0017161017, -0.0061346465, 0.009203636, -0.025165047, 0.0068510775, 0.021499587, 0.013782129, -0.0024475274, -0.0051149824, -0.024445284, 0.006167969, 0.0068844, -0.00076183246, 0.030150073, -0.0055948244, -0.011162991, -0.02057989, -0.009703471, -0.020646535, 0.008004031, 0.0066378145, -0.019900113, -0.012169327, -0.01439526, 0.0044252095, -0.004018677, 0.014621852, -0.025085073, -0.013715484, -0.017980747, 0.0071043274, 0.011456228, -0.01010334, -0.0035321703, -0.03801415, -0.012036037, -0.0028990454, -0.05419549, -0.024058744, -0.024272008, 0.015221654, 0.027964126, 0.03182952, -0.015354944, 0.004855068, 0.011522872, 0.004771762, 0.0027874154, 0.023405626, 0.0004242353, -0.03132302, 0.007057676, 0.008763781, -0.0027057757, 0.023005757, -0.0071176565, -0.005238275, 0.029110415, -0.010989714, 0.013728813, -0.009630162, -0.029137073, -0.0049317093, -0.0008630492, -0.015248313, 0.0043219104, -0.0055681667, -0.013175662, 0.029723546, 0.025098402, 0.012849103, -0.0009996708, 0.03118973, -0.0021709518, 0.0260181, -0.020526575, 0.028097415, -0.016141351, 0.010509873, -0.022965772, 0.002865723, 0.0020493253, 0.0020509914, -0.0041419696, -0.00039695262, 0.017287642, 0.0038987163, 0.014795128, -0.014661839, -0.008950386, 0.004431874, -0.009383577, 0.0012604183, -0.023019087, 0.0029273694, -0.033135757, 0.009176978, -0.011023037, -0.002102641, 0.02663123, -0.03849399, -0.0044152127, 0.0004527676, -0.0026924468, 0.02828402, 0.017727496, 0.035135098, 0.02728435, -0.005348239, -0.001467017, -0.019766824, 0.014715155, 0.011982721, 0.0045651635, 0.023458943, -0.0010046692, -0.0031373003, -0.0006972704, 0.0019043729, -0.018967088, -0.024311995, 0.0011546199, 0.007977373, -0.004755101, -0.010016702, -0.02780418, -0.004688456, 0.013022379, -0.005484861, 0.0017227661, -0.015394931, -0.028763862, -0.026684547, 0.0030589928, -0.018513903, 0.028363993, 0.0044818576, -0.009270281, 0.038920518, -0.016008062, 0.0093902415, 0.004815081, -0.021059733, 0.01451522, -0.0051583014, 0.023765508, -0.017874114, -0.016821127, -0.012522544, -0.0028390652, 0.0040886537, 0.020259995, -0.031216389, -0.014115352, -0.009176978, 0.010303274, 0.020313311, 0.0064112223, -0.02235264, -0.022872468, 0.0052449396, 0.0005723116, 0.0037321046, 0.016807798, -0.018527232, -0.009303603, 0.0024858483, -0.0012662497, -0.007110992, 0.011976057, -0.007790768, -0.042999174, -0.006727785, -0.011829439, 0.007024354, 0.005278262, -0.017740825, -0.0041519664, 0.0085905045, 0.027750863, -0.038387362, 0.024391968, 0.00087721116, 0.010509873, -0.00038508154, -0.006857742, 0.0183273, -0.0037054466, 0.015461575, 0.0017394272, -0.0017944091, 0.014181997, -0.0052682655, 0.009023695, 0.00719763, -0.013522214, 0.0034422, 0.014941746, -0.0016711164, -0.025298337, -0.017634194, 0.0058714002, -0.005321581, 0.017834127, 0.0110630235, -0.03369557, 0.029190388, -0.008943722, 0.009363583, -0.0034222065, -0.026111402, -0.007037683, -0.006561173, 0.02473852, -0.007084334, -0.010110005, -0.008577175, 0.0030439978, -0.022712521, 0.0054582027, -0.0012620845, -0.0011954397, -0.015741484, 0.0129557345, -0.00042111133, 0.00846388, 0.008930393, 0.016487904, 0.010469886, -0.007917393, -0.011762793, -0.0214596, 0.000917198, 0.021672864, 0.010269952, -0.007737452, -0.010243294, -0.0067244526, -0.015488233, -0.021552904, 0.017127695, 0.011109675, 0.038067464, 0.00871713, -0.0025591573, 0.021312982, -0.006237946, 0.034628596, -0.0045251767, 0.008357248, 0.020686522, 0.0010696478, 0.0076708077, 0.03772091, -0.018700508, -0.0020676525, -0.008923728, -0.023298996, 0.018233996, -0.010256623, 0.0017860786, 0.009796774, -0.00897038, -0.01269582, -0.018527232, 0.009190307, -0.02372552, -0.042119466, 0.008097334, -0.0066778013, -0.021046404, 0.0019593548, 0.011083017, -0.0016028056, 0.012662497, -0.000059095124, 0.0071043274, -0.014675168, 0.024831824, -0.053582355, 0.038387362, 0.0005698124, 0.015954746, 0.021552904, 0.031589597, -0.009230294, -0.0006147976, 0.002625802, -0.011749465, -0.034362018, -0.0067844326, -0.018793812, 0.011442899, -0.008743787, 0.017474247, -0.021619547, 0.01831397, -0.009037024, -0.0057247817, -0.02728435, 0.010363255, 0.034415334, -0.024032086, -0.0020126705, -0.0045518344, -0.019353628, -0.018340627, -0.03129636, -0.0034038792, -0.006321252, -0.0016161345, 0.033642255, -0.000056075285, -0.005005019, 0.004571828, -0.0024075406, -0.00010215386, 0.0098634185, 0.1980148, -0.003825407, -0.025191706, 0.035161756, 0.005358236, 0.025111731, 0.023485601, 0.0023342315, -0.011882754, 0.018287312, -0.0068910643, 0.003912045, 0.009243623, -0.001355387, -0.028603915, -0.012802451, -0.030150073, -0.014795128, -0.028630573, -0.0013487226, 0.002667455, 0.00985009, -0.0033972147, -0.021486258, 0.009503538, -0.017847456, 0.013062365, -0.014341944, 0.005078328, 0.025165047, -0.015594865, -0.025924796, -0.0018177348, 0.010996379, -0.02993681, 0.007324255, 0.014475234, -0.028577257, 0.005494857, 0.00011725306, -0.013315615, 0.015941417, 0.009376912, 0.0025158382, 0.008743787, 0.023832154, -0.008084005, -0.014195326, -0.008823762, 0.0033455652, -0.032362677, -0.021552904, -0.0056081535, 0.023298996, -0.025444955, 0.0097301295, 0.009736794, 0.015274971, -0.0012937407, -0.018087378, -0.0039387033, 0.008637156, -0.011189649, -0.00023846315, -0.011582852, 0.0066411467, -0.018220667, 0.0060846633, 0.0376676, -0.002709108, 0.0072776037, 0.0034188742, -0.010249958, -0.0007747449, -0.00795738, -0.022192692, 0.03910712, 0.032122757, 0.023898797, 0.0076241563, -0.007397564, -0.003655463, 0.011442899, -0.014115352, -0.00505167, -0.031163072, 0.030336678, -0.006857742, -0.022259338, 0.004048667, 0.02072651, 0.0030156737, -0.0042119464, 0.00041861215, -0.005731446, 0.011103011, 0.013822115, 0.021512916, 0.009216965, -0.006537847, -0.027057758, -0.04054665, 0.010403241, -0.0056281467, -0.005701456, -0.002709108, -0.00745088, -0.0024841821, 0.009356919, -0.022659205, 0.004061996, -0.013175662, 0.017074378, -0.006141311, -0.014541878, 0.02993681, -0.00028448965, -0.025271678, 0.011689484, -0.014528549, 0.004398552, -0.017274313, 0.0045751603, 0.012455898, 0.004121976, -0.025458284, -0.006744446, 0.011822774, -0.015035049, -0.03257594, 0.014675168, -0.0039187097, 0.019726837, -0.0047251107, 0.0022825818, 0.011829439, 0.005391558, -0.016781142, -0.0058747325, 0.010309938, -0.013049036, 0.01186276, -0.0011246296, 0.0062112883, 0.0028190718, -0.021739509, 0.009883412, -0.0073175905, -0.012715813, -0.017181009, -0.016607866, -0.042492677, -0.0014478565, -0.01794076, 0.012302616, -0.015194997, -0.04433207, -0.020606548, 0.009696807, 0.010303274, -0.01694109, -0.004018677, 0.019353628, -0.001991011, 0.000058938927, 0.010536531, -0.17274313, 0.010143327, 0.014235313, -0.024152048, 0.025684876, -0.0012504216, 0.036601283, -0.003698782, 0.0007310093, 0.004165295, -0.0029157067, 0.017101036, -0.046891227, -0.017460918, 0.022965772, 0.020233337, -0.024072073, 0.017220996, 0.009370248, 0.0010363255, 0.0194336, -0.019606877, 0.01818068, -0.020819811, 0.007410893, 0.0019326969, 0.017887443, 0.006651143, 0.00067394477, -0.011889419, -0.025058415, -0.008543854, 0.021579562, 0.0047484366, 0.014062037, 0.0075508473, -0.009510202, -0.009143656, 0.0046817916, 0.013982063, -0.0027990784, 0.011782787, 0.014541878, -0.015701497, -0.029350337, 0.021979429, 0.01332228, -0.026244693, -0.0123492675, -0.003895384, 0.0071576433, -0.035454992, -0.00046984528, 0.0033522295, 0.039347045, 0.0005119148, 0.00476843, -0.012995721, 0.0024042083, -0.006931051, -0.014461905, -0.0127558, 0.0034555288, -0.0074842023, -0.030256703, -0.007057676, -0.00807734, 0.007804097, -0.006957709, 0.017181009, -0.034575284, -0.008603834, -0.005008351, -0.015834786, 0.02943031, 0.016861115, -0.0050849924, 0.014235313, 0.0051449724, 0.0025924798, -0.0025741523, 0.04289254, -0.002104307, 0.012969063, -0.008310596, 0.00423194, 0.0074975314, 0.0018810473, -0.014248641, -0.024725191, 0.0151016945, -0.017527562, 0.0018727167, 0.0002830318, 0.015168339, 0.0144219175, -0.004048667, -0.004358565, 0.011836103, -0.010343261, -0.005911387, 0.0022825818, 0.0073175905, 0.00403867, 0.013188991, 0.03334902, 0.006111321, 0.008597169, 0.030123414, -0.015474904, 0.0017877447, -0.024551915, 0.013155668, 0.023525586, -0.0255116, 0.017220996, 0.004358565, -0.00934359, 0.0099967085, 0.011162991, 0.03092315, -0.021046404, -0.015514892, 0.0011946067, -0.01816735, 0.010876419, -0.10124666, -0.03550831, 0.0056348112, 0.013942076, 0.005951374, 0.020419942, -0.006857742, -0.020873128, -0.021259667, 0.0137554705, 0.0057880944, -0.029163731, -0.018767154, -0.021392956, 0.030896494, -0.005494857, -0.0027307675, -0.006801094, -0.014821786, 0.021392956, -0.0018110704, -0.0018843795, -0.012362596, -0.0072176233, -0.017194338, -0.018713837, -0.024272008, 0.03801415, 0.00015880188, 0.0044951867, -0.028630573, -0.0014070367, -0.00916365, -0.026537929, -0.009576847, -0.013995391, -0.0077107945, 0.0050016865, 0.00578143, -0.04467862, 0.008363913, 0.010136662, -0.0006268769, -0.006591163, 0.015341615, -0.027377652, -0.00093136, 0.029243704, -0.020886457, -0.01041657, -0.02424535, 0.005291591, -0.02980352, -0.009190307, 0.019460259, -0.0041286405, 0.004801752, 0.0011787785, -0.001257086, -0.011216307, -0.013395589, 0.00088137644, -0.0051616337, 0.03876057, -0.0033455652, 0.00075850025, -0.006951045, -0.0062112883, 0.018140694, -0.006351242, -0.008263946, 0.018154023, -0.012189319, 0.0075508473, -0.044358727, -0.0040153447, 0.0093302615, -0.010636497, 0.032789204, -0.005264933, -0.014235313, -0.018393943, 0.007297597, -0.016114693, 0.015021721, 0.020033404, 0.0137688, 0.0011046362, 0.010616505, -0.0039453674, 0.012109346, 0.021099718, -0.0072842683, -0.019153694, -0.003768759, 0.039320387, -0.006747778, -0.0016852784, 0.018154023, 0.0010963057, -0.015035049, -0.021033075, -0.04345236, 0.017287642, 0.016341286, -0.008610498, 0.00236922, 0.009290274, 0.028950468, -0.014475234, -0.0035654926, 0.015434918, -0.03372223, 0.004501851, -0.012929076, -0.008483873, -0.0044685286, -0.0102233, 0.01615468, 0.0022792495, 0.010876419, -0.0059647025, 0.01895376, -0.0069976957, -0.0042952523, 0.017207667, -0.00036133936, 0.0085905045, 0.008084005, 0.03129636, -0.016994404, -0.014915089, 0.020100048, -0.012009379, -0.006684466, 0.01306903, 0.00015765642, -0.00530492, 0.0005277429, 0.015421589, 0.015528221, 0.032202728, -0.003485519, -0.0014286962, 0.033908837, 0.001367883, 0.010509873, 0.025271678, -0.020993087, 0.019846799, 0.006897729, -0.010216636, -0.00725761, 0.01818068, -0.028443968, -0.011242964, -0.014435247, -0.013688826, 0.006101324, -0.0022509254, 0.013848773, -0.0019077052, 0.017181009, 0.03422873, 0.005324913, -0.0035188415, 0.014128681, -0.004898387, 0.005038341, 0.0012320944, -0.005561502, -0.017847456, 0.0008538855, -0.0047884234, 0.011849431, 0.015421589, -0.013942076, 0.0029790192, -0.013702155, 0.0001199605, -0.024431955, 0.019926772, 0.022179363, -0.016487904, -0.03964028, 0.0050849924, 0.017487574, 0.022792496, 0.0012504216, 0.004048667, -0.00997005, 0.0076041627, -0.014328616, -0.020259995, 0.0005598157, -0.010469886, 0.0016852784, 0.01716768, -0.008990373, -0.001987679, 0.026417969, 0.023792166, 0.0046917885, -0.0071909656, -0.00032051947, -0.023259008, -0.009170313, 0.02071318, -0.03156294, -0.030869836, -0.006324584, 0.013795458, -0.00047151142, 0.016874444, 0.00947688, 0.00985009, -0.029883493, 0.024205362, -0.013522214, -0.015075036, -0.030603256, 0.029270362, 0.010503208, 0.021539574, 0.01743426, -0.023898797, 0.022019416, -0.0068777353, 0.027857494, -0.021259667, 0.0025758184, 0.006197959, 0.006447877, -0.00025200035, -0.004941706, -0.021246338, -0.005504854, -0.008390571, -0.0097301295, 0.027244363, -0.04446536, 0.05216949, 0.010243294, -0.016008062, 0.0122493, -0.0199401, 0.009077012, 0.019753495, 0.006431216, -0.037960835, -0.027377652, 0.016381273, -0.0038620618, 0.022512587, -0.010996379, -0.0015211658, -0.0102233, 0.007071005, 0.008230623, -0.009490209, -0.010083347, 0.024431955, 0.002427534, 0.02828402, 0.0035721571, -0.022192692, -0.011882754, 0.010056688, 0.0011904413, -0.01426197, -0.017500903, -0.00010985966, 0.005591492, -0.0077707744, -0.012049366, 0.011869425, 0.00858384, -0.024698535, -0.030283362, 0.020140035, 0.011949399, -0.013968734, 0.042732596, -0.011649498, -0.011982721, -0.016967745, -0.0060913274, -0.007130985, -0.013109017, -0.009710136,
              )
          val path = fieldPath("plot_embedding")
          val index = "vector_index"
          val limit = 10L
          val numCandidates = 150L

          val pipeline = listOf(
              Aggregates.vectorSearch(
                  path,
                  queryVector,
                  index,
                  limit,
                  VectorSearchOptions.approximateVectorSearchOptions(numCandidates)
              ),
              Aggregates.project(
                  Projections.fields(
                      Projections.excludeId(),
                      Projections.include(Movie::plot.name),
                      Projections.include(Movie::title.name),
                      Projections.metaVectorSearchScore(Movie::score.name)
                  )
              )
          )

          // Run the pipeline
          val resultsFlow = collection.aggregate<Document>(pipeline)

          // Print results
          val resultCount = resultsFlow.count()
          if (resultCount > 0) {
              resultsFlow.collect { result ->
                  println(result.toJson())
              }
          } else {
              println("No results found.")
          }
      } catch (e: Exception) {
          println("Error occurred: ${e.message}")
      } finally {
          client.close()
      }
  }

  ```

This query uses the `$vectorSearch` stage to:

- Compare vector embeddings of the search term against vector embeddings of movie plots in the `plot_embedding` field of the `sample_mflix.embedded_movies` collection.

- Consider up to the 150 most similar movie plots and return the top 10 results.

It uses the `$project` stage to:

- Only include the movie `plot` and `title` fields in the results.

- Add a `score` field to show the relevance of each result to the search term.

To learn more about this pipeline stage, see Run Vector Search Queries.

### Specify the `<connection-string>`.

Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

<Tabs>

<Tab name="Atlas Cluster">

Your connection string should use the following format:

```
mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
```

Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

</Tab>

<Tab name="Local Deployment">

Your connection string should use the following format:

```
mongodb://localhost:<port-number>/?directConnection=true
```

</Tab>

</Tabs>

### Run your query.

Run the `atlasVectorSearchQuery.kt` file in your IDE. The output should resemble the following:

```js
\'{"plot":"A reporter, learning of time travelers visiting 20th century disasters, tries to change the history they know by averting upcoming disasters.","title":"Thrill Seekers","score":0.7892671227455139}\'
\'{"plot":"At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.","title":"About Time","score":0.7843604683876038}\'
\'{"plot":"Hoping to alter the events of the past, a 19th century inventor instead travels 800,000 years into the future, where he finds humankind divided into two warring races.","title":"The Time Machine","score":0.7801066637039185}\'
`{"plot":"After using his mother\'s newly built time machine, Dolf gets stuck involuntary in the year 1212. He ends up in a children\'s crusade where he confronts his new friends with modern techniques...","title":"Crusade in Jeans","score":0.7789170742034912}`
\'{"plot":"An officer for a security agency that regulates time travel, must fend for his life against a shady politician who has a tie to his past.","title":"Timecop","score":0.7771612405776978}\'
\'{"plot":"A time-travel experiment in which a robot probe is sent from the year 2073 to the year 1973 goes terribly wrong thrusting one of the project scientists, a man named Nicholas Sinclair into a...","title":"A.P.E.X.","score":0.7730885744094849}\'
`{"plot":"Agent J travels in time to M.I.B.\'s early days in 1969 to stop an alien from assassinating his friend Agent K and changing history.","title":"Men in Black 3","score":0.7712380886077881}`
\'{"plot":"Bound by a shared destiny, a teen bursting with scientific curiosity and a former boy-genius inventor embark on a mission to unearth the secrets of a place somewhere in time and space that exists in their collective memory.","title":"Tomorrowland","score":0.7669923901557922}\'
\'{"plot":"With the help of his uncle, a man travels to the future to try and bring his girlfriend back to life.","title":"Love Story 2050","score":0.7649372816085815}\'
\'{"plot":"A dimension-traveling wizard gets stuck in the 21st century because cell-phone radiation interferes with his magic. With his home world on the brink of war, he seeks help from a jaded ...","title":"The Portal","score":0.7640786170959473}\'

```

</Tab>

<Tab name="Kotlin (Sync)">

### Construct your vector search query.

This query searches for documents that include text in the `plot` field that is semantically related to the term "time travel".

- Create a file named `atlasVectorSearchQuery.kt`.

- Copy and paste the following sample query into the `atlasVectorSearchQuery.kt` file:

  ```kotlin
  import com.mongodb.client.model.Aggregates
  import com.mongodb.client.model.Projections
  import com.mongodb.client.model.search.SearchPath.fieldPath
  import com.mongodb.client.model.search.VectorSearchOptions
  import com.mongodb.kotlin.client.MongoClient
  import org.bson.Document

  data class Movie(val title: String, val plot: String, val score: Double?)

  fun main() {

      // Replace the placeholder with your Atlas connection string
      val uri = "<connection-string>"
      val client = MongoClient.create(uri)

      try {
          // Connect to your Atlas cluster
          val database = client.getDatabase("sample_mflix")
          val collection = database.getCollection<Movie>("embedded_movies")

          // Define the pipeline with $vectorSearch query options
          val queryVector = listOf(
              -0.0016261312, -0.028070757, -0.011342932, -0.012775794, -0.0027440966, 0.008683807, -0.02575152, -0.02020668, -0.010283281, -0.0041719596, 0.021392956, 0.028657231, -0.006634482, 0.007490867, 0.018593878, 0.0038187427, 0.029590257, -0.01451522, 0.016061379, 0.00008528442, -0.008943722, 0.01627464, 0.024311995, -0.025911469, 0.00022596726, -0.008863748, 0.008823762, -0.034921836, 0.007910728, -0.01515501, 0.035801545, -0.0035688248, -0.020299982, -0.03145631, -0.032256044, -0.028763862, -0.0071576433, -0.012769129, 0.012322609, -0.006621153, 0.010583182, 0.024085402, -0.001623632, 0.007864078, -0.021406285, 0.002554159, 0.012229307, -0.011762793, 0.0051682983, 0.0048484034, 0.018087378, 0.024325324, -0.037694257, -0.026537929, -0.008803768, -0.017767483, -0.012642504, -0.0062712682, 0.0009771782, -0.010409906, 0.017754154, -0.004671795, -0.030469967, 0.008477209, -0.005218282, -0.0058480743, -0.020153364, -0.0032805866, 0.004248601, 0.0051449724, 0.006791097, 0.007650814, 0.003458861, -0.0031223053, -0.01932697, -0.033615597, 0.00745088, 0.006321252, -0.0038154104, 0.014555207, 0.027697546, -0.02828402, 0.0066711367, 0.0077107945, 0.01794076, 0.011349596, -0.0052715978, 0.014755142, -0.019753495, -0.011156326, 0.011202978, 0.022126047, 0.00846388, 0.030549942, -0.0041386373, 0.018847128, -0.00033655585, 0.024925126, -0.003555496, -0.019300312, 0.010749794, 0.0075308536, -0.018287312, -0.016567878, -0.012869096, -0.015528221, 0.0078107617, -0.011156326, 0.013522214, -0.020646535, -0.01211601, 0.055928253, 0.011596181, -0.017247654, 0.0005939711, -0.026977783, -0.003942035, -0.009583511, -0.0055248477, -0.028737204, 0.023179034, 0.003995351, 0.0219661, -0.008470545, 0.023392297, 0.010469886, -0.015874773, 0.007890735, -0.009690142, -0.00024970944, 0.012775794, 0.0114762215, 0.013422247, 0.010429899, -0.03686786, -0.006717788, -0.027484283, 0.011556195, -0.036068123, -0.013915418, -0.0016327957, 0.0151016945, -0.020473259, 0.004671795, -0.012555866, 0.0209531, 0.01982014, 0.024485271, 0.0105431955, -0.005178295, 0.033162415, -0.013795458, 0.007150979, 0.010243294, 0.005644808, 0.017260984, -0.0045618312, 0.0024725192, 0.004305249, -0.008197301, 0.0014203656, 0.0018460588, 0.005015015, -0.011142998, 0.01439526, 0.022965772, 0.02552493, 0.007757446, -0.0019726837, 0.009503538, -0.032042783, 0.008403899, -0.04609149, 0.013808787, 0.011749465, 0.036388017, 0.016314628, 0.021939443, -0.0250051, -0.017354285, -0.012962398, 0.00006107364, 0.019113706, 0.03081652, -0.018114036, -0.0084572155, 0.009643491, -0.0034721901, 0.0072642746, -0.0090636825, 0.01642126, 0.013428912, 0.027724205, 0.0071243206, -0.6858542, -0.031029783, -0.014595194, -0.011449563, 0.017514233, 0.01743426, 0.009950057, 0.0029706885, -0.015714826, -0.001806072, 0.011856096, 0.026444625, -0.0010663156, -0.006474535, 0.0016161345, -0.020313311, 0.0148351155, -0.0018393943, 0.0057347785, 0.018300641, -0.018647194, 0.03345565, -0.008070676, 0.0071443142, 0.014301958, 0.0044818576, 0.003838736, -0.007350913, -0.024525259, -0.001142124, -0.018620536, 0.017247654, 0.007037683, 0.010236629, 0.06046009, 0.0138887605, -0.012122675, 0.037694257, 0.0055081863, 0.042492677, 0.00021784494, -0.011656162, 0.010276617, 0.022325981, 0.005984696, -0.009496873, 0.013382261, -0.0010563189, 0.0026507939, -0.041639622, 0.008637156, 0.026471283, -0.008403899, 0.024858482, -0.00066686375, -0.0016252982, 0.027590916, 0.0051449724, 0.0058647357, -0.008743787, -0.014968405, 0.027724205, -0.011596181, 0.0047650975, -0.015381602, 0.0043718936, 0.002159289, 0.035908177, -0.008243952, -0.030443309, 0.027564257, 0.042625964, -0.0033688906, 0.01843393, 0.019087048, 0.024578573, 0.03268257, -0.015608194, -0.014128681, -0.0033538956, -0.0028757197, -0.004121976, -0.032389335, 0.0034322033, 0.058807302, 0.010943064, -0.030523283, 0.008903735, 0.017500903, 0.00871713, -0.0029406983, 0.013995391, -0.03132302, -0.019660193, -0.00770413, -0.0038853872, 0.0015894766, -0.0015294964, -0.006251275, -0.021099718, -0.010256623, -0.008863748, 0.028550599, 0.02020668, -0.0012962399, -0.003415542, -0.0022509254, 0.0119360695, 0.027590916, -0.046971202, -0.0015194997, -0.022405956, 0.0016677842, -0.00018535563, -0.015421589, -0.031802863, 0.03814744, 0.0065411795, 0.016567878, -0.015621523, 0.022899127, -0.011076353, 0.02841731, -0.002679118, -0.002342562, 0.015341615, 0.01804739, -0.020566562, -0.012989056, -0.002990682, 0.01643459, 0.00042527664, 0.008243952, -0.013715484, -0.004835075, -0.009803439, 0.03129636, -0.021432944, 0.0012087687, -0.015741484, -0.0052016205, 0.00080890034, -0.01755422, 0.004811749, -0.017967418, -0.026684547, -0.014128681, 0.0041386373, -0.013742141, -0.010056688, -0.013268964, -0.0110630235, -0.028337335, 0.015981404, -0.00997005, -0.02424535, -0.013968734, -0.028310679, -0.027750863, -0.020699851, 0.02235264, 0.001057985, 0.00081639783, -0.0099367285, 0.013522214, -0.012016043, -0.00086471526, 0.013568865, 0.0019376953, -0.019020405, 0.017460918, -0.023045745, 0.008503866, 0.0064678704, -0.011509543, 0.018727167, -0.003372223, -0.0028690554, -0.0027024434, -0.011902748, -0.012182655, -0.015714826, -0.0098634185, 0.00593138, 0.018753825, 0.0010146659, 0.013029044, 0.0003521757, -0.017620865, 0.04102649, 0.00552818, 0.024485271, -0.009630162, -0.015608194, 0.0006718621, -0.0008418062, 0.012395918, 0.0057980907, 0.016221326, 0.010616505, 0.004838407, -0.012402583, 0.019900113, -0.0034521967, 0.000247002, -0.03153628, 0.0011038032, -0.020819811, 0.016234655, -0.00330058, -0.0032289368, 0.00078973995, -0.021952773, -0.022459272, 0.03118973, 0.03673457, -0.021472929, 0.0072109587, -0.015075036, 0.004855068, -0.0008151483, 0.0069643734, 0.010023367, -0.010276617, -0.023019087, 0.0068244194, -0.0012520878, -0.0015086699, 0.022046074, -0.034148756, -0.0022192693, 0.002427534, -0.0027124402, 0.0060346797, 0.015461575, 0.0137554705, 0.009230294, -0.009583511, 0.032629255, 0.015994733, -0.019167023, -0.009203636, 0.03393549, -0.017274313, -0.012042701, -0.0009930064, 0.026777849, -0.013582194, -0.0027590916, -0.017594207, -0.026804507, -0.0014236979, -0.022032745, 0.0091236625, -0.0042419364, -0.00858384, -0.0033905501, -0.020739838, 0.016821127, 0.022539245, 0.015381602, 0.015141681, 0.028817179, -0.019726837, -0.0051283115, -0.011489551, -0.013208984, -0.0047017853, -0.0072309524, 0.01767418, 0.0025658219, -0.010323267, 0.012609182, -0.028097415, 0.026871152, -0.010276617, 0.021912785, 0.0022542577, 0.005124979, -0.0019710176, 0.004518512, -0.040360045, 0.010969722, -0.0031539614, -0.020366628, -0.025778178, -0.0110030435, -0.016221326, 0.0036587953, 0.016207997, 0.003007343, -0.0032555948, 0.0044052163, -0.022046074, -0.0008822095, -0.009363583, 0.028230704, -0.024538586, 0.0029840174, 0.0016044717, -0.014181997, 0.031349678, -0.014381931, -0.027750863, 0.02613806, 0.0004136138, -0.005748107, -0.01868718, -0.0010138329, 0.0054348772, 0.010703143, -0.003682121, 0.0030856507, -0.004275259, -0.010403241, 0.021113047, -0.022685863, -0.023032416, 0.031429652, 0.001792743, -0.005644808, -0.011842767, -0.04078657, -0.0026874484, 0.06915057, -0.00056939584, -0.013995391, 0.010703143, -0.013728813, -0.022939114, -0.015261642, -0.022485929, 0.016807798, 0.007964044, 0.0144219175, 0.016821127, 0.0076241563, 0.005461535, -0.013248971, 0.015301628, 0.0085171955, -0.004318578, 0.011136333, -0.0059047225, -0.010249958, -0.018207338, 0.024645219, 0.021752838, 0.0007614159, -0.013648839, 0.01111634, -0.010503208, -0.0038487327, -0.008203966, -0.00397869, 0.0029740208, 0.008530525, 0.005261601, 0.01642126, -0.0038753906, -0.013222313, 0.026537929, 0.024671877, -0.043505676, 0.014195326, 0.024778508, 0.0056914594, -0.025951454, 0.017620865, -0.0021359634, 0.008643821, 0.021299653, 0.0041686273, -0.009017031, 0.04044002, 0.024378639, -0.027777521, -0.014208655, 0.0028623908, 0.042119466, 0.005801423, -0.028124074, -0.03129636, 0.022139376, -0.022179363, -0.04067994, 0.013688826, 0.013328944, 0.0046184794, -0.02828402, -0.0063412455, -0.0046184794, -0.011756129, -0.010383247, -0.0018543894, -0.0018593877, -0.00052024535, 0.004815081, 0.014781799, 0.018007403, 0.01306903, -0.020433271, 0.009043689, 0.033189073, -0.006844413, -0.019766824, -0.018767154, 0.00533491, -0.0024575242, 0.018727167, 0.0058080875, -0.013835444, 0.0040719924, 0.004881726, 0.012029372, 0.005664801, 0.03193615, 0.0058047553, 0.002695779, 0.009290274, 0.02361889, 0.017834127, 0.0049017193, -0.0036388019, 0.010776452, -0.019793482, 0.0067777685, -0.014208655, -0.024911797, 0.002385881, 0.0034988478, 0.020899786, -0.0025858153, -0.011849431, 0.033189073, -0.021312982, 0.024965113, -0.014635181, 0.014048708, -0.0035921505, -0.003347231, 0.030869836, -0.0017161017, -0.0061346465, 0.009203636, -0.025165047, 0.0068510775, 0.021499587, 0.013782129, -0.0024475274, -0.0051149824, -0.024445284, 0.006167969, 0.0068844, -0.00076183246, 0.030150073, -0.0055948244, -0.011162991, -0.02057989, -0.009703471, -0.020646535, 0.008004031, 0.0066378145, -0.019900113, -0.012169327, -0.01439526, 0.0044252095, -0.004018677, 0.014621852, -0.025085073, -0.013715484, -0.017980747, 0.0071043274, 0.011456228, -0.01010334, -0.0035321703, -0.03801415, -0.012036037, -0.0028990454, -0.05419549, -0.024058744, -0.024272008, 0.015221654, 0.027964126, 0.03182952, -0.015354944, 0.004855068, 0.011522872, 0.004771762, 0.0027874154, 0.023405626, 0.0004242353, -0.03132302, 0.007057676, 0.008763781, -0.0027057757, 0.023005757, -0.0071176565, -0.005238275, 0.029110415, -0.010989714, 0.013728813, -0.009630162, -0.029137073, -0.0049317093, -0.0008630492, -0.015248313, 0.0043219104, -0.0055681667, -0.013175662, 0.029723546, 0.025098402, 0.012849103, -0.0009996708, 0.03118973, -0.0021709518, 0.0260181, -0.020526575, 0.028097415, -0.016141351, 0.010509873, -0.022965772, 0.002865723, 0.0020493253, 0.0020509914, -0.0041419696, -0.00039695262, 0.017287642, 0.0038987163, 0.014795128, -0.014661839, -0.008950386, 0.004431874, -0.009383577, 0.0012604183, -0.023019087, 0.0029273694, -0.033135757, 0.009176978, -0.011023037, -0.002102641, 0.02663123, -0.03849399, -0.0044152127, 0.0004527676, -0.0026924468, 0.02828402, 0.017727496, 0.035135098, 0.02728435, -0.005348239, -0.001467017, -0.019766824, 0.014715155, 0.011982721, 0.0045651635, 0.023458943, -0.0010046692, -0.0031373003, -0.0006972704, 0.0019043729, -0.018967088, -0.024311995, 0.0011546199, 0.007977373, -0.004755101, -0.010016702, -0.02780418, -0.004688456, 0.013022379, -0.005484861, 0.0017227661, -0.015394931, -0.028763862, -0.026684547, 0.0030589928, -0.018513903, 0.028363993, 0.0044818576, -0.009270281, 0.038920518, -0.016008062, 0.0093902415, 0.004815081, -0.021059733, 0.01451522, -0.0051583014, 0.023765508, -0.017874114, -0.016821127, -0.012522544, -0.0028390652, 0.0040886537, 0.020259995, -0.031216389, -0.014115352, -0.009176978, 0.010303274, 0.020313311, 0.0064112223, -0.02235264, -0.022872468, 0.0052449396, 0.0005723116, 0.0037321046, 0.016807798, -0.018527232, -0.009303603, 0.0024858483, -0.0012662497, -0.007110992, 0.011976057, -0.007790768, -0.042999174, -0.006727785, -0.011829439, 0.007024354, 0.005278262, -0.017740825, -0.0041519664, 0.0085905045, 0.027750863, -0.038387362, 0.024391968, 0.00087721116, 0.010509873, -0.00038508154, -0.006857742, 0.0183273, -0.0037054466, 0.015461575, 0.0017394272, -0.0017944091, 0.014181997, -0.0052682655, 0.009023695, 0.00719763, -0.013522214, 0.0034422, 0.014941746, -0.0016711164, -0.025298337, -0.017634194, 0.0058714002, -0.005321581, 0.017834127, 0.0110630235, -0.03369557, 0.029190388, -0.008943722, 0.009363583, -0.0034222065, -0.026111402, -0.007037683, -0.006561173, 0.02473852, -0.007084334, -0.010110005, -0.008577175, 0.0030439978, -0.022712521, 0.0054582027, -0.0012620845, -0.0011954397, -0.015741484, 0.0129557345, -0.00042111133, 0.00846388, 0.008930393, 0.016487904, 0.010469886, -0.007917393, -0.011762793, -0.0214596, 0.000917198, 0.021672864, 0.010269952, -0.007737452, -0.010243294, -0.0067244526, -0.015488233, -0.021552904, 0.017127695, 0.011109675, 0.038067464, 0.00871713, -0.0025591573, 0.021312982, -0.006237946, 0.034628596, -0.0045251767, 0.008357248, 0.020686522, 0.0010696478, 0.0076708077, 0.03772091, -0.018700508, -0.0020676525, -0.008923728, -0.023298996, 0.018233996, -0.010256623, 0.0017860786, 0.009796774, -0.00897038, -0.01269582, -0.018527232, 0.009190307, -0.02372552, -0.042119466, 0.008097334, -0.0066778013, -0.021046404, 0.0019593548, 0.011083017, -0.0016028056, 0.012662497, -0.000059095124, 0.0071043274, -0.014675168, 0.024831824, -0.053582355, 0.038387362, 0.0005698124, 0.015954746, 0.021552904, 0.031589597, -0.009230294, -0.0006147976, 0.002625802, -0.011749465, -0.034362018, -0.0067844326, -0.018793812, 0.011442899, -0.008743787, 0.017474247, -0.021619547, 0.01831397, -0.009037024, -0.0057247817, -0.02728435, 0.010363255, 0.034415334, -0.024032086, -0.0020126705, -0.0045518344, -0.019353628, -0.018340627, -0.03129636, -0.0034038792, -0.006321252, -0.0016161345, 0.033642255, -0.000056075285, -0.005005019, 0.004571828, -0.0024075406, -0.00010215386, 0.0098634185, 0.1980148, -0.003825407, -0.025191706, 0.035161756, 0.005358236, 0.025111731, 0.023485601, 0.0023342315, -0.011882754, 0.018287312, -0.0068910643, 0.003912045, 0.009243623, -0.001355387, -0.028603915, -0.012802451, -0.030150073, -0.014795128, -0.028630573, -0.0013487226, 0.002667455, 0.00985009, -0.0033972147, -0.021486258, 0.009503538, -0.017847456, 0.013062365, -0.014341944, 0.005078328, 0.025165047, -0.015594865, -0.025924796, -0.0018177348, 0.010996379, -0.02993681, 0.007324255, 0.014475234, -0.028577257, 0.005494857, 0.00011725306, -0.013315615, 0.015941417, 0.009376912, 0.0025158382, 0.008743787, 0.023832154, -0.008084005, -0.014195326, -0.008823762, 0.0033455652, -0.032362677, -0.021552904, -0.0056081535, 0.023298996, -0.025444955, 0.0097301295, 0.009736794, 0.015274971, -0.0012937407, -0.018087378, -0.0039387033, 0.008637156, -0.011189649, -0.00023846315, -0.011582852, 0.0066411467, -0.018220667, 0.0060846633, 0.0376676, -0.002709108, 0.0072776037, 0.0034188742, -0.010249958, -0.0007747449, -0.00795738, -0.022192692, 0.03910712, 0.032122757, 0.023898797, 0.0076241563, -0.007397564, -0.003655463, 0.011442899, -0.014115352, -0.00505167, -0.031163072, 0.030336678, -0.006857742, -0.022259338, 0.004048667, 0.02072651, 0.0030156737, -0.0042119464, 0.00041861215, -0.005731446, 0.011103011, 0.013822115, 0.021512916, 0.009216965, -0.006537847, -0.027057758, -0.04054665, 0.010403241, -0.0056281467, -0.005701456, -0.002709108, -0.00745088, -0.0024841821, 0.009356919, -0.022659205, 0.004061996, -0.013175662, 0.017074378, -0.006141311, -0.014541878, 0.02993681, -0.00028448965, -0.025271678, 0.011689484, -0.014528549, 0.004398552, -0.017274313, 0.0045751603, 0.012455898, 0.004121976, -0.025458284, -0.006744446, 0.011822774, -0.015035049, -0.03257594, 0.014675168, -0.0039187097, 0.019726837, -0.0047251107, 0.0022825818, 0.011829439, 0.005391558, -0.016781142, -0.0058747325, 0.010309938, -0.013049036, 0.01186276, -0.0011246296, 0.0062112883, 0.0028190718, -0.021739509, 0.009883412, -0.0073175905, -0.012715813, -0.017181009, -0.016607866, -0.042492677, -0.0014478565, -0.01794076, 0.012302616, -0.015194997, -0.04433207, -0.020606548, 0.009696807, 0.010303274, -0.01694109, -0.004018677, 0.019353628, -0.001991011, 0.000058938927, 0.010536531, -0.17274313, 0.010143327, 0.014235313, -0.024152048, 0.025684876, -0.0012504216, 0.036601283, -0.003698782, 0.0007310093, 0.004165295, -0.0029157067, 0.017101036, -0.046891227, -0.017460918, 0.022965772, 0.020233337, -0.024072073, 0.017220996, 0.009370248, 0.0010363255, 0.0194336, -0.019606877, 0.01818068, -0.020819811, 0.007410893, 0.0019326969, 0.017887443, 0.006651143, 0.00067394477, -0.011889419, -0.025058415, -0.008543854, 0.021579562, 0.0047484366, 0.014062037, 0.0075508473, -0.009510202, -0.009143656, 0.0046817916, 0.013982063, -0.0027990784, 0.011782787, 0.014541878, -0.015701497, -0.029350337, 0.021979429, 0.01332228, -0.026244693, -0.0123492675, -0.003895384, 0.0071576433, -0.035454992, -0.00046984528, 0.0033522295, 0.039347045, 0.0005119148, 0.00476843, -0.012995721, 0.0024042083, -0.006931051, -0.014461905, -0.0127558, 0.0034555288, -0.0074842023, -0.030256703, -0.007057676, -0.00807734, 0.007804097, -0.006957709, 0.017181009, -0.034575284, -0.008603834, -0.005008351, -0.015834786, 0.02943031, 0.016861115, -0.0050849924, 0.014235313, 0.0051449724, 0.0025924798, -0.0025741523, 0.04289254, -0.002104307, 0.012969063, -0.008310596, 0.00423194, 0.0074975314, 0.0018810473, -0.014248641, -0.024725191, 0.0151016945, -0.017527562, 0.0018727167, 0.0002830318, 0.015168339, 0.0144219175, -0.004048667, -0.004358565, 0.011836103, -0.010343261, -0.005911387, 0.0022825818, 0.0073175905, 0.00403867, 0.013188991, 0.03334902, 0.006111321, 0.008597169, 0.030123414, -0.015474904, 0.0017877447, -0.024551915, 0.013155668, 0.023525586, -0.0255116, 0.017220996, 0.004358565, -0.00934359, 0.0099967085, 0.011162991, 0.03092315, -0.021046404, -0.015514892, 0.0011946067, -0.01816735, 0.010876419, -0.10124666, -0.03550831, 0.0056348112, 0.013942076, 0.005951374, 0.020419942, -0.006857742, -0.020873128, -0.021259667, 0.0137554705, 0.0057880944, -0.029163731, -0.018767154, -0.021392956, 0.030896494, -0.005494857, -0.0027307675, -0.006801094, -0.014821786, 0.021392956, -0.0018110704, -0.0018843795, -0.012362596, -0.0072176233, -0.017194338, -0.018713837, -0.024272008, 0.03801415, 0.00015880188, 0.0044951867, -0.028630573, -0.0014070367, -0.00916365, -0.026537929, -0.009576847, -0.013995391, -0.0077107945, 0.0050016865, 0.00578143, -0.04467862, 0.008363913, 0.010136662, -0.0006268769, -0.006591163, 0.015341615, -0.027377652, -0.00093136, 0.029243704, -0.020886457, -0.01041657, -0.02424535, 0.005291591, -0.02980352, -0.009190307, 0.019460259, -0.0041286405, 0.004801752, 0.0011787785, -0.001257086, -0.011216307, -0.013395589, 0.00088137644, -0.0051616337, 0.03876057, -0.0033455652, 0.00075850025, -0.006951045, -0.0062112883, 0.018140694, -0.006351242, -0.008263946, 0.018154023, -0.012189319, 0.0075508473, -0.044358727, -0.0040153447, 0.0093302615, -0.010636497, 0.032789204, -0.005264933, -0.014235313, -0.018393943, 0.007297597, -0.016114693, 0.015021721, 0.020033404, 0.0137688, 0.0011046362, 0.010616505, -0.0039453674, 0.012109346, 0.021099718, -0.0072842683, -0.019153694, -0.003768759, 0.039320387, -0.006747778, -0.0016852784, 0.018154023, 0.0010963057, -0.015035049, -0.021033075, -0.04345236, 0.017287642, 0.016341286, -0.008610498, 0.00236922, 0.009290274, 0.028950468, -0.014475234, -0.0035654926, 0.015434918, -0.03372223, 0.004501851, -0.012929076, -0.008483873, -0.0044685286, -0.0102233, 0.01615468, 0.0022792495, 0.010876419, -0.0059647025, 0.01895376, -0.0069976957, -0.0042952523, 0.017207667, -0.00036133936, 0.0085905045, 0.008084005, 0.03129636, -0.016994404, -0.014915089, 0.020100048, -0.012009379, -0.006684466, 0.01306903, 0.00015765642, -0.00530492, 0.0005277429, 0.015421589, 0.015528221, 0.032202728, -0.003485519, -0.0014286962, 0.033908837, 0.001367883, 0.010509873, 0.025271678, -0.020993087, 0.019846799, 0.006897729, -0.010216636, -0.00725761, 0.01818068, -0.028443968, -0.011242964, -0.014435247, -0.013688826, 0.006101324, -0.0022509254, 0.013848773, -0.0019077052, 0.017181009, 0.03422873, 0.005324913, -0.0035188415, 0.014128681, -0.004898387, 0.005038341, 0.0012320944, -0.005561502, -0.017847456, 0.0008538855, -0.0047884234, 0.011849431, 0.015421589, -0.013942076, 0.0029790192, -0.013702155, 0.0001199605, -0.024431955, 0.019926772, 0.022179363, -0.016487904, -0.03964028, 0.0050849924, 0.017487574, 0.022792496, 0.0012504216, 0.004048667, -0.00997005, 0.0076041627, -0.014328616, -0.020259995, 0.0005598157, -0.010469886, 0.0016852784, 0.01716768, -0.008990373, -0.001987679, 0.026417969, 0.023792166, 0.0046917885, -0.0071909656, -0.00032051947, -0.023259008, -0.009170313, 0.02071318, -0.03156294, -0.030869836, -0.006324584, 0.013795458, -0.00047151142, 0.016874444, 0.00947688, 0.00985009, -0.029883493, 0.024205362, -0.013522214, -0.015075036, -0.030603256, 0.029270362, 0.010503208, 0.021539574, 0.01743426, -0.023898797, 0.022019416, -0.0068777353, 0.027857494, -0.021259667, 0.0025758184, 0.006197959, 0.006447877, -0.00025200035, -0.004941706, -0.021246338, -0.005504854, -0.008390571, -0.0097301295, 0.027244363, -0.04446536, 0.05216949, 0.010243294, -0.016008062, 0.0122493, -0.0199401, 0.009077012, 0.019753495, 0.006431216, -0.037960835, -0.027377652, 0.016381273, -0.0038620618, 0.022512587, -0.010996379, -0.0015211658, -0.0102233, 0.007071005, 0.008230623, -0.009490209, -0.010083347, 0.024431955, 0.002427534, 0.02828402, 0.0035721571, -0.022192692, -0.011882754, 0.010056688, 0.0011904413, -0.01426197, -0.017500903, -0.00010985966, 0.005591492, -0.0077707744, -0.012049366, 0.011869425, 0.00858384, -0.024698535, -0.030283362, 0.020140035, 0.011949399, -0.013968734, 0.042732596, -0.011649498, -0.011982721, -0.016967745, -0.0060913274, -0.007130985, -0.013109017, -0.009710136,
              )
          val path = fieldPath("plot_embedding")
          val index = "vector_index"
          val limit = 10L
          val numCandidates = 150L

          val pipeline = listOf(
              Aggregates.vectorSearch(
                  path,
                  queryVector,
                  index,
                  limit,
                  VectorSearchOptions.approximateVectorSearchOptions(numCandidates)
              ),
              Aggregates.project(
                  Projections.fields(
                      Projections.excludeId(),
                      Projections.include(Movie::plot.name),
                      Projections.include(Movie::title.name),
                      Projections.metaVectorSearchScore(Movie::score.name)
                  )
              )
          )

          // Run the pipeline
          val results = collection.aggregate<Document>(pipeline).toList()

          // Print results
          if (results.isNotEmpty()) {
              results.forEach { result ->
                  println(result.toJson()).toString()
              }
          } else {
              println("No results found.")
          }
      } catch (e: Exception) {
          println("Error occurred: ${e.message}")
      } finally {
          client.close()
      }
  }

  ```

This query uses the `$vectorSearch` stage to:

- Compare vector embeddings of the search term against vector embeddings of movie plots in the `plot_embedding` field of the `sample_mflix.embedded_movies` collection.

- Consider up to the 150 most similar movie plots and return the top 10 results.

It uses the `$project` stage to:

- Only include the movie `plot` and `title` fields in the results.

- Add a `score` field to show the relevance of each result to the search term.

To learn more about this pipeline stage, see Run Vector Search Queries.

### Specify the `<connection-string>`.

Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

<Tabs>

<Tab name="Atlas Cluster">

Your connection string should use the following format:

```
mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
```

Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

</Tab>

<Tab name="Local Deployment">

Your connection string should use the following format:

```
mongodb://localhost:<port-number>/?directConnection=true
```

</Tab>

</Tabs>

### Run your query.

Run the `atlasVectorSearchQuery.kt` file in your IDE. The output should resemble the following:

```js
\'{"plot":"A reporter, learning of time travelers visiting 20th century disasters, tries to change the history they know by averting upcoming disasters.","title":"Thrill Seekers","score":0.7892671227455139}\'
\'{"plot":"At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.","title":"About Time","score":0.7843604683876038}\'
\'{"plot":"Hoping to alter the events of the past, a 19th century inventor instead travels 800,000 years into the future, where he finds humankind divided into two warring races.","title":"The Time Machine","score":0.7801066637039185}\'
`{"plot":"After using his mother\'s newly built time machine, Dolf gets stuck involuntary in the year 1212. He ends up in a children\'s crusade where he confronts his new friends with modern techniques...","title":"Crusade in Jeans","score":0.7789170742034912}`
\'{"plot":"An officer for a security agency that regulates time travel, must fend for his life against a shady politician who has a tie to his past.","title":"Timecop","score":0.7771612405776978}\'
\'{"plot":"A time-travel experiment in which a robot probe is sent from the year 2073 to the year 1973 goes terribly wrong thrusting one of the project scientists, a man named Nicholas Sinclair into a...","title":"A.P.E.X.","score":0.7730885744094849}\'
`{"plot":"Agent J travels in time to M.I.B.\'s early days in 1969 to stop an alien from assassinating his friend Agent K and changing history.","title":"Men in Black 3","score":0.7712380886077881}`
\'{"plot":"Bound by a shared destiny, a teen bursting with scientific curiosity and a former boy-genius inventor embark on a mission to unearth the secrets of a place somewhere in time and space that exists in their collective memory.","title":"Tomorrowland","score":0.7669923901557922}\'
\'{"plot":"With the help of his uncle, a man travels to the future to try and bring his girlfriend back to life.","title":"Love Story 2050","score":0.7649372816085815}\'
\'{"plot":"A dimension-traveling wizard gets stuck in the 21st century because cell-phone radiation interferes with his magic. With his home world on the brink of war, he seeks help from a jaded ...","title":"The Portal","score":0.7640786170959473}\'

```

</Tab>

<Tab name="Node.js">

### Construct your vector search query.

This query searches for documents that include text in the `plot` field that is semantically related to the term "time travel".

- Create a file named `atlas-vector-search-quick-start.js` .

- Copy and paste the following sample query into the `atlas-vector-search-quick-start.js` file:

  ```js
  const { MongoClient } = require("mongodb");

  // connect to your Atlas cluster
  const uri = "<connection-string>";

  const client = new MongoClient(uri);

  async function run() {
      try {
          await client.connect();

          // set namespace
          const database = client.db("sample_mflix");
          const coll = database.collection("embedded_movies");

          // define pipeline
          const agg = [
              {
                \'$vectorSearch\': {
                  \'index\': \'vector_index\',
                  \'path\': \'plot_embedding\',
                  \'queryVector\': [
                    -0.0016261312, -0.028070757, -0.011342932, -0.012775794, -0.0027440966, 0.008683807, -0.02575152, -0.02020668, -0.010283281, -0.0041719596, 0.021392956, 0.028657231, -0.006634482, 0.007490867, 0.018593878, 0.0038187427, 0.029590257, -0.01451522, 0.016061379, 0.00008528442, -0.008943722, 0.01627464, 0.024311995, -0.025911469, 0.00022596726, -0.008863748, 0.008823762, -0.034921836, 0.007910728, -0.01515501, 0.035801545, -0.0035688248, -0.020299982, -0.03145631, -0.032256044, -0.028763862, -0.0071576433, -0.012769129, 0.012322609, -0.006621153, 0.010583182, 0.024085402, -0.001623632, 0.007864078, -0.021406285, 0.002554159, 0.012229307, -0.011762793, 0.0051682983, 0.0048484034, 0.018087378, 0.024325324, -0.037694257, -0.026537929, -0.008803768, -0.017767483, -0.012642504, -0.0062712682, 0.0009771782, -0.010409906, 0.017754154, -0.004671795, -0.030469967, 0.008477209, -0.005218282, -0.0058480743, -0.020153364, -0.0032805866, 0.004248601, 0.0051449724, 0.006791097, 0.007650814, 0.003458861, -0.0031223053, -0.01932697, -0.033615597, 0.00745088, 0.006321252, -0.0038154104, 0.014555207, 0.027697546, -0.02828402, 0.0066711367, 0.0077107945, 0.01794076, 0.011349596, -0.0052715978, 0.014755142, -0.019753495, -0.011156326, 0.011202978, 0.022126047, 0.00846388, 0.030549942, -0.0041386373, 0.018847128, -0.00033655585, 0.024925126, -0.003555496, -0.019300312, 0.010749794, 0.0075308536, -0.018287312, -0.016567878, -0.012869096, -0.015528221, 0.0078107617, -0.011156326, 0.013522214, -0.020646535, -0.01211601, 0.055928253, 0.011596181, -0.017247654, 0.0005939711, -0.026977783, -0.003942035, -0.009583511, -0.0055248477, -0.028737204, 0.023179034, 0.003995351, 0.0219661, -0.008470545, 0.023392297, 0.010469886, -0.015874773, 0.007890735, -0.009690142, -0.00024970944, 0.012775794, 0.0114762215, 0.013422247, 0.010429899, -0.03686786, -0.006717788, -0.027484283, 0.011556195, -0.036068123, -0.013915418, -0.0016327957, 0.0151016945, -0.020473259, 0.004671795, -0.012555866, 0.0209531, 0.01982014, 0.024485271, 0.0105431955, -0.005178295, 0.033162415, -0.013795458, 0.007150979, 0.010243294, 0.005644808, 0.017260984, -0.0045618312, 0.0024725192, 0.004305249, -0.008197301, 0.0014203656, 0.0018460588, 0.005015015, -0.011142998, 0.01439526, 0.022965772, 0.02552493, 0.007757446, -0.0019726837, 0.009503538, -0.032042783, 0.008403899, -0.04609149, 0.013808787, 0.011749465, 0.036388017, 0.016314628, 0.021939443, -0.0250051, -0.017354285, -0.012962398, 0.00006107364, 0.019113706, 0.03081652, -0.018114036, -0.0084572155, 0.009643491, -0.0034721901, 0.0072642746, -0.0090636825, 0.01642126, 0.013428912, 0.027724205, 0.0071243206, -0.6858542, -0.031029783, -0.014595194, -0.011449563, 0.017514233, 0.01743426, 0.009950057, 0.0029706885, -0.015714826, -0.001806072, 0.011856096, 0.026444625, -0.0010663156, -0.006474535, 0.0016161345, -0.020313311, 0.0148351155, -0.0018393943, 0.0057347785, 0.018300641, -0.018647194, 0.03345565, -0.008070676, 0.0071443142, 0.014301958, 0.0044818576, 0.003838736, -0.007350913, -0.024525259, -0.001142124, -0.018620536, 0.017247654, 0.007037683, 0.010236629, 0.06046009, 0.0138887605, -0.012122675, 0.037694257, 0.0055081863, 0.042492677, 0.00021784494, -0.011656162, 0.010276617, 0.022325981, 0.005984696, -0.009496873, 0.013382261, -0.0010563189, 0.0026507939, -0.041639622, 0.008637156, 0.026471283, -0.008403899, 0.024858482, -0.00066686375, -0.0016252982, 0.027590916, 0.0051449724, 0.0058647357, -0.008743787, -0.014968405, 0.027724205, -0.011596181, 0.0047650975, -0.015381602, 0.0043718936, 0.002159289, 0.035908177, -0.008243952, -0.030443309, 0.027564257, 0.042625964, -0.0033688906, 0.01843393, 0.019087048, 0.024578573, 0.03268257, -0.015608194, -0.014128681, -0.0033538956, -0.0028757197, -0.004121976, -0.032389335, 0.0034322033, 0.058807302, 0.010943064, -0.030523283, 0.008903735, 0.017500903, 0.00871713, -0.0029406983, 0.013995391, -0.03132302, -0.019660193, -0.00770413, -0.0038853872, 0.0015894766, -0.0015294964, -0.006251275, -0.021099718, -0.010256623, -0.008863748, 0.028550599, 0.02020668, -0.0012962399, -0.003415542, -0.0022509254, 0.0119360695, 0.027590916, -0.046971202, -0.0015194997, -0.022405956, 0.0016677842, -0.00018535563, -0.015421589, -0.031802863, 0.03814744, 0.0065411795, 0.016567878, -0.015621523, 0.022899127, -0.011076353, 0.02841731, -0.002679118, -0.002342562, 0.015341615, 0.01804739, -0.020566562, -0.012989056, -0.002990682, 0.01643459, 0.00042527664, 0.008243952, -0.013715484, -0.004835075, -0.009803439, 0.03129636, -0.021432944, 0.0012087687, -0.015741484, -0.0052016205, 0.00080890034, -0.01755422, 0.004811749, -0.017967418, -0.026684547, -0.014128681, 0.0041386373, -0.013742141, -0.010056688, -0.013268964, -0.0110630235, -0.028337335, 0.015981404, -0.00997005, -0.02424535, -0.013968734, -0.028310679, -0.027750863, -0.020699851, 0.02235264, 0.001057985, 0.00081639783, -0.0099367285, 0.013522214, -0.012016043, -0.00086471526, 0.013568865, 0.0019376953, -0.019020405, 0.017460918, -0.023045745, 0.008503866, 0.0064678704, -0.011509543, 0.018727167, -0.003372223, -0.0028690554, -0.0027024434, -0.011902748, -0.012182655, -0.015714826, -0.0098634185, 0.00593138, 0.018753825, 0.0010146659, 0.013029044, 0.0003521757, -0.017620865, 0.04102649, 0.00552818, 0.024485271, -0.009630162, -0.015608194, 0.0006718621, -0.0008418062, 0.012395918, 0.0057980907, 0.016221326, 0.010616505, 0.004838407, -0.012402583, 0.019900113, -0.0034521967, 0.000247002, -0.03153628, 0.0011038032, -0.020819811, 0.016234655, -0.00330058, -0.0032289368, 0.00078973995, -0.021952773, -0.022459272, 0.03118973, 0.03673457, -0.021472929, 0.0072109587, -0.015075036, 0.004855068, -0.0008151483, 0.0069643734, 0.010023367, -0.010276617, -0.023019087, 0.0068244194, -0.0012520878, -0.0015086699, 0.022046074, -0.034148756, -0.0022192693, 0.002427534, -0.0027124402, 0.0060346797, 0.015461575, 0.0137554705, 0.009230294, -0.009583511, 0.032629255, 0.015994733, -0.019167023, -0.009203636, 0.03393549, -0.017274313, -0.012042701, -0.0009930064, 0.026777849, -0.013582194, -0.0027590916, -0.017594207, -0.026804507, -0.0014236979, -0.022032745, 0.0091236625, -0.0042419364, -0.00858384, -0.0033905501, -0.020739838, 0.016821127, 0.022539245, 0.015381602, 0.015141681, 0.028817179, -0.019726837, -0.0051283115, -0.011489551, -0.013208984, -0.0047017853, -0.0072309524, 0.01767418, 0.0025658219, -0.010323267, 0.012609182, -0.028097415, 0.026871152, -0.010276617, 0.021912785, 0.0022542577, 0.005124979, -0.0019710176, 0.004518512, -0.040360045, 0.010969722, -0.0031539614, -0.020366628, -0.025778178, -0.0110030435, -0.016221326, 0.0036587953, 0.016207997, 0.003007343, -0.0032555948, 0.0044052163, -0.022046074, -0.0008822095, -0.009363583, 0.028230704, -0.024538586, 0.0029840174, 0.0016044717, -0.014181997, 0.031349678, -0.014381931, -0.027750863, 0.02613806, 0.0004136138, -0.005748107, -0.01868718, -0.0010138329, 0.0054348772, 0.010703143, -0.003682121, 0.0030856507, -0.004275259, -0.010403241, 0.021113047, -0.022685863, -0.023032416, 0.031429652, 0.001792743, -0.005644808, -0.011842767, -0.04078657, -0.0026874484, 0.06915057, -0.00056939584, -0.013995391, 0.010703143, -0.013728813, -0.022939114, -0.015261642, -0.022485929, 0.016807798, 0.007964044, 0.0144219175, 0.016821127, 0.0076241563, 0.005461535, -0.013248971, 0.015301628, 0.0085171955, -0.004318578, 0.011136333, -0.0059047225, -0.010249958, -0.018207338, 0.024645219, 0.021752838, 0.0007614159, -0.013648839, 0.01111634, -0.010503208, -0.0038487327, -0.008203966, -0.00397869, 0.0029740208, 0.008530525, 0.005261601, 0.01642126, -0.0038753906, -0.013222313, 0.026537929, 0.024671877, -0.043505676, 0.014195326, 0.024778508, 0.0056914594, -0.025951454, 0.017620865, -0.0021359634, 0.008643821, 0.021299653, 0.0041686273, -0.009017031, 0.04044002, 0.024378639, -0.027777521, -0.014208655, 0.0028623908, 0.042119466, 0.005801423, -0.028124074, -0.03129636, 0.022139376, -0.022179363, -0.04067994, 0.013688826, 0.013328944, 0.0046184794, -0.02828402, -0.0063412455, -0.0046184794, -0.011756129, -0.010383247, -0.0018543894, -0.0018593877, -0.00052024535, 0.004815081, 0.014781799, 0.018007403, 0.01306903, -0.020433271, 0.009043689, 0.033189073, -0.006844413, -0.019766824, -0.018767154, 0.00533491, -0.0024575242, 0.018727167, 0.0058080875, -0.013835444, 0.0040719924, 0.004881726, 0.012029372, 0.005664801, 0.03193615, 0.0058047553, 0.002695779, 0.009290274, 0.02361889, 0.017834127, 0.0049017193, -0.0036388019, 0.010776452, -0.019793482, 0.0067777685, -0.014208655, -0.024911797, 0.002385881, 0.0034988478, 0.020899786, -0.0025858153, -0.011849431, 0.033189073, -0.021312982, 0.024965113, -0.014635181, 0.014048708, -0.0035921505, -0.003347231, 0.030869836, -0.0017161017, -0.0061346465, 0.009203636, -0.025165047, 0.0068510775, 0.021499587, 0.013782129, -0.0024475274, -0.0051149824, -0.024445284, 0.006167969, 0.0068844, -0.00076183246, 0.030150073, -0.0055948244, -0.011162991, -0.02057989, -0.009703471, -0.020646535, 0.008004031, 0.0066378145, -0.019900113, -0.012169327, -0.01439526, 0.0044252095, -0.004018677, 0.014621852, -0.025085073, -0.013715484, -0.017980747, 0.0071043274, 0.011456228, -0.01010334, -0.0035321703, -0.03801415, -0.012036037, -0.0028990454, -0.05419549, -0.024058744, -0.024272008, 0.015221654, 0.027964126, 0.03182952, -0.015354944, 0.004855068, 0.011522872, 0.004771762, 0.0027874154, 0.023405626, 0.0004242353, -0.03132302, 0.007057676, 0.008763781, -0.0027057757, 0.023005757, -0.0071176565, -0.005238275, 0.029110415, -0.010989714, 0.013728813, -0.009630162, -0.029137073, -0.0049317093, -0.0008630492, -0.015248313, 0.0043219104, -0.0055681667, -0.013175662, 0.029723546, 0.025098402, 0.012849103, -0.0009996708, 0.03118973, -0.0021709518, 0.0260181, -0.020526575, 0.028097415, -0.016141351, 0.010509873, -0.022965772, 0.002865723, 0.0020493253, 0.0020509914, -0.0041419696, -0.00039695262, 0.017287642, 0.0038987163, 0.014795128, -0.014661839, -0.008950386, 0.004431874, -0.009383577, 0.0012604183, -0.023019087, 0.0029273694, -0.033135757, 0.009176978, -0.011023037, -0.002102641, 0.02663123, -0.03849399, -0.0044152127, 0.0004527676, -0.0026924468, 0.02828402, 0.017727496, 0.035135098, 0.02728435, -0.005348239, -0.001467017, -0.019766824, 0.014715155, 0.011982721, 0.0045651635, 0.023458943, -0.0010046692, -0.0031373003, -0.0006972704, 0.0019043729, -0.018967088, -0.024311995, 0.0011546199, 0.007977373, -0.004755101, -0.010016702, -0.02780418, -0.004688456, 0.013022379, -0.005484861, 0.0017227661, -0.015394931, -0.028763862, -0.026684547, 0.0030589928, -0.018513903, 0.028363993, 0.0044818576, -0.009270281, 0.038920518, -0.016008062, 0.0093902415, 0.004815081, -0.021059733, 0.01451522, -0.0051583014, 0.023765508, -0.017874114, -0.016821127, -0.012522544, -0.0028390652, 0.0040886537, 0.020259995, -0.031216389, -0.014115352, -0.009176978, 0.010303274, 0.020313311, 0.0064112223, -0.02235264, -0.022872468, 0.0052449396, 0.0005723116, 0.0037321046, 0.016807798, -0.018527232, -0.009303603, 0.0024858483, -0.0012662497, -0.007110992, 0.011976057, -0.007790768, -0.042999174, -0.006727785, -0.011829439, 0.007024354, 0.005278262, -0.017740825, -0.0041519664, 0.0085905045, 0.027750863, -0.038387362, 0.024391968, 0.00087721116, 0.010509873, -0.00038508154, -0.006857742, 0.0183273, -0.0037054466, 0.015461575, 0.0017394272, -0.0017944091, 0.014181997, -0.0052682655, 0.009023695, 0.00719763, -0.013522214, 0.0034422, 0.014941746, -0.0016711164, -0.025298337, -0.017634194, 0.0058714002, -0.005321581, 0.017834127, 0.0110630235, -0.03369557, 0.029190388, -0.008943722, 0.009363583, -0.0034222065, -0.026111402, -0.007037683, -0.006561173, 0.02473852, -0.007084334, -0.010110005, -0.008577175, 0.0030439978, -0.022712521, 0.0054582027, -0.0012620845, -0.0011954397, -0.015741484, 0.0129557345, -0.00042111133, 0.00846388, 0.008930393, 0.016487904, 0.010469886, -0.007917393, -0.011762793, -0.0214596, 0.000917198, 0.021672864, 0.010269952, -0.007737452, -0.010243294, -0.0067244526, -0.015488233, -0.021552904, 0.017127695, 0.011109675, 0.038067464, 0.00871713, -0.0025591573, 0.021312982, -0.006237946, 0.034628596, -0.0045251767, 0.008357248, 0.020686522, 0.0010696478, 0.0076708077, 0.03772091, -0.018700508, -0.0020676525, -0.008923728, -0.023298996, 0.018233996, -0.010256623, 0.0017860786, 0.009796774, -0.00897038, -0.01269582, -0.018527232, 0.009190307, -0.02372552, -0.042119466, 0.008097334, -0.0066778013, -0.021046404, 0.0019593548, 0.011083017, -0.0016028056, 0.012662497, -0.000059095124, 0.0071043274, -0.014675168, 0.024831824, -0.053582355, 0.038387362, 0.0005698124, 0.015954746, 0.021552904, 0.031589597, -0.009230294, -0.0006147976, 0.002625802, -0.011749465, -0.034362018, -0.0067844326, -0.018793812, 0.011442899, -0.008743787, 0.017474247, -0.021619547, 0.01831397, -0.009037024, -0.0057247817, -0.02728435, 0.010363255, 0.034415334, -0.024032086, -0.0020126705, -0.0045518344, -0.019353628, -0.018340627, -0.03129636, -0.0034038792, -0.006321252, -0.0016161345, 0.033642255, -0.000056075285, -0.005005019, 0.004571828, -0.0024075406, -0.00010215386, 0.0098634185, 0.1980148, -0.003825407, -0.025191706, 0.035161756, 0.005358236, 0.025111731, 0.023485601, 0.0023342315, -0.011882754, 0.018287312, -0.0068910643, 0.003912045, 0.009243623, -0.001355387, -0.028603915, -0.012802451, -0.030150073, -0.014795128, -0.028630573, -0.0013487226, 0.002667455, 0.00985009, -0.0033972147, -0.021486258, 0.009503538, -0.017847456, 0.013062365, -0.014341944, 0.005078328, 0.025165047, -0.015594865, -0.025924796, -0.0018177348, 0.010996379, -0.02993681, 0.007324255, 0.014475234, -0.028577257, 0.005494857, 0.00011725306, -0.013315615, 0.015941417, 0.009376912, 0.0025158382, 0.008743787, 0.023832154, -0.008084005, -0.014195326, -0.008823762, 0.0033455652, -0.032362677, -0.021552904, -0.0056081535, 0.023298996, -0.025444955, 0.0097301295, 0.009736794, 0.015274971, -0.0012937407, -0.018087378, -0.0039387033, 0.008637156, -0.011189649, -0.00023846315, -0.011582852, 0.0066411467, -0.018220667, 0.0060846633, 0.0376676, -0.002709108, 0.0072776037, 0.0034188742, -0.010249958, -0.0007747449, -0.00795738, -0.022192692, 0.03910712, 0.032122757, 0.023898797, 0.0076241563, -0.007397564, -0.003655463, 0.011442899, -0.014115352, -0.00505167, -0.031163072, 0.030336678, -0.006857742, -0.022259338, 0.004048667, 0.02072651, 0.0030156737, -0.0042119464, 0.00041861215, -0.005731446, 0.011103011, 0.013822115, 0.021512916, 0.009216965, -0.006537847, -0.027057758, -0.04054665, 0.010403241, -0.0056281467, -0.005701456, -0.002709108, -0.00745088, -0.0024841821, 0.009356919, -0.022659205, 0.004061996, -0.013175662, 0.017074378, -0.006141311, -0.014541878, 0.02993681, -0.00028448965, -0.025271678, 0.011689484, -0.014528549, 0.004398552, -0.017274313, 0.0045751603, 0.012455898, 0.004121976, -0.025458284, -0.006744446, 0.011822774, -0.015035049, -0.03257594, 0.014675168, -0.0039187097, 0.019726837, -0.0047251107, 0.0022825818, 0.011829439, 0.005391558, -0.016781142, -0.0058747325, 0.010309938, -0.013049036, 0.01186276, -0.0011246296, 0.0062112883, 0.0028190718, -0.021739509, 0.009883412, -0.0073175905, -0.012715813, -0.017181009, -0.016607866, -0.042492677, -0.0014478565, -0.01794076, 0.012302616, -0.015194997, -0.04433207, -0.020606548, 0.009696807, 0.010303274, -0.01694109, -0.004018677, 0.019353628, -0.001991011, 0.000058938927, 0.010536531, -0.17274313, 0.010143327, 0.014235313, -0.024152048, 0.025684876, -0.0012504216, 0.036601283, -0.003698782, 0.0007310093, 0.004165295, -0.0029157067, 0.017101036, -0.046891227, -0.017460918, 0.022965772, 0.020233337, -0.024072073, 0.017220996, 0.009370248, 0.0010363255, 0.0194336, -0.019606877, 0.01818068, -0.020819811, 0.007410893, 0.0019326969, 0.017887443, 0.006651143, 0.00067394477, -0.011889419, -0.025058415, -0.008543854, 0.021579562, 0.0047484366, 0.014062037, 0.0075508473, -0.009510202, -0.009143656, 0.0046817916, 0.013982063, -0.0027990784, 0.011782787, 0.014541878, -0.015701497, -0.029350337, 0.021979429, 0.01332228, -0.026244693, -0.0123492675, -0.003895384, 0.0071576433, -0.035454992, -0.00046984528, 0.0033522295, 0.039347045, 0.0005119148, 0.00476843, -0.012995721, 0.0024042083, -0.006931051, -0.014461905, -0.0127558, 0.0034555288, -0.0074842023, -0.030256703, -0.007057676, -0.00807734, 0.007804097, -0.006957709, 0.017181009, -0.034575284, -0.008603834, -0.005008351, -0.015834786, 0.02943031, 0.016861115, -0.0050849924, 0.014235313, 0.0051449724, 0.0025924798, -0.0025741523, 0.04289254, -0.002104307, 0.012969063, -0.008310596, 0.00423194, 0.0074975314, 0.0018810473, -0.014248641, -0.024725191, 0.0151016945, -0.017527562, 0.0018727167, 0.0002830318, 0.015168339, 0.0144219175, -0.004048667, -0.004358565, 0.011836103, -0.010343261, -0.005911387, 0.0022825818, 0.0073175905, 0.00403867, 0.013188991, 0.03334902, 0.006111321, 0.008597169, 0.030123414, -0.015474904, 0.0017877447, -0.024551915, 0.013155668, 0.023525586, -0.0255116, 0.017220996, 0.004358565, -0.00934359, 0.0099967085, 0.011162991, 0.03092315, -0.021046404, -0.015514892, 0.0011946067, -0.01816735, 0.010876419, -0.10124666, -0.03550831, 0.0056348112, 0.013942076, 0.005951374, 0.020419942, -0.006857742, -0.020873128, -0.021259667, 0.0137554705, 0.0057880944, -0.029163731, -0.018767154, -0.021392956, 0.030896494, -0.005494857, -0.0027307675, -0.006801094, -0.014821786, 0.021392956, -0.0018110704, -0.0018843795, -0.012362596, -0.0072176233, -0.017194338, -0.018713837, -0.024272008, 0.03801415, 0.00015880188, 0.0044951867, -0.028630573, -0.0014070367, -0.00916365, -0.026537929, -0.009576847, -0.013995391, -0.0077107945, 0.0050016865, 0.00578143, -0.04467862, 0.008363913, 0.010136662, -0.0006268769, -0.006591163, 0.015341615, -0.027377652, -0.00093136, 0.029243704, -0.020886457, -0.01041657, -0.02424535, 0.005291591, -0.02980352, -0.009190307, 0.019460259, -0.0041286405, 0.004801752, 0.0011787785, -0.001257086, -0.011216307, -0.013395589, 0.00088137644, -0.0051616337, 0.03876057, -0.0033455652, 0.00075850025, -0.006951045, -0.0062112883, 0.018140694, -0.006351242, -0.008263946, 0.018154023, -0.012189319, 0.0075508473, -0.044358727, -0.0040153447, 0.0093302615, -0.010636497, 0.032789204, -0.005264933, -0.014235313, -0.018393943, 0.007297597, -0.016114693, 0.015021721, 0.020033404, 0.0137688, 0.0011046362, 0.010616505, -0.0039453674, 0.012109346, 0.021099718, -0.0072842683, -0.019153694, -0.003768759, 0.039320387, -0.006747778, -0.0016852784, 0.018154023, 0.0010963057, -0.015035049, -0.021033075, -0.04345236, 0.017287642, 0.016341286, -0.008610498, 0.00236922, 0.009290274, 0.028950468, -0.014475234, -0.0035654926, 0.015434918, -0.03372223, 0.004501851, -0.012929076, -0.008483873, -0.0044685286, -0.0102233, 0.01615468, 0.0022792495, 0.010876419, -0.0059647025, 0.01895376, -0.0069976957, -0.0042952523, 0.017207667, -0.00036133936, 0.0085905045, 0.008084005, 0.03129636, -0.016994404, -0.014915089, 0.020100048, -0.012009379, -0.006684466, 0.01306903, 0.00015765642, -0.00530492, 0.0005277429, 0.015421589, 0.015528221, 0.032202728, -0.003485519, -0.0014286962, 0.033908837, 0.001367883, 0.010509873, 0.025271678, -0.020993087, 0.019846799, 0.006897729, -0.010216636, -0.00725761, 0.01818068, -0.028443968, -0.011242964, -0.014435247, -0.013688826, 0.006101324, -0.0022509254, 0.013848773, -0.0019077052, 0.017181009, 0.03422873, 0.005324913, -0.0035188415, 0.014128681, -0.004898387, 0.005038341, 0.0012320944, -0.005561502, -0.017847456, 0.0008538855, -0.0047884234, 0.011849431, 0.015421589, -0.013942076, 0.0029790192, -0.013702155, 0.0001199605, -0.024431955, 0.019926772, 0.022179363, -0.016487904, -0.03964028, 0.0050849924, 0.017487574, 0.022792496, 0.0012504216, 0.004048667, -0.00997005, 0.0076041627, -0.014328616, -0.020259995, 0.0005598157, -0.010469886, 0.0016852784, 0.01716768, -0.008990373, -0.001987679, 0.026417969, 0.023792166, 0.0046917885, -0.0071909656, -0.00032051947, -0.023259008, -0.009170313, 0.02071318, -0.03156294, -0.030869836, -0.006324584, 0.013795458, -0.00047151142, 0.016874444, 0.00947688, 0.00985009, -0.029883493, 0.024205362, -0.013522214, -0.015075036, -0.030603256, 0.029270362, 0.010503208, 0.021539574, 0.01743426, -0.023898797, 0.022019416, -0.0068777353, 0.027857494, -0.021259667, 0.0025758184, 0.006197959, 0.006447877, -0.00025200035, -0.004941706, -0.021246338, -0.005504854, -0.008390571, -0.0097301295, 0.027244363, -0.04446536, 0.05216949, 0.010243294, -0.016008062, 0.0122493, -0.0199401, 0.009077012, 0.019753495, 0.006431216, -0.037960835, -0.027377652, 0.016381273, -0.0038620618, 0.022512587, -0.010996379, -0.0015211658, -0.0102233, 0.007071005, 0.008230623, -0.009490209, -0.010083347, 0.024431955, 0.002427534, 0.02828402, 0.0035721571, -0.022192692, -0.011882754, 0.010056688, 0.0011904413, -0.01426197, -0.017500903, -0.00010985966, 0.005591492, -0.0077707744, -0.012049366, 0.011869425, 0.00858384, -0.024698535, -0.030283362, 0.020140035, 0.011949399, -0.013968734, 0.042732596, -0.011649498, -0.011982721, -0.016967745, -0.0060913274, -0.007130985, -0.013109017, -0.009710136
                  ],
                  \'numCandidates\': 150,
                  \'limit\': 10
                }
              }, {
                \'$project\': {
                  \'_id\': 0,
                  \'plot\': 1,
                  \'title\': 1,
                  \'score\': {
                    \'$meta\': \'vectorSearchScore\'
                  }
                }
              }
            ];
          // run pipeline
          const result = coll.aggregate(agg);

          // print results
          await result.forEach((doc) => console.dir(JSON.stringify(doc)));
      } finally {
          await client.close();
      }
  }
  run().catch(console.dir);

  ```

This query uses the `$vectorSearch` stage to:

- Compare vector embeddings of the search term against vector embeddings of movie plots in the `plot_embedding` field of the `sample_mflix.embedded_movies` collection.

- Consider up to the 150 most similar movie plots and return the top 10 results.

It uses the `$project` stage to:

- Only include the movie `plot` and `title` fields in the results.

- Add a `score` field to show the relevance of each result to the search term.

To learn more about this pipeline stage, see Run Vector Search Queries.

### Specify the `<connection-string>`.

Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

<Tabs>

<Tab name="Atlas Cluster">

Your connection string should use the following format:

```
mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
```

Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

</Tab>

<Tab name="Local Deployment">

Your connection string should use the following format:

```
mongodb://localhost:<port-number>/?directConnection=true
```

</Tab>

</Tabs>

### Run your query.

Run the following command to query your collection:

```bash
node atlas-vector-search-quick-start.js
```

```js
\'{"plot":"A reporter, learning of time travelers visiting 20th century disasters, tries to change the history they know by averting upcoming disasters.","title":"Thrill Seekers","score":0.7892671227455139}\'
\'{"plot":"At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.","title":"About Time","score":0.7843604683876038}\'
\'{"plot":"Hoping to alter the events of the past, a 19th century inventor instead travels 800,000 years into the future, where he finds humankind divided into two warring races.","title":"The Time Machine","score":0.7801066637039185}\'
`{"plot":"After using his mother\'s newly built time machine, Dolf gets stuck involuntary in the year 1212. He ends up in a children\'s crusade where he confronts his new friends with modern techniques...","title":"Crusade in Jeans","score":0.7789170742034912}`
\'{"plot":"An officer for a security agency that regulates time travel, must fend for his life against a shady politician who has a tie to his past.","title":"Timecop","score":0.7771612405776978}\'
\'{"plot":"A time-travel experiment in which a robot probe is sent from the year 2073 to the year 1973 goes terribly wrong thrusting one of the project scientists, a man named Nicholas Sinclair into a...","title":"A.P.E.X.","score":0.7730885744094849}\'
`{"plot":"Agent J travels in time to M.I.B.\'s early days in 1969 to stop an alien from assassinating his friend Agent K and changing history.","title":"Men in Black 3","score":0.7712380886077881}`
\'{"plot":"Bound by a shared destiny, a teen bursting with scientific curiosity and a former boy-genius inventor embark on a mission to unearth the secrets of a place somewhere in time and space that exists in their collective memory.","title":"Tomorrowland","score":0.7669923901557922}\'
\'{"plot":"With the help of his uncle, a man travels to the future to try and bring his girlfriend back to life.","title":"Love Story 2050","score":0.7649372816085815}\'
\'{"plot":"A dimension-traveling wizard gets stuck in the 21st century because cell-phone radiation interferes with his magic. With his home world on the brink of war, he seeks help from a jaded ...","title":"The Portal","score":0.7640786170959473}\'

```

</Tab>

<Tab name="PHP">

### Construct your vector search query.

This query searches for documents that include text in the `plot` field that is semantically related to the term "time travel".

- Create a file named `atlas-vector-search-quick-start.php`.

- Copy and paste the following sample query into the `atlas-vector-search-quick-start.php` file:

  ```php
  <?php

  require \'vendor/autoload.php\';

  // Replace the placeholder with your Atlas connection string
  $uri = \'<connection-string>\';

  try {

      // Connect to your Atlas cluster
      $client = new MongoDB\\Client($uri);

      // Set the namespace
      $database = $client->selectDatabase(\'sample_mflix\');
      $collection = $database->selectCollection(\'embedded_movies\');

      // Define the pipeline with $vectorSearch query options
      $pipeline = [
          [
              \'$vectorSearch\' => [
                  \'queryVector\' => [
                      -0.0016261312, -0.028070757, -0.011342932, -0.012775794, -0.0027440966, 0.008683807, -0.02575152, -0.02020668, -0.010283281, -0.0041719596, 0.021392956, 0.028657231, -0.006634482, 0.007490867, 0.018593878, 0.0038187427, 0.029590257, -0.01451522, 0.016061379, 0.00008528442, -0.008943722, 0.01627464, 0.024311995, -0.025911469, 0.00022596726, -0.008863748, 0.008823762, -0.034921836, 0.007910728, -0.01515501, 0.035801545, -0.0035688248, -0.020299982, -0.03145631, -0.032256044, -0.028763862, -0.0071576433, -0.012769129, 0.012322609, -0.006621153, 0.010583182, 0.024085402, -0.001623632, 0.007864078, -0.021406285, 0.002554159, 0.012229307, -0.011762793, 0.0051682983, 0.0048484034, 0.018087378, 0.024325324, -0.037694257, -0.026537929, -0.008803768, -0.017767483, -0.012642504, -0.0062712682, 0.0009771782, -0.010409906, 0.017754154, -0.004671795, -0.030469967, 0.008477209, -0.005218282, -0.0058480743, -0.020153364, -0.0032805866, 0.004248601, 0.0051449724, 0.006791097, 0.007650814, 0.003458861, -0.0031223053, -0.01932697, -0.033615597, 0.00745088, 0.006321252, -0.0038154104, 0.014555207, 0.027697546, -0.02828402, 0.0066711367, 0.0077107945, 0.01794076, 0.011349596, -0.0052715978, 0.014755142, -0.019753495, -0.011156326, 0.011202978, 0.022126047, 0.00846388, 0.030549942, -0.0041386373, 0.018847128, -0.00033655585, 0.024925126, -0.003555496, -0.019300312, 0.010749794, 0.0075308536, -0.018287312, -0.016567878, -0.012869096, -0.015528221, 0.0078107617, -0.011156326, 0.013522214, -0.020646535, -0.01211601, 0.055928253, 0.011596181, -0.017247654, 0.0005939711, -0.026977783, -0.003942035, -0.009583511, -0.0055248477, -0.028737204, 0.023179034, 0.003995351, 0.0219661, -0.008470545, 0.023392297, 0.010469886, -0.015874773, 0.007890735, -0.009690142, -0.00024970944, 0.012775794, 0.0114762215, 0.013422247, 0.010429899, -0.03686786, -0.006717788, -0.027484283, 0.011556195, -0.036068123, -0.013915418, -0.0016327957, 0.0151016945, -0.020473259, 0.004671795, -0.012555866, 0.0209531, 0.01982014, 0.024485271, 0.0105431955, -0.005178295, 0.033162415, -0.013795458, 0.007150979, 0.010243294, 0.005644808, 0.017260984, -0.0045618312, 0.0024725192, 0.004305249, -0.008197301, 0.0014203656, 0.0018460588, 0.005015015, -0.011142998, 0.01439526, 0.022965772, 0.02552493, 0.007757446, -0.0019726837, 0.009503538, -0.032042783, 0.008403899, -0.04609149, 0.013808787, 0.011749465, 0.036388017, 0.016314628, 0.021939443, -0.0250051, -0.017354285, -0.012962398, 0.00006107364, 0.019113706, 0.03081652, -0.018114036, -0.0084572155, 0.009643491, -0.0034721901, 0.0072642746, -0.0090636825, 0.01642126, 0.013428912, 0.027724205, 0.0071243206, -0.6858542, -0.031029783, -0.014595194, -0.011449563, 0.017514233, 0.01743426, 0.009950057, 0.0029706885, -0.015714826, -0.001806072, 0.011856096, 0.026444625, -0.0010663156, -0.006474535, 0.0016161345, -0.020313311, 0.0148351155, -0.0018393943, 0.0057347785, 0.018300641, -0.018647194, 0.03345565, -0.008070676, 0.0071443142, 0.014301958, 0.0044818576, 0.003838736, -0.007350913, -0.024525259, -0.001142124, -0.018620536, 0.017247654, 0.007037683, 0.010236629, 0.06046009, 0.0138887605, -0.012122675, 0.037694257, 0.0055081863, 0.042492677, 0.00021784494, -0.011656162, 0.010276617, 0.022325981, 0.005984696, -0.009496873, 0.013382261, -0.0010563189, 0.0026507939, -0.041639622, 0.008637156, 0.026471283, -0.008403899, 0.024858482, -0.00066686375, -0.0016252982, 0.027590916, 0.0051449724, 0.0058647357, -0.008743787, -0.014968405, 0.027724205, -0.011596181, 0.0047650975, -0.015381602, 0.0043718936, 0.002159289, 0.035908177, -0.008243952, -0.030443309, 0.027564257, 0.042625964, -0.0033688906, 0.01843393, 0.019087048, 0.024578573, 0.03268257, -0.015608194, -0.014128681, -0.0033538956, -0.0028757197, -0.004121976, -0.032389335, 0.0034322033, 0.058807302, 0.010943064, -0.030523283, 0.008903735, 0.017500903, 0.00871713, -0.0029406983, 0.013995391, -0.03132302, -0.019660193, -0.00770413, -0.0038853872, 0.0015894766, -0.0015294964, -0.006251275, -0.021099718, -0.010256623, -0.008863748, 0.028550599, 0.02020668, -0.0012962399, -0.003415542, -0.0022509254, 0.0119360695, 0.027590916, -0.046971202, -0.0015194997, -0.022405956, 0.0016677842, -0.00018535563, -0.015421589, -0.031802863, 0.03814744, 0.0065411795, 0.016567878, -0.015621523, 0.022899127, -0.011076353, 0.02841731, -0.002679118, -0.002342562, 0.015341615, 0.01804739, -0.020566562, -0.012989056, -0.002990682, 0.01643459, 0.00042527664, 0.008243952, -0.013715484, -0.004835075, -0.009803439, 0.03129636, -0.021432944, 0.0012087687, -0.015741484, -0.0052016205, 0.00080890034, -0.01755422, 0.004811749, -0.017967418, -0.026684547, -0.014128681, 0.0041386373, -0.013742141, -0.010056688, -0.013268964, -0.0110630235, -0.028337335, 0.015981404, -0.00997005, -0.02424535, -0.013968734, -0.028310679, -0.027750863, -0.020699851, 0.02235264, 0.001057985, 0.00081639783, -0.0099367285, 0.013522214, -0.012016043, -0.00086471526, 0.013568865, 0.0019376953, -0.019020405, 0.017460918, -0.023045745, 0.008503866, 0.0064678704, -0.011509543, 0.018727167, -0.003372223, -0.0028690554, -0.0027024434, -0.011902748, -0.012182655, -0.015714826, -0.0098634185, 0.00593138, 0.018753825, 0.0010146659, 0.013029044, 0.0003521757, -0.017620865, 0.04102649, 0.00552818, 0.024485271, -0.009630162, -0.015608194, 0.0006718621, -0.0008418062, 0.012395918, 0.0057980907, 0.016221326, 0.010616505, 0.004838407, -0.012402583, 0.019900113, -0.0034521967, 0.000247002, -0.03153628, 0.0011038032, -0.020819811, 0.016234655, -0.00330058, -0.0032289368, 0.00078973995, -0.021952773, -0.022459272, 0.03118973, 0.03673457, -0.021472929, 0.0072109587, -0.015075036, 0.004855068, -0.0008151483, 0.0069643734, 0.010023367, -0.010276617, -0.023019087, 0.0068244194, -0.0012520878, -0.0015086699, 0.022046074, -0.034148756, -0.0022192693, 0.002427534, -0.0027124402, 0.0060346797, 0.015461575, 0.0137554705, 0.009230294, -0.009583511, 0.032629255, 0.015994733, -0.019167023, -0.009203636, 0.03393549, -0.017274313, -0.012042701, -0.0009930064, 0.026777849, -0.013582194, -0.0027590916, -0.017594207, -0.026804507, -0.0014236979, -0.022032745, 0.0091236625, -0.0042419364, -0.00858384, -0.0033905501, -0.020739838, 0.016821127, 0.022539245, 0.015381602, 0.015141681, 0.028817179, -0.019726837, -0.0051283115, -0.011489551, -0.013208984, -0.0047017853, -0.0072309524, 0.01767418, 0.0025658219, -0.010323267, 0.012609182, -0.028097415, 0.026871152, -0.010276617, 0.021912785, 0.0022542577, 0.005124979, -0.0019710176, 0.004518512, -0.040360045, 0.010969722, -0.0031539614, -0.020366628, -0.025778178, -0.0110030435, -0.016221326, 0.0036587953, 0.016207997, 0.003007343, -0.0032555948, 0.0044052163, -0.022046074, -0.0008822095, -0.009363583, 0.028230704, -0.024538586, 0.0029840174, 0.0016044717, -0.014181997, 0.031349678, -0.014381931, -0.027750863, 0.02613806, 0.0004136138, -0.005748107, -0.01868718, -0.0010138329, 0.0054348772, 0.010703143, -0.003682121, 0.0030856507, -0.004275259, -0.010403241, 0.021113047, -0.022685863, -0.023032416, 0.031429652, 0.001792743, -0.005644808, -0.011842767, -0.04078657, -0.0026874484, 0.06915057, -0.00056939584, -0.013995391, 0.010703143, -0.013728813, -0.022939114, -0.015261642, -0.022485929, 0.016807798, 0.007964044, 0.0144219175, 0.016821127, 0.0076241563, 0.005461535, -0.013248971, 0.015301628, 0.0085171955, -0.004318578, 0.011136333, -0.0059047225, -0.010249958, -0.018207338, 0.024645219, 0.021752838, 0.0007614159, -0.013648839, 0.01111634, -0.010503208, -0.0038487327, -0.008203966, -0.00397869, 0.0029740208, 0.008530525, 0.005261601, 0.01642126, -0.0038753906, -0.013222313, 0.026537929, 0.024671877, -0.043505676, 0.014195326, 0.024778508, 0.0056914594, -0.025951454, 0.017620865, -0.0021359634, 0.008643821, 0.021299653, 0.0041686273, -0.009017031, 0.04044002, 0.024378639, -0.027777521, -0.014208655, 0.0028623908, 0.042119466, 0.005801423, -0.028124074, -0.03129636, 0.022139376, -0.022179363, -0.04067994, 0.013688826, 0.013328944, 0.0046184794, -0.02828402, -0.0063412455, -0.0046184794, -0.011756129, -0.010383247, -0.0018543894, -0.0018593877, -0.00052024535, 0.004815081, 0.014781799, 0.018007403, 0.01306903, -0.020433271, 0.009043689, 0.033189073, -0.006844413, -0.019766824, -0.018767154, 0.00533491, -0.0024575242, 0.018727167, 0.0058080875, -0.013835444, 0.0040719924, 0.004881726, 0.012029372, 0.005664801, 0.03193615, 0.0058047553, 0.002695779, 0.009290274, 0.02361889, 0.017834127, 0.0049017193, -0.0036388019, 0.010776452, -0.019793482, 0.0067777685, -0.014208655, -0.024911797, 0.002385881, 0.0034988478, 0.020899786, -0.0025858153, -0.011849431, 0.033189073, -0.021312982, 0.024965113, -0.014635181, 0.014048708, -0.0035921505, -0.003347231, 0.030869836, -0.0017161017, -0.0061346465, 0.009203636, -0.025165047, 0.0068510775, 0.021499587, 0.013782129, -0.0024475274, -0.0051149824, -0.024445284, 0.006167969, 0.0068844, -0.00076183246, 0.030150073, -0.0055948244, -0.011162991, -0.02057989, -0.009703471, -0.020646535, 0.008004031, 0.0066378145, -0.019900113, -0.012169327, -0.01439526, 0.0044252095, -0.004018677, 0.014621852, -0.025085073, -0.013715484, -0.017980747, 0.0071043274, 0.011456228, -0.01010334, -0.0035321703, -0.03801415, -0.012036037, -0.0028990454, -0.05419549, -0.024058744, -0.024272008, 0.015221654, 0.027964126, 0.03182952, -0.015354944, 0.004855068, 0.011522872, 0.004771762, 0.0027874154, 0.023405626, 0.0004242353, -0.03132302, 0.007057676, 0.008763781, -0.0027057757, 0.023005757, -0.0071176565, -0.005238275, 0.029110415, -0.010989714, 0.013728813, -0.009630162, -0.029137073, -0.0049317093, -0.0008630492, -0.015248313, 0.0043219104, -0.0055681667, -0.013175662, 0.029723546, 0.025098402, 0.012849103, -0.0009996708, 0.03118973, -0.0021709518, 0.0260181, -0.020526575, 0.028097415, -0.016141351, 0.010509873, -0.022965772, 0.002865723, 0.0020493253, 0.0020509914, -0.0041419696, -0.00039695262, 0.017287642, 0.0038987163, 0.014795128, -0.014661839, -0.008950386, 0.004431874, -0.009383577, 0.0012604183, -0.023019087, 0.0029273694, -0.033135757, 0.009176978, -0.011023037, -0.002102641, 0.02663123, -0.03849399, -0.0044152127, 0.0004527676, -0.0026924468, 0.02828402, 0.017727496, 0.035135098, 0.02728435, -0.005348239, -0.001467017, -0.019766824, 0.014715155, 0.011982721, 0.0045651635, 0.023458943, -0.0010046692, -0.0031373003, -0.0006972704, 0.0019043729, -0.018967088, -0.024311995, 0.0011546199, 0.007977373, -0.004755101, -0.010016702, -0.02780418, -0.004688456, 0.013022379, -0.005484861, 0.0017227661, -0.015394931, -0.028763862, -0.026684547, 0.0030589928, -0.018513903, 0.028363993, 0.0044818576, -0.009270281, 0.038920518, -0.016008062, 0.0093902415, 0.004815081, -0.021059733, 0.01451522, -0.0051583014, 0.023765508, -0.017874114, -0.016821127, -0.012522544, -0.0028390652, 0.0040886537, 0.020259995, -0.031216389, -0.014115352, -0.009176978, 0.010303274, 0.020313311, 0.0064112223, -0.02235264, -0.022872468, 0.0052449396, 0.0005723116, 0.0037321046, 0.016807798, -0.018527232, -0.009303603, 0.0024858483, -0.0012662497, -0.007110992, 0.011976057, -0.007790768, -0.042999174, -0.006727785, -0.011829439, 0.007024354, 0.005278262, -0.017740825, -0.0041519664, 0.0085905045, 0.027750863, -0.038387362, 0.024391968, 0.00087721116, 0.010509873, -0.00038508154, -0.006857742, 0.0183273, -0.0037054466, 0.015461575, 0.0017394272, -0.0017944091, 0.014181997, -0.0052682655, 0.009023695, 0.00719763, -0.013522214, 0.0034422, 0.014941746, -0.0016711164, -0.025298337, -0.017634194, 0.0058714002, -0.005321581, 0.017834127, 0.0110630235, -0.03369557, 0.029190388, -0.008943722, 0.009363583, -0.0034222065, -0.026111402, -0.007037683, -0.006561173, 0.02473852, -0.007084334, -0.010110005, -0.008577175, 0.0030439978, -0.022712521, 0.0054582027, -0.0012620845, -0.0011954397, -0.015741484, 0.0129557345, -0.00042111133, 0.00846388, 0.008930393, 0.016487904, 0.010469886, -0.007917393, -0.011762793, -0.0214596, 0.000917198, 0.021672864, 0.010269952, -0.007737452, -0.010243294, -0.0067244526, -0.015488233, -0.021552904, 0.017127695, 0.011109675, 0.038067464, 0.00871713, -0.0025591573, 0.021312982, -0.006237946, 0.034628596, -0.0045251767, 0.008357248, 0.020686522, 0.0010696478, 0.0076708077, 0.03772091, -0.018700508, -0.0020676525, -0.008923728, -0.023298996, 0.018233996, -0.010256623, 0.0017860786, 0.009796774, -0.00897038, -0.01269582, -0.018527232, 0.009190307, -0.02372552, -0.042119466, 0.008097334, -0.0066778013, -0.021046404, 0.0019593548, 0.011083017, -0.0016028056, 0.012662497, -0.000059095124, 0.0071043274, -0.014675168, 0.024831824, -0.053582355, 0.038387362, 0.0005698124, 0.015954746, 0.021552904, 0.031589597, -0.009230294, -0.0006147976, 0.002625802, -0.011749465, -0.034362018, -0.0067844326, -0.018793812, 0.011442899, -0.008743787, 0.017474247, -0.021619547, 0.01831397, -0.009037024, -0.0057247817, -0.02728435, 0.010363255, 0.034415334, -0.024032086, -0.0020126705, -0.0045518344, -0.019353628, -0.018340627, -0.03129636, -0.0034038792, -0.006321252, -0.0016161345, 0.033642255, -0.000056075285, -0.005005019, 0.004571828, -0.0024075406, -0.00010215386, 0.0098634185, 0.1980148, -0.003825407, -0.025191706, 0.035161756, 0.005358236, 0.025111731, 0.023485601, 0.0023342315, -0.011882754, 0.018287312, -0.0068910643, 0.003912045, 0.009243623, -0.001355387, -0.028603915, -0.012802451, -0.030150073, -0.014795128, -0.028630573, -0.0013487226, 0.002667455, 0.00985009, -0.0033972147, -0.021486258, 0.009503538, -0.017847456, 0.013062365, -0.014341944, 0.005078328, 0.025165047, -0.015594865, -0.025924796, -0.0018177348, 0.010996379, -0.02993681, 0.007324255, 0.014475234, -0.028577257, 0.005494857, 0.00011725306, -0.013315615, 0.015941417, 0.009376912, 0.0025158382, 0.008743787, 0.023832154, -0.008084005, -0.014195326, -0.008823762, 0.0033455652, -0.032362677, -0.021552904, -0.0056081535, 0.023298996, -0.025444955, 0.0097301295, 0.009736794, 0.015274971, -0.0012937407, -0.018087378, -0.0039387033, 0.008637156, -0.011189649, -0.00023846315, -0.011582852, 0.0066411467, -0.018220667, 0.0060846633, 0.0376676, -0.002709108, 0.0072776037, 0.0034188742, -0.010249958, -0.0007747449, -0.00795738, -0.022192692, 0.03910712, 0.032122757, 0.023898797, 0.0076241563, -0.007397564, -0.003655463, 0.011442899, -0.014115352, -0.00505167, -0.031163072, 0.030336678, -0.006857742, -0.022259338, 0.004048667, 0.02072651, 0.0030156737, -0.0042119464, 0.00041861215, -0.005731446, 0.011103011, 0.013822115, 0.021512916, 0.009216965, -0.006537847, -0.027057758, -0.04054665, 0.010403241, -0.0056281467, -0.005701456, -0.002709108, -0.00745088, -0.0024841821, 0.009356919, -0.022659205, 0.004061996, -0.013175662, 0.017074378, -0.006141311, -0.014541878, 0.02993681, -0.00028448965, -0.025271678, 0.011689484, -0.014528549, 0.004398552, -0.017274313, 0.0045751603, 0.012455898, 0.004121976, -0.025458284, -0.006744446, 0.011822774, -0.015035049, -0.03257594, 0.014675168, -0.0039187097, 0.019726837, -0.0047251107, 0.0022825818, 0.011829439, 0.005391558, -0.016781142, -0.0058747325, 0.010309938, -0.013049036, 0.01186276, -0.0011246296, 0.0062112883, 0.0028190718, -0.021739509, 0.009883412, -0.0073175905, -0.012715813, -0.017181009, -0.016607866, -0.042492677, -0.0014478565, -0.01794076, 0.012302616, -0.015194997, -0.04433207, -0.020606548, 0.009696807, 0.010303274, -0.01694109, -0.004018677, 0.019353628, -0.001991011, 0.000058938927, 0.010536531, -0.17274313, 0.010143327, 0.014235313, -0.024152048, 0.025684876, -0.0012504216, 0.036601283, -0.003698782, 0.0007310093, 0.004165295, -0.0029157067, 0.017101036, -0.046891227, -0.017460918, 0.022965772, 0.020233337, -0.024072073, 0.017220996, 0.009370248, 0.0010363255, 0.0194336, -0.019606877, 0.01818068, -0.020819811, 0.007410893, 0.0019326969, 0.017887443, 0.006651143, 0.00067394477, -0.011889419, -0.025058415, -0.008543854, 0.021579562, 0.0047484366, 0.014062037, 0.0075508473, -0.009510202, -0.009143656, 0.0046817916, 0.013982063, -0.0027990784, 0.011782787, 0.014541878, -0.015701497, -0.029350337, 0.021979429, 0.01332228, -0.026244693, -0.0123492675, -0.003895384, 0.0071576433, -0.035454992, -0.00046984528, 0.0033522295, 0.039347045, 0.0005119148, 0.00476843, -0.012995721, 0.0024042083, -0.006931051, -0.014461905, -0.0127558, 0.0034555288, -0.0074842023, -0.030256703, -0.007057676, -0.00807734, 0.007804097, -0.006957709, 0.017181009, -0.034575284, -0.008603834, -0.005008351, -0.015834786, 0.02943031, 0.016861115, -0.0050849924, 0.014235313, 0.0051449724, 0.0025924798, -0.0025741523, 0.04289254, -0.002104307, 0.012969063, -0.008310596, 0.00423194, 0.0074975314, 0.0018810473, -0.014248641, -0.024725191, 0.0151016945, -0.017527562, 0.0018727167, 0.0002830318, 0.015168339, 0.0144219175, -0.004048667, -0.004358565, 0.011836103, -0.010343261, -0.005911387, 0.0022825818, 0.0073175905, 0.00403867, 0.013188991, 0.03334902, 0.006111321, 0.008597169, 0.030123414, -0.015474904, 0.0017877447, -0.024551915, 0.013155668, 0.023525586, -0.0255116, 0.017220996, 0.004358565, -0.00934359, 0.0099967085, 0.011162991, 0.03092315, -0.021046404, -0.015514892, 0.0011946067, -0.01816735, 0.010876419, -0.10124666, -0.03550831, 0.0056348112, 0.013942076, 0.005951374, 0.020419942, -0.006857742, -0.020873128, -0.021259667, 0.0137554705, 0.0057880944, -0.029163731, -0.018767154, -0.021392956, 0.030896494, -0.005494857, -0.0027307675, -0.006801094, -0.014821786, 0.021392956, -0.0018110704, -0.0018843795, -0.012362596, -0.0072176233, -0.017194338, -0.018713837, -0.024272008, 0.03801415, 0.00015880188, 0.0044951867, -0.028630573, -0.0014070367, -0.00916365, -0.026537929, -0.009576847, -0.013995391, -0.0077107945, 0.0050016865, 0.00578143, -0.04467862, 0.008363913, 0.010136662, -0.0006268769, -0.006591163, 0.015341615, -0.027377652, -0.00093136, 0.029243704, -0.020886457, -0.01041657, -0.02424535, 0.005291591, -0.02980352, -0.009190307, 0.019460259, -0.0041286405, 0.004801752, 0.0011787785, -0.001257086, -0.011216307, -0.013395589, 0.00088137644, -0.0051616337, 0.03876057, -0.0033455652, 0.00075850025, -0.006951045, -0.0062112883, 0.018140694, -0.006351242, -0.008263946, 0.018154023, -0.012189319, 0.0075508473, -0.044358727, -0.0040153447, 0.0093302615, -0.010636497, 0.032789204, -0.005264933, -0.014235313, -0.018393943, 0.007297597, -0.016114693, 0.015021721, 0.020033404, 0.0137688, 0.0011046362, 0.010616505, -0.0039453674, 0.012109346, 0.021099718, -0.0072842683, -0.019153694, -0.003768759, 0.039320387, -0.006747778, -0.0016852784, 0.018154023, 0.0010963057, -0.015035049, -0.021033075, -0.04345236, 0.017287642, 0.016341286, -0.008610498, 0.00236922, 0.009290274, 0.028950468, -0.014475234, -0.0035654926, 0.015434918, -0.03372223, 0.004501851, -0.012929076, -0.008483873, -0.0044685286, -0.0102233, 0.01615468, 0.0022792495, 0.010876419, -0.0059647025, 0.01895376, -0.0069976957, -0.0042952523, 0.017207667, -0.00036133936, 0.0085905045, 0.008084005, 0.03129636, -0.016994404, -0.014915089, 0.020100048, -0.012009379, -0.006684466, 0.01306903, 0.00015765642, -0.00530492, 0.0005277429, 0.015421589, 0.015528221, 0.032202728, -0.003485519, -0.0014286962, 0.033908837, 0.001367883, 0.010509873, 0.025271678, -0.020993087, 0.019846799, 0.006897729, -0.010216636, -0.00725761, 0.01818068, -0.028443968, -0.011242964, -0.014435247, -0.013688826, 0.006101324, -0.0022509254, 0.013848773, -0.0019077052, 0.017181009, 0.03422873, 0.005324913, -0.0035188415, 0.014128681, -0.004898387, 0.005038341, 0.0012320944, -0.005561502, -0.017847456, 0.0008538855, -0.0047884234, 0.011849431, 0.015421589, -0.013942076, 0.0029790192, -0.013702155, 0.0001199605, -0.024431955, 0.019926772, 0.022179363, -0.016487904, -0.03964028, 0.0050849924, 0.017487574, 0.022792496, 0.0012504216, 0.004048667, -0.00997005, 0.0076041627, -0.014328616, -0.020259995, 0.0005598157, -0.010469886, 0.0016852784, 0.01716768, -0.008990373, -0.001987679, 0.026417969, 0.023792166, 0.0046917885, -0.0071909656, -0.00032051947, -0.023259008, -0.009170313, 0.02071318, -0.03156294, -0.030869836, -0.006324584, 0.013795458, -0.00047151142, 0.016874444, 0.00947688, 0.00985009, -0.029883493, 0.024205362, -0.013522214, -0.015075036, -0.030603256, 0.029270362, 0.010503208, 0.021539574, 0.01743426, -0.023898797, 0.022019416, -0.0068777353, 0.027857494, -0.021259667, 0.0025758184, 0.006197959, 0.006447877, -0.00025200035, -0.004941706, -0.021246338, -0.005504854, -0.008390571, -0.0097301295, 0.027244363, -0.04446536, 0.05216949, 0.010243294, -0.016008062, 0.0122493, -0.0199401, 0.009077012, 0.019753495, 0.006431216, -0.037960835, -0.027377652, 0.016381273, -0.0038620618, 0.022512587, -0.010996379, -0.0015211658, -0.0102233, 0.007071005, 0.008230623, -0.009490209, -0.010083347, 0.024431955, 0.002427534, 0.02828402, 0.0035721571, -0.022192692, -0.011882754, 0.010056688, 0.0011904413, -0.01426197, -0.017500903, -0.00010985966, 0.005591492, -0.0077707744, -0.012049366, 0.011869425, 0.00858384, -0.024698535, -0.030283362, 0.020140035, 0.011949399, -0.013968734, 0.042732596, -0.011649498, -0.011982721, -0.016967745, -0.0060913274, -0.007130985, -0.013109017, -0.009710136
                  ],
                  \'index\' => \'vector_index\',
                  \'path\' => \'plot_embedding\',
                  \'numCandidates\' => 150,
                  \'limit\' => 10
              ]
          ],
          [
              \'$project\' => [
                  \'_id\' => 0,
                  \'plot\' => 1,
                  \'title\' => 1,
                  \'score\' => [
                      \'$meta\' => \'vectorSearchScore\'
                  ]
              ]
          ]
      ];

      // Run the pipeline
      $result = $collection->aggregate($pipeline);

      // Print results
      foreach ($result as $document) {
          echo json_encode($document) . "\
";
      }

  } catch (MongoDB\\Driver\\Exception\\Exception $e) {
      echo "Error: " . $e->getMessage() . "\
";
  }

  ```

This query uses the `$vectorSearch` stage to:

- Compare vector embeddings of the search term against vector embeddings of movie plots in the `plot_embedding` field of the `sample_mflix.embedded_movies` collection.

- Consider up to the 150 most similar movie plots and return the top 10 results.

It uses the `$project` stage to:

- Only include the movie `plot` and `title` fields in the results.

- Add a `score` field to show the relevance of each result to the search term.

To learn more about this pipeline stage, see Run Vector Search Queries.

### Specify the `<connection-string>`.

Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

<Tabs>

<Tab name="Atlas Cluster">

Your connection string should use the following format:

```
mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
```

Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

</Tab>

<Tab name="Local Deployment">

Your connection string should use the following format:

```
mongodb://localhost:<port-number>/?directConnection=true
```

</Tab>

</Tabs>

### Run your query.

Run the following command to query your collection:

```bash
php atlas-vector-search-quick-start.php
```

```js
\'{"plot":"A reporter, learning of time travelers visiting 20th century disasters, tries to change the history they know by averting upcoming disasters.","title":"Thrill Seekers","score":0.7892671227455139}\'
\'{"plot":"At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.","title":"About Time","score":0.7843604683876038}\'
\'{"plot":"Hoping to alter the events of the past, a 19th century inventor instead travels 800,000 years into the future, where he finds humankind divided into two warring races.","title":"The Time Machine","score":0.7801066637039185}\'
`{"plot":"After using his mother\'s newly built time machine, Dolf gets stuck involuntary in the year 1212. He ends up in a children\'s crusade where he confronts his new friends with modern techniques...","title":"Crusade in Jeans","score":0.7789170742034912}`
\'{"plot":"An officer for a security agency that regulates time travel, must fend for his life against a shady politician who has a tie to his past.","title":"Timecop","score":0.7771612405776978}\'
\'{"plot":"A time-travel experiment in which a robot probe is sent from the year 2073 to the year 1973 goes terribly wrong thrusting one of the project scientists, a man named Nicholas Sinclair into a...","title":"A.P.E.X.","score":0.7730885744094849}\'
`{"plot":"Agent J travels in time to M.I.B.\'s early days in 1969 to stop an alien from assassinating his friend Agent K and changing history.","title":"Men in Black 3","score":0.7712380886077881}`
\'{"plot":"Bound by a shared destiny, a teen bursting with scientific curiosity and a former boy-genius inventor embark on a mission to unearth the secrets of a place somewhere in time and space that exists in their collective memory.","title":"Tomorrowland","score":0.7669923901557922}\'
\'{"plot":"With the help of his uncle, a man travels to the future to try and bring his girlfriend back to life.","title":"Love Story 2050","score":0.7649372816085815}\'
\'{"plot":"A dimension-traveling wizard gets stuck in the 21st century because cell-phone radiation interferes with his magic. With his home world on the brink of war, he seeks help from a jaded ...","title":"The Portal","score":0.7640786170959473}\'

```

</Tab>

<Tab name="Python">

### Construct your vector search query.

This query searches for documents that include text in the `plot` field that is semantically related to the term "time travel".

- Create a file named `atlas-vector-search-quick-start.py`.

- Copy and paste the following sample query into the `atlas-vector-search-quick-start.py` file:

  ```python
  import pymongo

  # connect to your Atlas cluster
  client = pymongo.MongoClient("<connection-string>")

  # define pipeline
  pipeline = [
    {
      \'$vectorSearch\': {
        \'index\': \'vector_index\',
        \'path\': \'plot_embedding\',
        \'queryVector\': [-0.0016261312, -0.028070757, -0.011342932, -0.012775794, -0.0027440966, 0.008683807, -0.02575152, -0.02020668, -0.010283281, -0.0041719596, 0.021392956, 0.028657231, -0.006634482, 0.007490867, 0.018593878, 0.0038187427, 0.029590257, -0.01451522, 0.016061379, 0.00008528442, -0.008943722, 0.01627464, 0.024311995, -0.025911469, 0.00022596726, -0.008863748, 0.008823762, -0.034921836, 0.007910728, -0.01515501, 0.035801545, -0.0035688248, -0.020299982, -0.03145631, -0.032256044, -0.028763862, -0.0071576433, -0.012769129, 0.012322609, -0.006621153, 0.010583182, 0.024085402, -0.001623632, 0.007864078, -0.021406285, 0.002554159, 0.012229307, -0.011762793, 0.0051682983, 0.0048484034, 0.018087378, 0.024325324, -0.037694257, -0.026537929, -0.008803768, -0.017767483, -0.012642504, -0.0062712682, 0.0009771782, -0.010409906, 0.017754154, -0.004671795, -0.030469967, 0.008477209, -0.005218282, -0.0058480743, -0.020153364, -0.0032805866, 0.004248601, 0.0051449724, 0.006791097, 0.007650814, 0.003458861, -0.0031223053, -0.01932697, -0.033615597, 0.00745088, 0.006321252, -0.0038154104, 0.014555207, 0.027697546, -0.02828402, 0.0066711367, 0.0077107945, 0.01794076, 0.011349596, -0.0052715978, 0.014755142, -0.019753495, -0.011156326, 0.011202978, 0.022126047, 0.00846388, 0.030549942, -0.0041386373, 0.018847128, -0.00033655585, 0.024925126, -0.003555496, -0.019300312, 0.010749794, 0.0075308536, -0.018287312, -0.016567878, -0.012869096, -0.015528221, 0.0078107617, -0.011156326, 0.013522214, -0.020646535, -0.01211601, 0.055928253, 0.011596181, -0.017247654, 0.0005939711, -0.026977783, -0.003942035, -0.009583511, -0.0055248477, -0.028737204, 0.023179034, 0.003995351, 0.0219661, -0.008470545, 0.023392297, 0.010469886, -0.015874773, 0.007890735, -0.009690142, -0.00024970944, 0.012775794, 0.0114762215, 0.013422247, 0.010429899, -0.03686786, -0.006717788, -0.027484283, 0.011556195, -0.036068123, -0.013915418, -0.0016327957, 0.0151016945, -0.020473259, 0.004671795, -0.012555866, 0.0209531, 0.01982014, 0.024485271, 0.0105431955, -0.005178295, 0.033162415, -0.013795458, 0.007150979, 0.010243294, 0.005644808, 0.017260984, -0.0045618312, 0.0024725192, 0.004305249, -0.008197301, 0.0014203656, 0.0018460588, 0.005015015, -0.011142998, 0.01439526, 0.022965772, 0.02552493, 0.007757446, -0.0019726837, 0.009503538, -0.032042783, 0.008403899, -0.04609149, 0.013808787, 0.011749465, 0.036388017, 0.016314628, 0.021939443, -0.0250051, -0.017354285, -0.012962398, 0.00006107364, 0.019113706, 0.03081652, -0.018114036, -0.0084572155, 0.009643491, -0.0034721901, 0.0072642746, -0.0090636825, 0.01642126, 0.013428912, 0.027724205, 0.0071243206, -0.6858542, -0.031029783, -0.014595194, -0.011449563, 0.017514233, 0.01743426, 0.009950057, 0.0029706885, -0.015714826, -0.001806072, 0.011856096, 0.026444625, -0.0010663156, -0.006474535, 0.0016161345, -0.020313311, 0.0148351155, -0.0018393943, 0.0057347785, 0.018300641, -0.018647194, 0.03345565, -0.008070676, 0.0071443142, 0.014301958, 0.0044818576, 0.003838736, -0.007350913, -0.024525259, -0.001142124, -0.018620536, 0.017247654, 0.007037683, 0.010236629, 0.06046009, 0.0138887605, -0.012122675, 0.037694257, 0.0055081863, 0.042492677, 0.00021784494, -0.011656162, 0.010276617, 0.022325981, 0.005984696, -0.009496873, 0.013382261, -0.0010563189, 0.0026507939, -0.041639622, 0.008637156, 0.026471283, -0.008403899, 0.024858482, -0.00066686375, -0.0016252982, 0.027590916, 0.0051449724, 0.0058647357, -0.008743787, -0.014968405, 0.027724205, -0.011596181, 0.0047650975, -0.015381602, 0.0043718936, 0.002159289, 0.035908177, -0.008243952, -0.030443309, 0.027564257, 0.042625964, -0.0033688906, 0.01843393, 0.019087048, 0.024578573, 0.03268257, -0.015608194, -0.014128681, -0.0033538956, -0.0028757197, -0.004121976, -0.032389335, 0.0034322033, 0.058807302, 0.010943064, -0.030523283, 0.008903735, 0.017500903, 0.00871713, -0.0029406983, 0.013995391, -0.03132302, -0.019660193, -0.00770413, -0.0038853872, 0.0015894766, -0.0015294964, -0.006251275, -0.021099718, -0.010256623, -0.008863748, 0.028550599, 0.02020668, -0.0012962399, -0.003415542, -0.0022509254, 0.0119360695, 0.027590916, -0.046971202, -0.0015194997, -0.022405956, 0.0016677842, -0.00018535563, -0.015421589, -0.031802863, 0.03814744, 0.0065411795, 0.016567878, -0.015621523, 0.022899127, -0.011076353, 0.02841731, -0.002679118, -0.002342562, 0.015341615, 0.01804739, -0.020566562, -0.012989056, -0.002990682, 0.01643459, 0.00042527664, 0.008243952, -0.013715484, -0.004835075, -0.009803439, 0.03129636, -0.021432944, 0.0012087687, -0.015741484, -0.0052016205, 0.00080890034, -0.01755422, 0.004811749, -0.017967418, -0.026684547, -0.014128681, 0.0041386373, -0.013742141, -0.010056688, -0.013268964, -0.0110630235, -0.028337335, 0.015981404, -0.00997005, -0.02424535, -0.013968734, -0.028310679, -0.027750863, -0.020699851, 0.02235264, 0.001057985, 0.00081639783, -0.0099367285, 0.013522214, -0.012016043, -0.00086471526, 0.013568865, 0.0019376953, -0.019020405, 0.017460918, -0.023045745, 0.008503866, 0.0064678704, -0.011509543, 0.018727167, -0.003372223, -0.0028690554, -0.0027024434, -0.011902748, -0.012182655, -0.015714826, -0.0098634185, 0.00593138, 0.018753825, 0.0010146659, 0.013029044, 0.0003521757, -0.017620865, 0.04102649, 0.00552818, 0.024485271, -0.009630162, -0.015608194, 0.0006718621, -0.0008418062, 0.012395918, 0.0057980907, 0.016221326, 0.010616505, 0.004838407, -0.012402583, 0.019900113, -0.0034521967, 0.000247002, -0.03153628, 0.0011038032, -0.020819811, 0.016234655, -0.00330058, -0.0032289368, 0.00078973995, -0.021952773, -0.022459272, 0.03118973, 0.03673457, -0.021472929, 0.0072109587, -0.015075036, 0.004855068, -0.0008151483, 0.0069643734, 0.010023367, -0.010276617, -0.023019087, 0.0068244194, -0.0012520878, -0.0015086699, 0.022046074, -0.034148756, -0.0022192693, 0.002427534, -0.0027124402, 0.0060346797, 0.015461575, 0.0137554705, 0.009230294, -0.009583511, 0.032629255, 0.015994733, -0.019167023, -0.009203636, 0.03393549, -0.017274313, -0.012042701, -0.0009930064, 0.026777849, -0.013582194, -0.0027590916, -0.017594207, -0.026804507, -0.0014236979, -0.022032745, 0.0091236625, -0.0042419364, -0.00858384, -0.0033905501, -0.020739838, 0.016821127, 0.022539245, 0.015381602, 0.015141681, 0.028817179, -0.019726837, -0.0051283115, -0.011489551, -0.013208984, -0.0047017853, -0.0072309524, 0.01767418, 0.0025658219, -0.010323267, 0.012609182, -0.028097415, 0.026871152, -0.010276617, 0.021912785, 0.0022542577, 0.005124979, -0.0019710176, 0.004518512, -0.040360045, 0.010969722, -0.0031539614, -0.020366628, -0.025778178, -0.0110030435, -0.016221326, 0.0036587953, 0.016207997, 0.003007343, -0.0032555948, 0.0044052163, -0.022046074, -0.0008822095, -0.009363583, 0.028230704, -0.024538586, 0.0029840174, 0.0016044717, -0.014181997, 0.031349678, -0.014381931, -0.027750863, 0.02613806, 0.0004136138, -0.005748107, -0.01868718, -0.0010138329, 0.0054348772, 0.010703143, -0.003682121, 0.0030856507, -0.004275259, -0.010403241, 0.021113047, -0.022685863, -0.023032416, 0.031429652, 0.001792743, -0.005644808, -0.011842767, -0.04078657, -0.0026874484, 0.06915057, -0.00056939584, -0.013995391, 0.010703143, -0.013728813, -0.022939114, -0.015261642, -0.022485929, 0.016807798, 0.007964044, 0.0144219175, 0.016821127, 0.0076241563, 0.005461535, -0.013248971, 0.015301628, 0.0085171955, -0.004318578, 0.011136333, -0.0059047225, -0.010249958, -0.018207338, 0.024645219, 0.021752838, 0.0007614159, -0.013648839, 0.01111634, -0.010503208, -0.0038487327, -0.008203966, -0.00397869, 0.0029740208, 0.008530525, 0.005261601, 0.01642126, -0.0038753906, -0.013222313, 0.026537929, 0.024671877, -0.043505676, 0.014195326, 0.024778508, 0.0056914594, -0.025951454, 0.017620865, -0.0021359634, 0.008643821, 0.021299653, 0.0041686273, -0.009017031, 0.04044002, 0.024378639, -0.027777521, -0.014208655, 0.0028623908, 0.042119466, 0.005801423, -0.028124074, -0.03129636, 0.022139376, -0.022179363, -0.04067994, 0.013688826, 0.013328944, 0.0046184794, -0.02828402, -0.0063412455, -0.0046184794, -0.011756129, -0.010383247, -0.0018543894, -0.0018593877, -0.00052024535, 0.004815081, 0.014781799, 0.018007403, 0.01306903, -0.020433271, 0.009043689, 0.033189073, -0.006844413, -0.019766824, -0.018767154, 0.00533491, -0.0024575242, 0.018727167, 0.0058080875, -0.013835444, 0.0040719924, 0.004881726, 0.012029372, 0.005664801, 0.03193615, 0.0058047553, 0.002695779, 0.009290274, 0.02361889, 0.017834127, 0.0049017193, -0.0036388019, 0.010776452, -0.019793482, 0.0067777685, -0.014208655, -0.024911797, 0.002385881, 0.0034988478, 0.020899786, -0.0025858153, -0.011849431, 0.033189073, -0.021312982, 0.024965113, -0.014635181, 0.014048708, -0.0035921505, -0.003347231, 0.030869836, -0.0017161017, -0.0061346465, 0.009203636, -0.025165047, 0.0068510775, 0.021499587, 0.013782129, -0.0024475274, -0.0051149824, -0.024445284, 0.006167969, 0.0068844, -0.00076183246, 0.030150073, -0.0055948244, -0.011162991, -0.02057989, -0.009703471, -0.020646535, 0.008004031, 0.0066378145, -0.019900113, -0.012169327, -0.01439526, 0.0044252095, -0.004018677, 0.014621852, -0.025085073, -0.013715484, -0.017980747, 0.0071043274, 0.011456228, -0.01010334, -0.0035321703, -0.03801415, -0.012036037, -0.0028990454, -0.05419549, -0.024058744, -0.024272008, 0.015221654, 0.027964126, 0.03182952, -0.015354944, 0.004855068, 0.011522872, 0.004771762, 0.0027874154, 0.023405626, 0.0004242353, -0.03132302, 0.007057676, 0.008763781, -0.0027057757, 0.023005757, -0.0071176565, -0.005238275, 0.029110415, -0.010989714, 0.013728813, -0.009630162, -0.029137073, -0.0049317093, -0.0008630492, -0.015248313, 0.0043219104, -0.0055681667, -0.013175662, 0.029723546, 0.025098402, 0.012849103, -0.0009996708, 0.03118973, -0.0021709518, 0.0260181, -0.020526575, 0.028097415, -0.016141351, 0.010509873, -0.022965772, 0.002865723, 0.0020493253, 0.0020509914, -0.0041419696, -0.00039695262, 0.017287642, 0.0038987163, 0.014795128, -0.014661839, -0.008950386, 0.004431874, -0.009383577, 0.0012604183, -0.023019087, 0.0029273694, -0.033135757, 0.009176978, -0.011023037, -0.002102641, 0.02663123, -0.03849399, -0.0044152127, 0.0004527676, -0.0026924468, 0.02828402, 0.017727496, 0.035135098, 0.02728435, -0.005348239, -0.001467017, -0.019766824, 0.014715155, 0.011982721, 0.0045651635, 0.023458943, -0.0010046692, -0.0031373003, -0.0006972704, 0.0019043729, -0.018967088, -0.024311995, 0.0011546199, 0.007977373, -0.004755101, -0.010016702, -0.02780418, -0.004688456, 0.013022379, -0.005484861, 0.0017227661, -0.015394931, -0.028763862, -0.026684547, 0.0030589928, -0.018513903, 0.028363993, 0.0044818576, -0.009270281, 0.038920518, -0.016008062, 0.0093902415, 0.004815081, -0.021059733, 0.01451522, -0.0051583014, 0.023765508, -0.017874114, -0.016821127, -0.012522544, -0.0028390652, 0.0040886537, 0.020259995, -0.031216389, -0.014115352, -0.009176978, 0.010303274, 0.020313311, 0.0064112223, -0.02235264, -0.022872468, 0.0052449396, 0.0005723116, 0.0037321046, 0.016807798, -0.018527232, -0.009303603, 0.0024858483, -0.0012662497, -0.007110992, 0.011976057, -0.007790768, -0.042999174, -0.006727785, -0.011829439, 0.007024354, 0.005278262, -0.017740825, -0.0041519664, 0.0085905045, 0.027750863, -0.038387362, 0.024391968, 0.00087721116, 0.010509873, -0.00038508154, -0.006857742, 0.0183273, -0.0037054466, 0.015461575, 0.0017394272, -0.0017944091, 0.014181997, -0.0052682655, 0.009023695, 0.00719763, -0.013522214, 0.0034422, 0.014941746, -0.0016711164, -0.025298337, -0.017634194, 0.0058714002, -0.005321581, 0.017834127, 0.0110630235, -0.03369557, 0.029190388, -0.008943722, 0.009363583, -0.0034222065, -0.026111402, -0.007037683, -0.006561173, 0.02473852, -0.007084334, -0.010110005, -0.008577175, 0.0030439978, -0.022712521, 0.0054582027, -0.0012620845, -0.0011954397, -0.015741484, 0.0129557345, -0.00042111133, 0.00846388, 0.008930393, 0.016487904, 0.010469886, -0.007917393, -0.011762793, -0.0214596, 0.000917198, 0.021672864, 0.010269952, -0.007737452, -0.010243294, -0.0067244526, -0.015488233, -0.021552904, 0.017127695, 0.011109675, 0.038067464, 0.00871713, -0.0025591573, 0.021312982, -0.006237946, 0.034628596, -0.0045251767, 0.008357248, 0.020686522, 0.0010696478, 0.0076708077, 0.03772091, -0.018700508, -0.0020676525, -0.008923728, -0.023298996, 0.018233996, -0.010256623, 0.0017860786, 0.009796774, -0.00897038, -0.01269582, -0.018527232, 0.009190307, -0.02372552, -0.042119466, 0.008097334, -0.0066778013, -0.021046404, 0.0019593548, 0.011083017, -0.0016028056, 0.012662497, -0.000059095124, 0.0071043274, -0.014675168, 0.024831824, -0.053582355, 0.038387362, 0.0005698124, 0.015954746, 0.021552904, 0.031589597, -0.009230294, -0.0006147976, 0.002625802, -0.011749465, -0.034362018, -0.0067844326, -0.018793812, 0.011442899, -0.008743787, 0.017474247, -0.021619547, 0.01831397, -0.009037024, -0.0057247817, -0.02728435, 0.010363255, 0.034415334, -0.024032086, -0.0020126705, -0.0045518344, -0.019353628, -0.018340627, -0.03129636, -0.0034038792, -0.006321252, -0.0016161345, 0.033642255, -0.000056075285, -0.005005019, 0.004571828, -0.0024075406, -0.00010215386, 0.0098634185, 0.1980148, -0.003825407, -0.025191706, 0.035161756, 0.005358236, 0.025111731, 0.023485601, 0.0023342315, -0.011882754, 0.018287312, -0.0068910643, 0.003912045, 0.009243623, -0.001355387, -0.028603915, -0.012802451, -0.030150073, -0.014795128, -0.028630573, -0.0013487226, 0.002667455, 0.00985009, -0.0033972147, -0.021486258, 0.009503538, -0.017847456, 0.013062365, -0.014341944, 0.005078328, 0.025165047, -0.015594865, -0.025924796, -0.0018177348, 0.010996379, -0.02993681, 0.007324255, 0.014475234, -0.028577257, 0.005494857, 0.00011725306, -0.013315615, 0.015941417, 0.009376912, 0.0025158382, 0.008743787, 0.023832154, -0.008084005, -0.014195326, -0.008823762, 0.0033455652, -0.032362677, -0.021552904, -0.0056081535, 0.023298996, -0.025444955, 0.0097301295, 0.009736794, 0.015274971, -0.0012937407, -0.018087378, -0.0039387033, 0.008637156, -0.011189649, -0.00023846315, -0.011582852, 0.0066411467, -0.018220667, 0.0060846633, 0.0376676, -0.002709108, 0.0072776037, 0.0034188742, -0.010249958, -0.0007747449, -0.00795738, -0.022192692, 0.03910712, 0.032122757, 0.023898797, 0.0076241563, -0.007397564, -0.003655463, 0.011442899, -0.014115352, -0.00505167, -0.031163072, 0.030336678, -0.006857742, -0.022259338, 0.004048667, 0.02072651, 0.0030156737, -0.0042119464, 0.00041861215, -0.005731446, 0.011103011, 0.013822115, 0.021512916, 0.009216965, -0.006537847, -0.027057758, -0.04054665, 0.010403241, -0.0056281467, -0.005701456, -0.002709108, -0.00745088, -0.0024841821, 0.009356919, -0.022659205, 0.004061996, -0.013175662, 0.017074378, -0.006141311, -0.014541878, 0.02993681, -0.00028448965, -0.025271678, 0.011689484, -0.014528549, 0.004398552, -0.017274313, 0.0045751603, 0.012455898, 0.004121976, -0.025458284, -0.006744446, 0.011822774, -0.015035049, -0.03257594, 0.014675168, -0.0039187097, 0.019726837, -0.0047251107, 0.0022825818, 0.011829439, 0.005391558, -0.016781142, -0.0058747325, 0.010309938, -0.013049036, 0.01186276, -0.0011246296, 0.0062112883, 0.0028190718, -0.021739509, 0.009883412, -0.0073175905, -0.012715813, -0.017181009, -0.016607866, -0.042492677, -0.0014478565, -0.01794076, 0.012302616, -0.015194997, -0.04433207, -0.020606548, 0.009696807, 0.010303274, -0.01694109, -0.004018677, 0.019353628, -0.001991011, 0.000058938927, 0.010536531, -0.17274313, 0.010143327, 0.014235313, -0.024152048, 0.025684876, -0.0012504216, 0.036601283, -0.003698782, 0.0007310093, 0.004165295, -0.0029157067, 0.017101036, -0.046891227, -0.017460918, 0.022965772, 0.020233337, -0.024072073, 0.017220996, 0.009370248, 0.0010363255, 0.0194336, -0.019606877, 0.01818068, -0.020819811, 0.007410893, 0.0019326969, 0.017887443, 0.006651143, 0.00067394477, -0.011889419, -0.025058415, -0.008543854, 0.021579562, 0.0047484366, 0.014062037, 0.0075508473, -0.009510202, -0.009143656, 0.0046817916, 0.013982063, -0.0027990784, 0.011782787, 0.014541878, -0.015701497, -0.029350337, 0.021979429, 0.01332228, -0.026244693, -0.0123492675, -0.003895384, 0.0071576433, -0.035454992, -0.00046984528, 0.0033522295, 0.039347045, 0.0005119148, 0.00476843, -0.012995721, 0.0024042083, -0.006931051, -0.014461905, -0.0127558, 0.0034555288, -0.0074842023, -0.030256703, -0.007057676, -0.00807734, 0.007804097, -0.006957709, 0.017181009, -0.034575284, -0.008603834, -0.005008351, -0.015834786, 0.02943031, 0.016861115, -0.0050849924, 0.014235313, 0.0051449724, 0.0025924798, -0.0025741523, 0.04289254, -0.002104307, 0.012969063, -0.008310596, 0.00423194, 0.0074975314, 0.0018810473, -0.014248641, -0.024725191, 0.0151016945, -0.017527562, 0.0018727167, 0.0002830318, 0.015168339, 0.0144219175, -0.004048667, -0.004358565, 0.011836103, -0.010343261, -0.005911387, 0.0022825818, 0.0073175905, 0.00403867, 0.013188991, 0.03334902, 0.006111321, 0.008597169, 0.030123414, -0.015474904, 0.0017877447, -0.024551915, 0.013155668, 0.023525586, -0.0255116, 0.017220996, 0.004358565, -0.00934359, 0.0099967085, 0.011162991, 0.03092315, -0.021046404, -0.015514892, 0.0011946067, -0.01816735, 0.010876419, -0.10124666, -0.03550831, 0.0056348112, 0.013942076, 0.005951374, 0.020419942, -0.006857742, -0.020873128, -0.021259667, 0.0137554705, 0.0057880944, -0.029163731, -0.018767154, -0.021392956, 0.030896494, -0.005494857, -0.0027307675, -0.006801094, -0.014821786, 0.021392956, -0.0018110704, -0.0018843795, -0.012362596, -0.0072176233, -0.017194338, -0.018713837, -0.024272008, 0.03801415, 0.00015880188, 0.0044951867, -0.028630573, -0.0014070367, -0.00916365, -0.026537929, -0.009576847, -0.013995391, -0.0077107945, 0.0050016865, 0.00578143, -0.04467862, 0.008363913, 0.010136662, -0.0006268769, -0.006591163, 0.015341615, -0.027377652, -0.00093136, 0.029243704, -0.020886457, -0.01041657, -0.02424535, 0.005291591, -0.02980352, -0.009190307, 0.019460259, -0.0041286405, 0.004801752, 0.0011787785, -0.001257086, -0.011216307, -0.013395589, 0.00088137644, -0.0051616337, 0.03876057, -0.0033455652, 0.00075850025, -0.006951045, -0.0062112883, 0.018140694, -0.006351242, -0.008263946, 0.018154023, -0.012189319, 0.0075508473, -0.044358727, -0.0040153447, 0.0093302615, -0.010636497, 0.032789204, -0.005264933, -0.014235313, -0.018393943, 0.007297597, -0.016114693, 0.015021721, 0.020033404, 0.0137688, 0.0011046362, 0.010616505, -0.0039453674, 0.012109346, 0.021099718, -0.0072842683, -0.019153694, -0.003768759, 0.039320387, -0.006747778, -0.0016852784, 0.018154023, 0.0010963057, -0.015035049, -0.021033075, -0.04345236, 0.017287642, 0.016341286, -0.008610498, 0.00236922, 0.009290274, 0.028950468, -0.014475234, -0.0035654926, 0.015434918, -0.03372223, 0.004501851, -0.012929076, -0.008483873, -0.0044685286, -0.0102233, 0.01615468, 0.0022792495, 0.010876419, -0.0059647025, 0.01895376, -0.0069976957, -0.0042952523, 0.017207667, -0.00036133936, 0.0085905045, 0.008084005, 0.03129636, -0.016994404, -0.014915089, 0.020100048, -0.012009379, -0.006684466, 0.01306903, 0.00015765642, -0.00530492, 0.0005277429, 0.015421589, 0.015528221, 0.032202728, -0.003485519, -0.0014286962, 0.033908837, 0.001367883, 0.010509873, 0.025271678, -0.020993087, 0.019846799, 0.006897729, -0.010216636, -0.00725761, 0.01818068, -0.028443968, -0.011242964, -0.014435247, -0.013688826, 0.006101324, -0.0022509254, 0.013848773, -0.0019077052, 0.017181009, 0.03422873, 0.005324913, -0.0035188415, 0.014128681, -0.004898387, 0.005038341, 0.0012320944, -0.005561502, -0.017847456, 0.0008538855, -0.0047884234, 0.011849431, 0.015421589, -0.013942076, 0.0029790192, -0.013702155, 0.0001199605, -0.024431955, 0.019926772, 0.022179363, -0.016487904, -0.03964028, 0.0050849924, 0.017487574, 0.022792496, 0.0012504216, 0.004048667, -0.00997005, 0.0076041627, -0.014328616, -0.020259995, 0.0005598157, -0.010469886, 0.0016852784, 0.01716768, -0.008990373, -0.001987679, 0.026417969, 0.023792166, 0.0046917885, -0.0071909656, -0.00032051947, -0.023259008, -0.009170313, 0.02071318, -0.03156294, -0.030869836, -0.006324584, 0.013795458, -0.00047151142, 0.016874444, 0.00947688, 0.00985009, -0.029883493, 0.024205362, -0.013522214, -0.015075036, -0.030603256, 0.029270362, 0.010503208, 0.021539574, 0.01743426, -0.023898797, 0.022019416, -0.0068777353, 0.027857494, -0.021259667, 0.0025758184, 0.006197959, 0.006447877, -0.00025200035, -0.004941706, -0.021246338, -0.005504854, -0.008390571, -0.0097301295, 0.027244363, -0.04446536, 0.05216949, 0.010243294, -0.016008062, 0.0122493, -0.0199401, 0.009077012, 0.019753495, 0.006431216, -0.037960835, -0.027377652, 0.016381273, -0.0038620618, 0.022512587, -0.010996379, -0.0015211658, -0.0102233, 0.007071005, 0.008230623, -0.009490209, -0.010083347, 0.024431955, 0.002427534, 0.02828402, 0.0035721571, -0.022192692, -0.011882754, 0.010056688, 0.0011904413, -0.01426197, -0.017500903, -0.00010985966, 0.005591492, -0.0077707744, -0.012049366, 0.011869425, 0.00858384, -0.024698535, -0.030283362, 0.020140035, 0.011949399, -0.013968734, 0.042732596, -0.011649498, -0.011982721, -0.016967745, -0.0060913274, -0.007130985, -0.013109017, -0.009710136],
        \'numCandidates\': 150,
        \'limit\': 10
      }
    }, {
      \'$project\': {
        \'_id\': 0,
        \'plot\': 1,
        \'title\': 1,
        \'score\': {
          \'$meta\': \'vectorSearchScore\'
        }
      }
    }
  ]

  # run pipeline
  result = client["sample_mflix"]["embedded_movies"].aggregate(pipeline)

  # print results
  for i in result:
      print(i)

  ```

This query uses the `$vectorSearch` stage to:

- Compare vector embeddings of the search term against vector embeddings of movie plots in the `plot_embedding` field of the `sample_mflix.embedded_movies` collection.

- Consider up to the 150 most similar movie plots and return the top 10 results.

It uses the `$project` stage to:

- Only include the movie `plot` and `title` fields in the results.

- Add a `score` field to show the relevance of each result to the search term.

To learn more about this pipeline stage, see Run Vector Search Queries.

### Specify the `<connection-string>`.

Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

<Tabs>

<Tab name="Atlas Cluster">

Your connection string should use the following format:

```
mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
```

Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

</Tab>

<Tab name="Local Deployment">

Your connection string should use the following format:

```
mongodb://localhost:<port-number>/?directConnection=true
```

</Tab>

</Tabs>

### Run your query.

Run the following command to query your collection:

```bash
python atlas-vector-search-quick-start.py
```

```js
{\'plot\': \'A reporter, learning of time travelers visiting 20th century disasters, tries to change the history they know by averting upcoming disasters.\', \'title\': \'Thrill Seekers\', \'score\': 0.7892671227455139}
{\'plot\': \'At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.\', \'title\': \'About Time\', \'score\': 0.7843604683876038}
{\'plot\': \'Hoping to alter the events of the past, a 19th century inventor instead travels 800,000 years into the future, where he finds humankind divided into two warring races.\', \'title\': \'The Time Machine\', \'score\': 0.7801066637039185}
{\'plot\': "After using his mother\'s newly built time machine, Dolf gets stuck involuntary in the year 1212. He ends up in a children\'s crusade where he confronts his new friends with modern techniques...", \'title\': \'Crusade in Jeans\', \'score\': 0.7789170742034912}
{\'plot\': \'An officer for a security agency that regulates time travel, must fend for his life against a shady politician who has a tie to his past.\', \'title\': \'Timecop\', \'score\': 0.7771612405776978}
{\'plot\': \'A time-travel experiment in which a robot probe is sent from the year 2073 to the year 1973 goes terribly wrong thrusting one of the project scientists, a man named Nicholas Sinclair into a...\', \'title\': \'A.P.E.X.\', \'score\': 0.7730885744094849}
{\'plot\': "Agent J travels in time to M.I.B.\'s early days in 1969 to stop an alien from assassinating his friend Agent K and changing history.", \'title\': \'Men in Black 3\', \'score\': 0.7712380886077881}
{\'plot\': \'Bound by a shared destiny, a teen bursting with scientific curiosity and a former boy-genius inventor embark on a mission to unearth the secrets of a place somewhere in time and space that exists in their collective memory.\', \'title\': \'Tomorrowland\', \'score\': 0.7669923901557922}
{\'plot\': \'With the help of his uncle, a man travels to the future to try and bring his girlfriend back to life.\', \'title\': \'Love Story 2050\', \'score\': 0.7649372816085815}
{\'plot\': \'A dimension-traveling wizard gets stuck in the 21st century because cell-phone radiation interferes with his magic. With his home world on the brink of war, he seeks help from a jaded ...\', \'title\': \'The Portal\', \'score\': 0.7640786170959473}

```

</Tab>

<Tab name="Ruby">

### Install the MongoDB Ruby Driver.

- If you don\'t already have a `Gemfile` for your project, run the following command to generate one:

  ```sh
  bundle init
  ```

- Add the `mongo` gem to your `Gemfile`:

  ```sh
  gem "mongo"
  ```

- Run the following command to install the dependency:

  ```sh
  bundle install
  ```

This installs the latest version of the Ruby driver. For alternate installation instructions and version compatibility, see the MongoDB Ruby Driver documentation.

### Construct your vector search query.

This query searches for documents that include text in the `plot` field that is semantically related to the term "time travel".

- Create a file named `atlas_vector_search_quick_start.rb` .

- Copy and paste the following sample query into the `atlas_vector_search_quick_start.rb` file:

  ```ruby
  require \'mongo\'
  require \'json\'

  # Replace the placeholder with your Atlas connection string
  uri = "<connection-string>"

  begin
    # Connect to the MongoDB client
    client = Mongo::Client.new(uri, database: \'sample_mflix\')

    # Set the namespace
    db = client.database
    collection = db[:embedded_movies]

    # Define the pipeline with $vectorSearch query options
    pipeline = [
      {
        \'$vectorSearch\' => {
          \'queryVector\' => [ -0.0016261312, -0.028070757, -0.011342932, -0.012775794, -0.0027440966, 0.008683807, -0.02575152, -0.02020668, -0.010283281, -0.0041719596, 0.021392956, 0.028657231, -0.006634482, 0.007490867, 0.018593878, 0.0038187427, 0.029590257, -0.01451522, 0.016061379, 0.00008528442, -0.008943722, 0.01627464, 0.024311995, -0.025911469, 0.00022596726, -0.008863748, 0.008823762, -0.034921836, 0.007910728, -0.01515501, 0.035801545, -0.0035688248, -0.020299982, -0.03145631, -0.032256044, -0.028763862, -0.0071576433, -0.012769129, 0.012322609, -0.006621153, 0.010583182, 0.024085402, -0.001623632, 0.007864078, -0.021406285, 0.002554159, 0.012229307, -0.011762793, 0.0051682983, 0.0048484034, 0.018087378, 0.024325324, -0.037694257, -0.026537929, -0.008803768, -0.017767483, -0.012642504, -0.0062712682, 0.0009771782, -0.010409906, 0.017754154, -0.004671795, -0.030469967, 0.008477209, -0.005218282, -0.0058480743, -0.020153364, -0.0032805866, 0.004248601, 0.0051449724, 0.006791097, 0.007650814, 0.003458861, -0.0031223053, -0.01932697, -0.033615597, 0.00745088, 0.006321252, -0.0038154104, 0.014555207, 0.027697546, -0.02828402, 0.0066711367, 0.0077107945, 0.01794076, 0.011349596, -0.0052715978, 0.014755142, -0.019753495, -0.011156326, 0.011202978, 0.022126047, 0.00846388, 0.030549942, -0.0041386373, 0.018847128, -0.00033655585, 0.024925126, -0.003555496, -0.019300312, 0.010749794, 0.0075308536, -0.018287312, -0.016567878, -0.012869096, -0.015528221, 0.0078107617, -0.011156326, 0.013522214, -0.020646535, -0.01211601, 0.055928253, 0.011596181, -0.017247654, 0.0005939711, -0.026977783, -0.003942035, -0.009583511, -0.0055248477, -0.028737204, 0.023179034, 0.003995351, 0.0219661, -0.008470545, 0.023392297, 0.010469886, -0.015874773, 0.007890735, -0.009690142, -0.00024970944, 0.012775794, 0.0114762215, 0.013422247, 0.010429899, -0.03686786, -0.006717788, -0.027484283, 0.011556195, -0.036068123, -0.013915418, -0.0016327957, 0.0151016945, -0.020473259, 0.004671795, -0.012555866, 0.0209531, 0.01982014, 0.024485271, 0.0105431955, -0.005178295, 0.033162415, -0.013795458, 0.007150979, 0.010243294, 0.005644808, 0.017260984, -0.0045618312, 0.0024725192, 0.004305249, -0.008197301, 0.0014203656, 0.0018460588, 0.005015015, -0.011142998, 0.01439526, 0.022965772, 0.02552493, 0.007757446, -0.0019726837, 0.009503538, -0.032042783, 0.008403899, -0.04609149, 0.013808787, 0.011749465, 0.036388017, 0.016314628, 0.021939443, -0.0250051, -0.017354285, -0.012962398, 0.00006107364, 0.019113706, 0.03081652, -0.018114036, -0.0084572155, 0.009643491, -0.0034721901, 0.0072642746, -0.0090636825, 0.01642126, 0.013428912, 0.027724205, 0.0071243206, -0.6858542, -0.031029783, -0.014595194, -0.011449563, 0.017514233, 0.01743426, 0.009950057, 0.0029706885, -0.015714826, -0.001806072, 0.011856096, 0.026444625, -0.0010663156, -0.006474535, 0.0016161345, -0.020313311, 0.0148351155, -0.0018393943, 0.0057347785, 0.018300641, -0.018647194, 0.03345565, -0.008070676, 0.0071443142, 0.014301958, 0.0044818576, 0.003838736, -0.007350913, -0.024525259, -0.001142124, -0.018620536, 0.017247654, 0.007037683, 0.010236629, 0.06046009, 0.0138887605, -0.012122675, 0.037694257, 0.0055081863, 0.042492677, 0.00021784494, -0.011656162, 0.010276617, 0.022325981, 0.005984696, -0.009496873, 0.013382261, -0.0010563189, 0.0026507939, -0.041639622, 0.008637156, 0.026471283, -0.008403899, 0.024858482, -0.00066686375, -0.0016252982, 0.027590916, 0.0051449724, 0.0058647357, -0.008743787, -0.014968405, 0.027724205, -0.011596181, 0.0047650975, -0.015381602, 0.0043718936, 0.002159289, 0.035908177, -0.008243952, -0.030443309, 0.027564257, 0.042625964, -0.0033688906, 0.01843393, 0.019087048, 0.024578573, 0.03268257, -0.015608194, -0.014128681, -0.0033538956, -0.0028757197, -0.004121976, -0.032389335, 0.0034322033, 0.058807302, 0.010943064, -0.030523283, 0.008903735, 0.017500903, 0.00871713, -0.0029406983, 0.013995391, -0.03132302, -0.019660193, -0.00770413, -0.0038853872, 0.0015894766, -0.0015294964, -0.006251275, -0.021099718, -0.010256623, -0.008863748, 0.028550599, 0.02020668, -0.0012962399, -0.003415542, -0.0022509254, 0.0119360695, 0.027590916, -0.046971202, -0.0015194997, -0.022405956, 0.0016677842, -0.00018535563, -0.015421589, -0.031802863, 0.03814744, 0.0065411795, 0.016567878, -0.015621523, 0.022899127, -0.011076353, 0.02841731, -0.002679118, -0.002342562, 0.015341615, 0.01804739, -0.020566562, -0.012989056, -0.002990682, 0.01643459, 0.00042527664, 0.008243952, -0.013715484, -0.004835075, -0.009803439, 0.03129636, -0.021432944, 0.0012087687, -0.015741484, -0.0052016205, 0.00080890034, -0.01755422, 0.004811749, -0.017967418, -0.026684547, -0.014128681, 0.0041386373, -0.013742141, -0.010056688, -0.013268964, -0.0110630235, -0.028337335, 0.015981404, -0.00997005, -0.02424535, -0.013968734, -0.028310679, -0.027750863, -0.020699851, 0.02235264, 0.001057985, 0.00081639783, -0.0099367285, 0.013522214, -0.012016043, -0.00086471526, 0.013568865, 0.0019376953, -0.019020405, 0.017460918, -0.023045745, 0.008503866, 0.0064678704, -0.011509543, 0.018727167, -0.003372223, -0.0028690554, -0.0027024434, -0.011902748, -0.012182655, -0.015714826, -0.0098634185, 0.00593138, 0.018753825, 0.0010146659, 0.013029044, 0.0003521757, -0.017620865, 0.04102649, 0.00552818, 0.024485271, -0.009630162, -0.015608194, 0.0006718621, -0.0008418062, 0.012395918, 0.0057980907, 0.016221326, 0.010616505, 0.004838407, -0.012402583, 0.019900113, -0.0034521967, 0.000247002, -0.03153628, 0.0011038032, -0.020819811, 0.016234655, -0.00330058, -0.0032289368, 0.00078973995, -0.021952773, -0.022459272, 0.03118973, 0.03673457, -0.021472929, 0.0072109587, -0.015075036, 0.004855068, -0.0008151483, 0.0069643734, 0.010023367, -0.010276617, -0.023019087, 0.0068244194, -0.0012520878, -0.0015086699, 0.022046074, -0.034148756, -0.0022192693, 0.002427534, -0.0027124402, 0.0060346797, 0.015461575, 0.0137554705, 0.009230294, -0.009583511, 0.032629255, 0.015994733, -0.019167023, -0.009203636, 0.03393549, -0.017274313, -0.012042701, -0.0009930064, 0.026777849, -0.013582194, -0.0027590916, -0.017594207, -0.026804507, -0.0014236979, -0.022032745, 0.0091236625, -0.0042419364, -0.00858384, -0.0033905501, -0.020739838, 0.016821127, 0.022539245, 0.015381602, 0.015141681, 0.028817179, -0.019726837, -0.0051283115, -0.011489551, -0.013208984, -0.0047017853, -0.0072309524, 0.01767418, 0.0025658219, -0.010323267, 0.012609182, -0.028097415, 0.026871152, -0.010276617, 0.021912785, 0.0022542577, 0.005124979, -0.0019710176, 0.004518512, -0.040360045, 0.010969722, -0.0031539614, -0.020366628, -0.025778178, -0.0110030435, -0.016221326, 0.0036587953, 0.016207997, 0.003007343, -0.0032555948, 0.0044052163, -0.022046074, -0.0008822095, -0.009363583, 0.028230704, -0.024538586, 0.0029840174, 0.0016044717, -0.014181997, 0.031349678, -0.014381931, -0.027750863, 0.02613806, 0.0004136138, -0.005748107, -0.01868718, -0.0010138329, 0.0054348772, 0.010703143, -0.003682121, 0.0030856507, -0.004275259, -0.010403241, 0.021113047, -0.022685863, -0.023032416, 0.031429652, 0.001792743, -0.005644808, -0.011842767, -0.04078657, -0.0026874484, 0.06915057, -0.00056939584, -0.013995391, 0.010703143, -0.013728813, -0.022939114, -0.015261642, -0.022485929, 0.016807798, 0.007964044, 0.0144219175, 0.016821127, 0.0076241563, 0.005461535, -0.013248971, 0.015301628, 0.0085171955, -0.004318578, 0.011136333, -0.0059047225, -0.010249958, -0.018207338, 0.024645219, 0.021752838, 0.0007614159, -0.013648839, 0.01111634, -0.010503208, -0.0038487327, -0.008203966, -0.00397869, 0.0029740208, 0.008530525, 0.005261601, 0.01642126, -0.0038753906, -0.013222313, 0.026537929, 0.024671877, -0.043505676, 0.014195326, 0.024778508, 0.0056914594, -0.025951454, 0.017620865, -0.0021359634, 0.008643821, 0.021299653, 0.0041686273, -0.009017031, 0.04044002, 0.024378639, -0.027777521, -0.014208655, 0.0028623908, 0.042119466, 0.005801423, -0.028124074, -0.03129636, 0.022139376, -0.022179363, -0.04067994, 0.013688826, 0.013328944, 0.0046184794, -0.02828402, -0.0063412455, -0.0046184794, -0.011756129, -0.010383247, -0.0018543894, -0.0018593877, -0.00052024535, 0.004815081, 0.014781799, 0.018007403, 0.01306903, -0.020433271, 0.009043689, 0.033189073, -0.006844413, -0.019766824, -0.018767154, 0.00533491, -0.0024575242, 0.018727167, 0.0058080875, -0.013835444, 0.0040719924, 0.004881726, 0.012029372, 0.005664801, 0.03193615, 0.0058047553, 0.002695779, 0.009290274, 0.02361889, 0.017834127, 0.0049017193, -0.0036388019, 0.010776452, -0.019793482, 0.0067777685, -0.014208655, -0.024911797, 0.002385881, 0.0034988478, 0.020899786, -0.0025858153, -0.011849431, 0.033189073, -0.021312982, 0.024965113, -0.014635181, 0.014048708, -0.0035921505, -0.003347231, 0.030869836, -0.0017161017, -0.0061346465, 0.009203636, -0.025165047, 0.0068510775, 0.021499587, 0.013782129, -0.0024475274, -0.0051149824, -0.024445284, 0.006167969, 0.0068844, -0.00076183246, 0.030150073, -0.0055948244, -0.011162991, -0.02057989, -0.009703471, -0.020646535, 0.008004031, 0.0066378145, -0.019900113, -0.012169327, -0.01439526, 0.0044252095, -0.004018677, 0.014621852, -0.025085073, -0.013715484, -0.017980747, 0.0071043274, 0.011456228, -0.01010334, -0.0035321703, -0.03801415, -0.012036037, -0.0028990454, -0.05419549, -0.024058744, -0.024272008, 0.015221654, 0.027964126, 0.03182952, -0.015354944, 0.004855068, 0.011522872, 0.004771762, 0.0027874154, 0.023405626, 0.0004242353, -0.03132302, 0.007057676, 0.008763781, -0.0027057757, 0.023005757, -0.0071176565, -0.005238275, 0.029110415, -0.010989714, 0.013728813, -0.009630162, -0.029137073, -0.0049317093, -0.0008630492, -0.015248313, 0.0043219104, -0.0055681667, -0.013175662, 0.029723546, 0.025098402, 0.012849103, -0.0009996708, 0.03118973, -0.0021709518, 0.0260181, -0.020526575, 0.028097415, -0.016141351, 0.010509873, -0.022965772, 0.002865723, 0.0020493253, 0.0020509914, -0.0041419696, -0.00039695262, 0.017287642, 0.0038987163, 0.014795128, -0.014661839, -0.008950386, 0.004431874, -0.009383577, 0.0012604183, -0.023019087, 0.0029273694, -0.033135757, 0.009176978, -0.011023037, -0.002102641, 0.02663123, -0.03849399, -0.0044152127, 0.0004527676, -0.0026924468, 0.02828402, 0.017727496, 0.035135098, 0.02728435, -0.005348239, -0.001467017, -0.019766824, 0.014715155, 0.011982721, 0.0045651635, 0.023458943, -0.0010046692, -0.0031373003, -0.0006972704, 0.0019043729, -0.018967088, -0.024311995, 0.0011546199, 0.007977373, -0.004755101, -0.010016702, -0.02780418, -0.004688456, 0.013022379, -0.005484861, 0.0017227661, -0.015394931, -0.028763862, -0.026684547, 0.0030589928, -0.018513903, 0.028363993, 0.0044818576, -0.009270281, 0.038920518, -0.016008062, 0.0093902415, 0.004815081, -0.021059733, 0.01451522, -0.0051583014, 0.023765508, -0.017874114, -0.016821127, -0.012522544, -0.0028390652, 0.0040886537, 0.020259995, -0.031216389, -0.014115352, -0.009176978, 0.010303274, 0.020313311, 0.0064112223, -0.02235264, -0.022872468, 0.0052449396, 0.0005723116, 0.0037321046, 0.016807798, -0.018527232, -0.009303603, 0.0024858483, -0.0012662497, -0.007110992, 0.011976057, -0.007790768, -0.042999174, -0.006727785, -0.011829439, 0.007024354, 0.005278262, -0.017740825, -0.0041519664, 0.0085905045, 0.027750863, -0.038387362, 0.024391968, 0.00087721116, 0.010509873, -0.00038508154, -0.006857742, 0.0183273, -0.0037054466, 0.015461575, 0.0017394272, -0.0017944091, 0.014181997, -0.0052682655, 0.009023695, 0.00719763, -0.013522214, 0.0034422, 0.014941746, -0.0016711164, -0.025298337, -0.017634194, 0.0058714002, -0.005321581, 0.017834127, 0.0110630235, -0.03369557, 0.029190388, -0.008943722, 0.009363583, -0.0034222065, -0.026111402, -0.007037683, -0.006561173, 0.02473852, -0.007084334, -0.010110005, -0.008577175, 0.0030439978, -0.022712521, 0.0054582027, -0.0012620845, -0.0011954397, -0.015741484, 0.0129557345, -0.00042111133, 0.00846388, 0.008930393, 0.016487904, 0.010469886, -0.007917393, -0.011762793, -0.0214596, 0.000917198, 0.021672864, 0.010269952, -0.007737452, -0.010243294, -0.0067244526, -0.015488233, -0.021552904, 0.017127695, 0.011109675, 0.038067464, 0.00871713, -0.0025591573, 0.021312982, -0.006237946, 0.034628596, -0.0045251767, 0.008357248, 0.020686522, 0.0010696478, 0.0076708077, 0.03772091, -0.018700508, -0.0020676525, -0.008923728, -0.023298996, 0.018233996, -0.010256623, 0.0017860786, 0.009796774, -0.00897038, -0.01269582, -0.018527232, 0.009190307, -0.02372552, -0.042119466, 0.008097334, -0.0066778013, -0.021046404, 0.0019593548, 0.011083017, -0.0016028056, 0.012662497, -0.000059095124, 0.0071043274, -0.014675168, 0.024831824, -0.053582355, 0.038387362, 0.0005698124, 0.015954746, 0.021552904, 0.031589597, -0.009230294, -0.0006147976, 0.002625802, -0.011749465, -0.034362018, -0.0067844326, -0.018793812, 0.011442899, -0.008743787, 0.017474247, -0.021619547, 0.01831397, -0.009037024, -0.0057247817, -0.02728435, 0.010363255, 0.034415334, -0.024032086, -0.0020126705, -0.0045518344, -0.019353628, -0.018340627, -0.03129636, -0.0034038792, -0.006321252, -0.0016161345, 0.033642255, -0.000056075285, -0.005005019, 0.004571828, -0.0024075406, -0.00010215386, 0.0098634185, 0.1980148, -0.003825407, -0.025191706, 0.035161756, 0.005358236, 0.025111731, 0.023485601, 0.0023342315, -0.011882754, 0.018287312, -0.0068910643, 0.003912045, 0.009243623, -0.001355387, -0.028603915, -0.012802451, -0.030150073, -0.014795128, -0.028630573, -0.0013487226, 0.002667455, 0.00985009, -0.0033972147, -0.021486258, 0.009503538, -0.017847456, 0.013062365, -0.014341944, 0.005078328, 0.025165047, -0.015594865, -0.025924796, -0.0018177348, 0.010996379, -0.02993681, 0.007324255, 0.014475234, -0.028577257, 0.005494857, 0.00011725306, -0.013315615, 0.015941417, 0.009376912, 0.0025158382, 0.008743787, 0.023832154, -0.008084005, -0.014195326, -0.008823762, 0.0033455652, -0.032362677, -0.021552904, -0.0056081535, 0.023298996, -0.025444955, 0.0097301295, 0.009736794, 0.015274971, -0.0012937407, -0.018087378, -0.0039387033, 0.008637156, -0.011189649, -0.00023846315, -0.011582852, 0.0066411467, -0.018220667, 0.0060846633, 0.0376676, -0.002709108, 0.0072776037, 0.0034188742, -0.010249958, -0.0007747449, -0.00795738, -0.022192692, 0.03910712, 0.032122757, 0.023898797, 0.0076241563, -0.007397564, -0.003655463, 0.011442899, -0.014115352, -0.00505167, -0.031163072, 0.030336678, -0.006857742, -0.022259338, 0.004048667, 0.02072651, 0.0030156737, -0.0042119464, 0.00041861215, -0.005731446, 0.011103011, 0.013822115, 0.021512916, 0.009216965, -0.006537847, -0.027057758, -0.04054665, 0.010403241, -0.0056281467, -0.005701456, -0.002709108, -0.00745088, -0.0024841821, 0.009356919, -0.022659205, 0.004061996, -0.013175662, 0.017074378, -0.006141311, -0.014541878, 0.02993681, -0.00028448965, -0.025271678, 0.011689484, -0.014528549, 0.004398552, -0.017274313, 0.0045751603, 0.012455898, 0.004121976, -0.025458284, -0.006744446, 0.011822774, -0.015035049, -0.03257594, 0.014675168, -0.0039187097, 0.019726837, -0.0047251107, 0.0022825818, 0.011829439, 0.005391558, -0.016781142, -0.0058747325, 0.010309938, -0.013049036, 0.01186276, -0.0011246296, 0.0062112883, 0.0028190718, -0.021739509, 0.009883412, -0.0073175905, -0.012715813, -0.017181009, -0.016607866, -0.042492677, -0.0014478565, -0.01794076, 0.012302616, -0.015194997, -0.04433207, -0.020606548, 0.009696807, 0.010303274, -0.01694109, -0.004018677, 0.019353628, -0.001991011, 0.000058938927, 0.010536531, -0.17274313, 0.010143327, 0.014235313, -0.024152048, 0.025684876, -0.0012504216, 0.036601283, -0.003698782, 0.0007310093, 0.004165295, -0.0029157067, 0.017101036, -0.046891227, -0.017460918, 0.022965772, 0.020233337, -0.024072073, 0.017220996, 0.009370248, 0.0010363255, 0.0194336, -0.019606877, 0.01818068, -0.020819811, 0.007410893, 0.0019326969, 0.017887443, 0.006651143, 0.00067394477, -0.011889419, -0.025058415, -0.008543854, 0.021579562, 0.0047484366, 0.014062037, 0.0075508473, -0.009510202, -0.009143656, 0.0046817916, 0.013982063, -0.0027990784, 0.011782787, 0.014541878, -0.015701497, -0.029350337, 0.021979429, 0.01332228, -0.026244693, -0.0123492675, -0.003895384, 0.0071576433, -0.035454992, -0.00046984528, 0.0033522295, 0.039347045, 0.0005119148, 0.00476843, -0.012995721, 0.0024042083, -0.006931051, -0.014461905, -0.0127558, 0.0034555288, -0.0074842023, -0.030256703, -0.007057676, -0.00807734, 0.007804097, -0.006957709, 0.017181009, -0.034575284, -0.008603834, -0.005008351, -0.015834786, 0.02943031, 0.016861115, -0.0050849924, 0.014235313, 0.0051449724, 0.0025924798, -0.0025741523, 0.04289254, -0.002104307, 0.012969063, -0.008310596, 0.00423194, 0.0074975314, 0.0018810473, -0.014248641, -0.024725191, 0.0151016945, -0.017527562, 0.0018727167, 0.0002830318, 0.015168339, 0.0144219175, -0.004048667, -0.004358565, 0.011836103, -0.010343261, -0.005911387, 0.0022825818, 0.0073175905, 0.00403867, 0.013188991, 0.03334902, 0.006111321, 0.008597169, 0.030123414, -0.015474904, 0.0017877447, -0.024551915, 0.013155668, 0.023525586, -0.0255116, 0.017220996, 0.004358565, -0.00934359, 0.0099967085, 0.011162991, 0.03092315, -0.021046404, -0.015514892, 0.0011946067, -0.01816735, 0.010876419, -0.10124666, -0.03550831, 0.0056348112, 0.013942076, 0.005951374, 0.020419942, -0.006857742, -0.020873128, -0.021259667, 0.0137554705, 0.0057880944, -0.029163731, -0.018767154, -0.021392956, 0.030896494, -0.005494857, -0.0027307675, -0.006801094, -0.014821786, 0.021392956, -0.0018110704, -0.0018843795, -0.012362596, -0.0072176233, -0.017194338, -0.018713837, -0.024272008, 0.03801415, 0.00015880188, 0.0044951867, -0.028630573, -0.0014070367, -0.00916365, -0.026537929, -0.009576847, -0.013995391, -0.0077107945, 0.0050016865, 0.00578143, -0.04467862, 0.008363913, 0.010136662, -0.0006268769, -0.006591163, 0.015341615, -0.027377652, -0.00093136, 0.029243704, -0.020886457, -0.01041657, -0.02424535, 0.005291591, -0.02980352, -0.009190307, 0.019460259, -0.0041286405, 0.004801752, 0.0011787785, -0.001257086, -0.011216307, -0.013395589, 0.00088137644, -0.0051616337, 0.03876057, -0.0033455652, 0.00075850025, -0.006951045, -0.0062112883, 0.018140694, -0.006351242, -0.008263946, 0.018154023, -0.012189319, 0.0075508473, -0.044358727, -0.0040153447, 0.0093302615, -0.010636497, 0.032789204, -0.005264933, -0.014235313, -0.018393943, 0.007297597, -0.016114693, 0.015021721, 0.020033404, 0.0137688, 0.0011046362, 0.010616505, -0.0039453674, 0.012109346, 0.021099718, -0.0072842683, -0.019153694, -0.003768759, 0.039320387, -0.006747778, -0.0016852784, 0.018154023, 0.0010963057, -0.015035049, -0.021033075, -0.04345236, 0.017287642, 0.016341286, -0.008610498, 0.00236922, 0.009290274, 0.028950468, -0.014475234, -0.0035654926, 0.015434918, -0.03372223, 0.004501851, -0.012929076, -0.008483873, -0.0044685286, -0.0102233, 0.01615468, 0.0022792495, 0.010876419, -0.0059647025, 0.01895376, -0.0069976957, -0.0042952523, 0.017207667, -0.00036133936, 0.0085905045, 0.008084005, 0.03129636, -0.016994404, -0.014915089, 0.020100048, -0.012009379, -0.006684466, 0.01306903, 0.00015765642, -0.00530492, 0.0005277429, 0.015421589, 0.015528221, 0.032202728, -0.003485519, -0.0014286962, 0.033908837, 0.001367883, 0.010509873, 0.025271678, -0.020993087, 0.019846799, 0.006897729, -0.010216636, -0.00725761, 0.01818068, -0.028443968, -0.011242964, -0.014435247, -0.013688826, 0.006101324, -0.0022509254, 0.013848773, -0.0019077052, 0.017181009, 0.03422873, 0.005324913, -0.0035188415, 0.014128681, -0.004898387, 0.005038341, 0.0012320944, -0.005561502, -0.017847456, 0.0008538855, -0.0047884234, 0.011849431, 0.015421589, -0.013942076, 0.0029790192, -0.013702155, 0.0001199605, -0.024431955, 0.019926772, 0.022179363, -0.016487904, -0.03964028, 0.0050849924, 0.017487574, 0.022792496, 0.0012504216, 0.004048667, -0.00997005, 0.0076041627, -0.014328616, -0.020259995, 0.0005598157, -0.010469886, 0.0016852784, 0.01716768, -0.008990373, -0.001987679, 0.026417969, 0.023792166, 0.0046917885, -0.0071909656, -0.00032051947, -0.023259008, -0.009170313, 0.02071318, -0.03156294, -0.030869836, -0.006324584, 0.013795458, -0.00047151142, 0.016874444, 0.00947688, 0.00985009, -0.029883493, 0.024205362, -0.013522214, -0.015075036, -0.030603256, 0.029270362, 0.010503208, 0.021539574, 0.01743426, -0.023898797, 0.022019416, -0.0068777353, 0.027857494, -0.021259667, 0.0025758184, 0.006197959, 0.006447877, -0.00025200035, -0.004941706, -0.021246338, -0.005504854, -0.008390571, -0.0097301295, 0.027244363, -0.04446536, 0.05216949, 0.010243294, -0.016008062, 0.0122493, -0.0199401, 0.009077012, 0.019753495, 0.006431216, -0.037960835, -0.027377652, 0.016381273, -0.0038620618, 0.022512587, -0.010996379, -0.0015211658, -0.0102233, 0.007071005, 0.008230623, -0.009490209, -0.010083347, 0.024431955, 0.002427534, 0.02828402, 0.0035721571, -0.022192692, -0.011882754, 0.010056688, 0.0011904413, -0.01426197, -0.017500903, -0.00010985966, 0.005591492, -0.0077707744, -0.012049366, 0.011869425, 0.00858384, -0.024698535, -0.030283362, 0.020140035, 0.011949399, -0.013968734, 0.042732596, -0.011649498, -0.011982721, -0.016967745, -0.0060913274, -0.007130985, -0.013109017, -0.009710136 ],
          \'index\' => \'vector_index\',
          \'path\' => \'plot_embedding\',
          \'numCandidates\' => 150,
          \'limit\' => 10
        }
      },
      {
        \'$project\' => {
          \'_id\' => 0,
          \'plot\' => 1,
          \'title\' => 1,
          \'score\' => { \'$meta\' => \'vectorSearchScore\' }
        }
      }
    ]

    # Run the pipeline
    results = collection.aggregate(pipeline)

    # Print results
    results.each do |document|
      puts JSON(document)
    end

  rescue Mongo::Error::NoServerAvailable => e
    puts "Failed to connect to MongoDB: #{e.message}"

  rescue Mongo::Error::OperationFailure => e
    puts "Failed to run aggregation: #{e.message}"

  rescue Mongo::Error => e
    puts "A MongoDB error occurred: #{e.message}"

  rescue StandardError => e
    puts "A general error occurred: #{e.message}"

  ensure
    client&.close
    puts "MongoDB client closed."
  end

  ```

This query uses the `$vectorSearch` stage to:

- Compare vector embeddings of the search term against vector embeddings of movie plots in the `plot_embedding` field of the `sample_mflix.embedded_movies` collection.

- Consider up to the 150 most similar movie plots and return the top 10 results.

It uses the `$project` stage to:

- Only include the movie `plot` and `title` fields in the results.

- Add a `score` field to show the relevance of each result to the search term.

To learn more about this pipeline stage, see Run Vector Search Queries.

### Specify the `<connection-string>`.

Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

<Tabs>

<Tab name="Atlas Cluster">

Your connection string should use the following format:

```
mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
```

Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

</Tab>

<Tab name="Local Deployment">

Your connection string should use the following format:

```
mongodb://localhost:<port-number>/?directConnection=true
```

</Tab>

</Tabs>

### Run your query.

Run the following command to query your collection:

```bash
bundle exec ruby atlas_vector_search_quick_start.rb
```

```js
\'{"plot":"A reporter, learning of time travelers visiting 20th century disasters, tries to change the history they know by averting upcoming disasters.","title":"Thrill Seekers","score":0.7892671227455139}\'
\'{"plot":"At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.","title":"About Time","score":0.7843604683876038}\'
\'{"plot":"Hoping to alter the events of the past, a 19th century inventor instead travels 800,000 years into the future, where he finds humankind divided into two warring races.","title":"The Time Machine","score":0.7801066637039185}\'
`{"plot":"After using his mother\'s newly built time machine, Dolf gets stuck involuntary in the year 1212. He ends up in a children\'s crusade where he confronts his new friends with modern techniques...","title":"Crusade in Jeans","score":0.7789170742034912}`
\'{"plot":"An officer for a security agency that regulates time travel, must fend for his life against a shady politician who has a tie to his past.","title":"Timecop","score":0.7771612405776978}\'
\'{"plot":"A time-travel experiment in which a robot probe is sent from the year 2073 to the year 1973 goes terribly wrong thrusting one of the project scientists, a man named Nicholas Sinclair into a...","title":"A.P.E.X.","score":0.7730885744094849}\'
`{"plot":"Agent J travels in time to M.I.B.\'s early days in 1969 to stop an alien from assassinating his friend Agent K and changing history.","title":"Men in Black 3","score":0.7712380886077881}`
\'{"plot":"Bound by a shared destiny, a teen bursting with scientific curiosity and a former boy-genius inventor embark on a mission to unearth the secrets of a place somewhere in time and space that exists in their collective memory.","title":"Tomorrowland","score":0.7669923901557922}\'
\'{"plot":"With the help of his uncle, a man travels to the future to try and bring his girlfriend back to life.","title":"Love Story 2050","score":0.7649372816085815}\'
\'{"plot":"A dimension-traveling wizard gets stuck in the 21st century because cell-phone radiation interferes with his magic. With his home world on the brink of war, he seeks help from a jaded ...","title":"The Portal","score":0.7640786170959473}\'

```

</Tab>

<Tab name="Rust">

### Construct your vector search query.

This query searches for documents that include text in the `plot` field that is semantically related to the term "time travel".

- Create a file named `basic_query.rs`.

- Copy and paste the following sample query into the `basic_query.rs` file:

  <Tabs>

  <Tab name="">

  ```rust
  #![recursion_limit = "2560"]
  use mongodb::{
      bson::{Document, doc},
      Client
  };
  use futures::TryStreamExt;

  #[tokio::main]
  async fn basic_query() -> mongodb::error::Result<()> {
      // Replace the placeholder with your Atlas connection string
      let client = Client::with_uri_str("<connection-string>").await?;

      let pipeline  = vec! [
          doc! {
              "$vectorSearch": doc! {
              "queryVector": [ -0.0016261312, -0.028070757, -0.011342932, -0.012775794, -0.0027440966, 0.008683807, -0.02575152, -0.02020668, -0.010283281, -0.0041719596, 0.021392956, 0.028657231, -0.006634482, 0.007490867, 0.018593878, 0.0038187427, 0.029590257, -0.01451522, 0.016061379, 0.00008528442, -0.008943722, 0.01627464, 0.024311995, -0.025911469, 0.00022596726, -0.008863748, 0.008823762, -0.034921836, 0.007910728, -0.01515501, 0.035801545, -0.0035688248, -0.020299982, -0.03145631, -0.032256044, -0.028763862, -0.0071576433, -0.012769129, 0.012322609, -0.006621153, 0.010583182, 0.024085402, -0.001623632, 0.007864078, -0.021406285, 0.002554159, 0.012229307, -0.011762793, 0.0051682983, 0.0048484034, 0.018087378, 0.024325324, -0.037694257, -0.026537929, -0.008803768, -0.017767483, -0.012642504, -0.0062712682, 0.0009771782, -0.010409906, 0.017754154, -0.004671795, -0.030469967, 0.008477209, -0.005218282, -0.0058480743, -0.020153364, -0.0032805866, 0.004248601, 0.0051449724, 0.006791097, 0.007650814, 0.003458861, -0.0031223053, -0.01932697, -0.033615597, 0.00745088, 0.006321252, -0.0038154104, 0.014555207, 0.027697546, -0.02828402, 0.0066711367, 0.0077107945, 0.01794076, 0.011349596, -0.0052715978, 0.014755142, -0.019753495, -0.011156326, 0.011202978, 0.022126047, 0.00846388, 0.030549942, -0.0041386373, 0.018847128, -0.00033655585, 0.024925126, -0.003555496, -0.019300312, 0.010749794, 0.0075308536, -0.018287312, -0.016567878, -0.012869096, -0.015528221, 0.0078107617, -0.011156326, 0.013522214, -0.020646535, -0.01211601, 0.055928253, 0.011596181, -0.017247654, 0.0005939711, -0.026977783, -0.003942035, -0.009583511, -0.0055248477, -0.028737204, 0.023179034, 0.003995351, 0.0219661, -0.008470545, 0.023392297, 0.010469886, -0.015874773, 0.007890735, -0.009690142, -0.00024970944, 0.012775794, 0.0114762215, 0.013422247, 0.010429899, -0.03686786, -0.006717788, -0.027484283, 0.011556195, -0.036068123, -0.013915418, -0.0016327957, 0.0151016945, -0.020473259, 0.004671795, -0.012555866, 0.0209531, 0.01982014, 0.024485271, 0.0105431955, -0.005178295, 0.033162415, -0.013795458, 0.007150979, 0.010243294, 0.005644808, 0.017260984, -0.0045618312, 0.0024725192, 0.004305249, -0.008197301, 0.0014203656, 0.0018460588, 0.005015015, -0.011142998, 0.01439526, 0.022965772, 0.02552493, 0.007757446, -0.0019726837, 0.009503538, -0.032042783, 0.008403899, -0.04609149, 0.013808787, 0.011749465, 0.036388017, 0.016314628, 0.021939443, -0.0250051, -0.017354285, -0.012962398, 0.00006107364, 0.019113706, 0.03081652, -0.018114036, -0.0084572155, 0.009643491, -0.0034721901, 0.0072642746, -0.0090636825, 0.01642126, 0.013428912, 0.027724205, 0.0071243206, -0.6858542, -0.031029783, -0.014595194, -0.011449563, 0.017514233, 0.01743426, 0.009950057, 0.0029706885, -0.015714826, -0.001806072, 0.011856096, 0.026444625, -0.0010663156, -0.006474535, 0.0016161345, -0.020313311, 0.0148351155, -0.0018393943, 0.0057347785, 0.018300641, -0.018647194, 0.03345565, -0.008070676, 0.0071443142, 0.014301958, 0.0044818576, 0.003838736, -0.007350913, -0.024525259, -0.001142124, -0.018620536, 0.017247654, 0.007037683, 0.010236629, 0.06046009, 0.0138887605, -0.012122675, 0.037694257, 0.0055081863, 0.042492677, 0.00021784494, -0.011656162, 0.010276617, 0.022325981, 0.005984696, -0.009496873, 0.013382261, -0.0010563189, 0.0026507939, -0.041639622, 0.008637156, 0.026471283, -0.008403899, 0.024858482, -0.00066686375, -0.0016252982, 0.027590916, 0.0051449724, 0.0058647357, -0.008743787, -0.014968405, 0.027724205, -0.011596181, 0.0047650975, -0.015381602, 0.0043718936, 0.002159289, 0.035908177, -0.008243952, -0.030443309, 0.027564257, 0.042625964, -0.0033688906, 0.01843393, 0.019087048, 0.024578573, 0.03268257, -0.015608194, -0.014128681, -0.0033538956, -0.0028757197, -0.004121976, -0.032389335, 0.0034322033, 0.058807302, 0.010943064, -0.030523283, 0.008903735, 0.017500903, 0.00871713, -0.0029406983, 0.013995391, -0.03132302, -0.019660193, -0.00770413, -0.0038853872, 0.0015894766, -0.0015294964, -0.006251275, -0.021099718, -0.010256623, -0.008863748, 0.028550599, 0.02020668, -0.0012962399, -0.003415542, -0.0022509254, 0.0119360695, 0.027590916, -0.046971202, -0.0015194997, -0.022405956, 0.0016677842, -0.00018535563, -0.015421589, -0.031802863, 0.03814744, 0.0065411795, 0.016567878, -0.015621523, 0.022899127, -0.011076353, 0.02841731, -0.002679118, -0.002342562, 0.015341615, 0.01804739, -0.020566562, -0.012989056, -0.002990682, 0.01643459, 0.00042527664, 0.008243952, -0.013715484, -0.004835075, -0.009803439, 0.03129636, -0.021432944, 0.0012087687, -0.015741484, -0.0052016205, 0.00080890034, -0.01755422, 0.004811749, -0.017967418, -0.026684547, -0.014128681, 0.0041386373, -0.013742141, -0.010056688, -0.013268964, -0.0110630235, -0.028337335, 0.015981404, -0.00997005, -0.02424535, -0.013968734, -0.028310679, -0.027750863, -0.020699851, 0.02235264, 0.001057985, 0.00081639783, -0.0099367285, 0.013522214, -0.012016043, -0.00086471526, 0.013568865, 0.0019376953, -0.019020405, 0.017460918, -0.023045745, 0.008503866, 0.0064678704, -0.011509543, 0.018727167, -0.003372223, -0.0028690554, -0.0027024434, -0.011902748, -0.012182655, -0.015714826, -0.0098634185, 0.00593138, 0.018753825, 0.0010146659, 0.013029044, 0.0003521757, -0.017620865, 0.04102649, 0.00552818, 0.024485271, -0.009630162, -0.015608194, 0.0006718621, -0.0008418062, 0.012395918, 0.0057980907, 0.016221326, 0.010616505, 0.004838407, -0.012402583, 0.019900113, -0.0034521967, 0.000247002, -0.03153628, 0.0011038032, -0.020819811, 0.016234655, -0.00330058, -0.0032289368, 0.00078973995, -0.021952773, -0.022459272, 0.03118973, 0.03673457, -0.021472929, 0.0072109587, -0.015075036, 0.004855068, -0.0008151483, 0.0069643734, 0.010023367, -0.010276617, -0.023019087, 0.0068244194, -0.0012520878, -0.0015086699, 0.022046074, -0.034148756, -0.0022192693, 0.002427534, -0.0027124402, 0.0060346797, 0.015461575, 0.0137554705, 0.009230294, -0.009583511, 0.032629255, 0.015994733, -0.019167023, -0.009203636, 0.03393549, -0.017274313, -0.012042701, -0.0009930064, 0.026777849, -0.013582194, -0.0027590916, -0.017594207, -0.026804507, -0.0014236979, -0.022032745, 0.0091236625, -0.0042419364, -0.00858384, -0.0033905501, -0.020739838, 0.016821127, 0.022539245, 0.015381602, 0.015141681, 0.028817179, -0.019726837, -0.0051283115, -0.011489551, -0.013208984, -0.0047017853, -0.0072309524, 0.01767418, 0.0025658219, -0.010323267, 0.012609182, -0.028097415, 0.026871152, -0.010276617, 0.021912785, 0.0022542577, 0.005124979, -0.0019710176, 0.004518512, -0.040360045, 0.010969722, -0.0031539614, -0.020366628, -0.025778178, -0.0110030435, -0.016221326, 0.0036587953, 0.016207997, 0.003007343, -0.0032555948, 0.0044052163, -0.022046074, -0.0008822095, -0.009363583, 0.028230704, -0.024538586, 0.0029840174, 0.0016044717, -0.014181997, 0.031349678, -0.014381931, -0.027750863, 0.02613806, 0.0004136138, -0.005748107, -0.01868718, -0.0010138329, 0.0054348772, 0.010703143, -0.003682121, 0.0030856507, -0.004275259, -0.010403241, 0.021113047, -0.022685863, -0.023032416, 0.031429652, 0.001792743, -0.005644808, -0.011842767, -0.04078657, -0.0026874484, 0.06915057, -0.00056939584, -0.013995391, 0.010703143, -0.013728813, -0.022939114, -0.015261642, -0.022485929, 0.016807798, 0.007964044, 0.0144219175, 0.016821127, 0.0076241563, 0.005461535, -0.013248971, 0.015301628, 0.0085171955, -0.004318578, 0.011136333, -0.0059047225, -0.010249958, -0.018207338, 0.024645219, 0.021752838, 0.0007614159, -0.013648839, 0.01111634, -0.010503208, -0.0038487327, -0.008203966, -0.00397869, 0.0029740208, 0.008530525, 0.005261601, 0.01642126, -0.0038753906, -0.013222313, 0.026537929, 0.024671877, -0.043505676, 0.014195326, 0.024778508, 0.0056914594, -0.025951454, 0.017620865, -0.0021359634, 0.008643821, 0.021299653, 0.0041686273, -0.009017031, 0.04044002, 0.024378639, -0.027777521, -0.014208655, 0.0028623908, 0.042119466, 0.005801423, -0.028124074, -0.03129636, 0.022139376, -0.022179363, -0.04067994, 0.013688826, 0.013328944, 0.0046184794, -0.02828402, -0.0063412455, -0.0046184794, -0.011756129, -0.010383247, -0.0018543894, -0.0018593877, -0.00052024535, 0.004815081, 0.014781799, 0.018007403, 0.01306903, -0.020433271, 0.009043689, 0.033189073, -0.006844413, -0.019766824, -0.018767154, 0.00533491, -0.0024575242, 0.018727167, 0.0058080875, -0.013835444, 0.0040719924, 0.004881726, 0.012029372, 0.005664801, 0.03193615, 0.0058047553, 0.002695779, 0.009290274, 0.02361889, 0.017834127, 0.0049017193, -0.0036388019, 0.010776452, -0.019793482, 0.0067777685, -0.014208655, -0.024911797, 0.002385881, 0.0034988478, 0.020899786, -0.0025858153, -0.011849431, 0.033189073, -0.021312982, 0.024965113, -0.014635181, 0.014048708, -0.0035921505, -0.003347231, 0.030869836, -0.0017161017, -0.0061346465, 0.009203636, -0.025165047, 0.0068510775, 0.021499587, 0.013782129, -0.0024475274, -0.0051149824, -0.024445284, 0.006167969, 0.0068844, -0.00076183246, 0.030150073, -0.0055948244, -0.011162991, -0.02057989, -0.009703471, -0.020646535, 0.008004031, 0.0066378145, -0.019900113, -0.012169327, -0.01439526, 0.0044252095, -0.004018677, 0.014621852, -0.025085073, -0.013715484, -0.017980747, 0.0071043274, 0.011456228, -0.01010334, -0.0035321703, -0.03801415, -0.012036037, -0.0028990454, -0.05419549, -0.024058744, -0.024272008, 0.015221654, 0.027964126, 0.03182952, -0.015354944, 0.004855068, 0.011522872, 0.004771762, 0.0027874154, 0.023405626, 0.0004242353, -0.03132302, 0.007057676, 0.008763781, -0.0027057757, 0.023005757, -0.0071176565, -0.005238275, 0.029110415, -0.010989714, 0.013728813, -0.009630162, -0.029137073, -0.0049317093, -0.0008630492, -0.015248313, 0.0043219104, -0.0055681667, -0.013175662, 0.029723546, 0.025098402, 0.012849103, -0.0009996708, 0.03118973, -0.0021709518, 0.0260181, -0.020526575, 0.028097415, -0.016141351, 0.010509873, -0.022965772, 0.002865723, 0.0020493253, 0.0020509914, -0.0041419696, -0.00039695262, 0.017287642, 0.0038987163, 0.014795128, -0.014661839, -0.008950386, 0.004431874, -0.009383577, 0.0012604183, -0.023019087, 0.0029273694, -0.033135757, 0.009176978, -0.011023037, -0.002102641, 0.02663123, -0.03849399, -0.0044152127, 0.0004527676, -0.0026924468, 0.02828402, 0.017727496, 0.035135098, 0.02728435, -0.005348239, -0.001467017, -0.019766824, 0.014715155, 0.011982721, 0.0045651635, 0.023458943, -0.0010046692, -0.0031373003, -0.0006972704, 0.0019043729, -0.018967088, -0.024311995, 0.0011546199, 0.007977373, -0.004755101, -0.010016702, -0.02780418, -0.004688456, 0.013022379, -0.005484861, 0.0017227661, -0.015394931, -0.028763862, -0.026684547, 0.0030589928, -0.018513903, 0.028363993, 0.0044818576, -0.009270281, 0.038920518, -0.016008062, 0.0093902415, 0.004815081, -0.021059733, 0.01451522, -0.0051583014, 0.023765508, -0.017874114, -0.016821127, -0.012522544, -0.0028390652, 0.0040886537, 0.020259995, -0.031216389, -0.014115352, -0.009176978, 0.010303274, 0.020313311, 0.0064112223, -0.02235264, -0.022872468, 0.0052449396, 0.0005723116, 0.0037321046, 0.016807798, -0.018527232, -0.009303603, 0.0024858483, -0.0012662497, -0.007110992, 0.011976057, -0.007790768, -0.042999174, -0.006727785, -0.011829439, 0.007024354, 0.005278262, -0.017740825, -0.0041519664, 0.0085905045, 0.027750863, -0.038387362, 0.024391968, 0.00087721116, 0.010509873, -0.00038508154, -0.006857742, 0.0183273, -0.0037054466, 0.015461575, 0.0017394272, -0.0017944091, 0.014181997, -0.0052682655, 0.009023695, 0.00719763, -0.013522214, 0.0034422, 0.014941746, -0.0016711164, -0.025298337, -0.017634194, 0.0058714002, -0.005321581, 0.017834127, 0.0110630235, -0.03369557, 0.029190388, -0.008943722, 0.009363583, -0.0034222065, -0.026111402, -0.007037683, -0.006561173, 0.02473852, -0.007084334, -0.010110005, -0.008577175, 0.0030439978, -0.022712521, 0.0054582027, -0.0012620845, -0.0011954397, -0.015741484, 0.0129557345, -0.00042111133, 0.00846388, 0.008930393, 0.016487904, 0.010469886, -0.007917393, -0.011762793, -0.0214596, 0.000917198, 0.021672864, 0.010269952, -0.007737452, -0.010243294, -0.0067244526, -0.015488233, -0.021552904, 0.017127695, 0.011109675, 0.038067464, 0.00871713, -0.0025591573, 0.021312982, -0.006237946, 0.034628596, -0.0045251767, 0.008357248, 0.020686522, 0.0010696478, 0.0076708077, 0.03772091, -0.018700508, -0.0020676525, -0.008923728, -0.023298996, 0.018233996, -0.010256623, 0.0017860786, 0.009796774, -0.00897038, -0.01269582, -0.018527232, 0.009190307, -0.02372552, -0.042119466, 0.008097334, -0.0066778013, -0.021046404, 0.0019593548, 0.011083017, -0.0016028056, 0.012662497, -0.000059095124, 0.0071043274, -0.014675168, 0.024831824, -0.053582355, 0.038387362, 0.0005698124, 0.015954746, 0.021552904, 0.031589597, -0.009230294, -0.0006147976, 0.002625802, -0.011749465, -0.034362018, -0.0067844326, -0.018793812, 0.011442899, -0.008743787, 0.017474247, -0.021619547, 0.01831397, -0.009037024, -0.0057247817, -0.02728435, 0.010363255, 0.034415334, -0.024032086, -0.0020126705, -0.0045518344, -0.019353628, -0.018340627, -0.03129636, -0.0034038792, -0.006321252, -0.0016161345, 0.033642255, -0.000056075285, -0.005005019, 0.004571828, -0.0024075406, -0.00010215386, 0.0098634185, 0.1980148, -0.003825407, -0.025191706, 0.035161756, 0.005358236, 0.025111731, 0.023485601, 0.0023342315, -0.011882754, 0.018287312, -0.0068910643, 0.003912045, 0.009243623, -0.001355387, -0.028603915, -0.012802451, -0.030150073, -0.014795128, -0.028630573, -0.0013487226, 0.002667455, 0.00985009, -0.0033972147, -0.021486258, 0.009503538, -0.017847456, 0.013062365, -0.014341944, 0.005078328, 0.025165047, -0.015594865, -0.025924796, -0.0018177348, 0.010996379, -0.02993681, 0.007324255, 0.014475234, -0.028577257, 0.005494857, 0.00011725306, -0.013315615, 0.015941417, 0.009376912, 0.0025158382, 0.008743787, 0.023832154, -0.008084005, -0.014195326, -0.008823762, 0.0033455652, -0.032362677, -0.021552904, -0.0056081535, 0.023298996, -0.025444955, 0.0097301295, 0.009736794, 0.015274971, -0.0012937407, -0.018087378, -0.0039387033, 0.008637156, -0.011189649, -0.00023846315, -0.011582852, 0.0066411467, -0.018220667, 0.0060846633, 0.0376676, -0.002709108, 0.0072776037, 0.0034188742, -0.010249958, -0.0007747449, -0.00795738, -0.022192692, 0.03910712, 0.032122757, 0.023898797, 0.0076241563, -0.007397564, -0.003655463, 0.011442899, -0.014115352, -0.00505167, -0.031163072, 0.030336678, -0.006857742, -0.022259338, 0.004048667, 0.02072651, 0.0030156737, -0.0042119464, 0.00041861215, -0.005731446, 0.011103011, 0.013822115, 0.021512916, 0.009216965, -0.006537847, -0.027057758, -0.04054665, 0.010403241, -0.0056281467, -0.005701456, -0.002709108, -0.00745088, -0.0024841821, 0.009356919, -0.022659205, 0.004061996, -0.013175662, 0.017074378, -0.006141311, -0.014541878, 0.02993681, -0.00028448965, -0.025271678, 0.011689484, -0.014528549, 0.004398552, -0.017274313, 0.0045751603, 0.012455898, 0.004121976, -0.025458284, -0.006744446, 0.011822774, -0.015035049, -0.03257594, 0.014675168, -0.0039187097, 0.019726837, -0.0047251107, 0.0022825818, 0.011829439, 0.005391558, -0.016781142, -0.0058747325, 0.010309938, -0.013049036, 0.01186276, -0.0011246296, 0.0062112883, 0.0028190718, -0.021739509, 0.009883412, -0.0073175905, -0.012715813, -0.017181009, -0.016607866, -0.042492677, -0.0014478565, -0.01794076, 0.012302616, -0.015194997, -0.04433207, -0.020606548, 0.009696807, 0.010303274, -0.01694109, -0.004018677, 0.019353628, -0.001991011, 0.000058938927, 0.010536531, -0.17274313, 0.010143327, 0.014235313, -0.024152048, 0.025684876, -0.0012504216, 0.036601283, -0.003698782, 0.0007310093, 0.004165295, -0.0029157067, 0.017101036, -0.046891227, -0.017460918, 0.022965772, 0.020233337, -0.024072073, 0.017220996, 0.009370248, 0.0010363255, 0.0194336, -0.019606877, 0.01818068, -0.020819811, 0.007410893, 0.0019326969, 0.017887443, 0.006651143, 0.00067394477, -0.011889419, -0.025058415, -0.008543854, 0.021579562, 0.0047484366, 0.014062037, 0.0075508473, -0.009510202, -0.009143656, 0.0046817916, 0.013982063, -0.0027990784, 0.011782787, 0.014541878, -0.015701497, -0.029350337, 0.021979429, 0.01332228, -0.026244693, -0.0123492675, -0.003895384, 0.0071576433, -0.035454992, -0.00046984528, 0.0033522295, 0.039347045, 0.0005119148, 0.00476843, -0.012995721, 0.0024042083, -0.006931051, -0.014461905, -0.0127558, 0.0034555288, -0.0074842023, -0.030256703, -0.007057676, -0.00807734, 0.007804097, -0.006957709, 0.017181009, -0.034575284, -0.008603834, -0.005008351, -0.015834786, 0.02943031, 0.016861115, -0.0050849924, 0.014235313, 0.0051449724, 0.0025924798, -0.0025741523, 0.04289254, -0.002104307, 0.012969063, -0.008310596, 0.00423194, 0.0074975314, 0.0018810473, -0.014248641, -0.024725191, 0.0151016945, -0.017527562, 0.0018727167, 0.0002830318, 0.015168339, 0.0144219175, -0.004048667, -0.004358565, 0.011836103, -0.010343261, -0.005911387, 0.0022825818, 0.0073175905, 0.00403867, 0.013188991, 0.03334902, 0.006111321, 0.008597169, 0.030123414, -0.015474904, 0.0017877447, -0.024551915, 0.013155668, 0.023525586, -0.0255116, 0.017220996, 0.004358565, -0.00934359, 0.0099967085, 0.011162991, 0.03092315, -0.021046404, -0.015514892, 0.0011946067, -0.01816735, 0.010876419, -0.10124666, -0.03550831, 0.0056348112, 0.013942076, 0.005951374, 0.020419942, -0.006857742, -0.020873128, -0.021259667, 0.0137554705, 0.0057880944, -0.029163731, -0.018767154, -0.021392956, 0.030896494, -0.005494857, -0.0027307675, -0.006801094, -0.014821786, 0.021392956, -0.0018110704, -0.0018843795, -0.012362596, -0.0072176233, -0.017194338, -0.018713837, -0.024272008, 0.03801415, 0.00015880188, 0.0044951867, -0.028630573, -0.0014070367, -0.00916365, -0.026537929, -0.009576847, -0.013995391, -0.0077107945, 0.0050016865, 0.00578143, -0.04467862, 0.008363913, 0.010136662, -0.0006268769, -0.006591163, 0.015341615, -0.027377652, -0.00093136, 0.029243704, -0.020886457, -0.01041657, -0.02424535, 0.005291591, -0.02980352, -0.009190307, 0.019460259, -0.0041286405, 0.004801752, 0.0011787785, -0.001257086, -0.011216307, -0.013395589, 0.00088137644, -0.0051616337, 0.03876057, -0.0033455652, 0.00075850025, -0.006951045, -0.0062112883, 0.018140694, -0.006351242, -0.008263946, 0.018154023, -0.012189319, 0.0075508473, -0.044358727, -0.0040153447, 0.0093302615, -0.010636497, 0.032789204, -0.005264933, -0.014235313, -0.018393943, 0.007297597, -0.016114693, 0.015021721, 0.020033404, 0.0137688, 0.0011046362, 0.010616505, -0.0039453674, 0.012109346, 0.021099718, -0.0072842683, -0.019153694, -0.003768759, 0.039320387, -0.006747778, -0.0016852784, 0.018154023, 0.0010963057, -0.015035049, -0.021033075, -0.04345236, 0.017287642, 0.016341286, -0.008610498, 0.00236922, 0.009290274, 0.028950468, -0.014475234, -0.0035654926, 0.015434918, -0.03372223, 0.004501851, -0.012929076, -0.008483873, -0.0044685286, -0.0102233, 0.01615468, 0.0022792495, 0.010876419, -0.0059647025, 0.01895376, -0.0069976957, -0.0042952523, 0.017207667, -0.00036133936, 0.0085905045, 0.008084005, 0.03129636, -0.016994404, -0.014915089, 0.020100048, -0.012009379, -0.006684466, 0.01306903, 0.00015765642, -0.00530492, 0.0005277429, 0.015421589, 0.015528221, 0.032202728, -0.003485519, -0.0014286962, 0.033908837, 0.001367883, 0.010509873, 0.025271678, -0.020993087, 0.019846799, 0.006897729, -0.010216636, -0.00725761, 0.01818068, -0.028443968, -0.011242964, -0.014435247, -0.013688826, 0.006101324, -0.0022509254, 0.013848773, -0.0019077052, 0.017181009, 0.03422873, 0.005324913, -0.0035188415, 0.014128681, -0.004898387, 0.005038341, 0.0012320944, -0.005561502, -0.017847456, 0.0008538855, -0.0047884234, 0.011849431, 0.015421589, -0.013942076, 0.0029790192, -0.013702155, 0.0001199605, -0.024431955, 0.019926772, 0.022179363, -0.016487904, -0.03964028, 0.0050849924, 0.017487574, 0.022792496, 0.0012504216, 0.004048667, -0.00997005, 0.0076041627, -0.014328616, -0.020259995, 0.0005598157, -0.010469886, 0.0016852784, 0.01716768, -0.008990373, -0.001987679, 0.026417969, 0.023792166, 0.0046917885, -0.0071909656, -0.00032051947, -0.023259008, -0.009170313, 0.02071318, -0.03156294, -0.030869836, -0.006324584, 0.013795458, -0.00047151142, 0.016874444, 0.00947688, 0.00985009, -0.029883493, 0.024205362, -0.013522214, -0.015075036, -0.030603256, 0.029270362, 0.010503208, 0.021539574, 0.01743426, -0.023898797, 0.022019416, -0.0068777353, 0.027857494, -0.021259667, 0.0025758184, 0.006197959, 0.006447877, -0.00025200035, -0.004941706, -0.021246338, -0.005504854, -0.008390571, -0.0097301295, 0.027244363, -0.04446536, 0.05216949, 0.010243294, -0.016008062, 0.0122493, -0.0199401, 0.009077012, 0.019753495, 0.006431216, -0.037960835, -0.027377652, 0.016381273, -0.0038620618, 0.022512587, -0.010996379, -0.0015211658, -0.0102233, 0.007071005, 0.008230623, -0.009490209, -0.010083347, 0.024431955, 0.002427534, 0.02828402, 0.0035721571, -0.022192692, -0.011882754, 0.010056688, 0.0011904413, -0.01426197, -0.017500903, -0.00010985966, 0.005591492, -0.0077707744, -0.012049366, 0.011869425, 0.00858384, -0.024698535, -0.030283362, 0.020140035, 0.011949399, -0.013968734, 0.042732596, -0.011649498, -0.011982721, -0.016967745, -0.0060913274, -0.007130985, -0.013109017, -0.009710136
              ],
              "path": "plot_embedding",
              "numCandidates": 150,
              "index": "vector_index",
              "limit": 10
          }
          },
          doc! {
              "$project": doc! {
                  "_id": 0,
                  "plot": 1,
                  "title": 1,
                  "score": doc! { "$meta": "vectorSearchScore"
                  }
              }
          }
      ];
      let coll = client.database("sample_mflix").collection::<Document>("embedded_movies");
      let mut results = coll.aggregate(pipeline).await?;
      while let Some(result) = results.try_next().await? {
          println!("{}", result);
      }
      Ok(())
  }
  ```

  </Tab>

  <Tab name="">

  ```rust
  #![recursion_limit = "2560"]
  use mongodb::{
      bson::{Document, doc},
      sync::Client
  };

  fn basic_query() -> mongodb::error::Result<()> {
      // Replace the placeholder with your Atlas connection string
      let client = Client::with_uri_str("<connection-string>")?;

      let pipeline  = vec! [
          doc! {
              "$vectorSearch": doc! {
              "queryVector": [ -0.0016261312, -0.028070757, -0.011342932, -0.012775794, -0.0027440966, 0.008683807, -0.02575152, -0.02020668, -0.010283281, -0.0041719596, 0.021392956, 0.028657231, -0.006634482, 0.007490867, 0.018593878, 0.0038187427, 0.029590257, -0.01451522, 0.016061379, 0.00008528442, -0.008943722, 0.01627464, 0.024311995, -0.025911469, 0.00022596726, -0.008863748, 0.008823762, -0.034921836, 0.007910728, -0.01515501, 0.035801545, -0.0035688248, -0.020299982, -0.03145631, -0.032256044, -0.028763862, -0.0071576433, -0.012769129, 0.012322609, -0.006621153, 0.010583182, 0.024085402, -0.001623632, 0.007864078, -0.021406285, 0.002554159, 0.012229307, -0.011762793, 0.0051682983, 0.0048484034, 0.018087378, 0.024325324, -0.037694257, -0.026537929, -0.008803768, -0.017767483, -0.012642504, -0.0062712682, 0.0009771782, -0.010409906, 0.017754154, -0.004671795, -0.030469967, 0.008477209, -0.005218282, -0.0058480743, -0.020153364, -0.0032805866, 0.004248601, 0.0051449724, 0.006791097, 0.007650814, 0.003458861, -0.0031223053, -0.01932697, -0.033615597, 0.00745088, 0.006321252, -0.0038154104, 0.014555207, 0.027697546, -0.02828402, 0.0066711367, 0.0077107945, 0.01794076, 0.011349596, -0.0052715978, 0.014755142, -0.019753495, -0.011156326, 0.011202978, 0.022126047, 0.00846388, 0.030549942, -0.0041386373, 0.018847128, -0.00033655585, 0.024925126, -0.003555496, -0.019300312, 0.010749794, 0.0075308536, -0.018287312, -0.016567878, -0.012869096, -0.015528221, 0.0078107617, -0.011156326, 0.013522214, -0.020646535, -0.01211601, 0.055928253, 0.011596181, -0.017247654, 0.0005939711, -0.026977783, -0.003942035, -0.009583511, -0.0055248477, -0.028737204, 0.023179034, 0.003995351, 0.0219661, -0.008470545, 0.023392297, 0.010469886, -0.015874773, 0.007890735, -0.009690142, -0.00024970944, 0.012775794, 0.0114762215, 0.013422247, 0.010429899, -0.03686786, -0.006717788, -0.027484283, 0.011556195, -0.036068123, -0.013915418, -0.0016327957, 0.0151016945, -0.020473259, 0.004671795, -0.012555866, 0.0209531, 0.01982014, 0.024485271, 0.0105431955, -0.005178295, 0.033162415, -0.013795458, 0.007150979, 0.010243294, 0.005644808, 0.017260984, -0.0045618312, 0.0024725192, 0.004305249, -0.008197301, 0.0014203656, 0.0018460588, 0.005015015, -0.011142998, 0.01439526, 0.022965772, 0.02552493, 0.007757446, -0.0019726837, 0.009503538, -0.032042783, 0.008403899, -0.04609149, 0.013808787, 0.011749465, 0.036388017, 0.016314628, 0.021939443, -0.0250051, -0.017354285, -0.012962398, 0.00006107364, 0.019113706, 0.03081652, -0.018114036, -0.0084572155, 0.009643491, -0.0034721901, 0.0072642746, -0.0090636825, 0.01642126, 0.013428912, 0.027724205, 0.0071243206, -0.6858542, -0.031029783, -0.014595194, -0.011449563, 0.017514233, 0.01743426, 0.009950057, 0.0029706885, -0.015714826, -0.001806072, 0.011856096, 0.026444625, -0.0010663156, -0.006474535, 0.0016161345, -0.020313311, 0.0148351155, -0.0018393943, 0.0057347785, 0.018300641, -0.018647194, 0.03345565, -0.008070676, 0.0071443142, 0.014301958, 0.0044818576, 0.003838736, -0.007350913, -0.024525259, -0.001142124, -0.018620536, 0.017247654, 0.007037683, 0.010236629, 0.06046009, 0.0138887605, -0.012122675, 0.037694257, 0.0055081863, 0.042492677, 0.00021784494, -0.011656162, 0.010276617, 0.022325981, 0.005984696, -0.009496873, 0.013382261, -0.0010563189, 0.0026507939, -0.041639622, 0.008637156, 0.026471283, -0.008403899, 0.024858482, -0.00066686375, -0.0016252982, 0.027590916, 0.0051449724, 0.0058647357, -0.008743787, -0.014968405, 0.027724205, -0.011596181, 0.0047650975, -0.015381602, 0.0043718936, 0.002159289, 0.035908177, -0.008243952, -0.030443309, 0.027564257, 0.042625964, -0.0033688906, 0.01843393, 0.019087048, 0.024578573, 0.03268257, -0.015608194, -0.014128681, -0.0033538956, -0.0028757197, -0.004121976, -0.032389335, 0.0034322033, 0.058807302, 0.010943064, -0.030523283, 0.008903735, 0.017500903, 0.00871713, -0.0029406983, 0.013995391, -0.03132302, -0.019660193, -0.00770413, -0.0038853872, 0.0015894766, -0.0015294964, -0.006251275, -0.021099718, -0.010256623, -0.008863748, 0.028550599, 0.02020668, -0.0012962399, -0.003415542, -0.0022509254, 0.0119360695, 0.027590916, -0.046971202, -0.0015194997, -0.022405956, 0.0016677842, -0.00018535563, -0.015421589, -0.031802863, 0.03814744, 0.0065411795, 0.016567878, -0.015621523, 0.022899127, -0.011076353, 0.02841731, -0.002679118, -0.002342562, 0.015341615, 0.01804739, -0.020566562, -0.012989056, -0.002990682, 0.01643459, 0.00042527664, 0.008243952, -0.013715484, -0.004835075, -0.009803439, 0.03129636, -0.021432944, 0.0012087687, -0.015741484, -0.0052016205, 0.00080890034, -0.01755422, 0.004811749, -0.017967418, -0.026684547, -0.014128681, 0.0041386373, -0.013742141, -0.010056688, -0.013268964, -0.0110630235, -0.028337335, 0.015981404, -0.00997005, -0.02424535, -0.013968734, -0.028310679, -0.027750863, -0.020699851, 0.02235264, 0.001057985, 0.00081639783, -0.0099367285, 0.013522214, -0.012016043, -0.00086471526, 0.013568865, 0.0019376953, -0.019020405, 0.017460918, -0.023045745, 0.008503866, 0.0064678704, -0.011509543, 0.018727167, -0.003372223, -0.0028690554, -0.0027024434, -0.011902748, -0.012182655, -0.015714826, -0.0098634185, 0.00593138, 0.018753825, 0.0010146659, 0.013029044, 0.0003521757, -0.017620865, 0.04102649, 0.00552818, 0.024485271, -0.009630162, -0.015608194, 0.0006718621, -0.0008418062, 0.012395918, 0.0057980907, 0.016221326, 0.010616505, 0.004838407, -0.012402583, 0.019900113, -0.0034521967, 0.000247002, -0.03153628, 0.0011038032, -0.020819811, 0.016234655, -0.00330058, -0.0032289368, 0.00078973995, -0.021952773, -0.022459272, 0.03118973, 0.03673457, -0.021472929, 0.0072109587, -0.015075036, 0.004855068, -0.0008151483, 0.0069643734, 0.010023367, -0.010276617, -0.023019087, 0.0068244194, -0.0012520878, -0.0015086699, 0.022046074, -0.034148756, -0.0022192693, 0.002427534, -0.0027124402, 0.0060346797, 0.015461575, 0.0137554705, 0.009230294, -0.009583511, 0.032629255, 0.015994733, -0.019167023, -0.009203636, 0.03393549, -0.017274313, -0.012042701, -0.0009930064, 0.026777849, -0.013582194, -0.0027590916, -0.017594207, -0.026804507, -0.0014236979, -0.022032745, 0.0091236625, -0.0042419364, -0.00858384, -0.0033905501, -0.020739838, 0.016821127, 0.022539245, 0.015381602, 0.015141681, 0.028817179, -0.019726837, -0.0051283115, -0.011489551, -0.013208984, -0.0047017853, -0.0072309524, 0.01767418, 0.0025658219, -0.010323267, 0.012609182, -0.028097415, 0.026871152, -0.010276617, 0.021912785, 0.0022542577, 0.005124979, -0.0019710176, 0.004518512, -0.040360045, 0.010969722, -0.0031539614, -0.020366628, -0.025778178, -0.0110030435, -0.016221326, 0.0036587953, 0.016207997, 0.003007343, -0.0032555948, 0.0044052163, -0.022046074, -0.0008822095, -0.009363583, 0.028230704, -0.024538586, 0.0029840174, 0.0016044717, -0.014181997, 0.031349678, -0.014381931, -0.027750863, 0.02613806, 0.0004136138, -0.005748107, -0.01868718, -0.0010138329, 0.0054348772, 0.010703143, -0.003682121, 0.0030856507, -0.004275259, -0.010403241, 0.021113047, -0.022685863, -0.023032416, 0.031429652, 0.001792743, -0.005644808, -0.011842767, -0.04078657, -0.0026874484, 0.06915057, -0.00056939584, -0.013995391, 0.010703143, -0.013728813, -0.022939114, -0.015261642, -0.022485929, 0.016807798, 0.007964044, 0.0144219175, 0.016821127, 0.0076241563, 0.005461535, -0.013248971, 0.015301628, 0.0085171955, -0.004318578, 0.011136333, -0.0059047225, -0.010249958, -0.018207338, 0.024645219, 0.021752838, 0.0007614159, -0.013648839, 0.01111634, -0.010503208, -0.0038487327, -0.008203966, -0.00397869, 0.0029740208, 0.008530525, 0.005261601, 0.01642126, -0.0038753906, -0.013222313, 0.026537929, 0.024671877, -0.043505676, 0.014195326, 0.024778508, 0.0056914594, -0.025951454, 0.017620865, -0.0021359634, 0.008643821, 0.021299653, 0.0041686273, -0.009017031, 0.04044002, 0.024378639, -0.027777521, -0.014208655, 0.0028623908, 0.042119466, 0.005801423, -0.028124074, -0.03129636, 0.022139376, -0.022179363, -0.04067994, 0.013688826, 0.013328944, 0.0046184794, -0.02828402, -0.0063412455, -0.0046184794, -0.011756129, -0.010383247, -0.0018543894, -0.0018593877, -0.00052024535, 0.004815081, 0.014781799, 0.018007403, 0.01306903, -0.020433271, 0.009043689, 0.033189073, -0.006844413, -0.019766824, -0.018767154, 0.00533491, -0.0024575242, 0.018727167, 0.0058080875, -0.013835444, 0.0040719924, 0.004881726, 0.012029372, 0.005664801, 0.03193615, 0.0058047553, 0.002695779, 0.009290274, 0.02361889, 0.017834127, 0.0049017193, -0.0036388019, 0.010776452, -0.019793482, 0.0067777685, -0.014208655, -0.024911797, 0.002385881, 0.0034988478, 0.020899786, -0.0025858153, -0.011849431, 0.033189073, -0.021312982, 0.024965113, -0.014635181, 0.014048708, -0.0035921505, -0.003347231, 0.030869836, -0.0017161017, -0.0061346465, 0.009203636, -0.025165047, 0.0068510775, 0.021499587, 0.013782129, -0.0024475274, -0.0051149824, -0.024445284, 0.006167969, 0.0068844, -0.00076183246, 0.030150073, -0.0055948244, -0.011162991, -0.02057989, -0.009703471, -0.020646535, 0.008004031, 0.0066378145, -0.019900113, -0.012169327, -0.01439526, 0.0044252095, -0.004018677, 0.014621852, -0.025085073, -0.013715484, -0.017980747, 0.0071043274, 0.011456228, -0.01010334, -0.0035321703, -0.03801415, -0.012036037, -0.0028990454, -0.05419549, -0.024058744, -0.024272008, 0.015221654, 0.027964126, 0.03182952, -0.015354944, 0.004855068, 0.011522872, 0.004771762, 0.0027874154, 0.023405626, 0.0004242353, -0.03132302, 0.007057676, 0.008763781, -0.0027057757, 0.023005757, -0.0071176565, -0.005238275, 0.029110415, -0.010989714, 0.013728813, -0.009630162, -0.029137073, -0.0049317093, -0.0008630492, -0.015248313, 0.0043219104, -0.0055681667, -0.013175662, 0.029723546, 0.025098402, 0.012849103, -0.0009996708, 0.03118973, -0.0021709518, 0.0260181, -0.020526575, 0.028097415, -0.016141351, 0.010509873, -0.022965772, 0.002865723, 0.0020493253, 0.0020509914, -0.0041419696, -0.00039695262, 0.017287642, 0.0038987163, 0.014795128, -0.014661839, -0.008950386, 0.004431874, -0.009383577, 0.0012604183, -0.023019087, 0.0029273694, -0.033135757, 0.009176978, -0.011023037, -0.002102641, 0.02663123, -0.03849399, -0.0044152127, 0.0004527676, -0.0026924468, 0.02828402, 0.017727496, 0.035135098, 0.02728435, -0.005348239, -0.001467017, -0.019766824, 0.014715155, 0.011982721, 0.0045651635, 0.023458943, -0.0010046692, -0.0031373003, -0.0006972704, 0.0019043729, -0.018967088, -0.024311995, 0.0011546199, 0.007977373, -0.004755101, -0.010016702, -0.02780418, -0.004688456, 0.013022379, -0.005484861, 0.0017227661, -0.015394931, -0.028763862, -0.026684547, 0.0030589928, -0.018513903, 0.028363993, 0.0044818576, -0.009270281, 0.038920518, -0.016008062, 0.0093902415, 0.004815081, -0.021059733, 0.01451522, -0.0051583014, 0.023765508, -0.017874114, -0.016821127, -0.012522544, -0.0028390652, 0.0040886537, 0.020259995, -0.031216389, -0.014115352, -0.009176978, 0.010303274, 0.020313311, 0.0064112223, -0.02235264, -0.022872468, 0.0052449396, 0.0005723116, 0.0037321046, 0.016807798, -0.018527232, -0.009303603, 0.0024858483, -0.0012662497, -0.007110992, 0.011976057, -0.007790768, -0.042999174, -0.006727785, -0.011829439, 0.007024354, 0.005278262, -0.017740825, -0.0041519664, 0.0085905045, 0.027750863, -0.038387362, 0.024391968, 0.00087721116, 0.010509873, -0.00038508154, -0.006857742, 0.0183273, -0.0037054466, 0.015461575, 0.0017394272, -0.0017944091, 0.014181997, -0.0052682655, 0.009023695, 0.00719763, -0.013522214, 0.0034422, 0.014941746, -0.0016711164, -0.025298337, -0.017634194, 0.0058714002, -0.005321581, 0.017834127, 0.0110630235, -0.03369557, 0.029190388, -0.008943722, 0.009363583, -0.0034222065, -0.026111402, -0.007037683, -0.006561173, 0.02473852, -0.007084334, -0.010110005, -0.008577175, 0.0030439978, -0.022712521, 0.0054582027, -0.0012620845, -0.0011954397, -0.015741484, 0.0129557345, -0.00042111133, 0.00846388, 0.008930393, 0.016487904, 0.010469886, -0.007917393, -0.011762793, -0.0214596, 0.000917198, 0.021672864, 0.010269952, -0.007737452, -0.010243294, -0.0067244526, -0.015488233, -0.021552904, 0.017127695, 0.011109675, 0.038067464, 0.00871713, -0.0025591573, 0.021312982, -0.006237946, 0.034628596, -0.0045251767, 0.008357248, 0.020686522, 0.0010696478, 0.0076708077, 0.03772091, -0.018700508, -0.0020676525, -0.008923728, -0.023298996, 0.018233996, -0.010256623, 0.0017860786, 0.009796774, -0.00897038, -0.01269582, -0.018527232, 0.009190307, -0.02372552, -0.042119466, 0.008097334, -0.0066778013, -0.021046404, 0.0019593548, 0.011083017, -0.0016028056, 0.012662497, -0.000059095124, 0.0071043274, -0.014675168, 0.024831824, -0.053582355, 0.038387362, 0.0005698124, 0.015954746, 0.021552904, 0.031589597, -0.009230294, -0.0006147976, 0.002625802, -0.011749465, -0.034362018, -0.0067844326, -0.018793812, 0.011442899, -0.008743787, 0.017474247, -0.021619547, 0.01831397, -0.009037024, -0.0057247817, -0.02728435, 0.010363255, 0.034415334, -0.024032086, -0.0020126705, -0.0045518344, -0.019353628, -0.018340627, -0.03129636, -0.0034038792, -0.006321252, -0.0016161345, 0.033642255, -0.000056075285, -0.005005019, 0.004571828, -0.0024075406, -0.00010215386, 0.0098634185, 0.1980148, -0.003825407, -0.025191706, 0.035161756, 0.005358236, 0.025111731, 0.023485601, 0.0023342315, -0.011882754, 0.018287312, -0.0068910643, 0.003912045, 0.009243623, -0.001355387, -0.028603915, -0.012802451, -0.030150073, -0.014795128, -0.028630573, -0.0013487226, 0.002667455, 0.00985009, -0.0033972147, -0.021486258, 0.009503538, -0.017847456, 0.013062365, -0.014341944, 0.005078328, 0.025165047, -0.015594865, -0.025924796, -0.0018177348, 0.010996379, -0.02993681, 0.007324255, 0.014475234, -0.028577257, 0.005494857, 0.00011725306, -0.013315615, 0.015941417, 0.009376912, 0.0025158382, 0.008743787, 0.023832154, -0.008084005, -0.014195326, -0.008823762, 0.0033455652, -0.032362677, -0.021552904, -0.0056081535, 0.023298996, -0.025444955, 0.0097301295, 0.009736794, 0.015274971, -0.0012937407, -0.018087378, -0.0039387033, 0.008637156, -0.011189649, -0.00023846315, -0.011582852, 0.0066411467, -0.018220667, 0.0060846633, 0.0376676, -0.002709108, 0.0072776037, 0.0034188742, -0.010249958, -0.0007747449, -0.00795738, -0.022192692, 0.03910712, 0.032122757, 0.023898797, 0.0076241563, -0.007397564, -0.003655463, 0.011442899, -0.014115352, -0.00505167, -0.031163072, 0.030336678, -0.006857742, -0.022259338, 0.004048667, 0.02072651, 0.0030156737, -0.0042119464, 0.00041861215, -0.005731446, 0.011103011, 0.013822115, 0.021512916, 0.009216965, -0.006537847, -0.027057758, -0.04054665, 0.010403241, -0.0056281467, -0.005701456, -0.002709108, -0.00745088, -0.0024841821, 0.009356919, -0.022659205, 0.004061996, -0.013175662, 0.017074378, -0.006141311, -0.014541878, 0.02993681, -0.00028448965, -0.025271678, 0.011689484, -0.014528549, 0.004398552, -0.017274313, 0.0045751603, 0.012455898, 0.004121976, -0.025458284, -0.006744446, 0.011822774, -0.015035049, -0.03257594, 0.014675168, -0.0039187097, 0.019726837, -0.0047251107, 0.0022825818, 0.011829439, 0.005391558, -0.016781142, -0.0058747325, 0.010309938, -0.013049036, 0.01186276, -0.0011246296, 0.0062112883, 0.0028190718, -0.021739509, 0.009883412, -0.0073175905, -0.012715813, -0.017181009, -0.016607866, -0.042492677, -0.0014478565, -0.01794076, 0.012302616, -0.015194997, -0.04433207, -0.020606548, 0.009696807, 0.010303274, -0.01694109, -0.004018677, 0.019353628, -0.001991011, 0.000058938927, 0.010536531, -0.17274313, 0.010143327, 0.014235313, -0.024152048, 0.025684876, -0.0012504216, 0.036601283, -0.003698782, 0.0007310093, 0.004165295, -0.0029157067, 0.017101036, -0.046891227, -0.017460918, 0.022965772, 0.020233337, -0.024072073, 0.017220996, 0.009370248, 0.0010363255, 0.0194336, -0.019606877, 0.01818068, -0.020819811, 0.007410893, 0.0019326969, 0.017887443, 0.006651143, 0.00067394477, -0.011889419, -0.025058415, -0.008543854, 0.021579562, 0.0047484366, 0.014062037, 0.0075508473, -0.009510202, -0.009143656, 0.0046817916, 0.013982063, -0.0027990784, 0.011782787, 0.014541878, -0.015701497, -0.029350337, 0.021979429, 0.01332228, -0.026244693, -0.0123492675, -0.003895384, 0.0071576433, -0.035454992, -0.00046984528, 0.0033522295, 0.039347045, 0.0005119148, 0.00476843, -0.012995721, 0.0024042083, -0.006931051, -0.014461905, -0.0127558, 0.0034555288, -0.0074842023, -0.030256703, -0.007057676, -0.00807734, 0.007804097, -0.006957709, 0.017181009, -0.034575284, -0.008603834, -0.005008351, -0.015834786, 0.02943031, 0.016861115, -0.0050849924, 0.014235313, 0.0051449724, 0.0025924798, -0.0025741523, 0.04289254, -0.002104307, 0.012969063, -0.008310596, 0.00423194, 0.0074975314, 0.0018810473, -0.014248641, -0.024725191, 0.0151016945, -0.017527562, 0.0018727167, 0.0002830318, 0.015168339, 0.0144219175, -0.004048667, -0.004358565, 0.011836103, -0.010343261, -0.005911387, 0.0022825818, 0.0073175905, 0.00403867, 0.013188991, 0.03334902, 0.006111321, 0.008597169, 0.030123414, -0.015474904, 0.0017877447, -0.024551915, 0.013155668, 0.023525586, -0.0255116, 0.017220996, 0.004358565, -0.00934359, 0.0099967085, 0.011162991, 0.03092315, -0.021046404, -0.015514892, 0.0011946067, -0.01816735, 0.010876419, -0.10124666, -0.03550831, 0.0056348112, 0.013942076, 0.005951374, 0.020419942, -0.006857742, -0.020873128, -0.021259667, 0.0137554705, 0.0057880944, -0.029163731, -0.018767154, -0.021392956, 0.030896494, -0.005494857, -0.0027307675, -0.006801094, -0.014821786, 0.021392956, -0.0018110704, -0.0018843795, -0.012362596, -0.0072176233, -0.017194338, -0.018713837, -0.024272008, 0.03801415, 0.00015880188, 0.0044951867, -0.028630573, -0.0014070367, -0.00916365, -0.026537929, -0.009576847, -0.013995391, -0.0077107945, 0.0050016865, 0.00578143, -0.04467862, 0.008363913, 0.010136662, -0.0006268769, -0.006591163, 0.015341615, -0.027377652, -0.00093136, 0.029243704, -0.020886457, -0.01041657, -0.02424535, 0.005291591, -0.02980352, -0.009190307, 0.019460259, -0.0041286405, 0.004801752, 0.0011787785, -0.001257086, -0.011216307, -0.013395589, 0.00088137644, -0.0051616337, 0.03876057, -0.0033455652, 0.00075850025, -0.006951045, -0.0062112883, 0.018140694, -0.006351242, -0.008263946, 0.018154023, -0.012189319, 0.0075508473, -0.044358727, -0.0040153447, 0.0093302615, -0.010636497, 0.032789204, -0.005264933, -0.014235313, -0.018393943, 0.007297597, -0.016114693, 0.015021721, 0.020033404, 0.0137688, 0.0011046362, 0.010616505, -0.0039453674, 0.012109346, 0.021099718, -0.0072842683, -0.019153694, -0.003768759, 0.039320387, -0.006747778, -0.0016852784, 0.018154023, 0.0010963057, -0.015035049, -0.021033075, -0.04345236, 0.017287642, 0.016341286, -0.008610498, 0.00236922, 0.009290274, 0.028950468, -0.014475234, -0.0035654926, 0.015434918, -0.03372223, 0.004501851, -0.012929076, -0.008483873, -0.0044685286, -0.0102233, 0.01615468, 0.0022792495, 0.010876419, -0.0059647025, 0.01895376, -0.0069976957, -0.0042952523, 0.017207667, -0.00036133936, 0.0085905045, 0.008084005, 0.03129636, -0.016994404, -0.014915089, 0.020100048, -0.012009379, -0.006684466, 0.01306903, 0.00015765642, -0.00530492, 0.0005277429, 0.015421589, 0.015528221, 0.032202728, -0.003485519, -0.0014286962, 0.033908837, 0.001367883, 0.010509873, 0.025271678, -0.020993087, 0.019846799, 0.006897729, -0.010216636, -0.00725761, 0.01818068, -0.028443968, -0.011242964, -0.014435247, -0.013688826, 0.006101324, -0.0022509254, 0.013848773, -0.0019077052, 0.017181009, 0.03422873, 0.005324913, -0.0035188415, 0.014128681, -0.004898387, 0.005038341, 0.0012320944, -0.005561502, -0.017847456, 0.0008538855, -0.0047884234, 0.011849431, 0.015421589, -0.013942076, 0.0029790192, -0.013702155, 0.0001199605, -0.024431955, 0.019926772, 0.022179363, -0.016487904, -0.03964028, 0.0050849924, 0.017487574, 0.022792496, 0.0012504216, 0.004048667, -0.00997005, 0.0076041627, -0.014328616, -0.020259995, 0.0005598157, -0.010469886, 0.0016852784, 0.01716768, -0.008990373, -0.001987679, 0.026417969, 0.023792166, 0.0046917885, -0.0071909656, -0.00032051947, -0.023259008, -0.009170313, 0.02071318, -0.03156294, -0.030869836, -0.006324584, 0.013795458, -0.00047151142, 0.016874444, 0.00947688, 0.00985009, -0.029883493, 0.024205362, -0.013522214, -0.015075036, -0.030603256, 0.029270362, 0.010503208, 0.021539574, 0.01743426, -0.023898797, 0.022019416, -0.0068777353, 0.027857494, -0.021259667, 0.0025758184, 0.006197959, 0.006447877, -0.00025200035, -0.004941706, -0.021246338, -0.005504854, -0.008390571, -0.0097301295, 0.027244363, -0.04446536, 0.05216949, 0.010243294, -0.016008062, 0.0122493, -0.0199401, 0.009077012, 0.019753495, 0.006431216, -0.037960835, -0.027377652, 0.016381273, -0.0038620618, 0.022512587, -0.010996379, -0.0015211658, -0.0102233, 0.007071005, 0.008230623, -0.009490209, -0.010083347, 0.024431955, 0.002427534, 0.02828402, 0.0035721571, -0.022192692, -0.011882754, 0.010056688, 0.0011904413, -0.01426197, -0.017500903, -0.00010985966, 0.005591492, -0.0077707744, -0.012049366, 0.011869425, 0.00858384, -0.024698535, -0.030283362, 0.020140035, 0.011949399, -0.013968734, 0.042732596, -0.011649498, -0.011982721, -0.016967745, -0.0060913274, -0.007130985, -0.013109017, -0.009710136
              ],
              "path": "plot_embedding",
              "numCandidates": 150,
              "index": "vector_index",
              "limit": 10
          }
          },
          doc! {
              "$project": doc! {
                  "_id": 0,
                  "plot": 1,
                  "title": 1,
                  "score": doc! { "$meta": "vectorSearchScore"
                  }
              }
          }
      ];
      let coll = client.database("sample_mflix").collection::<Document>("embedded_movies");
      let mut cursor = coll.aggregate(pipeline).run()?;

      while cursor.advance()? {
          println!("{}", cursor.deserialize_current()?);
      }

      Ok(())
  }

  ```

  </Tab>

  </Tabs>

This query uses the `$vectorSearch` stage to:

- Compare vector embeddings of the search term against vector embeddings of movie plots in the `plot_embedding` field of the `sample_mflix.embedded_movies` collection.

- Consider up to the 150 most similar movie plots and return the top 10 results.

It uses the `$project` stage to:

- Only include the movie `plot` and `title` fields in the results.

- Add a `score` field to show the relevance of each result to the search term.

To learn more about this pipeline stage, see Run Vector Search Queries.

### Specify the `<connection-string>`.

Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

<Tabs>

<Tab name="Atlas Cluster">

Your connection string should use the following format:

```
mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
```

Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

</Tab>

<Tab name="Local Deployment">

Your connection string should use the following format:

```
mongodb://localhost:<port-number>/?directConnection=true
```

</Tab>

</Tabs>

### Run your query.

- Call the function from your `main.rs`.

  ```rust
  fn main() {
     basic_query().unwrap();
  }
  ```

- Run the file in your IDE, or execute a command from the command line to run the code.

  ```bash
  cargo run
  ```

  ```js
  {\'plot\': \'A reporter, learning of time travelers visiting 20th century disasters, tries to change the history they know by averting upcoming disasters.\', \'title\': \'Thrill Seekers\', \'score\': 0.7892671227455139}
  {\'plot\': \'At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.\', \'title\': \'About Time\', \'score\': 0.7843604683876038}
  {\'plot\': \'Hoping to alter the events of the past, a 19th century inventor instead travels 800,000 years into the future, where he finds humankind divided into two warring races.\', \'title\': \'The Time Machine\', \'score\': 0.7801066637039185}
  {\'plot\': "After using his mother\'s newly built time machine, Dolf gets stuck involuntary in the year 1212. He ends up in a children\'s crusade where he confronts his new friends with modern techniques...", \'title\': \'Crusade in Jeans\', \'score\': 0.7789170742034912}
  {\'plot\': \'An officer for a security agency that regulates time travel, must fend for his life against a shady politician who has a tie to his past.\', \'title\': \'Timecop\', \'score\': 0.7771612405776978}
  {\'plot\': \'A time-travel experiment in which a robot probe is sent from the year 2073 to the year 1973 goes terribly wrong thrusting one of the project scientists, a man named Nicholas Sinclair into a...\', \'title\': \'A.P.E.X.\', \'score\': 0.7730885744094849}
  {\'plot\': "Agent J travels in time to M.I.B.\'s early days in 1969 to stop an alien from assassinating his friend Agent K and changing history.", \'title\': \'Men in Black 3\', \'score\': 0.7712380886077881}
  {\'plot\': \'Bound by a shared destiny, a teen bursting with scientific curiosity and a former boy-genius inventor embark on a mission to unearth the secrets of a place somewhere in time and space that exists in their collective memory.\', \'title\': \'Tomorrowland\', \'score\': 0.7669923901557922}
  {\'plot\': \'With the help of his uncle, a man travels to the future to try and bring his girlfriend back to life.\', \'title\': \'Love Story 2050\', \'score\': 0.7649372816085815}
  {\'plot\': \'A dimension-traveling wizard gets stuck in the 21st century because cell-phone radiation interferes with his magic. With his home world on the brink of war, he seeks help from a jaded ...\', \'title\': \'The Portal\', \'score\': 0.7640786170959473}

  ```

</Tab>

<Tab name="Scala">

### Construct your vector search query.

This query searches for documents that include text in the `plot` field that is semantically related to the term "time travel".

Create a file named `VectorQuery.scala`. Copy and paste the following code into the file.

```scala
import org.mongodb.scala._
import org.mongodb.scala.model._
import org.mongodb.scala.model.search.SearchPath.fieldPath
import org.mongodb.scala.model.search.VectorSearchOptions

class VectorQuery {
  def performVectorQuery() = {
    val collection =
      MongoClient("<connection-string>")
        .getDatabase("sample_mflix")
        .getCollection("embedded_movies")

    val options: VectorSearchOptions = VectorSearchOptions.approximateVectorSearchOptions(150)

    collection.aggregate(Seq(
      Aggregates.vectorSearch(fieldPath("plot_embedding"),
        List(-0.0016261312, -0.028070757, -0.011342932, -0.012775794, -0.0027440966, 0.008683807, -0.02575152, -0.02020668, -0.010283281, -0.0041719596, 0.021392956, 0.028657231, -0.006634482, 0.007490867, 0.018593878, 0.0038187427, 0.029590257, -0.01451522, 0.016061379, 0.00008528442, -0.008943722, 0.01627464, 0.024311995, -0.025911469, 0.00022596726, -0.008863748, 0.008823762, -0.034921836, 0.007910728, -0.01515501, 0.035801545, -0.0035688248, -0.020299982, -0.03145631, -0.032256044, -0.028763862, -0.0071576433, -0.012769129, 0.012322609, -0.006621153, 0.010583182, 0.024085402, -0.001623632, 0.007864078, -0.021406285, 0.002554159, 0.012229307, -0.011762793, 0.0051682983, 0.0048484034, 0.018087378, 0.024325324, -0.037694257, -0.026537929, -0.008803768, -0.017767483, -0.012642504, -0.0062712682, 0.0009771782, -0.010409906, 0.017754154, -0.004671795, -0.030469967, 0.008477209, -0.005218282, -0.0058480743, -0.020153364, -0.0032805866, 0.004248601, 0.0051449724, 0.006791097, 0.007650814, 0.003458861, -0.0031223053, -0.01932697, -0.033615597, 0.00745088, 0.006321252, -0.0038154104, 0.014555207, 0.027697546, -0.02828402, 0.0066711367, 0.0077107945, 0.01794076, 0.011349596, -0.0052715978, 0.014755142, -0.019753495, -0.011156326, 0.011202978, 0.022126047, 0.00846388, 0.030549942, -0.0041386373, 0.018847128, -0.00033655585, 0.024925126, -0.003555496, -0.019300312, 0.010749794, 0.0075308536, -0.018287312, -0.016567878, -0.012869096, -0.015528221, 0.0078107617, -0.011156326, 0.013522214, -0.020646535, -0.01211601, 0.055928253, 0.011596181, -0.017247654, 0.0005939711, -0.026977783, -0.003942035, -0.009583511, -0.0055248477, -0.028737204, 0.023179034, 0.003995351, 0.0219661, -0.008470545, 0.023392297, 0.010469886, -0.015874773, 0.007890735, -0.009690142, -0.00024970944, 0.012775794, 0.0114762215, 0.013422247, 0.010429899, -0.03686786, -0.006717788, -0.027484283, 0.011556195, -0.036068123, -0.013915418, -0.0016327957, 0.0151016945, -0.020473259, 0.004671795, -0.012555866, 0.0209531, 0.01982014, 0.024485271, 0.0105431955, -0.005178295, 0.033162415, -0.013795458, 0.007150979, 0.010243294, 0.005644808, 0.017260984, -0.0045618312, 0.0024725192, 0.004305249, -0.008197301, 0.0014203656, 0.0018460588, 0.005015015, -0.011142998, 0.01439526, 0.022965772, 0.02552493, 0.007757446, -0.0019726837, 0.009503538, -0.032042783, 0.008403899, -0.04609149, 0.013808787, 0.011749465, 0.036388017, 0.016314628, 0.021939443, -0.0250051, -0.017354285, -0.012962398, 0.00006107364, 0.019113706, 0.03081652, -0.018114036, -0.0084572155, 0.009643491, -0.0034721901, 0.0072642746, -0.0090636825, 0.01642126, 0.013428912, 0.027724205, 0.0071243206, -0.6858542, -0.031029783, -0.014595194, -0.011449563, 0.017514233, 0.01743426, 0.009950057, 0.0029706885, -0.015714826, -0.001806072, 0.011856096, 0.026444625, -0.0010663156, -0.006474535, 0.0016161345, -0.020313311, 0.0148351155, -0.0018393943, 0.0057347785, 0.018300641, -0.018647194, 0.03345565, -0.008070676, 0.0071443142, 0.014301958, 0.0044818576, 0.003838736, -0.007350913, -0.024525259, -0.001142124, -0.018620536, 0.017247654, 0.007037683, 0.010236629, 0.06046009, 0.0138887605, -0.012122675, 0.037694257, 0.0055081863, 0.042492677, 0.00021784494, -0.011656162, 0.010276617, 0.022325981, 0.005984696, -0.009496873, 0.013382261, -0.0010563189, 0.0026507939, -0.041639622, 0.008637156, 0.026471283, -0.008403899, 0.024858482, -0.00066686375, -0.0016252982, 0.027590916, 0.0051449724, 0.0058647357, -0.008743787, -0.014968405, 0.027724205, -0.011596181, 0.0047650975, -0.015381602, 0.0043718936, 0.002159289, 0.035908177, -0.008243952, -0.030443309, 0.027564257, 0.042625964, -0.0033688906, 0.01843393, 0.019087048, 0.024578573, 0.03268257, -0.015608194, -0.014128681, -0.0033538956, -0.0028757197, -0.004121976, -0.032389335, 0.0034322033, 0.058807302, 0.010943064, -0.030523283, 0.008903735, 0.017500903, 0.00871713, -0.0029406983, 0.013995391, -0.03132302, -0.019660193, -0.00770413, -0.0038853872, 0.0015894766, -0.0015294964, -0.006251275, -0.021099718, -0.010256623, -0.008863748, 0.028550599, 0.02020668, -0.0012962399, -0.003415542, -0.0022509254, 0.0119360695, 0.027590916, -0.046971202, -0.0015194997, -0.022405956, 0.0016677842, -0.00018535563, -0.015421589, -0.031802863, 0.03814744, 0.0065411795, 0.016567878, -0.015621523, 0.022899127, -0.011076353, 0.02841731, -0.002679118, -0.002342562, 0.015341615, 0.01804739, -0.020566562, -0.012989056, -0.002990682, 0.01643459, 0.00042527664, 0.008243952, -0.013715484, -0.004835075, -0.009803439, 0.03129636, -0.021432944, 0.0012087687, -0.015741484, -0.0052016205, 0.00080890034, -0.01755422, 0.004811749, -0.017967418, -0.026684547, -0.014128681, 0.0041386373, -0.013742141, -0.010056688, -0.013268964, -0.0110630235, -0.028337335, 0.015981404, -0.00997005, -0.02424535, -0.013968734, -0.028310679, -0.027750863, -0.020699851, 0.02235264, 0.001057985, 0.00081639783, -0.0099367285, 0.013522214, -0.012016043, -0.00086471526, 0.013568865, 0.0019376953, -0.019020405, 0.017460918, -0.023045745, 0.008503866, 0.0064678704, -0.011509543, 0.018727167, -0.003372223, -0.0028690554, -0.0027024434, -0.011902748, -0.012182655, -0.015714826, -0.0098634185, 0.00593138, 0.018753825, 0.0010146659, 0.013029044, 0.0003521757, -0.017620865, 0.04102649, 0.00552818, 0.024485271, -0.009630162, -0.015608194, 0.0006718621, -0.0008418062, 0.012395918, 0.0057980907, 0.016221326, 0.010616505, 0.004838407, -0.012402583, 0.019900113, -0.0034521967, 0.000247002, -0.03153628, 0.0011038032, -0.020819811, 0.016234655, -0.00330058, -0.0032289368, 0.00078973995, -0.021952773, -0.022459272, 0.03118973, 0.03673457, -0.021472929, 0.0072109587, -0.015075036, 0.004855068, -0.0008151483, 0.0069643734, 0.010023367, -0.010276617, -0.023019087, 0.0068244194, -0.0012520878, -0.0015086699, 0.022046074, -0.034148756, -0.0022192693, 0.002427534, -0.0027124402, 0.0060346797, 0.015461575, 0.0137554705, 0.009230294, -0.009583511, 0.032629255, 0.015994733, -0.019167023, -0.009203636, 0.03393549, -0.017274313, -0.012042701, -0.0009930064, 0.026777849, -0.013582194, -0.0027590916, -0.017594207, -0.026804507, -0.0014236979, -0.022032745, 0.0091236625, -0.0042419364, -0.00858384, -0.0033905501, -0.020739838, 0.016821127, 0.022539245, 0.015381602, 0.015141681, 0.028817179, -0.019726837, -0.0051283115, -0.011489551, -0.013208984, -0.0047017853, -0.0072309524, 0.01767418, 0.0025658219, -0.010323267, 0.012609182, -0.028097415, 0.026871152, -0.010276617, 0.021912785, 0.0022542577, 0.005124979, -0.0019710176, 0.004518512, -0.040360045, 0.010969722, -0.0031539614, -0.020366628, -0.025778178, -0.0110030435, -0.016221326, 0.0036587953, 0.016207997, 0.003007343, -0.0032555948, 0.0044052163, -0.022046074, -0.0008822095, -0.009363583, 0.028230704, -0.024538586, 0.0029840174, 0.0016044717, -0.014181997, 0.031349678, -0.014381931, -0.027750863, 0.02613806, 0.0004136138, -0.005748107, -0.01868718, -0.0010138329, 0.0054348772, 0.010703143, -0.003682121, 0.0030856507, -0.004275259, -0.010403241, 0.021113047, -0.022685863, -0.023032416, 0.031429652, 0.001792743, -0.005644808, -0.011842767, -0.04078657, -0.0026874484, 0.06915057, -0.00056939584, -0.013995391, 0.010703143, -0.013728813, -0.022939114, -0.015261642, -0.022485929, 0.016807798, 0.007964044, 0.0144219175, 0.016821127, 0.0076241563, 0.005461535, -0.013248971, 0.015301628, 0.0085171955, -0.004318578, 0.011136333, -0.0059047225, -0.010249958, -0.018207338, 0.024645219, 0.021752838, 0.0007614159, -0.013648839, 0.01111634, -0.010503208, -0.0038487327, -0.008203966, -0.00397869, 0.0029740208, 0.008530525, 0.005261601, 0.01642126, -0.0038753906, -0.013222313, 0.026537929, 0.024671877, -0.043505676, 0.014195326, 0.024778508, 0.0056914594, -0.025951454, 0.017620865, -0.0021359634, 0.008643821, 0.021299653, 0.0041686273, -0.009017031, 0.04044002, 0.024378639, -0.027777521, -0.014208655, 0.0028623908, 0.042119466, 0.005801423, -0.028124074, -0.03129636, 0.022139376, -0.022179363, -0.04067994, 0.013688826, 0.013328944, 0.0046184794, -0.02828402, -0.0063412455, -0.0046184794, -0.011756129, -0.010383247, -0.0018543894, -0.0018593877, -0.00052024535, 0.004815081, 0.014781799, 0.018007403, 0.01306903, -0.020433271, 0.009043689, 0.033189073, -0.006844413, -0.019766824, -0.018767154, 0.00533491, -0.0024575242, 0.018727167, 0.0058080875, -0.013835444, 0.0040719924, 0.004881726, 0.012029372, 0.005664801, 0.03193615, 0.0058047553, 0.002695779, 0.009290274, 0.02361889, 0.017834127, 0.0049017193, -0.0036388019, 0.010776452, -0.019793482, 0.0067777685, -0.014208655, -0.024911797, 0.002385881, 0.0034988478, 0.020899786, -0.0025858153, -0.011849431, 0.033189073, -0.021312982, 0.024965113, -0.014635181, 0.014048708, -0.0035921505, -0.003347231, 0.030869836, -0.0017161017, -0.0061346465, 0.009203636, -0.025165047, 0.0068510775, 0.021499587, 0.013782129, -0.0024475274, -0.0051149824, -0.024445284, 0.006167969, 0.0068844, -0.00076183246, 0.030150073, -0.0055948244, -0.011162991, -0.02057989, -0.009703471, -0.020646535, 0.008004031, 0.0066378145, -0.019900113, -0.012169327, -0.01439526, 0.0044252095, -0.004018677, 0.014621852, -0.025085073, -0.013715484, -0.017980747, 0.0071043274, 0.011456228, -0.01010334, -0.0035321703, -0.03801415, -0.012036037, -0.0028990454, -0.05419549, -0.024058744, -0.024272008, 0.015221654, 0.027964126, 0.03182952, -0.015354944, 0.004855068, 0.011522872, 0.004771762, 0.0027874154, 0.023405626, 0.0004242353, -0.03132302, 0.007057676, 0.008763781, -0.0027057757, 0.023005757, -0.0071176565, -0.005238275, 0.029110415, -0.010989714, 0.013728813, -0.009630162, -0.029137073, -0.0049317093, -0.0008630492, -0.015248313, 0.0043219104, -0.0055681667, -0.013175662, 0.029723546, 0.025098402, 0.012849103, -0.0009996708, 0.03118973, -0.0021709518, 0.0260181, -0.020526575, 0.028097415, -0.016141351, 0.010509873, -0.022965772, 0.002865723, 0.0020493253, 0.0020509914, -0.0041419696, -0.00039695262, 0.017287642, 0.0038987163, 0.014795128, -0.014661839, -0.008950386, 0.004431874, -0.009383577, 0.0012604183, -0.023019087, 0.0029273694, -0.033135757, 0.009176978, -0.011023037, -0.002102641, 0.02663123, -0.03849399, -0.0044152127, 0.0004527676, -0.0026924468, 0.02828402, 0.017727496, 0.035135098, 0.02728435, -0.005348239, -0.001467017, -0.019766824, 0.014715155, 0.011982721, 0.0045651635, 0.023458943, -0.0010046692, -0.0031373003, -0.0006972704, 0.0019043729, -0.018967088, -0.024311995, 0.0011546199, 0.007977373, -0.004755101, -0.010016702, -0.02780418, -0.004688456, 0.013022379, -0.005484861, 0.0017227661, -0.015394931, -0.028763862, -0.026684547, 0.0030589928, -0.018513903, 0.028363993, 0.0044818576, -0.009270281, 0.038920518, -0.016008062, 0.0093902415, 0.004815081, -0.021059733, 0.01451522, -0.0051583014, 0.023765508, -0.017874114, -0.016821127, -0.012522544, -0.0028390652, 0.0040886537, 0.020259995, -0.031216389, -0.014115352, -0.009176978, 0.010303274, 0.020313311, 0.0064112223, -0.02235264, -0.022872468, 0.0052449396, 0.0005723116, 0.0037321046, 0.016807798, -0.018527232, -0.009303603, 0.0024858483, -0.0012662497, -0.007110992, 0.011976057, -0.007790768, -0.042999174, -0.006727785, -0.011829439, 0.007024354, 0.005278262, -0.017740825, -0.0041519664, 0.0085905045, 0.027750863, -0.038387362, 0.024391968, 0.00087721116, 0.010509873, -0.00038508154, -0.006857742, 0.0183273, -0.0037054466, 0.015461575, 0.0017394272, -0.0017944091, 0.014181997, -0.0052682655, 0.009023695, 0.00719763, -0.013522214, 0.0034422, 0.014941746, -0.0016711164, -0.025298337, -0.017634194, 0.0058714002, -0.005321581, 0.017834127, 0.0110630235, -0.03369557, 0.029190388, -0.008943722, 0.009363583, -0.0034222065, -0.026111402, -0.007037683, -0.006561173, 0.02473852, -0.007084334, -0.010110005, -0.008577175, 0.0030439978, -0.022712521, 0.0054582027, -0.0012620845, -0.0011954397, -0.015741484, 0.0129557345, -0.00042111133, 0.00846388, 0.008930393, 0.016487904, 0.010469886, -0.007917393, -0.011762793, -0.0214596, 0.000917198, 0.021672864, 0.010269952, -0.007737452, -0.010243294, -0.0067244526, -0.015488233, -0.021552904, 0.017127695, 0.011109675, 0.038067464, 0.00871713, -0.0025591573, 0.021312982, -0.006237946, 0.034628596, -0.0045251767, 0.008357248, 0.020686522, 0.0010696478, 0.0076708077, 0.03772091, -0.018700508, -0.0020676525, -0.008923728, -0.023298996, 0.018233996, -0.010256623, 0.0017860786, 0.009796774, -0.00897038, -0.01269582, -0.018527232, 0.009190307, -0.02372552, -0.042119466, 0.008097334, -0.0066778013, -0.021046404, 0.0019593548, 0.011083017, -0.0016028056, 0.012662497, -0.000059095124, 0.0071043274, -0.014675168, 0.024831824, -0.053582355, 0.038387362, 0.0005698124, 0.015954746, 0.021552904, 0.031589597, -0.009230294, -0.0006147976, 0.002625802, -0.011749465, -0.034362018, -0.0067844326, -0.018793812, 0.011442899, -0.008743787, 0.017474247, -0.021619547, 0.01831397, -0.009037024, -0.0057247817, -0.02728435, 0.010363255, 0.034415334, -0.024032086, -0.0020126705, -0.0045518344, -0.019353628, -0.018340627, -0.03129636, -0.0034038792, -0.006321252, -0.0016161345, 0.033642255, -0.000056075285, -0.005005019, 0.004571828, -0.0024075406, -0.00010215386, 0.0098634185, 0.1980148, -0.003825407, -0.025191706, 0.035161756, 0.005358236, 0.025111731, 0.023485601, 0.0023342315, -0.011882754, 0.018287312, -0.0068910643, 0.003912045, 0.009243623, -0.001355387, -0.028603915, -0.012802451, -0.030150073, -0.014795128, -0.028630573, -0.0013487226, 0.002667455, 0.00985009, -0.0033972147, -0.021486258, 0.009503538, -0.017847456, 0.013062365, -0.014341944, 0.005078328, 0.025165047, -0.015594865, -0.025924796, -0.0018177348, 0.010996379, -0.02993681, 0.007324255, 0.014475234, -0.028577257, 0.005494857, 0.00011725306, -0.013315615, 0.015941417, 0.009376912, 0.0025158382, 0.008743787, 0.023832154, -0.008084005, -0.014195326, -0.008823762, 0.0033455652, -0.032362677, -0.021552904, -0.0056081535, 0.023298996, -0.025444955, 0.0097301295, 0.009736794, 0.015274971, -0.0012937407, -0.018087378, -0.0039387033, 0.008637156, -0.011189649, -0.00023846315, -0.011582852, 0.0066411467, -0.018220667, 0.0060846633, 0.0376676, -0.002709108, 0.0072776037, 0.0034188742, -0.010249958, -0.0007747449, -0.00795738, -0.022192692, 0.03910712, 0.032122757, 0.023898797, 0.0076241563, -0.007397564, -0.003655463, 0.011442899, -0.014115352, -0.00505167, -0.031163072, 0.030336678, -0.006857742, -0.022259338, 0.004048667, 0.02072651, 0.0030156737, -0.0042119464, 0.00041861215, -0.005731446, 0.011103011, 0.013822115, 0.021512916, 0.009216965, -0.006537847, -0.027057758, -0.04054665, 0.010403241, -0.0056281467, -0.005701456, -0.002709108, -0.00745088, -0.0024841821, 0.009356919, -0.022659205, 0.004061996, -0.013175662, 0.017074378, -0.006141311, -0.014541878, 0.02993681, -0.00028448965, -0.025271678, 0.011689484, -0.014528549, 0.004398552, -0.017274313, 0.0045751603, 0.012455898, 0.004121976, -0.025458284, -0.006744446, 0.011822774, -0.015035049, -0.03257594, 0.014675168, -0.0039187097, 0.019726837, -0.0047251107, 0.0022825818, 0.011829439, 0.005391558, -0.016781142, -0.0058747325, 0.010309938, -0.013049036, 0.01186276, -0.0011246296, 0.0062112883, 0.0028190718, -0.021739509, 0.009883412, -0.0073175905, -0.012715813, -0.017181009, -0.016607866, -0.042492677, -0.0014478565, -0.01794076, 0.012302616, -0.015194997, -0.04433207, -0.020606548, 0.009696807, 0.010303274, -0.01694109, -0.004018677, 0.019353628, -0.001991011, 0.000058938927, 0.010536531, -0.17274313, 0.010143327, 0.014235313, -0.024152048, 0.025684876, -0.0012504216, 0.036601283, -0.003698782, 0.0007310093, 0.004165295, -0.0029157067, 0.017101036, -0.046891227, -0.017460918, 0.022965772, 0.020233337, -0.024072073, 0.017220996, 0.009370248, 0.0010363255, 0.0194336, -0.019606877, 0.01818068, -0.020819811, 0.007410893, 0.0019326969, 0.017887443, 0.006651143, 0.00067394477, -0.011889419, -0.025058415, -0.008543854, 0.021579562, 0.0047484366, 0.014062037, 0.0075508473, -0.009510202, -0.009143656, 0.0046817916, 0.013982063, -0.0027990784, 0.011782787, 0.014541878, -0.015701497, -0.029350337, 0.021979429, 0.01332228, -0.026244693, -0.0123492675, -0.003895384, 0.0071576433, -0.035454992, -0.00046984528, 0.0033522295, 0.039347045, 0.0005119148, 0.00476843, -0.012995721, 0.0024042083, -0.006931051, -0.014461905, -0.0127558, 0.0034555288, -0.0074842023, -0.030256703, -0.007057676, -0.00807734, 0.007804097, -0.006957709, 0.017181009, -0.034575284, -0.008603834, -0.005008351, -0.015834786, 0.02943031, 0.016861115, -0.0050849924, 0.014235313, 0.0051449724, 0.0025924798, -0.0025741523, 0.04289254, -0.002104307, 0.012969063, -0.008310596, 0.00423194, 0.0074975314, 0.0018810473, -0.014248641, -0.024725191, 0.0151016945, -0.017527562, 0.0018727167, 0.0002830318, 0.015168339, 0.0144219175, -0.004048667, -0.004358565, 0.011836103, -0.010343261, -0.005911387, 0.0022825818, 0.0073175905, 0.00403867, 0.013188991, 0.03334902, 0.006111321, 0.008597169, 0.030123414, -0.015474904, 0.0017877447, -0.024551915, 0.013155668, 0.023525586, -0.0255116, 0.017220996, 0.004358565, -0.00934359, 0.0099967085, 0.011162991, 0.03092315, -0.021046404, -0.015514892, 0.0011946067, -0.01816735, 0.010876419, -0.10124666, -0.03550831, 0.0056348112, 0.013942076, 0.005951374, 0.020419942, -0.006857742, -0.020873128, -0.021259667, 0.0137554705, 0.0057880944, -0.029163731, -0.018767154, -0.021392956, 0.030896494, -0.005494857, -0.0027307675, -0.006801094, -0.014821786, 0.021392956, -0.0018110704, -0.0018843795, -0.012362596, -0.0072176233, -0.017194338, -0.018713837, -0.024272008, 0.03801415, 0.00015880188, 0.0044951867, -0.028630573, -0.0014070367, -0.00916365, -0.026537929, -0.009576847, -0.013995391, -0.0077107945, 0.0050016865, 0.00578143, -0.04467862, 0.008363913, 0.010136662, -0.0006268769, -0.006591163, 0.015341615, -0.027377652, -0.00093136, 0.029243704, -0.020886457, -0.01041657, -0.02424535, 0.005291591, -0.02980352, -0.009190307, 0.019460259, -0.0041286405, 0.004801752, 0.0011787785, -0.001257086, -0.011216307, -0.013395589, 0.00088137644, -0.0051616337, 0.03876057, -0.0033455652, 0.00075850025, -0.006951045, -0.0062112883, 0.018140694, -0.006351242, -0.008263946, 0.018154023, -0.012189319, 0.0075508473, -0.044358727, -0.0040153447, 0.0093302615, -0.010636497, 0.032789204, -0.005264933, -0.014235313, -0.018393943, 0.007297597, -0.016114693, 0.015021721, 0.020033404, 0.0137688, 0.0011046362, 0.010616505, -0.0039453674, 0.012109346, 0.021099718, -0.0072842683, -0.019153694, -0.003768759, 0.039320387, -0.006747778, -0.0016852784, 0.018154023, 0.0010963057, -0.015035049, -0.021033075, -0.04345236, 0.017287642, 0.016341286, -0.008610498, 0.00236922, 0.009290274, 0.028950468, -0.014475234, -0.0035654926, 0.015434918, -0.03372223, 0.004501851, -0.012929076, -0.008483873, -0.0044685286, -0.0102233, 0.01615468, 0.0022792495, 0.010876419, -0.0059647025, 0.01895376, -0.0069976957, -0.0042952523, 0.017207667, -0.00036133936, 0.0085905045, 0.008084005, 0.03129636, -0.016994404, -0.014915089, 0.020100048, -0.012009379, -0.006684466, 0.01306903, 0.00015765642, -0.00530492, 0.0005277429, 0.015421589, 0.015528221, 0.032202728, -0.003485519, -0.0014286962, 0.033908837, 0.001367883, 0.010509873, 0.025271678, -0.020993087, 0.019846799, 0.006897729, -0.010216636, -0.00725761, 0.01818068, -0.028443968, -0.011242964, -0.014435247, -0.013688826, 0.006101324, -0.0022509254, 0.013848773, -0.0019077052, 0.017181009, 0.03422873, 0.005324913, -0.0035188415, 0.014128681, -0.004898387, 0.005038341, 0.0012320944, -0.005561502, -0.017847456, 0.0008538855, -0.0047884234, 0.011849431, 0.015421589, -0.013942076, 0.0029790192, -0.013702155, 0.0001199605, -0.024431955, 0.019926772, 0.022179363, -0.016487904, -0.03964028, 0.0050849924, 0.017487574, 0.022792496, 0.0012504216, 0.004048667, -0.00997005, 0.0076041627, -0.014328616, -0.020259995, 0.0005598157, -0.010469886, 0.0016852784, 0.01716768, -0.008990373, -0.001987679, 0.026417969, 0.023792166, 0.0046917885, -0.0071909656, -0.00032051947, -0.023259008, -0.009170313, 0.02071318, -0.03156294, -0.030869836, -0.006324584, 0.013795458, -0.00047151142, 0.016874444, 0.00947688, 0.00985009, -0.029883493, 0.024205362, -0.013522214, -0.015075036, -0.030603256, 0.029270362, 0.010503208, 0.021539574, 0.01743426, -0.023898797, 0.022019416, -0.0068777353, 0.027857494, -0.021259667, 0.0025758184, 0.006197959, 0.006447877, -0.00025200035, -0.004941706, -0.021246338, -0.005504854, -0.008390571, -0.0097301295, 0.027244363, -0.04446536, 0.05216949, 0.010243294, -0.016008062, 0.0122493, -0.0199401, 0.009077012, 0.019753495, 0.006431216, -0.037960835, -0.027377652, 0.016381273, -0.0038620618, 0.022512587, -0.010996379, -0.0015211658, -0.0102233, 0.007071005, 0.008230623, -0.009490209, -0.010083347, 0.024431955, 0.002427534, 0.02828402, 0.0035721571, -0.022192692, -0.011882754, 0.010056688, 0.0011904413, -0.01426197, -0.017500903, -0.00010985966, 0.005591492, -0.0077707744, -0.012049366, 0.011869425, 0.00858384, -0.024698535, -0.030283362, 0.020140035, 0.011949399, -0.013968734, 0.042732596, -0.011649498, -0.011982721, -0.016967745, -0.0060913274, -0.007130985, -0.013109017, -0.009710136),
        "vector_index",
        10,
        options
      ),
      Aggregates.project(
        Projections.fields(
          Projections.excludeId(),
          Projections.include("plot"),
          Projections.include("title"),
          Projections.meta(
            "score", "vectorSearchScore"
          )
        )
      )
    )).foreach { doc => println(doc.toBsonDocument()) }
  }
}
```

This query uses the `$vectorSearch` stage to:

- Compare vector embeddings of the search term against vector embeddings of movie plots in the `plot_embedding` field of the `sample_mflix.embedded_movies` collection.

- Consider up to the 150 most similar movie plots and return the top 10 results.

It uses the `$project` stage to:

- Only include the movie `plot` and `title` fields in the results.

- Add a `score` field to show the relevance of each result to the search term.

To learn more about this pipeline stage, see Run Vector Search Queries.

### Specify the `<connection-string>`.

Replace `<connection-string>` with the connection string for your Atlas cluster or local deployment, and then save the file.

<Tabs>

<Tab name="Atlas Cluster">

Your connection string should use the following format:

```
mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
```

Ensure that your connection string includes your database user\'s credentials. To learn more about finding your connection string, see Connect via Drivers.

</Tab>

<Tab name="Local Deployment">

Your connection string should use the following format:

```
mongodb://localhost:<port-number>/?directConnection=true
```

</Tab>

</Tabs>

### Update your `Main.scala` file.

Create a class instance and call the function in your project\'s `Main.scala` file.

```scala
object Main extends App {
   private val queryInstance = new VectorQuery
   queryInstance.performVectorQuery()
}
```

### Run your query.

```bash
sbt:quick-start> ~run
```

```js
\'{"plot":"A reporter, learning of time travelers visiting 20th century disasters, tries to change the history they know by averting upcoming disasters.","title":"Thrill Seekers","score":0.7892671227455139}\'
\'{"plot":"At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.","title":"About Time","score":0.7843604683876038}\'
\'{"plot":"Hoping to alter the events of the past, a 19th century inventor instead travels 800,000 years into the future, where he finds humankind divided into two warring races.","title":"The Time Machine","score":0.7801066637039185}\'
`{"plot":"After using his mother\'s newly built time machine, Dolf gets stuck involuntary in the year 1212. He ends up in a children\'s crusade where he confronts his new friends with modern techniques...","title":"Crusade in Jeans","score":0.7789170742034912}`
\'{"plot":"An officer for a security agency that regulates time travel, must fend for his life against a shady politician who has a tie to his past.","title":"Timecop","score":0.7771612405776978}\'
\'{"plot":"A time-travel experiment in which a robot probe is sent from the year 2073 to the year 1973 goes terribly wrong thrusting one of the project scientists, a man named Nicholas Sinclair into a...","title":"A.P.E.X.","score":0.7730885744094849}\'
`{"plot":"Agent J travels in time to M.I.B.\'s early days in 1969 to stop an alien from assassinating his friend Agent K and changing history.","title":"Men in Black 3","score":0.7712380886077881}`
\'{"plot":"Bound by a shared destiny, a teen bursting with scientific curiosity and a former boy-genius inventor embark on a mission to unearth the secrets of a place somewhere in time and space that exists in their collective memory.","title":"Tomorrowland","score":0.7669923901557922}\'
\'{"plot":"With the help of his uncle, a man travels to the future to try and bring his girlfriend back to life.","title":"Love Story 2050","score":0.7649372816085815}\'
\'{"plot":"A dimension-traveling wizard gets stuck in the 21st century because cell-phone radiation interferes with his magic. With his home world on the brink of war, he seeks help from a jaded ...","title":"The Portal","score":0.7640786170959473}\'

```

</Tab>

</Tabs>

## Learning Summary

This quick start focused on retrieving documents from your Atlas cluster that contain text that is semantically related to a provided query. However, you can create a vector search index on embeddings that represent any type of data that you might write to an Atlas cluster, such as images or videos.

### Sample Data

This quick start uses the `sample_mflix.embedded_movies` collection which contains details about movies. In each document in the collection, the `plot_embedding` field contains a vector embedding that represents the string in the `plot` field. For more information on the schema of the documents in the collection, see Sample Mflix Dataset.

By storing your source data and its corresponding vector embeddings in the same document, you can leverage both fields for complex queries or hybrid search. You can even store vector embeddings generated from different embedding models in the same document to streamline your workflow as you test the performance of different vector embedding models for your specific use case.

### Vector Embeddings

The vector embeddings in the `sample_mflix.embedded_movies` collection and in the example query were created using the OpenAI `text-embedding-ada-002` embedding model. Your choice of embedding model informs the vector dimensions and vector similarity function you use in your vector search index. You can use any embedding model you like, and it is worth experimenting with different models as accuracy can vary from model to model depending on your specific use case.

To learn how to create vector embeddings of your own data, see How to Create Vector Embeddings.

### Vector Index Definition

An index is a data structure that holds a subset of data from a collection\'s documents that improves database performance for specific queries. A vector search index points to the fields that contain your vector embeddings and includes the dimensions of your vectors as well as the function used to measure similarity between vectors of queries and vectors stored in the database.

Because the `text-embedding-ada-002` embedding model used in this quick start converts data into vector embeddings with 1536 dimensions and supports the `cosine` function, this vector search index specifies the same number of vector dimensions and similarity function.

### Vector Search Query

The query you ran in this quick start is an aggregation pipeline, in which the `$vectorSearch` stage performs an Approximate Nearest Neighbor (ANN) search followed by a `$project` stage that refines the results. To see all the options for a vector search query, including using Exact Nearest Neighbor (ENN) or how to narrow the scope of your vector search with the `filter` option, see Run Vector Search Queries.

## Next Steps

- To learn how to create embeddings from data and load them into Atlas, see Create Embeddings.

- To learn how to implement retrieval-augmented generation (RAG), see Retrieval-Augmented Generation (RAG) with Atlas Vector Search.

- To integrate Atlas Vector Search with popular AI frameworks and services, see Integrate Vector Search with AI Technologies.

- To build production ready AI chatbots using Atlas Vector Search, see the MongoDB Chatbot Framework.

- To learn how implement RAG (Retrieval-Augmented Generation) without the need for API (Application Programming Interface) keys or credits, see Build a Local RAG Implementation with Atlas Vector Search.

