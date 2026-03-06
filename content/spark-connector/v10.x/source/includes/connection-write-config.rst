If you use :ref:`SparkConf <spark-conf>` to specify any of the previous settings, you can
either include them in the ``connection.uri`` setting or list them individually.

The following code example shows how to specify the
database, collection, and ``convertJson`` setting as part of the ``connection.uri``
setting: 

.. code:: cfg

  spark.mongodb.write.connection.uri=mongodb://127.0.0.1/myDB.myCollection?convertJson=any

To keep the ``connection.uri`` shorter and make the settings easier to read, you can
specify them individually instead:

.. code:: cfg

   spark.mongodb.write.connection.uri=mongodb://127.0.0.1/
   spark.mongodb.write.database=myDB
   spark.mongodb.write.collection=myCollection
   spark.mongodb.write.convertJson=any

.. important::

   If you specify a setting in both the ``connection.uri`` and on its own line,
   the ``connection.uri`` setting takes precedence.
   For example, in the following configuration, the connection
   database is ``foobar``:

   .. code:: cfg

      spark.mongodb.write.connection.uri=mongodb://127.0.0.1/foobar
      spark.mongodb.write.database=bar