Optionally, you can compress your embeddings by converting them 
to |bson| binary format, also called ``binData`` vectors, 
for efficient storage and retrieval. 
To learn more, see :ref:`avs-vector-compression`. 

a. Create a file named ``convert-embeddings.js``. 

   .. code-block:: shell

      touch convert-embeddings.js

#. Paste the following code in the file. 

   This code defines a function named ``convertEmbeddingsToBSON`` to convert
   ``float32`` embeddings to ``binData`` vectors by using binary tools from the 
   :driver:`Node.js driver </node/>`.

   .. include:: /includes/crud-embeddings/manual/facts/fact-bin-data-embedding-format-warning.rst

   .. literalinclude:: /includes/crud-embeddings/manual/code-snippets/nodejs/convert-embeddings.js
      :language: js
      :copyable:
      :caption: convert-embeddings.js

#. Save the file.
