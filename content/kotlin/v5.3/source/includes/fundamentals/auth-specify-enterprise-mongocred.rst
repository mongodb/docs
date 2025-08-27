You can specify your authentication mechanism and credentials when connecting
to MongoDB using either of the following:

- A connection string
- A ``MongoCredential`` factory method

You can use the ``MongoCredential`` class to specify how to
connect and authenticate to your MongoDB cluster.

The ``MongoCredential`` class contains static factory
methods that construct instances containing your authentication mechanism and
credentials. When you use the ``MongoCredential`` helper class, you need
to use the ``MongoClientSettings.Builder`` class to configure your
connection settings when constructing your ``MongoClient``.  The
following examples provide the syntax for
authenticating using a ``MongoCredential``.

For more information on these classes and methods, refer to the following API
documentation:

- `MongoClientSettings.Builder <{+core-api+}/MongoClientSettings.Builder.html>`__
- `MongoCredential <{+core-api+}/MongoCredential.html>`__