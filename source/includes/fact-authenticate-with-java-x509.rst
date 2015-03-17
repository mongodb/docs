MONGODB-X509 Authentication
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The MONGODB-X509 mechanism authenticates a user whose name is derived
from the distinguished subject name of the X.509 certificate presented
by the driver during SSL negotiation.

This authentication method requires the use of SSL connections with
certificate validation and is available in MongoDB 2.6 and newer:

.. code-block:: java

   MongoCredential credential = MongoCredential.createMongoX509Credential("<X.509 derived username>");

   MongoClient mongoClient = new MongoClient(new ServerAddress(server), Arrays.asList(credential), MongoClientOptions.builder().sslEnabled(true).build());
