You must specify the following configuration settings to read from MongoDB:
         
.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 10 40
         
   * - Setting
     - Description
         
   * - ``dataFrame.read.format()``
     - Specifies the format of the underlying input data source. Use ``mongodb``
       to read from MongoDB.
         
   * - ``dataFrame.read.option()``
     - Use the ``option`` method to configure batch read settings, including the
       MongoDB deployment
       :manual:`connection string </reference/connection-string/>`,
       MongoDB database and collection, and
       partitioner configuration.

       For a list of batch read configuration options, see
       the :ref:`spark-batch-read-conf` guide.
