.. _cdc-qlik-replicate-example:

Your sink connector can replicate Qlik Replicate CDC events originating from these
datastores:

- OracleDB
- MySQL
- Postgres

The following properties file configures a sink connector to replicate
Qlik Replicate CDC events:

.. code-block:: properties
   :emphasize-lines: 6

   connector.class=com.mongodb.kafka.connect.MongoSinkConnector
   connection.uri=<your connection uri>
   database=<your database>
   collection=<your collection>
   topics=<topic containing qlik replicate cdc events>
   change.data.capture.handler=com.mongodb.kafka.connect.sink.cdc.qlik.rdbms.RdbmsHandler

To view the source code for the Qlik Replicate CDC handler, see
:github:`the {+mkc+} source code </mongodb/mongo-kafka/tree/{+connector_version_github_tag+}/src/main/java/com/mongodb/kafka/connect/sink/cdc/qlik/rdbms/RdbmsHandler.java>`.

.. note:: Customize the Qlik Replicate CDC Handler

   If the Qlik Replicate CDC handler is unable to replicate CDC events
   from your datastore, you can customize the handler by extending the 
   :github:`QlikCdcHandler <mongodb/mongo-kafka/blob/{+connector_version_github_tag+}/src/main/java/com/mongodb/kafka/connect/sink/cdc/qlik/QlikCdcHandler.java>` 
   class. For more information on custom CDC handlers, see the
   :ref:`Create your Own CDC Handler section <cdc-create-your-own>` of this guide.
