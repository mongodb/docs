.. procedure::
   :style: normal

   .. step:: Install and import dependencies.

      a. Run the following command:

         ..
            NOTE: If you edit this Python code, also update the Jupyter Notebook
            at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/haystack.ipynb

         .. code-block:: python

            pip install --quiet --upgrade mongodb-atlas-haystack pymongo

      #. Run the following code to import the required packages:

         ..
            NOTE: If you edit this Python code, also update the Jupyter Notebook
            at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/haystack.ipynb

         .. code-block:: python

            import os
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
                                    
   .. step:: Define environment variables.

      Run the following code, replacing the placeholders with 
      the following values:
      
      - Your OpenAI API Key.
      - Your MongoDB cluster's connection string.
    
      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/haystack.ipynb

      .. code-block:: python

         os.environ["OPENAI_API_KEY"] = "<api-key>"
         os.environ["MONGO_CONNECTION_STRING"]= "<connection-string>"

      .. note:: 

         .. include:: /includes/search-shared/find-connection-string.rst
