Create a file named ``ingest_data.py`` in your project. This file
ingests sample data into MongoDB that LLMs don't have access to.
This code does the following:

- Defines a function named ``get_embedding()`` that generates vector embeddings by
  using the ``voyage-4-large`` embedding model from Voyage AI. The function
  specifies the ``input_type`` parameter to optimize your embeddings for retrieval.
- Loads a PDF that contains a recent `MongoDB earnings report
  <https://investors.mongodb.com/node/13576/pdf>`__.
- Splits the data into chunks, specifying the *chunk size*
  (number of characters) and *chunk overlap* (number of overlapping characters
  between consecutive chunks).
- Prepares the chunked documents and inserts them into a MongoDB collection named ``rag_db.test``.
- Creates a MongoDB vector search index to enable vector search on the ``embedding`` field.
