The example uses this ``pizzas`` collection:

.. code-block:: javascript

   db.pizzas.insertMany( [
      { type: "pepperoni", size: "small", price: 4 },
      { type: "cheese", size: "medium", price: 7 },
      { type: "vegan", size: "large", price: 8 }
   ] )

The following :method:`~db.collection.find()` example uses
:method:`~cursor.showRecordId()` to append the ``$recordId`` to the
``pizza`` document fields in the output:

.. code-block:: javascript

   db.pizzas.find().showRecordId()

Example output:

.. code-block:: javascript
   :copyable: false

   [
      {
         _id: ObjectId("62ffc70660b33b68e8f30435"),
         type: 'pepperoni',
         size: 'small',
         price: 4,
         '$recordId': Long("1")
      },
      {
         _id: ObjectId("62ffc70660b33b68e8f30436"),
         type: 'cheese',
         size: 'medium',
         price: 7,
         '$recordId': Long("2")
      },
      {
         _id: ObjectId("62ffc70660b33b68e8f30437"),
         type: 'vegan',
         size: 'large',
         price: 8,
         '$recordId': Long("3")
      }
   ]
