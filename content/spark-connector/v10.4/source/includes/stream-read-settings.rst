You must specify the following configuration settings to read from MongoDB:

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 10 40
         
   * - Setting
     - Description
         
   * - ``readStream.format()``
     - Specifies the format of the underlying input data source. Use ``mongodb``
       to read from MongoDB.

   * - ``readStream.option()``
     - Specifies stream settings, including the MongoDB deployment
       :manual:`connection string </reference/connection-string/>`,
       MongoDB database and collection, and aggregation pipeline stages.

       For a list of read stream configuration options, see
       the :ref:`spark-streaming-read-conf` guide.
        
   * - ``readStream.schema()``
     - Specifies the input schema.