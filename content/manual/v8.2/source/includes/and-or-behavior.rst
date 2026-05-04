To allow the query engine to optimize queries, |and-or| handles
errors as follows:

- If any expression supplied to |and-or| would cause an error when
  evaluated alone, the |and-or| containing the expression may cause an
  error but an error is not guaranteed.

- An expression supplied after the first expression supplied to |and-or|
  may cause an error even if the first expression evaluates to
  |true-false|.

For example, the following query *always* produces an error if ``$x`` is
``0``:

.. code-block:: javascript

   db.example.find( {
      $expr: { $eq: [ { $divide: [ 1, "$x" ] }, 3 ] }
   } )

The following query, which contains multiple expressions supplied to
|and-or|, *may* produce an error if there is any document where ``$x``
is ``0``:
