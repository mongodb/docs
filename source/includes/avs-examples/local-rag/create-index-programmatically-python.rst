You can create the index directly from your application with the PyMongo
driver. Paste and run the following code in your notebook:

..
   NOTE: If you edit this Python file, also update the Jupyter Notebook
   at https://github.com/mongodb/docs-notebooks/blob/main/use-cases/local-rag.ipynb

.. literalinclude:: /includes/avs-examples/local-rag/vector-index.py
   :language: python

This index definition indexes the ``embeddings`` field
in an index of the :ref:`vectorSearch <avs-types-vector-search>` type
for the ``sample_airbnb.listingsAndReviews`` collection.
This field contains the embeddings created using the
embedding model. The index definition specifies ``1024`` vector
dimensions and measures similarity using ``cosine``.
