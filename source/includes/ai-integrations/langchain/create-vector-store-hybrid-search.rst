.. procedure::
   :style: normal

   .. step:: Load the sample data.

      If you haven't already, complete the 
      steps to :ref:`load sample data into your Atlas {+cluster+} 
      <sample-data>`.

      .. include:: /includes/avs/facts/fact-avs-integrations-own-data.rst
       
   .. step:: Instantiate the vector store.

      Paste and run the following code in your notebook 
      to create a vector store instance
      named ``vector_store`` from the ``sample_mflix.embedded_movies`` 
      namespace in |service|. This code uses the 
      ``from_connection_string`` method to create the ``MongoDBAtlasVectorSearch``
      vector store and specifies the following parameters:

      - Your |service| {+cluster+}'s connection string.
      - An OpenAI embedding model as the model used to convert text into 
        vector embeddings. By default, this model is ``text-embedding-ada-002``.
      - ``sample_mflix.embedded movies`` as the namespace to use.
      - ``plot`` as the field that contains the text.
      - ``plot_embedding`` as the field that contains the embeddings.
      - ``dotProduct`` as the relevance score function.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/langchain-hybrid-search.ipynb

      .. code-block:: python

         from langchain_mongodb import MongoDBAtlasVectorSearch
         from langchain_openai import OpenAIEmbeddings

         # Create the vector store
         vector_store = MongoDBAtlasVectorSearch.from_connection_string(
            connection_string = ATLAS_CONNECTION_STRING,
            embedding = OpenAIEmbeddings(disallowed_special=()),
            namespace = "sample_mflix.embedded_movies",
            text_key = "plot",
            embedding_key = "plot_embedding",
            relevance_score_fn = "dotProduct"
         )