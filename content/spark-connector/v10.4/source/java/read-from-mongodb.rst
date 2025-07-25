To read data from MongoDB, call the ``read()`` method on your
``SparkSession`` object. This method returns a
``DataFrameReader`` object, which you can use to specify the format and other
configuration settings for your batch read operation. 

.. include:: /includes/batch-read-settings.rst

The following code example shows how to use the previous
configuration settings to read data from ``people.contacts`` in MongoDB:

.. code-block:: java

   Dataset<Row> dataFrame = spark.read()
                          .format("mongodb")
                          .option("database", "people")
                          .option("collection", "contacts")
                          .load();

.. include:: /includes/java-dataframe-tip.rst
