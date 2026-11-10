When you chain :method:`~cursor.skip()` and :method:`~cursor.limit()`, the
method chaining order does not affect the results. The server always
applies the skip operation based on the sort order before it applies the
limit on how many documents to return.

The following code example shows different chaining orders for
:method:`~cursor.skip()` and :method:`~cursor.limit()` that always produce
the same query results for the same data set:

.. code-block:: javascript
   :copyable: false

   db.myColl.find().sort({_id: 1}).skip(3).limit(6);

   db.myColl.find().sort({_id: 1}).limit(6).skip(3);
