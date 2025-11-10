.. procedure::
   :style: normal

   .. step:: Create an example file.

      Create a new file in the ``/examples`` directory.
      Use kebab case for file names. For example, ``tutorial-setup.js``.

      Organize these examples to group related concepts. For example, you
      might create a file for an aggregation pipeline unwind tutorial in
      ``aggregation/pipelines/unwind``, or a file for an insert example in
      ``crud/insert``.

      .. tip:: Name based on concepts, not docs page structure.

         With the goal of single-sourcing code examples across different docs
         projects, avoid matching a specific docs project's page structure and
         instead group code examples by related concept or topic for easy reuse.

   .. step:: Add the example code to your file.

      Add the example code to your file. This should include everything
      necessary to run the example, including imports and any necessary
      setup code.

      a. **Import required dependencies.**

         In the JavaScript Driver test project, we use module syntax with named
         imports to import relevant dependencies.

         .. code-block:: javascript

            import { MongoClient } from "mongodb";

      b. **Read the connection string from the environment.**

         The JavaScript Driver test project reads the MongoDB connection string
         from the ``CONNECTION_STRING`` environment variable. Use the following
         code to read the connection string from the environment:

         .. code-block:: javascript

            const uri = process.env.CONNECTION_STRING;

         .. important:: Do Not Hardcode Your Connection String

            The Grove platform requires that you read the connection string from
            the ``CONNECTION_STRING`` environment variable. Do not hardcode the
            connection string in your example file. By reading it from the
            environment, other writers can run your example against their own
            clusters and environments, and CI can run the test suite against a
            temporary test cluster.

      c. **Add any necessary setup code.**

         The example file should include everything necessary to run the
         example. This might include creating a database and collection, or
         inserting documents.

         .. code-block:: javascript
            :emphasize-lines: 3-4, 8-10

            import { MongoClient } from "mongodb";

            const uri = process.env.CONNECTION_STRING;
            const client = new MongoClient(uri);

            async function runUnwindTutorial() {
               try {
                  await client.connect();
                  const database = client.db("myDatabase");
                  const collection = database.collection("myCollection");

                  // Add your example code here
               } finally {
                  await client.close();
               }
            }

      d. **Create your example in a callable function.**

         In the JavaScript Driver test project, we wrap the example code in a
         callable function. This allows us to call the function in the test file
         and verify the output.

         .. code-block:: javascript
            :emphasize-lines: 6, 16

            import { MongoClient } from "mongodb";

            const uri = process.env.CONNECTION_STRING;
            const client = new MongoClient(uri);

            async function runUnwindTutorial() {
               try {
                  await client.connect();
                  const database = client.db("myDatabase");
                  const collection = database.collection("myCollection");

                  // Add your example code here
               } finally {
                  await client.close();
               }
            }

      e. **Return something from the function to validate your example.**

         In the JavaScript Driver test project, we verify the output of the
         example by comparing it to an expected output. To do this, you need to
         return something from the function that you can compare against the
         expected output.

         This might be a simple string, or it might be something more complex
         like an array of documents. Use your judgment to determine what makes
         sense for your example.

         In the example below, we iterate through the results of an aggregation
         pipeline to create an array of documents, and return the documents.

         .. code-block:: javascript
            :emphasize-lines: 14-19

            import { MongoClient } from "mongodb";

            const uri = process.env.CONNECTION_STRING;
            const client = new MongoClient(uri);

            async function runUnwindTutorial() {
               try {
                  await client.connect();
                  const database = client.db("myDatabase");
                  const collection = database.collection("myCollection");

                  // Add your example code here...

                  const aggregationResult = await persons.aggregate(pipeline);
                  const documents = [];
                  for await (const document of aggregationResult) {
                    documents.push(document);
                  }
                  return documents;
               } finally {
                  await client.close();
               }
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
         ``aggregation/pipelines/unwind/tutorial-output.sh``.

         Grove uses a comparison library to compare the output from your
         expected output file with the actual output you return from the code
         example when the test runs.

         You can use ellipses to truncate long output blocks. The comparison
         library recognizes specific ellipsis patterns and can match truncated
         output. Refer to :ref:`grove-truncate-long-strings` for details.
