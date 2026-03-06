You must specify the following configuration settings to write to MongoDB:
         
.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 10 40
         
   * - Setting
     - Description
         
   * - ``dataFrame.write.format()``
     - Specifies the format of the underlying output data source. Use ``mongodb``
       to write to MongoDB.
         
   * - ``dataFrame.write.option()``
     - Use the ``option`` method to configure batch write settings, including the
       MongoDB deployment
       :manual:`connection string </reference/connection-string/>`,
       MongoDB database and collection, and
       destination directory.

       For a list of batch write configuration options, see
       the :ref:`spark-batch-write-conf` guide.
