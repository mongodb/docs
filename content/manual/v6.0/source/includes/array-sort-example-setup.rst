When MongoDB sorts documents by an array-value field, the :term:`sort
key` depends on whether the sort is ascending or descending:

- In an ascending sort, the sort key is the lowest value in the array.
- In a descending sort, the sort key is the highest value in the array.

The query filter does not affect sort key selection.

For example, create a ``shoes`` collection with these documents:

.. code-block:: javascript
   
   db.shoes.insertMany( [
      { _id: 'A', sizes: [ 7, 11 ] }, 
      { _id: 'B', sizes: [ 8, 9, 10 ] }
   ] )
