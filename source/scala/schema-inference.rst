.. _scala-schema-inference:

.. include:: /includes/schema-inference-intro.rst

.. code-block:: scala
   
   val dataFrame = spark.read()
                        .format("mongodb")
                        .option("database", "people")
                        .option("collection", "contacts")
                        .load()

To see the inferred schema, use the ``printSchema()`` method on your ``DataFrame``
object, as shown in the following example:

.. io-code-block::
   :copyable: true

   .. input::
      :language: scala

      dataFrame.printSchema()
   
   .. output::
      :language: none
      :visible: false

      root
       |-- _id: struct (nullable = true)
       |    |-- oid: string (nullable = true)
       |-- age: integer (nullable = true)
       |-- name: string (nullable = true)
 
To see the data in the DataFrame, use the ``show()`` method on your ``DataFrame`` object,
as shown in the following example:

.. io-code-block::
   :copyable: true

   .. input::
      :language: scala

      dataFrame.show()
   
   .. output::
      :language: none
      :visible: false

      +--------------------+----+-------------+
      |                 _id| age|         name|
      +--------------------+----+-------------+
      |[585024d558bef808...|  50|Bilbo Baggins|
      |[585024d558bef808...|1000|      Gandalf|
      |[585024d558bef808...| 195|       Thorin|
      |[585024d558bef808...| 178|        Balin|
      |[585024d558bef808...|  77|         Kíli|
      |[585024d558bef808...| 169|       Dwalin|
      |[585024d558bef808...| 167|          Óin|
      |[585024d558bef808...| 158|        Glóin|
      |[585024d558bef808...|  82|         Fíli|
      |[585024d558bef808...|null|       Bombur|
      +--------------------+----+-------------+
