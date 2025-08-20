Logger Names
------------

Your logger uses logger names to help organize different logging events. Logger
names are strings that form a hierarchy. A logger is an ancestor of another logger if
its name followed by a ``"."`` is a prefix of the other logger's name. For example,
``"grandparent"`` is an ancestor of ``"grandparent.parent"`` which is an
ancestor of ``"grandparent.parent.child"``.

For a concrete example, this is what a logger hierarchy looks like in code:

.. code-block:: java

   import org.slf4j.Logger;
   import org.slf4j.LoggerFactory;

   ...

   Logger logger_parent = LoggerFactory.getLogger("parent");
   Logger logger_child = LoggerFactory.getLogger("parent.child");

A logger inherits the properties of its ancestor logger and can define
its own. You can think of this as similar to class inheritance in Java.

The MongoDB Java driver defines the following logger names to organize different
logging events in the driver. The driver defines the following logger names
and corresponding logging events:

* ``org.mongodb.driver.authenticator`` : Authentication
* ``org.mongodb.driver.client`` : Events related to ``MongoClient`` instances
* ``org.mongodb.driver.cluster`` : Monitoring of MongoDB deployments
* ``org.mongodb.driver.connection`` : Connections and connection pools
* ``org.mongodb.driver.connection.tls`` : TLS/SSL
* ``org.mongodb.driver.operation`` : Operations, including logging related to automatic retries
* ``org.mongodb.driver.protocol`` : Commands sent to and replies received from MongoDB deployments
* ``org.mongodb.driver.uri`` : Connection string parsing
* ``org.mongodb.driver.management`` : Java Management Extensions (JMX)

Example - Names
~~~~~~~~~~~~~~~

This example shows how to change the log level for a specific driver logger.
The example sets the root logger to OFF and the ``org.mongodb.driver.connection`` logger to
INFO. This will cause the application to only log messages related to connecting
to a MongoDB instance.