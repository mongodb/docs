.. include:: /includes/pushed-filters.rst

You can use :driver:`Java Aggregation Expressions
</java/sync/upcoming/fundamentals/aggregation-expression-operations/>` to filter
your data. 

.. include:: /includes/example-load-dataframe.rst

First, create a DataFrame to connect to your default MongoDB data source:

.. code-block:: java

   Dataset<Row> df = spark.read()
                          .format("mongodb")
                          .option("database", "food")
                          .option("collection", "fruit")
                          .load();

The following example retrieves only records in which the value of ``qty`` field
is greater than or equal to ``10``: 

.. code-block:: java

   df.filter(df.col("qty").gte(10))

The operation outputs the following:

.. code-block:: none

   +---+----+------+
   |_id| qty|  type|
   +---+----+------+
   |2.0|10.0|orange|
   |3.0|15.0|banana|
   +---+----+------+
