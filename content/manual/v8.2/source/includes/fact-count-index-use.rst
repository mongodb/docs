Consider a collection with the following index:

.. code-block:: javascript

   { a: 1, b: 1 }

When performing a count, MongoDB can return the count using only the
index if:

- the query can use an index,

- the query only contains conditions on the keys of the index, *and*

- the query predicates access a single contiguous range of index keys.

For example, the following operations can return the count using only
the index:

.. code-block:: javascript

   db.collection.find( { a: 5, b: 5 } ).count()
   db.collection.find( { a: { $gt: 5 } } ).count()
   db.collection.find( { a: 5, b: { $gt: 10 } } ).count()

If, however, the query can use an index but the query predicates do not
access a single contiguous range of index keys or the query also
contains conditions on fields outside the index, then in addition to
using the index, MongoDB must also read the documents to return the
count.

.. code-block:: javascript

   db.collection.find( { a: 5, b: { $in: [ 1, 2, 3 ] } } ).count()
   db.collection.find( { a: { $gt: 5 }, b: 5 } ).count()
   db.collection.find( { a: 5, b: 5, c: 5 } ).count()

In such cases, during the initial read of the documents, MongoDB pages
the documents into memory such that subsequent calls of the same count
operation will have better performance.
