Create a collection ``cakeSales`` containing sales for cake flavors:

.. code-block:: javascript

   db.cakeSales.insert( [
      { _id: 1, flavor: "chocolate", salesTotal: 1580 },
      { _id: 2, flavor: "strawberry", salesTotal: 4350 },
      { _id: 3, flavor: "cherry", salesTotal: 2150 }
   ] )

The following example:

- retrieves the cake that has a ``salesTotal`` greater than 3000, which
  is the cake with an ``_id`` of 2

- defines a ``targetTotal`` variable in ``let``, which is referenced in
  ``$gt`` as ``$$targetTotal``
