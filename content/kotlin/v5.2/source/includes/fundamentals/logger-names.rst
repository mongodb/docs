Logger Names
------------

Your logger uses logger names to help organize different logging events. Logger
names are strings that form a hierarchy. A logger is an ancestor of another logger if
its name followed by a ``"."`` is a prefix of the other logger's name. For example,
``"grandparent"`` is an ancestor of ``"grandparent.parent"`` which is an
ancestor of ``"grandparent.parent.child"``.

For a concrete example, this is what a logger hierarchy looks like in code.

.. literalinclude:: /examples/generated/LoggingTest.snippet.slf4j-import.kt
   :language: kotlin

.. literalinclude:: /examples/generated/LoggingTest.snippet.slf4j.kt
   :language: kotlin

A logger inherits the properties of its ancestor logger and can define
its own. You can think of this as similar to class inheritance in Kotlin.

The MongoDB Kotlin driver defines the following logger names to organize different
logging events in the driver. Here are the logger names defined in the driver
and the logging events they correspond to:

* ``org.mongodb.driver.authenticator`` : authentication
* ``org.mongodb.driver.client`` : events related to ``MongoClient`` instances
* ``org.mongodb.driver.cluster`` : monitoring of MongoDB servers
* ``org.mongodb.driver.connection`` : connections and connection pools
* ``org.mongodb.driver.connection.tls`` : TLS/SSL
* ``org.mongodb.driver.operation`` : operations, including logging related to automatic retries
* ``org.mongodb.driver.protocol`` : commands sent to and replies received from MongoDB servers
* ``org.mongodb.driver.uri`` : connection string parsing
* ``org.mongodb.driver.management`` : JMX (Java Management Extensions)

Example - Names
~~~~~~~~~~~~~~~

This example shows how to change the log level for a specific driver logger.
We set the root logger to OFF and the ``org.mongodb.driver.connection`` logger to
INFO. This will cause the application to only log messages related to connecting
to a MongoDB instance.