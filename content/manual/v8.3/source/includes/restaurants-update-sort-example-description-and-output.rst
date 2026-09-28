The example:

- Finds restaurants with a ``rating`` of ``4``, which are ``"Pizza
  Place"`` and ``"Taco Shop"``.
- Sorts the found restaurants by ``violations`` in descending order,
  which places ``"Pizza Place"`` in the first position.
- Replaces ``"Pizza Place"`` with ``"Clean Eats"``.

The following query returns the restaurants:

.. code-block:: javascript

   db.restaurantsSort.find()

Output shows ``"Pizza Place"`` was replaced with ``"Clean Eats"``:

.. code-block:: javascript
   :copyable: false

   [
      { _id: 1, name: 'Clean Eats', rating: 4, violations: 2 },
      { _id: 2, name: 'Burger Joint', rating: 3, violations: 5 },
      { _id: 3, name: 'Taco Shop', rating: 4, violations: 1 }
   ]
