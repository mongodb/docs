.. procedure::
   :style: normal

   .. step:: Install and import dependencies.

      Run the following command:

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/langchain.ipynb

      .. code-block:: python

         pip install --quiet --upgrade langchain langchain-community langchain-core langchain-mongodb langchain-openai pymongo pypdf

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
         from langchain_openai import ChatOpenAI, OpenAIEmbeddings
         from langchain.prompts import PromptTemplate
         from langchain.text_splitter import RecursiveCharacterTextSplitter
         from pymongo import MongoClient
         from pymongo.operations import SearchIndexModel

   .. step:: Define environmental variables.

      Run the following code, replacing the placeholders with 
      the following values:
      
      - Your OpenAI API Key.
      - Your |service| {+cluster+}'s |srv| :manual:`connection string
        </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/langchain.ipynb

      .. code-block:: python

         os.environ["OPENAI_API_KEY"] = "<api-key>"
         ATLAS_CONNECTION_STRING = "<connection-string>"

      .. note:: 

         .. include:: /includes/fact-connection-string-format-drivers.rst