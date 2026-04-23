Optionally, you can compress your embeddings by converting them 
to |bson| binary format, also called ``binData`` vectors, 
for efficient storage and retrieval. 
To learn more, see :ref:`avs-vector-compression`. 

This code does the following: 

- Defines a function named ``generate_bson_vector`` to convert
  embeddings to ``binData`` vectors by using binary tools from the 
  :driver:`PyMongo driver </pymongo/>`.
- Converts the embeddings you generated for the 
  string ``foo`` to ``binData`` vectors.
  The exact embedding varies depending on the model you use.

.. include:: /includes/crud-embeddings/manual/facts/fact-bin-data-embedding-format-warning.rst
