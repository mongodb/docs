.. _java-sql:

.. include:: /includes/scala-java-sql-register-table.rst

.. code-block:: java

   implicitDS.createOrReplaceTempView("characters");
   Dataset<Row> centenarians = spark.sql("SELECT name, age FROM characters WHERE age >= 100");
   centenarians.show();

``centenarians.show()`` outputs the following:

.. code-block:: sh

   +-------+----+
   |   name| age|
   +-------+----+
   |Gandalf|1000|
   | Thorin| 195|
   |  Balin| 178|
   | Dwalin| 169|
   |    Óin| 167|
   |  Glóin| 158|
   +-------+----+
