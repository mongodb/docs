.. include:: includes/pushed-filters.rst

Use ``filter()`` to read a subset of data from your MongoDB collection.

.. include:: /includes/example-load-dataframe.rst

First, set up a ``DataFrame`` object to connect with your default MongoDB data
source:

.. code-block:: python

   df = spark.read.format("mongodb").load()

The following example includes only
records in which the ``qty`` field is greater than or equal to ``10``.

.. code-block:: python

   df.filter(df['qty'] >= 10).show()

The operation prints the following output:

.. code-block:: none

   { "_id" : 2, "qty" : 10.0, "type" : "orange" }
   { "_id" : 3, "qty" : 15.0, "type" : "banana" }
