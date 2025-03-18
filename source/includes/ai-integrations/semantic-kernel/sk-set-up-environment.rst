.. procedure::
   :style: normal

   .. step:: Install and import dependencies.

      a. Run the following command in your notebook to install the semantic kernel in your environment.

         ..
            NOTE: If you edit this Python code, also update the Jupyter Notebook
            at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/semantic-kernel.ipynb

         .. code-block:: python

            pip install --quiet --upgrade semantic-kernel openai motor

      #. Run the following code to import the required packages:

         ..
            NOTE: If you edit this Python code, also update the Jupyter Notebook
            at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/semantic-kernel.ipynb

         .. code-block:: python

            import semantic_kernel as sk
            from semantic_kernel.connectors.ai.open_ai import (OpenAIChatCompletion, OpenAITextEmbedding)
            from semantic_kernel.connectors.memory.mongodb_atlas import MongoDBAtlasMemoryStore
            from semantic_kernel.core_plugins.text_memory_plugin import TextMemoryPlugin
            from semantic_kernel.memory.semantic_text_memory import SemanticTextMemory
            from semantic_kernel.prompt_template.input_variable import InputVariable
            from semantic_kernel.prompt_template.prompt_template_config import PromptTemplateConfig
            from pymongo import MongoClient
            from pymongo.operations import SearchIndexModel

   .. step:: Define environment variables.

      Run the following code, replacing the placeholders with 
      the following values:

      - Your OpenAI API Key.
      - Your |service| {+cluster+}'s |srv| :manual:`connection string
        </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/semantic-kernel.ipynb

      .. code-block:: python
         OPENAI_API_KEY = "<api-key>"
         ATLAS_CONNECTION_STRING = "<connection-string>"

      .. note:: 

         .. include:: /includes/fact-connection-string-format-drivers.rst