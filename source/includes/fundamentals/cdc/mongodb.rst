.. _cdc-mongodb-example:

The following properties file configures a sink connector to replicate
MongoDB change event documents:

.. code-block:: properties
   :emphasize-lines: 6

   connector.class=com.mongodb.kafka.connect.MongoSinkConnector
   connection.uri=<your connection uri>
   database=<your database>
   collection=<your collection>
   topics=<topic containing mongodb change event documents>
   change.data.capture.handler=com.mongodb.kafka.connect.sink.cdc.mongodb.ChangeStreamHandler

To view the source code for the MongoDB CDC handler, see
:github:`the {+mkc+} source code <mongodb/mongo-kafka/tree/master/src/main/java/com/mongodb/kafka/connect/sink/cdc/mongodb>`.
