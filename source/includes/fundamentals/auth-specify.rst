You can specify your authentication mechanism and credentials when connecting
to MongoDB using either of the following:

- a connection string
- a ``MongoCredential`` factory method

A **connection string** or **connection uri** provides instructions on how
to connect and authenticate to your MongoDB cluster. To specify your
authentication mechanism using a connection string, include your settings in
your connection string and pass it to the ``MongoClients.create()`` method
to instantiate your ``MongoClient``. Select the :guilabel:`Connection String`
tab to see the syntax for authenticating using a **connection string**.

Alternatively, you can use the ``MongoCredential`` class to specify your
authentication details. The ``MongoCredential`` class contains static factory
methods that construct instances containing your authentication mechanism and
credentials. When you use the ``MongoCredential`` helper class, you need
to use the ``MongoClientSettings.Builder`` class to configure your
connection settings when constructing your ``MongoClient``.  Select the
:guilabel:`MongoCredential` tab to see the syntax for authenticating using a
``MongoCredential``.

For more information on these classes and methods, refer to the following API
documentation:

- :java-docs:`MongoClients.create() <apidocs/mongodb-driver-sync/com/mongodb/client/MongoClients.html#create()>`
- :java-docs:`MongoClient <apidocs/mongodb-driver-sync/com/mongodb/client/MongoClient.html>`
- :java-docs:`MongoClientSettings.Builder <apidocs/mongodb-driver-core/com/mongodb/MongoClientSettings.Builder.html>`
- :java-docs:`MongoCredential <apidocs/mongodb-driver-core/com/mongodb/MongoCredential.html>`
