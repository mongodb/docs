.. procedure::
   :style: normal

   .. step:: Install and import dependencies.

      a. Run the following command:

         ..
            NOTE: If you edit this Python code, also update the Jupyter Notebook
            at https://github.com/mongodb/docs-notebooks/blob/main/integrations/haystack.ipynb

         .. code-block:: python

            pip --quiet install mongodb-atlas-haystack pymongo

      #. Run the following code to import the required packages:

         ..
            NOTE: If you edit this Python code, also update the Jupyter Notebook
            at https://github.com/mongodb/docs-notebooks/blob/main/integrations/haystack.ipynb

         .. code-block:: python

            import getpass, os
            from haystack import Pipeline, Document
            from haystack.document_stores.types import DuplicatePolicy
            from haystack.components.writers import DocumentWriter
            from haystack.components.generators import OpenAIGenerator
            from haystack.components.builders.prompt_builder import PromptBuilder
            from haystack.components.embedders import OpenAITextEmbedder, OpenAIDocumentEmbedder
            from haystack_integrations.document_stores.mongodb_atlas import MongoDBAtlasDocumentStore
            from haystack_integrations.components.retrievers.mongodb_atlas import MongoDBAtlasEmbeddingRetriever
            from pymongo import MongoClient
            from pymongo.operations import SearchIndexModel
                                    
   .. step:: Define environmental variables.

      Run the following code and provide the following when prompted:
      
      - Your OpenAI API Key.
      - Your |service| {+cluster+}'s |srv| :manual:`connection string
        </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/integrations/haystack.ipynb

      .. code-block:: python

         os.environ["OPENAI_API_KEY"] = getpass.getpass("OpenAI API Key:")
         os.environ["MONGO_CONNECTION_STRING"]=getpass.getpass("MongoDB Atlas Connection String:")

      .. note:: 

         .. include:: /includes/fact-connection-string-format-drivers.rst