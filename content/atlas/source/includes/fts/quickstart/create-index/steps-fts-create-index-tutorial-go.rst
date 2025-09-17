a. Set up and initialize the Go module.

   .. code-block:: 
      
      # Create a new directory and initialize the project
      mkdir atlas-search-quickstart && cd atlas-search-quickstart
      go mod init atlas-search-quickstart

   .. code-block:: 
     
      # Add the MongoDB Go Driver to your project
      go get go.mongodb.org/mongo-driver/v2/mongo

   For more detailed installation instructions, see the
   :ref:`MongoDB Go Driver documentation <go-get-started>`.

#. Define the index.

   Paste the following code into a file named ``create-index.go``.

   .. code-block:: go
      :caption: create-index.go
      :emphasize-lines: 16
      :linenos:

      package main

      import (
       "context"
       "log"

       "go.mongodb.org/mongo-driver/v2/bson"
       "go.mongodb.org/mongo-driver/v2/mongo"
       "go.mongodb.org/mongo-driver/v2/mongo/options"
      )

      func main() {
       ctx := context.Background()

       // Replace the placeholder with your Atlas connection string
       const uri = "<connection-string>"

       // Connect to your Atlas cluster
       clientOptions := options.Client().ApplyURI(uri)
       client, err := mongo.Connect(clientOptions)
       if err != nil {
        log.Fatalf("failed to connect to the server: %v", err)
       }
       defer func() { _ = client.Disconnect(ctx) }()

       // Set the namespace
       coll := client.Database("sample_mflix").Collection("movies")

       // Define a simple MongoDB Search index
       indexName := "default"
       
       // Create the default definition for search index
       definition := bson.D{{"mappings", bson.D{{"dynamic", true}}}}
       indexModel := mongo.SearchIndexModel{
        Definition: definition,
        Options: options.SearchIndexes().SetName(indexName),
       }

       // Create the index
       searchIndexName, err := coll.SearchIndexes().CreateOne(ctx, indexModel)
       if err != nil {
        log.Fatalf("failed to create the search index: %v", err)
       }
       log.Println("New search index named " + searchIndexName + " is building.")
      }

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Create the index.

   .. code-block::
      
      go run create-index.go
