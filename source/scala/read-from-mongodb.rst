To read data from MongoDB, call the ``read`` method on your
``SparkSession`` object. This method returns a
``DataFrameReader``
object, which you can use to specify the format and other configuration settings for your
batch read operation. 

.. include:: /includes/batch-read-settings.rst

The following code example shows how to use the previous
configuration settings to read data from ``people.contacts`` in MongoDB:

.. code-block:: scala

   val dataFrame = spark.read
                 .format("mongodb")
                 .option("database", "people")
                 .option("collection", "contacts")
                 .load()

.. tip:: DataFrame Type
   
   A DataFrame is represented by a ``Dataset`` of ``Row`` objects.
   The ``DataFrame`` type is an alias for ``Dataset[Row]``.
