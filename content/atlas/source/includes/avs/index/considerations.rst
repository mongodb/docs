In a ``vectorSearch`` type index definition, you can index arrays with
only a single element. You can't index embedding fields inside arrays of documents
or embedding fields inside arrays of objects. You can index embedding fields inside
documents using dot notation. The same embedding field can't be indexed 
multiple times in the same index defintion.

Before indexing your embeddings, we recommend converting your embeddings
to |bson| :manual:`BinData </reference/method/BinData/>` vectors with
subtype ``float32``, ``int1``, or ``int8`` for efficient storage
in your {+cluster+}.  To learn more, see :ref:`how to convert
your embeddings to BSON vectors <avs-bindata-vector-subtype>`. 

.. |search-type| replace:: {+avs+}

.. include:: /includes/search-shared/fact-fts-avs-index-resource-consumption.rst

To learn more about sizing considerations for your indexes, 
see :ref:`avs-index-memory-requirements`.

If you make changes to the collection for which you defined a {+avs+} 
index, the latest data might not be available immediately for queries.
However, ``mongot`` monitors the change streams and updates stored
copies of data, making {+avs+} indexes eventually consistent. You can
view the number of indexed :guilabel:`Documents` in the {+atlas-ui+} 
to verify that changes to the collection are reflected in the index.

Alternatively, you can create a new index after adding new documents to
your collection and wait for the index to become queryable. You can also
implement a polling logic similar to the following to ensure that the
index is ready for querying before attempting to use it.

.. example:: 

   .. code-block:: 

      console.log("Polling to check if the index is ready. This may take up to a minute.")
      let isQueryable = false;
      while (!isQueryable) {
        const cursor = collection.listSearchIndexes();
        for await (const index of cursor) {
          if (index.name === result) {
            if (index.queryable) {
              console.log(`${result} is ready for querying.`);
              isQueryable = true;
            } else {
              await new Promise(resolve => setTimeout(resolve, 5000));
            }
          }
        }
      }