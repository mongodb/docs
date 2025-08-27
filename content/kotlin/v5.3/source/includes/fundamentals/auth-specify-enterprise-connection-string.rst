You can specify your authentication mechanism and credentials when connecting
to MongoDB using either of the following:

- A connection string
- A ``MongoCredential`` factory method

A **connection string** (also known as a **connection URI**) specifies how to
connect and authenticate to your MongoDB cluster.

To authenticate using a connection string, include your settings in your
connection string and pass it to the ``MongoClient.create()`` method to
instantiate your ``MongoClient``. The following examples provide the syntax for authenticating using a
**connection string**.

For more information on these classes and methods, refer to the following API
documentation:

- `MongoClient.create() <{+driver-api+}/-mongo-client/-factory/create.html>`__
- `MongoClient <{+driver-api+}/-mongo-client/index.html>`__