.. procedure::
   :style: normal

   .. step:: Create an example file.

      Create a new file in the ``go/driver/examples`` directory, or within
      a subdirectory to organize these examples to group related concepts. For
      example, you might create a file for an aggregation pipeline unwind tutorial in
      ``/aggregation/pipelines/unwind``, or a file for an insert example in
      ``/crud/insert``.

      With the goal of single-sourcing code examples across different docs
      projects, avoid matching a specific docs project's page structure and
      instead group code examples by related concept or topic for easy reuse.

      Filenames, Namespaces, and Class names
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      The following conventions help keep example files organized and
      consistent:

      - File names: Use snake case.
      - Struct and function names: Use PascalCase for exported structs and
        functions. For unexported structs and functions, use camelCase.
      - Package names: Use lowercase for packages, and underscores to separate
        words. For example, ``package join_one_to_one``.
      - Package names should match the directory structure. For example, if you
        create a file in the ``aggregation/pipelines/join_one_to_one`` directory,
        the package name should be ``join_one_to_one``.

      For example, you might have the following files for a one-to-one join
      tutorial:

      - ``models.go``: a file containing two structs, ``Order`` and ``Product``,
        representing the data in the ``orders`` and ``products`` collections.
      - ``load_data.go``: a file containing a function to load data into the
        ``orders`` and ``products`` collections.
      - ``run_pipeline.go``: a file containing a function to run the aggregation
        pipeline.

      Each file would be in the ``join_one_to_one`` directory and use the
      ``join_one_to_one`` package. In the following example, the ``RunPipeline``
      function name is in PascalCase because it is exported. We will call this
      function in the test file to validate the output.

      .. code-block:: go
         :emphasize-lines: 1,7
         :caption: run_pipeline.go

         package join_one_to_one

         import (
            "go.mongodb.org/mongo-driver/v2/bson"
         )

         func RunPipeline() []bson.D {
            // Your example code here
         }

   .. step:: Add the example code to your file.

      Add the example code to your file. This should include everything
      necessary to run the example, including imports and any necessary
      setup code.

      a. **Add required dependencies.**

         In the Go Driver test project, add the required dependencies at the top
         of the file. Most examples will require a minimum of the following
         imports:

         - ``context``: For managing timeouts and cancellations for MongoDB
           operations.
         - ``driver-examples/utils``: For reading the connection string from the
           environment.
         - ``go.mongodb.org/mongo-driver/v2/bson``: For working with BSON data,
           such as returning results from your example.
         - ``go.mongodb.org/mongo-driver/v2/mongo``: For working with MongoDB
           collections and databases.
         - ``go.mongodb.org/mongo-driver/v2/mongo/options``: For working with
           MongoDB options, such as setting the connection string URI to connect
           to the database.

         Add these imports to your file, along with any other imports you need
         to run your example:

         .. code-block:: go
            :emphasize-lines: 3-10

            package join_one_to_one

            import (
               "context"
               "driver-examples/utils"

               "go.mongodb.org/mongo-driver/v2/bson"
               "go.mongodb.org/mongo-driver/v2/mongo"
               "go.mongodb.org/mongo-driver/v2/mongo/options"
            )

            func RunPipeline() []bson.D {
               // Your example code here
            }

      b. **Create and read environment variables.**

         User the following code to read the connection string from your .env file:

         .. code-block:: go

            uri := utils.GetConnectionString()
            if uri == "" {
               log.Fatal("set your 'CONNECTION_STRING' environment variable.")
            }

         .. important:: Do Not Hardcode Your Connection String

            Do not hardcode the connection string in your example file.
            The Grove platform requires that you read the connection string from
            the ``CONNECTION_STRING`` environment variable defined in the ``.env``
            file. By reading it from the
            environment, other writers can run your example against their own
            clusters and environments, and CI can run the test suite against a
            temporary test cluster.

            Refer to the :ref:`grove-set-up-environment` page for details on how
            to create the .env file.

      c. **Create your example in an exported function.**

         In the test project, create a callable exported function. You export
         a function by capitalizing the first letter of the function name.
         This allows us to call the function in the test file and verify the output.
         For better understanding of its purpose, name your method appropriately
         for the example.

         .. code-block:: go
            :emphasize-lines: 7,9

            package join_one_to_one

            import (
               // Your imports here
            )

            func RunPipeline() []bson.D {
               // Your example code here
            }

      d. **Add any necessary setup code.**

         The example file should include everything necessary to run the
         example. This might include creating a database and collection, or
         inserting documents.

         .. code-block:: go
            :emphasize-lines: 8-25

            package join_one_to_one

            import (
               // Your imports here
            )

            func RunPipeline() []bson.D {
               ctx := context.Background()
               // Get the connection string from environment
               uri := utils.GetConnectionString()
               if uri == "" {
                  log.Fatal("set your 'CONNECTION_STRING' environment variable.")
               }

               // Configure the client
               clientOptions := options.Client().ApplyURI(uri)
               client, err := mongo.Connect(clientOptions)
               if err != nil {
                  log.Fatalf("failed to connect to the server: %v", err)
               }
               defer func() { _ = client.Disconnect(ctx) }()

               // Get a reference to the database and collection
               aggDB := client.Database("agg_tutorials_db")
               orders := aggDB.Collection("orders")

               // Your example code here
            }

      e. **Return something from the method to validate your example.**

         In the test project, we verify the output of the
         example by comparing it to an expected output. To do this, you need to
         return something from the method that you can compare against the
         expected output.

         This might be a simple string, or it might be something more complex
         like an array of documents. Use your judgment to determine what makes
         sense for your example.

         In the example below, we query for specific documents and return the
         documents as a ``[]bson.D``:

         .. code-block:: go
            :emphasize-lines: 40-44, 46

            package join_one_to_one

            import (
               // Your imports here
            )

            func RunPipeline() []bson.D {
               ctx := context.Background()
               // Get the connection string from environment
               uri := utils.GetConnectionString()
               if uri == "" {
                  log.Fatal("set your 'CONNECTION_STRING' environment variable.")
               }

               // Configure the client
               clientOptions := options.Client().ApplyURI(uri)
               client, err := mongo.Connect(clientOptions)
               if err != nil {
                  log.Fatalf("failed to connect to the server: %v", err)
               }
               defer func() { _ = client.Disconnect(ctx) }()

               // Get a reference to the database and collection
               aggDB := client.Database("agg_tutorials_db")
               orders := aggDB.Collection("orders")

               // Example aggregation pipeline here...

               cursor, err := orders.Aggregate(ctx, pipeline)
               if err != nil {
                  log.Fatal(err)
               }

               defer func() {
                  if err := cursor.Close(ctx); err != nil {
                     log.Fatalf("failed to close cursor: %v", err)
                  }
               }()

               // Decode the results from the cursor to a slice of BSON documents
               var results []bson.D
               if err = cursor.All(ctx, &results); err != nil {
                  log.Fatalf("failed to decode results: %v", err)
               }
               // Return the results to validate the example
               return results
            }

      f. **Add markup to your example file (optional)**

         You can use markup to replace content that we do not want to show
         verbatim to users, remove test functionality from the outputted code
         examples, or rename awkward variables.

         Refer to :ref:`grove-mark-up-examples` for details.

      g. **Create an expected output file (optional)**

         If you want to show the output of your example in the docs, create an
         expected output file. This file should contain the output that you
         want to show in the docs.

         Save it alongside your example file, and give it a name that includes
         ``output``. For example,
         ``examples/aggregation/pipelines/join_one_to_one/output.txt``.

         Grove uses a comparison library to compare the output from your
         expected output file with the actual output you return from the code
         example when the test runs.

         You can use ellipses to truncate long output blocks. The comparison
         library recognizes specific ellipsis patterns and can match truncated
         output. Refer to :ref:`grove-truncate-long-strings` for details.
