.. procedure::
   :style: normal

   .. step:: Create an example file.

      Create a new file in the ``csharp/driver/Examples`` directory, or within 
      a subdirectory to organize these examples to group related concepts. For 
      example, you might create a file for an aggregation pipeline unwind tutorial in 
      ``/Aggregation/Pipelines/Unwind``, or a file for an insert example in 
      ``/Crud/Insert``.
   
      With the goal of single-sourcing code examples across different docs 
      projects, avoid matching a specific docs project's page structure and 
      instead group code examples by related concept or topic for easy reuse. 

      Filenames, Namespaces, and Class names
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      The following conventions help keep example files organized and
      consistent:

      -  Use PascalCase for file names and namespaces. 
      - Namespaces should match the directory structure. For example, if you 
        create a file in the ``Examples/Tests/Aggregation/Pipelines`` directory, 
        the namespace should be ``Examples.Tests.Aggregation.Pipelines``. 
      - Class names should match the file name. 
      
      For example, you have a test file for an unwind tutorial named 
      ``UnwindTests.cs``. You would then create a class named ``UnwindTests`` 
      and use the ``Examples.Tests.Aggregation.Pipelines`` namespace:
      

      .. code-block:: csharp
         :emphasize-lines: 1,3

         namespace Examples.Tests.Aggregation.Pipelines
         {
               public class UnwindTests
               {
                  // Your example code here
               }
         }


   .. step:: Add the example code to your file.

      Add the example code to your file. This should include everything 
      necessary to run the example, including imports and any necessary 
      setup code.

      a. **Add required dependencies.**

         In the C# Driver test project, add the required dependencies at the top 
         of the file. You will likely need to import both the MongoDB.Driver and 
         MongoDB.Bson package. To do so, add the following lines to the top of 
         the file:

         .. code-block:: csharp
            :emphasize-lines: 1-2

            using MongoDB.Driver;
            using MongoDB.Bson; 

            namespace Examples.Tests.Aggregation.Pipelines
            {
                public class UnwindTests
                {
                    // Your example code here
                }
            }

         .. tip:: Adding Nuget Packages

            The project should already have the required Nuget packages added to 
            it. After you run ``dotnet restore`` from the root of the 
            ``code-example-tests/csharp/driver`` directory, the required packages 
            should be available. If they are not, run the following commands from 
            the root of the ``code-example-tests/csharp/driver`` directory:

            .. code-block:: console

               dotnet add package MongoDB.Driver 
               dotnet add package MongoDB.Bson

      b. **Create and read environment variables.**

         User the following code to read the connection string from your .env file: 

         .. code-block:: csharp

           var uri = Environment.GetEnvironmentVariable("CONNECTION_STRING");

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

      c. **Create your example in a public method.**

         In the test project, create a callable (``public``) method. 
         This allows us to call the function in the test file and verify the output. 
         For better understanding of its purpose, name your method appropriately 
         for the example. 

         .. code-block:: csharp
            :emphasize-lines: 4

            using MongoDB.Driver;
            using MongoDB.Bson;

            public List<BsonDocument> RunAggregationTutorial()
            {
                // Add your example code here
            }

      d. **Add any necessary setup code.**

         The example file should include everything necessary to run the 
         example. This might include creating a database and collection, or 
         inserting documents. 


         .. code-block:: csharp
            :emphasize-lines: 6-15

            using MongoDB.Driver;
            using MongoDB.Bson;

            public List<BsonDocument> RunAggregationTutorial()
            {
                var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
                if (connectionString == null)
                {
                    Console.WriteLine("You must set your 'CONNECTION_STRING' environment variable.");
                    Environment.Exit(0);
                }

                var client = new MongoClient(connectionString);
                
                var collection = client.GetDatabase("myDatabase")
                    .GetCollection<BsonDocument>("myCollection");

                // Add your example code here
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
         documents as a ``List<BsonDocument>``:

         .. code-block:: csharp
            :emphasize-lines: 19-20

            using MongoDB.Driver;
            using MongoDB.Bson;

            public List<BsonDocument> RunAggregationTutorial()
            {
                var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
                if (connectionString == null)
                {
                    Console.WriteLine("You must set your 'CONNECTION_STRING' environment variable.");
                    Environment.Exit(0);
                }

                var client = new MongoClient(connectionString);
                
                var collection = client.GetDatabase("myDatabase")
                    .GetCollection<BsonDocument>("myCollection");

                var filter = Builders<BsonDocument>.Filter.Eq("field", "value");
                var documents = await collection.Find(filter).ToListAsync();
                return documents;
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
         ``Aggregation/Pipelines/Unwind/TutorialOutput.txt``.

         Grove uses a comparison library to compare the output from your
         expected output file with the actual output you return from the code
         example when the test runs.

         You can use ellipses to truncate long output blocks. The comparison
         library recognizes specific ellipsis patterns and can match truncated
         output. Refer to :ref:`grove-truncate-long-strings` for details.