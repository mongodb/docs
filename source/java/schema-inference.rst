.. _java-schema-inference:

.. include:: /includes/schema-inference-intro.rst

.. code-block:: java
   
   Dataset<Row> dataFrame = spark.read()
                                 .format("mongodb")
                                 .option("database", "people")
                                 .option("collection", "contacts")
                                 .load();

To see the inferred schema, use the ``printSchema()`` method on your ``Dataset<Row>``
object, as shown in the following example:

.. io-code-block::
   :copyable: true

   .. input::
      :language: java

      dataFrame.printSchema();
   
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
      :language: java

      dataFrame.show();
   
   .. output::
      :language: none
      :visible: false

      { "_id" : ObjectId("585024d558bef808ed84fc3e"), "name" : "Bilbo Baggins", "age" : 50 }
      { "_id" : ObjectId("585024d558bef808ed84fc3f"), "name" : "Gandalf", "age" : 1000 }
      { "_id" : ObjectId("585024d558bef808ed84fc40"), "name" : "Thorin", "age" : 195 }
      { "_id" : ObjectId("585024d558bef808ed84fc41"), "name" : "Balin", "age" : 178 }
      { "_id" : ObjectId("585024d558bef808ed84fc42"), "name" : "Kíli", "age" : 77 }
      { "_id" : ObjectId("585024d558bef808ed84fc43"), "name" : "Dwalin", "age" : 169 }
      { "_id" : ObjectId("585024d558bef808ed84fc44"), "name" : "Óin", "age" : 167 }
      { "_id" : ObjectId("585024d558bef808ed84fc45"), "name" : "Glóin", "age" : 158 }
      { "_id" : ObjectId("585024d558bef808ed84fc46"), "name" : "Fíli", "age" : 82 }
      { "_id" : ObjectId("585024d558bef808ed84fc47"), "name" : "Bombur" }
