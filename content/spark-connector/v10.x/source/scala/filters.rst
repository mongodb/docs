.. include:: /includes/pushed-filters.rst

The following example filters and output the characters with ages under
100:

.. code-block:: scala

   df.filter(df("age") < 100).show()

The operation outputs the following:

.. code-block:: none

   { "_id" : ObjectId("585024d558bef808ed84fc3e"), "name" : "Bilbo Baggins", "age" : 50 }
   { "_id" : ObjectId("585024d558bef808ed84fc42"), "name" : "Kíli", "age" : 77 }
   { "_id" : ObjectId("585024d558bef808ed84fc46"), "name" : "Fíli", "age" : 82 }
