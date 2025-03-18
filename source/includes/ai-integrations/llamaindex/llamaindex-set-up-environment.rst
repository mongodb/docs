.. procedure::
   :style: normal

   .. step:: Install and import dependencies.

      Run the following command:

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/llamaindex.ipynb

      .. code-block:: python

         pip install --quiet --upgrade llama-index llama-index-vector-stores-mongodb llama-index-embeddings-openai pymongo

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
         from llama_index.embeddings.openai import OpenAIEmbedding
         from llama_index.llms.openai import OpenAI
         from llama_index.vector_stores.mongodb import MongoDBAtlasVectorSearch
                           
   .. step:: Define environment variables.

      Run the following code, replacing the placeholders with 
      the following values:

      - Your OpenAI API Key.
      - Your |service| {+cluster+}'s |srv| :manual:`connection string
        </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/llamaindex.ipynb

      .. code-block:: python

         os.environ["OPENAI_API_KEY"] = "<api-key>"
         ATLAS_CONNECTION_STRING = "<connection-string>"

      .. note:: 

         .. include:: /includes/fact-connection-string-format-drivers.rst
            
   .. step:: Configure LlamaIndex settings.

      Run the following code to configure settings that are specific
      to LlamaIndex. These settings specify the following:
      
      - OpenAI as the |llm| used by your application to answer questions on your data.
      - ``text-embedding-ada-002`` as the embedding model used by your application 
        to generate vector embeddings from your data.
      - `Chunk size and overlap
        <https://docs.llamaindex.ai/en/stable/optimizing/basic_strategies/basic_strategies/#chunk-sizes>`__
        to customize how LlamaIndex partitions your data for storage.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/llamaindex.ipynb

      .. code-block:: python

         Settings.llm = OpenAI()
         Settings.embed_model = OpenAIEmbedding(model="text-embedding-ada-002")
         Settings.chunk_size = 100
         Settings.chunk_overlap = 10
