.. code-block:: javascript

    const query = { "reviews": { "$size": 0 } };

    itemsCollection.deleteMany(query)
      .then(result => console.log(`Deleted ${result.deletedCount} item(s).`))
      .catch(err => console.error(`Delete failed with error: ${err}`))
