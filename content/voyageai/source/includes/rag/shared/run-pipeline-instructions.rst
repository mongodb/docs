Run the following command in your terminal to run the application. It will perform the following steps:

1. Prompt you to ingest data into the vector database.

   Enter ``Y`` on first run and ``N`` on subsequent runs.

#. Create a vector search index, if it does not already exist.
#. Prompt you to enter a question.
#. Generate a response to your question using RAG.

The generated response might vary.

.. io-code-block::
   :copyable:

   .. input::
      :language: bash

      python main.py

   .. output:: /includes/rag/shared/rag-output.md
      :language: none
