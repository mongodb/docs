.. procedure::
   :style: normal

   .. step:: Create an example file.

      Create a new file in the ``python/pymongo/examples`` directory, or within
      a subdirectory to organize these examples to group related concepts. For
      example, you might create a file for an aggregation pipeline unwind tutorial in
      ``/aggregation/pipelines/unwind``, or a file for an insert example in
      ``/crud/insert``.

      With the goal of single-sourcing code examples across different docs
      projects, avoid matching a specific docs project's page structure and
      instead group code examples by related concept or topic for easy reuse.

      Use snake case for Python file names.

      For example, if you have a test file for an unwind tutorial, you might name
      it ``unwind_tutorial.py``.

   .. step:: Add the example code to your file.

      Add the example code to your file. This should include everything
      necessary to run the example, including imports and any necessary
      setup code.

      a. **Add required dependencies.**

         In the PyMongo Driver test project, add the required dependencies at
         the top of the file. You will likely need to import the MongoDB
         Driver client. To do so, add the following line to the top of the file:

         .. code-block:: python

            from pymongo import MongoClient

      b. **Create and read environment variables.**

         For the PyMongo project, you'll read the ``CONNECTION_STRING``
         environment variable from the ``.env`` file in your test setup code.
         You'll pass it to the function that runs your example, and refer to it
         in your example code.

         .. code-block:: python

            from pymongo import MongoClient

            def example(CONNECTION_STRING):
               client = MongoClient(CONNECTION_STRING)

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

            Refer to the :ref:`grove-add-tests` page for details on how to read
            the connection string from the .env file.

      c. **Create your example in a callable method.**

         In your example file, create a callable method. This allows us to
         call the function from the test file and verify the output.

         .. code-block:: python

            from pymongo import MongoClient

            def example(CONNECTION_STRING):

      d. **Add any necessary setup code.**

         The example file should include everything necessary to run the
         example. This might include creating a database and collection, or
         inserting documents.

         .. code-block:: python

            from pymongo import MongoClient

            def example(CONNECTION_STRING):
               # Set up the client, connect to the database, and add
               # sample data before showing the code that uses the data.
               client = MongoClient(CONNECTION_STRING)
               try:
                  agg_db = client["agg_tutorials_db"]

                  orders_coll = agg_db["orders"]

                  order_data = [
                     {
                        "order_id": 6363763262239,
                        "products": [
                           {
                                 "prod_id": "abc12345",
                                 "name": "Asus Laptop",
                                 "price": 431,
                           },
                           {
                                 "prod_id": "def45678",
                                 "name": "Karcher Hose Set",
                                 "price": 22,
                           },
                        ],
                     },
                     ...
                  ]
                  orders_coll.insert_many(order_data)

                  # Your example code here

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

         .. code-block:: python
            :emphasize-lines: 13-15, 17

            from pymongo import MongoClient

            def example(CONNECTION_STRING):
               client = MongoClient(CONNECTION_STRING)
               try:
                  agg_db = client["agg_tutorials_db"]

                  orders_coll = agg_db["orders"]

                  # Setup and example code here

                  results = orders_coll.find(filter)
                  docs = []
                  for doc in results:
                     docs.append(doc)
                  client.close()
                  return docs

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
         ``aggregation/pipelines/unwind/unwind-tutorial-output.txt``.

         Grove uses a comparison library to compare the output from your
         expected output file with the actual output you return from the code
         example when the test runs.

         You can use ellipses to truncate long output blocks. The comparison
         library recognizes specific ellipsis patterns and can match truncated
         output. Refer to :ref:`grove-truncate-long-strings` for details.
