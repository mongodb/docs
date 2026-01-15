If your collection already has embeddings, you must use the ``vector``
type fields to index the embeddings. In a ``vectorSearch`` type index
definition, you can index arrays with only a single element. You can't
index embedding fields inside arrays of documents or embedding fields
inside arrays of objects. You can index embedding fields inside
documents using dot notation. The same embedding field can't be
indexed multiple times in the same index definition.

Before indexing your embeddings, we recommend converting your embeddings
to |bson| :manual:`BinData </reference/method/BinData/>` vectors with
subtype ``float32``, ``int1``, or ``int8`` for efficient storage
in your {+cluster+}.  To learn more, see :ref:`how to convert
your embeddings to BSON vectors <avs-bindata-vector-subtype>`. 

If you make changes to the collection for which you defined a {+avs+} 
index, the latest data might not be available immediately for queries.
However, ``mongot`` monitors the change streams and updates stored
copies of data, making {+avs+} indexes eventually consistent. You can
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