A collection ``inventory`` has the following document:

.. code-block:: javascript

   { _id: 2, item: "cable", tags: [ "electronics", "supplies" ] }

Then the following operation uses the :update:`$addToSet` operator
with the :update:`$each` modifier to add multiple elements to the
``tags`` array:

.. code-block:: javascript

   db.inventory.updateOne(
      { _id: 2 },
      { $addToSet: { tags: { $each: [ "camera", "electronics", "accessories" ] } } }
    )

The operation only adds ``"camera"`` and ``"accessories"`` to the
``tags`` array. ``"electronics"`` was already in the array:

.. code-block:: javascript

   {
     _id: 2,
     item: "cable",
     tags: [ "electronics", "supplies", "camera", "accessories" ]
   }

