Create a file named ``retrieve_data.py`` in your project and paste the code below into it. This file
defines a function that uses MongoDB Vector Search to get
relevant documents from your vector database. This code does the following:

- Uses the ``get_embedding()`` function to create embeddings from the
  search query. The ``input_type`` parameter is set to ``query`` to
  optimize Voyage AI embeddings for retrieval.
- Runs a MongoDB :pipeline:`$vectorSearch` aggregation pipeline to
  return the top 5 semantically similar documents.
- Projects only the ``text`` field from the results.