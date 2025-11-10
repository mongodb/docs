.. procedure::
   :style: normal

   .. step:: Create an example file.

      Create a new file in the ``java/driver-sync/src/main/java`` or
      ``java/driver-reactive/src/main/java`` directory, or within a
      subdirectory to organize these examples to group related concepts. For
      example, you might create a file for an aggregation pipeline unwind
      tutorial in ``/aggregation/pipelines/unwind``, or a file for an insert
      example in ``/crud/insert``.

      With the goal of single-sourcing code examples across different docs
      projects, avoid matching a specific docs project's page structure and
      instead group code examples by related concept or topic for easy reuse.

      Filenames, Packages, and Class names
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      The following conventions help keep example files organized and
      consistent:

      - File names: Use PascalCase.
      - Class names: Use PascalCase. Class names should match the file name.
      - Package names: Use lowercase for packages. For example,
        ``package aggregation.pipelines.unwind``.
      - Package names should match the directory structure. For example, if you
        create a file in the ``aggregation/pipelines/unwind`` directory,
        the namespace should be ``aggregation.pipelines.unwind``.

      For example, you have a test file for an unwind tutorial named
      ``UnwindTutorial.java``. You would then create a class named
      ``UnwindTutorial`` and use the ``aggregation.pipelines.unwind`` package
      name:

      .. code-block:: java
         :caption: UnwindTutorial.java
         :emphasize-lines: 1,3

         package aggregation.pipelines.unwind;

         public class UnwindTutorial {
            public List<Document> runTutorial() {
               // Your example code here
            }
         }

   .. step:: Add the example code to your file.

      Add the example code to your file. This should include everything
      necessary to run the example, including imports and any necessary
      setup code.

      a. **Add required dependencies.**

         In the Java driver test project, add the required dependencies at the
         top of the file. You will likely need to import MongoDB, BSON, and
         other dependencies. To do so, add the following lines to the top of
         the file:

         .. code-block:: java
            :caption: UnwindTutorial.java
            :emphasize-lines: 1,3-10

            package aggregation.pipelines.unwind;

            import com.mongodb.client.MongoClient;
            import com.mongodb.client.MongoClients;
            import com.mongodb.client.MongoDatabase;
            import com.mongodb.client.MongoCollection;
            import org.bson.Document;
            import org.bson.conversions.Bson;
            import java.util.List;

            public class UnwindTutorial {
               public List<Document> runTutorial() {
                  // Your example code here
               }
            }

         .. important:: Avoid wildcard imports

            Avoid using wildcard imports. The IDE may automatically convert
            your import to a wildcard import when you import multiple types
            from the same package. You can manually remove the wildcard import
            and replace it with individual imports to show developers exactly
            which dependencies are required.

            .. code-block:: java

               import com.mongodb.client.*; // Avoid this.
               // Instead, explicitly list all imports...
               import com.mongodb.client.MongoClient;
               import com.mongodb.client.MongoClients;
               import com.mongodb.client.MongoCollection;

      b. **Access environment variables.**

         User the following code to get the connection string from your environment:

         .. code-block:: java

            private final String uri = System.getenv("CONNECTION_STRING");

         .. important:: Do Not Hardcode Your Connection String

            Do not hardcode the connection string in your example file.
            The Grove platform requires that you read the connection string from
            the ``CONNECTION_STRING`` environment. By reading it from the
            environment, other writers can run your example against their own
            clusters and environments, and CI can run the test suite against a
            temporary test cluster.

            Refer to the :ref:`grove-set-up-environment` page for details on how
            to add environment variables.

      c. **Create your example in a public class and a public method.**

         In the test project, create a callable (``public``) method.
         This allows us to call the function in the test file and verify the output.
         For better understanding of its purpose, name your method appropriately
         for the example.

         .. code-block:: java
            :emphasize-lines: 4, 6

            package aggregation.pipelines.unwind;

            public class UnwindTutorial {
               public List<Document> runTutorial() {
                  // Your example code here
               }
            }

      d. **Add any necessary setup code.**

         The example file should include everything necessary to run the
         example. This might include creating a database and collection, or
         inserting documents.

         .. code-block:: java
            :emphasize-lines: 9-11, 14-16

            import com.mongodb.client.MongoClient;
            import com.mongodb.client.MongoClients;
            import com.mongodb.client.MongoDatabase;
            import com.mongodb.client.MongoCollection;
            import org.bson.Document;
            import java.util.List;

            public class Tutorial {
               private final String uri = System.getenv("CONNECTION_STRING");
               private MongoClient mongoClient;
               private MongoCollection<Document> orders;

               public void loadSampleData() {
                  mongoClient = MongoClients.create(uri);
                  MongoDatabase aggDB = mongoClient.getDatabase("agg_tutorials_db");
                  orders = aggDB.getCollection("orders");
                  ...
               }

               public List<Document> runTutorial() {
                  // Your example code here
               }
            }

      e. **Return something from the method to validate your example.**

         In the test project, we verify the output of the
         example by comparing it to an expected output. To do this, you need to
         return something from the method that you can compare against the
         expected output.

         This might be a simple string, or it might be something more complex
         like an array of documents. Use your judgment to determine what makes
         sense for your example.

         In the example below, we run an aggregation pipeline that returns
         specific documents and return the documents as a ``List<Document>``:

         .. code-block:: java
            :emphasize-lines: 17-20, 22

            public List<Document> runTutorial() {
               List<Bson> pipeline = new ArrayList<>();
               pipeline.add(Aggregates.unwind("$products"));
               pipeline.add(Aggregates.match(
                        Filters.gt("products.price", 15)
               ));
               pipeline.add(Aggregates.group(
                        "$products.prod_id",
                        Accumulators.first("product", "$products.name"),
                        Accumulators.sum("total_value", "$products.price"),
                        Accumulators.sum("quantity", 1)
               ));
               pipeline.add(Aggregates.set(new Field<>("product_id", "$_id")));
               pipeline.add(Aggregates.unset("_id"));
               AggregateIterable<Document> aggregationResult = orders.aggregate(pipeline);

               List<Document> documents = new ArrayList<>();
               for (Document document : aggregationResult) {
                  documents.add(document);
               }
               mongoClient.close();
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
         ``Output``. For example,
         ``aggregation/pipelines/unwind/TutorialOutput.txt``.

         Grove uses a comparison library to compare the output from your
         expected output file with the actual output you return from the code
         example when the test runs.

         You can use ellipses to truncate long output blocks. The comparison
         library recognizes specific ellipsis patterns and can match truncated
         output. Refer to :ref:`grove-truncate-long-strings` for details.
