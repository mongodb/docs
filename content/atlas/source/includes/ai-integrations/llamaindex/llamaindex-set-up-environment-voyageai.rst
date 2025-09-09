.. procedure::
   :style: normal

   .. step:: Install and import dependencies.

      Run the following command:

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/llamaindex.ipynb

      .. code-block:: python

         pip install --quiet --upgrade llama-index llama-index-vector-stores-mongodb llama-index-llms-openai llama-index-embeddings-voyageai pymongo

      Then, run the following code to import the required packages:

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/llamaindex.ipynb

      .. code-block:: python

         import os, pymongo, pprint
         from pymongo.operations import SearchIndexModel
         from llama_index.core import SimpleDirectoryReader, VectorStoreIndex, StorageContext
         from llama_index.core.settings import Settings
         from llama_index.core.retrievers import VectorIndexRetriever
         from llama_index.core.vector_stores import MetadataFilter, MetadataFilters, ExactMatchFilter, FilterOperator
         from llama_index.core.query_engine import RetrieverQueryEngine
         from llama_index.embeddings.voyageai import VoyageEmbedding
         from llama_index.llms.openai import OpenAI
         from llama_index.vector_stores.mongodb import MongoDBAtlasVectorSearch
                           
   .. step:: Define environment variables.

      Run the following code, replacing the placeholders with 
      the following values:

      - Your OpenAI API Key.
      - Your Voyage AI API Key.
      - Your MongoDB cluster's |srv| :manual:`connection string
        </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/llamaindex.ipynb

      .. code-block:: python

         os.environ["OPENAI_API_KEY"] = "<openai-api-key>"
         os.environ["VOYAGEAI_API_KEY"] = "<voyageai-api-key>"
         MONGODB_URI = "<connection-string>"

      .. note:: 

         .. include:: /includes/search-shared/find-connection-string.rst
            
   .. step:: Configure LlamaIndex settings.

      Run the following code to configure settings that are specific
      to LlamaIndex. These settings specify the following:

      - ``voyage-3-large`` as the embedding model used by your application 
        to generate vector embeddings from your data.	     
      - OpenAI as the LLM used by your application to answer questions on your data.
      - `Chunk size and overlap
        <https://docs.llamaindex.ai/en/stable/optimizing/basic_strategies/basic_strategies/#chunk-sizes>`__
        to customize how LlamaIndex partitions your data for storage.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/llamaindex.ipynb

      .. code-block:: python

         from llama_index.embeddings.voyageai import VoyageEmbedding
	 
         embed_model= VoyageEmbedding(
           voyage_api_key = os.environ["VOYAGEAI_API_KEY"],
           model_name = "voyage-3-large",
         )
		      
         Settings.llm = OpenAI()
	        Settings.embed_model = embed_model
         Settings.chunk_size = 100
         Settings.chunk_overlap = 10
