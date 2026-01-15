.. procedure::
   :style: normal

   .. step:: Set up the environment.

      a. Initialize the project and install dependencies.

         Run the following commands in your terminal to create a new project directory and install the required dependencies:

         .. code-block:: bash

            mkdir voyage-rag
            cd voyage-rag
            pip install --quiet --upgrade pymongo voyageai anthropic langchain langchain_community langchain-text-splitters pypdf python-dotenv

         .. include:: /includes/rag/shared/note-project-structure.rst

      #. Configure the environment.

         .. include:: /includes/rag/shared/env-file-setup-description.rst

         .. literalinclude:: /includes/rag/python-anthropic/.env.example
            :language: none
            :copyable:

   .. step:: Configure the application.
         
      .. include:: /includes/rag/shared/config-py-description.rst

      .. collapsible::
         :heading: config.py
         :sub_heading: Copy and paste the following code into your config.py file.
         :expanded: false

         .. literalinclude:: /includes/rag/python-anthropic/config.py
            :language: python
            :copyable:

   .. step:: Ingest data into MongoDB.

      .. include:: /includes/rag/shared/ingest-data-description.rst

      .. collapsible::
         :heading: ingest_data.py
         :sub_heading: Copy and paste the following code into your ingest_data.py file.
         :expanded: false

         .. literalinclude:: /includes/rag/shared/ingest_data.py
            :language: python
            :copyable:
      
   .. step:: Retrieve documents with Voyage AI and vector search.

      .. include:: /includes/rag/shared/retrieve-data-description.rst

      .. collapsible::
         :heading: retrieve_data.py
         :sub_heading: Copy and paste the following code into your retrieve_data.py file.
         :expanded: false

         .. literalinclude:: /includes/rag/shared/retrieve_data.py
            :language: python
            :copyable:

   .. step:: Generate responses with the LLM.

      .. include:: /includes/rag/shared/generate-response-description-shared.rst

      .. collapsible::
         :heading: generate_response.py
         :sub_heading: Copy and paste the following code into your generate_response.py file.
         :expanded: false

         .. literalinclude:: /includes/rag/python-anthropic/generate_response.py
            :language: python
            :copyable:

   .. step:: Run the application.

      .. include:: /includes/rag/shared/main-py-collapsible.rst

      .. include:: /includes/rag/shared/run-pipeline-instructions.rst

