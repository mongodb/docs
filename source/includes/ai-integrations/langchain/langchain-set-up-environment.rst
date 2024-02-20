.. procedure::
   :style: normal

   .. step:: Install and import dependencies.

      Run the following command:

      .. code-block:: python

         %pip install --upgrade --quiet langchain pypdf pymongo langchain-openai tiktoken

      Then, run the following code to import the required packages:

      .. code-block:: python

         import getpass, os, pprint
         from langchain.chains import RetrievalQA
         from langchain_community.document_loaders import PyPDFLoader
         from langchain_community.vectorstores import MongoDBAtlasVectorSearch
         from langchain_openai import OpenAI, OpenAIEmbeddings
         from langchain.prompts import PromptTemplate
         from langchain.text_splitter import RecursiveCharacterTextSplitter
         from pymongo import MongoClient

   .. step:: Define environmental variables.

      Run the following code and provide your OpenAI API Key and
      the |srv| :manual:`connection string
      </reference/connection-string/#find-your-mongodb-atlas-connection-string>`
      for your |service| cluster once prompted:
      
      .. code-block:: python

         os.environ["OPENAI_API_KEY"] = getpass.getpass("OpenAI API Key:")
         MONGODB_ATLAS_CLUSTER_URI = getpass.getpass("MongoDB Atlas Cluster URI:")

