.. procedure::
   :style: normal

   .. step:: Set up the environment.

      a. Initialize the project and install dependencies.

         Run the following commands in your terminal to create a new project directory and install the required dependencies:

         .. code-block:: bash

            mkdir voyage-rag
            cd voyage-rag
            pip install --quiet --upgrade numpy voyageai anthropic langchain langchain_community langchain-text-splitters pypdf python-dotenv

      #. Configure the environment.

         Create a ``.env`` file in your project directory with your API keys:

         .. code-block:: none

            VOYAGE_API_KEY="<your_voyage_api_key>"
            ANTHROPIC_API_KEY="<your_anthropic_api_key>"

   .. step:: Create the RAG application.
      
      .. include:: /includes/rag/code-description-rag-python.rst

      .. literalinclude:: /includes/rag/python-anthropic/in-memory-rag.py
         :language: python
         :copyable:

   .. step:: Run the application.

      .. include:: /includes/rag/shared/run-pipeline-instructions-in-memory.rst
