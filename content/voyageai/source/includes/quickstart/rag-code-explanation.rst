Replace the contents of ``quickstart.py`` with the following code.
This code does the following:

- Uses **semantic search** to retrieve relevant texts based on their embeddings.
- Adds **reranking** to refine search results by using a reranking model.
- Implements **RAG** by giving an LLM the retrieved context to answer
  a question more accurately.