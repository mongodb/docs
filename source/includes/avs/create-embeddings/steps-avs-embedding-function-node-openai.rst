.. procedure::
   :style: normal

   .. include:: /includes/avs/shared/steps-avs-nodejs-config.rst

   .. step:: Install and import dependencies.

      In a terminal window, run the following command:

      .. code-block::

         npm install mongodb openai

   .. step:: Create a ``.env`` file.

      a. In your project, create a ``.env`` file to store your Atlas connection
         string and OpenAI API key.

         .. code-block::

            OPENAI_API_KEY = "<api-key>"
            ATLAS_CONNECTION_STRING = "<connection-string>"

      #. Replace the ``<api-key>`` and ``<connection-string>``
         placeholder values with your OpenAI API key and the |srv|
         :manual:`connection string </reference/connection-string/#find-your-mongodb-atlas-connection-string>`
         for your |service| {+cluster+}. Your connection string should use
         the following format:

         .. code-block::

            mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net

         .. include:: /includes/avs/shared/note-node-js-env-minimum-requirement.rst

      #. Save the file.

   .. step:: Define a function to generate vector embeddings.

      a. Create a file named ``get-embeddings.js``.
      #. Paste the following code. This code defines a function named ``getEmbedding`` 
         that uses OpenAI's ``text-embedding-3-small`` model to generate an 
         embedding for a given input.

         .. literalinclude:: /includes/avs/rag/get-embeddings-openai.js
            :language: js
            :copyable:
            :caption: get-embeddings.js

      #. Save the file.

      .. collapsible::
         :heading: (Advanced) Compress your embeddings.
         :sub_heading: Expand this section to define a function that converts your embeddings to BSON binary format.
         :expanded: false

         .. include:: /includes/avs/extracts/avs-bson-function-node-description.rst
