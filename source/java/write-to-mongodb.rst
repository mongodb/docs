To write data to MongoDB, call the ``write()`` method on your
``Dataset<Row>`` object. This method returns a
``DataFrameWriter``
object, which you can use to specify the format and other configuration settings for your
batch write operation. 

.. include:: /includes/batch-write-settings.rst

The following example creates a DataFrame from a ``json`` file and 
saves it to the ``people.contacts`` collection in MongoDB:

.. code-block:: java

   Dataset<Row> dataFrame = spark.read().format("json")
                                        .load("example.json");

   dataFrame.write().format("mongodb")
                    .mode("overwrite")
                    .option("database", "people")
                    .option("collection", "contacts")
                    .save();

.. include:: /includes/java-dataframe-tip.rst