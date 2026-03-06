To write data to MongoDB, call the ``write`` function on your
``DataFrame`` object. This function returns a
``DataFrameWriter``
object, which you can use to specify the format and other configuration settings for your
batch write operation. 

.. include:: /includes/batch-write-settings.rst

The following example uses the ``createDataFrame()`` function on the ``SparkSession``
object to create a ``DataFrame`` object from a list of tuples containing names
and ages and a list of column names. The example then writes this ``DataFrame`` to the
``people.contacts`` collection in MongoDB.

.. code-block:: python

   dataFrame = spark.createDataFrame([("Bilbo Baggins",  50), ("Gandalf", 1000), ("Thorin", 195), ("Balin", 178), ("Kili", 77),
      ("Dwalin", 169), ("Oin", 167), ("Gloin", 158), ("Fili", 82), ("Bombur", None)], ["name", "age"])

   dataFrame.write.format("mongodb")
                  .mode("append")
                  .option("database", "people")
                  .option("collection", "contacts")
                  .save()