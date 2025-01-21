.. include:: /includes/scala-java-sql-register-table.rst

.. code-block:: scala

   val characters = spark.read.format("mongodb").as[Character]
   characters.createOrReplaceTempView("characters")

   val centenarians = spark.sql("SELECT name, age FROM characters WHERE age >= 100")
   centenarians.show()

``centenarians.show()`` outputs the following:

.. code-block:: sh

   { "name" : "Gandalf", "age" : 1000 }
   { "name" : "Thorin", "age" : 195 }
   { "name" : "Balin", "age" : 178 }
   { "name" : "Dwalin", "age" : 169 }
   { "name" : "Óin", "age" : 167 }
   { "name" : "Glóin", "age" : 158 }
