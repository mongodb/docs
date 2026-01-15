.. procedure::
   :style: normal

   .. include:: /includes/avs/shared/steps-avs-nodejs-config.rst

   .. step:: Install and import dependencies.

      In a terminal window, run the following command:

      .. code-block::

         npm install mongodb openai

   .. step:: Create a ``.env`` file.

      a. In your project, create a ``.env`` file to store your MongoDB connection string
         and OpenAI API key.

         .. code-block::

            OPENAI_API_KEY = "<api-key>"
            MONGODB_URI = "<connection-string>"

      #. Replace the ``<api-key>`` placeholder value with your OpenAI API key.

      #. .. include:: /includes/search-shared/find-connection-string.rst

         .. include:: /includes/avs/shared/note-node-js-env-minimum-requirement.rst

      #. Save the file.

   .. step:: Define a function to generate vector embeddings.

      a. Create a file named ``get-embeddings.js``.
      #. Paste the following code. This code defines a function named ``getEmbedding()`` 
         that uses OpenAI's ``text-embedding-3-small`` model to generate an 
         embedding for a given input.

         .. literalinclude:: /includes/avs/rag/ingest/get-embeddings-openai.js
            :language: js
            :copyable:
            :caption: get-embeddings.js

      #. Save the file.

      .. collapsible::
         :heading: (Advanced) Compress your embeddings.
         :sub_heading: Expand this section to define a function that converts your embeddings to BSON binary format.
         :expanded: false

         .. include:: /includes/avs/extracts/avs-bson-function-node-description.rst
