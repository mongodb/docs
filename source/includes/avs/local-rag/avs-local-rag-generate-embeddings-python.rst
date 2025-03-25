
.. procedure:: 
   :style: normal 

   .. step:: Paste the following code into your notebook.
    
      This code performs the following actions:

      - Connects to your local |service| {+deployment+} or 
        |service| {+cluster+} and selects the ``sample_airbnb.listingsAndReviews`` collection. 
      - Loads the `mixedbread-ai/mxbai-embed-large-v1
        <https://huggingface.co/mixedbread-ai/mxbai-embed-large-v1>`__ model
        from the Hugging Face model hub and saves it locally.
        To learn more, see `Downloading models <https://huggingface.co/docs/hub/en/models-downloading>`__.

      - Defines a function that uses the model to generate vector embeddings.
      - For a subset of documents in the collection:

        - Generates an embedding from the document's ``summary`` field.
        - Updates the document by creating a new field called 
          ``embeddings`` that contains the embedding.

        ..
           NOTE: If you edit this Python file, also update the Jupyter Notebook
           at https://github.com/mongodb/docs-notebooks/blob/main/use-cases/local-rag.ipynb

        .. io-code-block::
           :copyable: true
        
           .. input:: /includes/ai-integrations/langchain/local-rag-create-embeddings.py
              :language: python
        
           .. output:: 

              Documents updated: 50

   .. step:: Replace ``<model-path>``  with the path to your project directory.
    
      This path should resemble: ``/Users/<username>/local-rag-mongodb``
      
   .. step:: Run the code.
