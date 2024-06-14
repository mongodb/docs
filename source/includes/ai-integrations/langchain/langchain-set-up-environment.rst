.. procedure::
   :style: normal

   .. step:: Install and import dependencies.

      Run the following command:

      .. code-block:: python

         pip install --quiet --upgrade langchain langchain-mongodb langchain-openai pymongo pypdf

      Then, run the following code to import the required packages:

      .. code-block:: python

         import getpass, os, pymongo, pprint
         from langchain_community.document_loaders import PyPDFLoader
         from langchain_core.output_parsers import StrOutputParser
         from langchain_core.runnables import RunnablePassthrough
         from langchain_mongodb import MongoDBAtlasVectorSearch
         from langchain_openai import ChatOpenAI, OpenAIEmbeddings
         from langchain.prompts import PromptTemplate
         from langchain.text_splitter import RecursiveCharacterTextSplitter
         from pymongo import MongoClient

   .. step:: Define environmental variables.

      Run the following code and provide the following when prompted:
      
      - Your OpenAI API Key.
      - Your |service| {+cluster+}'s |srv| :manual:`connection string
        </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.
        
      .. code-block:: python

         os.environ["OPENAI_API_KEY"] = getpass.getpass("OpenAI API Key:")
         ATLAS_CONNECTION_STRING = getpass.getpass("MongoDB Atlas SRV Connection String:")

      .. note:: 

         Your connection string should use the following format:

         .. code-block::

            mongodb+srv://<username>:<password>@<clusterName>.<hostname>.mongodb.net
            