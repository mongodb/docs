Authentication
~~~~~~~~~~~~~~

MongoDB can be run in a secure mode where access to databases is
controlled via authentication. When run in this mode, any client application
must provide a list of credentials which will be used to authenticate against.
In the Java driver, you simply provide the credentials when creating a
``MongoClient`` instance:

.. code-block:: java

   MongoCredential credential = MongoCredential.createCredential(userName, database, password);
   MongoClient mongoClient = new MongoClient(new ServerAddress(), Arrays.asList(credential));

or in the connection string:

.. code-block:: java

   MongoClient mongoClient = new MongoClient(new MongoClientURI("mongodb://user:pwd@localhost"));

MongoDB supports various different authentication mechanisms. See the `access control tutorials`_ for more information.

.. _`access control tutorials`: http://docs.mongodb.com/manual/administration/security-access-control
