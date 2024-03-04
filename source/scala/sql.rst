.. include:: /includes/scala-java-sql-register-table.rst

.. code-block:: scala

   val characters = spark.read.format("mongodb").as[Character]
   characters.createOrReplaceTempView("characters")

   val centenarians = spark.sql("SELECT name, age FROM characters WHERE age >= 100")
   centenarians.show()
