Before you can run SQL queries against your DataFrame, you need to
register a temporary table.

The following example registers a temporary table called ``temp``,
then uses SQL to query for records in which the ``type`` field
contains the letter ``e``:

.. code-block:: python

   df.createOrReplaceTempView("temp")
   some_fruit = spark.sql("SELECT type, qty FROM temp WHERE type LIKE '%e%'")
   some_fruit.show()

In the ``pyspark`` shell, the operation prints the following output:

..  code-block:: none
   
   { "type" : "apple", "qty" : 5.0 }
   { "type" : "orange", "qty" : 10.0 }
