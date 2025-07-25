.. include:: /includes/pushed-filters.rst

The following example filters and output the characters with ages under
100:

.. code-block:: scala

   df.filter(df("age") < 100).show()

The operation outputs the following:

.. code-block:: none

   +--------------------+---+-------------+
   |                 _id|age|         name|
   +--------------------+---+-------------+
   |[5755d7b4566878c9...| 50|Bilbo Baggins|
   |[5755d7b4566878c9...| 82|         Fíli|
   |[5755d7b4566878c9...| 77|         Kíli|
   +--------------------+---+-------------+
