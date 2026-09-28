When MongoDB sorts documents by an array-value field, the :term:`sort
key` depends on whether the sort is ascending or descending:

- In an ascending sort, the sort key is the lowest value in the array.
- In a descending sort, the sort key is the highest value in the
  array.

The query filter does not affect sort key selection.

For example, consider these documents from the ``movies`` collection
in the ``sample_mflix`` sample dataset:

.. code-block:: javascript
   :copyable: false

   {
     _id: ObjectId("573a1395f29313caabce166c"),
     title: "The Comancheros",
     genres: [ "Action", "Western", "Adventure" ]
   }
   {
     _id: ObjectId("573a1391f29313caabcd8521"),
     title: "The Son of the Sheik",
     genres: [ "Adventure", "Drama" ]
   }
