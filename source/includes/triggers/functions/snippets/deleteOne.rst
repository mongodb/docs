.. code-block:: javascript

   const query = { "name": "lego" };

   itemsCollection.deleteOne(query)
     .then(result => console.log(`Deleted ${result.deletedCount} item.`))
     .catch(err => console.error(`Delete failed with error: ${err}`))
