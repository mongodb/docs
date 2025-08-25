Snippet Setup
~~~~~~~~~~~~~


To use a code snippet in a :doc:`function </functions>`, you
must first instantiate a MongoDB collection handle:

.. code-block:: javascript
   :emphasize-lines: 3

   exports = function() {
     const mongodb = context.services.get("mongodb-atlas");
     const itemsCollection = mongodb.db("store").collection("items");
     const purchasesCollection = mongodb.db("store").collection("purchases");
     // ... paste snippet here ...
   }
