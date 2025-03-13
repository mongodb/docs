Create the following ``restaurantsSort`` collection:

.. code-block:: javascript

   db.restaurantsSort.insertMany( [
      { _id: 1, name: "Pizza Place", rating: 4, violations: 2 },
      { _id: 2, name: "Burger Joint", rating: 3, violations: 5 },
      { _id: 3, name: "Taco Shop", rating: 4, violations: 1 }
   ] )

The following example replaces ``"Pizza Place"`` with ``"Clean Eats"``:
