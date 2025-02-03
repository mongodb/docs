If you use :ref:`SparkConf <spark-conf>` to specify any of the previous settings, you can
either include them in the ``connection.uri`` setting or list them individually.

The following code example shows how to specify the
database, collection, and read preference as part of the ``connection.uri`` setting:

.. code:: cfg

  spark.mongodb.read.connection.uri=mongodb://127.0.0.1/myDB.myCollection?readPreference=primaryPreferred

To keep the ``connection.uri`` shorter and make the settings easier to read, you can
specify them individually instead:

.. code:: cfg

   spark.mongodb.read.connection.uri=mongodb://127.0.0.1/
   spark.mongodb.read.database=myDB
   spark.mongodb.read.collection=myCollection 

.. important::

   If you specify a setting in both the ``connection.uri`` and on its own line,
   the ``connection.uri`` setting takes precedence.
   For example, in the following configuration, the connection
   database is ``foobar``, because it's the value in the ``connection.uri`` setting:

   .. code:: cfg

      spark.mongodb.read.connection.uri=mongodb://127.0.0.1/foobar
      spark.mongodb.read.database=bar
