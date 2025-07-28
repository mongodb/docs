You can specify your authentication mechanism and credentials when connecting
to MongoDB using either of the following:

- A connection string
- A ``MongoCredential`` factory method

A **connection string** (also known as a **connection URI**) specifies how to
connect and authenticate to your MongoDB cluster.

To authenticate using a connection string, include your settings in your
connection string and pass it to the ``MongoClient.create()`` method to
instantiate your ``MongoClient``. The :guilabel:`Connection String`
tab in each section provides the syntax for authenticating using a 
**connection string**.

Alternatively, you can use the ``MongoCredential`` class to specify your
authentication details. The ``MongoCredential`` class contains static factory
methods that construct instances containing your authentication mechanism and
credentials. When you use the ``MongoCredential`` helper class, you need
to use the ``MongoClientSettings.Builder`` class to configure your
connection settings when constructing your ``MongoClient``.  The
:guilabel:`MongoCredential` tab in each section provides the syntax for 
authenticating using a ``MongoCredential``.

For more information on these classes and methods, refer to the following API
documentation:

- `MongoClient.create() <{+api+}/apidocs/mongodb-driver-kotlin-coroutine/mongodb-driver-kotlin-coroutine/com.mongodb.kotlin.client.coroutine/-mongo-client/-factory/create.html>`__
- `MongoClient <{+api+}/apidocs/mongodb-driver-kotlin-coroutine/mongodb-driver-kotlin-coroutine/com.mongodb.kotlin.client.coroutine/-mongo-client/index.html>`__
- `MongoClientSettings.Builder <{+api+}/apidocs/mongodb-driver-core/com/mongodb/MongoClientSettings.Builder.html>`__
- `MongoCredential <{+api+}/apidocs/mongodb-driver-core/com/mongodb/MongoCredential.html>`__
