Connection Settings
-------------------

You can apply logging settings to your ``MongoClient`` instance by using the `applyToLoggerSettings() <{+core-api+}/MongoClientSettings.Builder.html#applyToLoggerSettings(com.mongodb.Block)>`__
and `applicationName() <{+core-api+}/MongoClientSettings.Builder.html#applicationName(java.lang.String)>`__ methods.

The following table describes the methods that you can chain to your
logger settings to modify the logging behavior:

.. list-table::
   :widths: 40 60
   :header-rows: 1

   * - Method
     - Description

   * - ``maxDocumentLength()``
     - Sets the maximum document length, in characters, of a single log message
       
       **Default**: ``1000``

Example
~~~~~~~

This example names the application sending requests and specifies that the maximum number of characters for a single log message is set to ``5000`` characters.

.. literalinclude:: /includes/fundamentals/code-snippets/MCSettings.java
   :start-after: begin LoggerSettings
   :end-before: end LoggerSettings
   :language: java
   :emphasize-lines: 3-4
   :dedent:

You should see output that resembles the following:

.. code-block:: none
   :copyable: false

   01:20:38.782 [main] INFO org.mongodb.driver.client -- MongoClient with
   metadata {"application": {"name": "<application name>"}, ...,
   loggerSettings=LoggerSettings{maxDocumentLength=5000}, ... timeoutMS=null}
   ...
   01:20:41.022 [main] DEBUG org.mongodb.driver.protocol.command -- Command
   "listDatabases" succeeded ... Command reply: {"databases": [...], ...}
   01:20:41.024 [main] DEBUG org.mongodb.driver.connection -- Connection checked in: address=<address>, driver-generated ID=6
   myDb
   sample_airbnb
   sample_analytics
   ...
 
For more information, see the `MongoClientSettings.Builder
<{+core-api+}/MongoClientSettings.Builder.html>`__
API documentation. 