To read data from MongoDB, call the ``read`` function on your
``SparkSession`` object. This function returns a
``DataFrameReader``
object, which you can use to specify the format and other configuration settings for your
batch read operation. 

.. include:: /includes/batch-read-settings.rst

The following code example shows how to use the previous
configuration settings to read data from ``people.contacts`` in MongoDB:

.. code-block:: python

   dataFrame = spark.read
                    .format("mongodb")
                    .option("database", "people")
                    .option("collection", "contacts")
                    .load()
