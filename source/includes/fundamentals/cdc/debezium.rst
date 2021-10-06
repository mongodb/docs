.. _cdc-debezium-example:

Your sink connector can replicate Debezium CDC events originating from these datastores:

- MongoDB
- Postgres
- MySQL

Click the following tabs to see how to configure the Debezium CDC handler to replicate
CDC events from each of the preceding datastores: 

.. tabs::

   .. tab::
      :tabid: MongoDB

      The following properties file configures a sink connector to replicate
      Debezium CDC events corresponding to changes in a MongoDB instance:

      .. code-block:: properties
         :emphasize-lines: 6

         connector.class=com.mongodb.kafka.connect.sink.MongoSinkConnector
         connection.uri=<your connection uri>
         database=<your mongodb database>
         collection=<your mongodb collection>
         topics=<topic containing debezium cdc events>
         change.data.capture.handler=com.mongodb.kafka.connect.sink.cdc.debezium.mongodb.MongoDbHandler

      To view the source code for the Debezium CDC handler, see
      :github:`the {+mkc+} source code </mongodb/mongo-kafka/tree/master/src/main/java/com/mongodb/kafka/connect/sink/cdc/debezium>`.

   .. tab::
      :tabid: Postgres

      The following properties file configures a sink connector to replicate
      Debezium CDC events corresponding to changes in a Postgres instance:

      .. code-block:: properties
         :emphasize-lines: 6

         connector.class=com.mongodb.kafka.connect.sink.MongoSinkConnector
         connection.uri=<your connection uri>
         database=<your mongodb database>
         collection=<your mongodb collection>
         topics=<topic containing debezium cdc events>
         change.data.capture.handler=com.mongodb.kafka.connect.sink.cdc.debezium.rdbms.postgres.PostgresHandler

      To view the source code for the Debezium CDC handler, see
      :github:`the {+mkc+} source code <mongodb/mongo-kafka/blob/master/src/main/java/com/mongodb/kafka/connect/sink/cdc/debezium/rdbms/postgres/PostgresHandler.java>`.

   .. tab::
      :tabid: MySQL

      The following properties file configures a sink connector to replicate
      Debezium CDC events corresponding to changes in a MySQL instance:

      .. code-block:: properties
         :emphasize-lines: 6

         connector.class=com.mongodb.kafka.connect.sink.MongoSinkConnector
         connection.uri=<your connection uri>
         database=<your mongodb database>
         collection=<your mongodb collection>
         topics=<topic containing debezium cdc events>
         change.data.capture.handler=com.mongodb.kafka.connect.sink.cdc.debezium.rdbms.mysql.MysqlHandler

      To view the source code for the Debezium CDC handler, see
      :github:`the {+mkc+} source code <mongodb/mongo-kafka/blob/master/src/main/java/com/mongodb/kafka/connect/sink/cdc/debezium/rdbms/mysql/MysqlHandler.java>`.

.. note:: Customize the Debezium CDC Handler

   If the Debezium CDC handler is unable to replicate CDC events
   from your datastore, you can customize the handler by extending the 
   :github:`DebeziumCdcHandler <mongodb/mongo-kafka/blob/master/src/main/java/com/mongodb/kafka/connect/sink/cdc/debezium/DebeziumCdcHandler.java>` 
   class. For more information on custom CDC handlers, see the
   :ref:`Create your Own CDC Handler section <cdc-create-your-own>` of this guide.
