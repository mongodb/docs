.. include:: /includes/new-format-name.rst

Python Spark Shell
------------------

This tutorial uses the ``pyspark`` shell, but the code works
with self-contained Python applications as well.

When starting the ``pyspark`` shell, you can specify:

.. include:: /includes/extracts/command-line-start-pyspark.rst

Create a ``SparkSession`` Object
--------------------------------

.. note:: 

   When you start ``pyspark`` you get a ``SparkSession`` object called
   ``spark`` by default. In a standalone Python application, you need
   to create your ``SparkSession`` object explicitly, as show below.
   
If you specified the ``spark.mongodb.read.connection.uri``
and ``spark.mongodb.write.connection.uri`` configuration options when you
started ``pyspark``, the default ``SparkSession`` object uses them.
If you'd rather create your own ``SparkSession`` object from within
``pyspark``, you can use ``SparkSession.builder`` and specify different
configuration options.

.. code-block:: python

   from pyspark.sql import SparkSession

   my_spark = SparkSession \
       .builder \
       .appName("myApp") \
       .config("spark.mongodb.read.connection.uri", "mongodb://127.0.0.1/test.coll") \
       .config("spark.mongodb.write.connection.uri", "mongodb://127.0.0.1/test.coll") \
       .getOrCreate()

You can use a ``SparkSession`` object to write data to MongoDB, read
data from MongoDB, create DataFrames, and perform SQL operations.
