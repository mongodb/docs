.. procedure::
   :style: normal

   .. step:: Install and import dependencies.

      Run the following command:

      .. code-block:: python

         !pip install llama-index llama-index-vector-stores-mongodb llama-index-embeddings-openai pymongo

      Then, run the following code to import the required packages:

      .. code-block:: python

         import getpass, os, pymongo, pprint
         from llama_index.core import SimpleDirectoryReader, VectorStoreIndex, StorageContext
         from llama_index.core.settings import Settings
         from llama_index.core.retrievers import VectorIndexRetriever
         from llama_index.core.vector_stores import MetadataFilter, MetadataFilters, ExactMatchFilter, FilterOperator
         from llama_index.core.query_engine import RetrieverQueryEngine
         from llama_index.embeddings.openai import OpenAIEmbedding
         from llama_index.llms.openai import OpenAI
         from llama_index.vector_stores.mongodb import MongoDBAtlasVectorSearch
                           
   .. step:: Define environmental variables.

      Run the following code and provide your OpenAI API Key and
      the |srv| :manual:`connection string
      </reference/connection-string/#find-your-mongodb-atlas-connection-string>`
      for your |service| cluster once prompted:
      
      .. code-block:: python

         os.environ["OPENAI_API_KEY"] = getpass.getpass("OpenAI API Key:")
         ATLAS_CONNECTION_STRING = getpass.getpass("MongoDB Atlas SRV Connection String:")

   .. step:: Configure LlamaIndex settings.

      Run the following code to configure settings that are specific
      to LlamaIndex. These settings specify the following:
      
      - OpenAI as the |llm| used by your application to answer questions on your data.
      - ``text-embedding-ada-002`` as the embedding model used by your application 
        to generate vector embeddings from your data.
      - `Chunk size and overlap
        <https://docs.llamaindex.ai/en/stable/optimizing/basic_strategies/basic_strategies.html#chunk-sizes>`__
        to customize how LlamaIndex partitions your data for storage.

      .. code-block:: python

         Settings.llm = OpenAI()
         Settings.embed_model = OpenAIEmbedding(model="text-embedding-ada-002")
         Settings.chunk_size = 100
         Settings.chunk_overlap = 10
