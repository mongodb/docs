A collection ``inventory`` has the following document:

.. code-block:: javascript

   { _id: 2, item: "cable", tags: [ "electronics", "supplies" ] }

Then the following operation uses the :update:`$addToSet` operator
with the :update:`$each` modifier to add multiple elements to the
``tags`` array:

.. code-block:: javascript

   db.inventory.update(
      { _id: 2 },
      { $addToSet: { tags: { $each: [ "camera", "electronics", "accessories" ] } } }
    )

The operation adds only ``"camera"`` and ``"accessories"`` to the
``tags`` array since ``"electronics"`` already exists in the array:

.. code-block:: javascript

   {
     _id: 2,
     item: "cable",
     tags: [ "electronics", "supplies", "camera", "accessories" ]
   }
