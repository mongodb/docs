.. procedure::
   :style: normal

   .. step:: Load the sample data.

      For this tutorial, you use one of our sample datasets as the 
      data source, so you can start building the agent's workflow right 
      away. If you haven't already, complete the steps to 
      :ref:`load sample data into your Atlas {+cluster+} <sample-data>`.

      Specifically, you will use the :ref:`embedded_movies 
      <mflix-embedded_movies>` dataset, which contains documents 
      about movies, including the vector embeddings of their plots.

      .. include:: /includes/avs/facts/fact-avs-integrations-own-data.rst

   .. step:: Instantiate the vector store.

      In your notebook, paste the following code to configure 
      |service| as a vector database by using the LangChain integration. 
      Specifically, the code instantiates a `vector store 
      <https://python.langchain.com/docs/how_to/#vector-stores>`__ object 
      that you can use to interact with |service| as a vector database. 
      It specifies the following:

      - The ``sample_mflix.embedded_movies`` namespace 
        as the data source that contains the vector embeddings and text data.
      - OpenAI's ``text-embedding-ada-002`` embedding model as the
        model used to convert text into embeddings during queries. 
      - ``plot`` as the field in the collection that contains the text.
      - ``plot_embedding`` as the field in the collection that contains the embeddings.
      - ``dotProduct`` as the relevance score function to use for vector search.

      .. literalinclude:: /includes/ai-integrations/langgraph/vector-store.py
         :language: python
         :copyable:

   .. step:: Create the indexes.

      .. include:: /includes/avs/facts/note-avs-index-required-access.rst

      To enable vector search and full-text search queries on
      your data in |service|, create an {+avs+} and |fts| index 
      on the collection. You can create the indexes by using either the 
      LangChain helper methods or the :driver:`PyMongo Driver </pymongo/>` method:

      .. tabs::

         .. tab:: LangChain
            :tabid: langchain

            .. include:: /includes/ai-integrations/langgraph/steps-create-indexes-langchain.rst

         .. tab:: PyMongo
            :tabid: pymongo
                  
            .. include:: /includes/ai-integrations/langgraph/steps-create-indexes-pymongo.rst
               
      .. include:: /includes/search-shared/fact-indexes-build-initial-sync.rst
