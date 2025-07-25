First, connect to a MongoDB deployment, then declare and define
``MongoDatabase`` and ``MongoCollection`` instances.

The following code connects to a standalone
MongoDB deployment running on ``localhost`` on port ``27017``. Then, it
defines the ``database`` variable to refer to the ``test`` database and
the ``collection`` variable to refer to the ``restaurants`` collection:

.. code-block:: java

   MongoClient mongoClient = MongoClients.create();
   MongoDatabase database = mongoClient.getDatabase("test");
   MongoCollection<Document> collection = database.getCollection("restaurants");

To learn more about connecting to MongoDB deployments,
see the :ref:`java-rs-connect` tutorial.