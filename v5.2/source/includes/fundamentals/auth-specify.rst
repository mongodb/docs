You can specify your authentication mechanism and credentials when connecting
to MongoDB using either of the following:

- A connection string
- A ``MongoCredential`` factory method

A **connection string** (also known as a **connection uri**) specifies how to
connect and authenticate to your MongoDB cluster.

To authenticate using a connection string, include your settings in your
connection string and pass it to the ``MongoClients.create()`` method to
instantiate your ``MongoClient``. Select the :guilabel:`Connection String`
tab to see the syntax for authenticating using a **connection string**.

Alternatively, you can use the ``MongoCredential`` class to specify your
authentication details. The ``MongoCredential`` class contains static factory
methods that construct instances containing your authentication mechanism and
credentials. When you use the ``MongoCredential`` helper class, you need
to use the ``MongoClientSettings.Builder`` class to configure your
connection settings when constructing your ``MongoClient``.  Select the
:guilabel:`MongoCredential` tab to see the syntax for authenticating using a
``MongoCredential``.

For more information about these classes and methods, see the following API
documentation:

- `MongoClients.create() <{+api+}/apidocs/mongodb-driver-sync/com/mongodb/client/MongoClients.html#create()>`__
- `MongoClient <{+api+}/apidocs/mongodb-driver-sync/com/mongodb/client/MongoClient.html>`__
- `MongoClientSettings.Builder <{+api+}/apidocs/mongodb-driver-core/com/mongodb/MongoClientSettings.Builder.html>`__
- `MongoCredential <{+api+}/apidocs/mongodb-driver-core/com/mongodb/MongoCredential.html>`__
