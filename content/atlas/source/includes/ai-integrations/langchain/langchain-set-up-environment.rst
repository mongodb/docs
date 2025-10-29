.. procedure::
   :style: normal

   .. step:: Install and import dependencies.

      Run the following command:

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/langchain.ipynb

      .. code-block:: python

         pip install --quiet --upgrade langchain langchain-community langchain-core langchain-mongodb langchain-voyageai langchain-openai langchain-text-splitters pymongo pypdf

      Then, run the following code to import the required packages:

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/langchain.ipynb

      .. code-block:: python

         import os, pymongo, pprint
         from langchain_community.document_loaders import PyPDFLoader
         from langchain_core.output_parsers import StrOutputParser
         from langchain_core.runnables import RunnablePassthrough
         from langchain_mongodb import MongoDBAtlasVectorSearch
         from langchain_voyageai import VoyageAIEmbeddings
         from langchain_openai import ChatOpenAI
         from langchain.prompts import PromptTemplate
         from langchain_text_splitters import RecursiveCharacterTextSplitter
         from pymongo import MongoClient
         from pymongo.operations import SearchIndexModel

   .. step:: Define environment variables.

      Run the following code, replacing the placeholders with 
      the following values:
      
      - Your Voyage AI and OpenAI API Key.
      - Your MongoDB cluster's connection string.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/langchain.ipynb

      .. code-block:: python

         os.environ["VOYAGE_API_KEY"] = "<voyage-api-key>"
         os.environ["OPENAI_API_KEY"] = "<openai-api-key>"
         MONGODB_URI = "<connection-string>"

      .. note:: 

         .. include:: /includes/search-shared/find-connection-string.rst
