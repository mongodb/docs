
.. procedure:: 
   :style: normal 

   .. step:: Paste the following code into your notebook.
    
      This code performs the following actions:

      - Connects to your cluster and selects the
        ``sample_airbnb.listingsAndReviews`` collection.  
      - Loads the `voyageai/voyage-4-nano
        <https://huggingface.co/voyageai/voyage-4-nano>`__ model
        from the Hugging Face model hub. Hugging Face caches the model
        locally, so subsequent runs do not download it again.
        To learn more, see `Downloading models <https://huggingface.co/docs/hub/en/models-downloading>`__.

      - Defines a function that uses the model to generate vector
        embeddings for documents.
      - For a subset of documents in the collection:

        - Generates an embedding from the document's ``summary`` field.
        - Updates the document by creating a new field called 
          ``embeddings`` that contains the embedding.

        ..
           NOTE: If you edit this Python file, also update the Jupyter Notebook
           at https://github.com/mongodb/docs-notebooks/blob/main/use-cases/local-rag.ipynb

        .. io-code-block::
           :copyable: true
        
           .. input:: /code-examples/tested/python/pymongo/vector_search/local_rag/local_rag_embeddings.snippet.local-rag-create-embeddings.py
              :language: python
              :category: usage example

           .. output:: /code-examples/tested/python/pymongo/vector_search/local_rag/local-rag-create-embeddings-output.txt
              :language: console

   .. step:: Run the code.
