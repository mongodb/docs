You can specify your authentication mechanism and credentials when connecting
to MongoDB using either of the following:

- a connection string
- a ``MongoCredential`` factory method

A **connection string** or **connection uri** provides instructions on how
to connect and authenticate to your MongoDB cluster. To specify your
authentication mechanism using a connection string, include your settings in
your connection string and pass it to the ``MongoClients.create()`` method
to instantiate your ``MongoClient``. For descriptions of how to use a
connection string to specify your authentication method, navigate to the
relevant mechanism section and select the :guilabel:`Connection String` tab.

Alternatively, you can use the ``MongoCredential`` class to specify your
authentication details. The ``MongoCredential`` class contains static factory
methods that construct instances containing your authentication mechanism and
credentials. When you use the ``MongoCredential`` helper class, you need
to use the ``MongoClientSettings.Builder`` class to configure your
connection settings when constructing your ``MongoClient``. For
a description of how to use the ``MongoCredential`` class to specify your
authentication method, navigate to the relevant mechanism section and select
the :guilabel:`MongoCredential` tab.

For more information on these classes and methods, refer to the following API
documentation:

- :java-sync-api:`MongoClients.create() </com/mongodb/client/MongoClients.html#create(com.mongodb.ConnectionString)>`
- :java-sync-api:`MongoClient </com/mongodb/client/MongoClient.html>`
- :java-sync-api:`MongoClientSettings.Builder </com/mongodb/MongoClientSettings.Builder.html>`
- :java-sync-api:`MongoCredential </com/mongodb/MongoCredential.html>`
