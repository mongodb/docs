.. procedure::
   :style: normal

   .. step:: Install and import dependencies.

      a. Run the following command in your notebook to install the semantic kernel in your environment.

      .. code-block:: python

         !python -m pip install semantic-kernel openai

      #. Run the following code to import the required packages:

      .. code-block:: python

         import getpass, openai
         import semantic_kernel as sk
         from semantic_kernel.connectors.ai.open_ai import (OpenAIChatCompletion, OpenAITextEmbedding)
         from semantic_kernel.connectors.memory.mongodb_atlas import MongoDBAtlasMemoryStore
         from semantic_kernel.core_plugins.text_memory_plugin import TextMemoryPlugin
         from semantic_kernel.memory.semantic_text_memory import SemanticTextMemory
         from semantic_kernel.prompt_template.input_variable import InputVariable
         from semantic_kernel.prompt_template.prompt_template_config import PromptTemplateConfig

   .. step:: Define environmental variables.

      Run the following code and provide the following when prompted:
      
      - Your OpenAI API Key.
      - Your |service| {+cluster+}'s |srv| :manual:`connection string
        </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.
        
      .. code-block:: python

         OPENAI_API_KEY = getpass.getpass("OpenAI API Key:")
         ATLAS_CONNECTION_STRING = getpass.getpass("MongoDB Atlas SRV Connection String:")

      .. note:: 

         Your connection string should use the following format:

         .. code-block::

            mongodb+srv://<username>:<password>@<clusterName>.<hostname>.mongodb.net
            