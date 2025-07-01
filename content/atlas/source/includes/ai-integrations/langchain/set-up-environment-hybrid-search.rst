.. procedure::
   :style: normal

   .. step:: Install and import dependencies.

      Run the following command in your notebook:

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/langchain-hybrid-search.ipynb

      .. code-block:: python

         pip install --quiet --upgrade langchain langchain-community langchain-core langchain-mongodb langchain-openai pymongo pypdf

   .. step:: Set environment variables.

      Run the following code to set the environment variables for this tutorial.
      Provide your OpenAI API Key and |service| {+cluster+}'s |srv| :manual:`connection string
      </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/langchain-hybrid-search.ipynb

      .. code-block:: python

         import os

         os.environ["OPENAI_API_KEY"] = "<api-key>"
         ATLAS_CONNECTION_STRING = "<connection-string>"

      .. note:: 

         .. include:: /includes/fact-connection-string-format-drivers.rst