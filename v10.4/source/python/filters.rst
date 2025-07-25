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

   +---+----+------+
   |_id| qty|  type|
   +---+----+------+
   |2.0|10.0|orange|
   |3.0|15.0|banana|
   +---+----+------+
