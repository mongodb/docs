First, connect to a MongoDB deployment, then declare and define
``MongoDatabase`` and ``MongoCollection`` instances.

The following code connects to a standalone
MongoDB deployment running on ``localhost`` on port ``27017``. Then, it
defines the ``database`` variable to refer to the ``test`` database and
the ``collection`` variable to refer to the ``restaurants`` collection:

.. code-block:: scala

   val mongoClient: MongoClient = MongoClient()
   val database: MongoDatabase = mongoClient.getDatabase("test")
   val collection: MongoCollection[Document] = database.getCollection("restaurants")

To learn more about connecting to MongoDB deployments,
see the :ref:`scala-connect` tutorial.