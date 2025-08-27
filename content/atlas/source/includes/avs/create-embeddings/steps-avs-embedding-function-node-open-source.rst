.. procedure::
   :style: normal

   .. include:: /includes/avs/shared/steps-avs-nodejs-config.rst

   .. step:: Install and import dependencies.

      In a terminal window, run the following command:

      .. code-block::

         npm install mongodb @xenova/transformers

   .. step:: Create a ``.env`` file.

      a. In your project, create a ``.env`` file to store your MongoDB
         connection string.

         .. code-block::

            MONGODB_URI="<connection-string>"

      #. .. include:: /includes/search-shared/find-connection-string.rst

         .. include:: /includes/avs/shared/note-node-js-env-minimum-requirement.rst

      #. Save the file.

   .. step:: Define a function to generate vector embeddings.

      a. Create a file named ``get-embeddings.js``. 

         .. code-block:: shell

            touch get-embeddings.js

      #. Paste the following code in the file. 
      
         This code defines a function named ``getEmbedding()`` to generate an embedding for
         a given input. This function specifies: 

         - The ``feature-extraction`` task from Hugging Face's `transformers.js <https://huggingface.co/docs/transformers.js/en/index>`__
           library. To learn more, see `Tasks <https://huggingface.co/docs/transformers.js/en/index#tasks>`__.
         - The `nomic-embed-text-v1 <https://huggingface.co/xenova/nomic-embed-text-v1>`__ 
           embedding model.

         .. literalinclude:: /includes/avs/rag/get-embeddings.js
            :language: js
            :copyable:
            :caption: get-embeddings.js

      #. Save the file.

      .. collapsible::
         :heading: (Advanced) Compress your embeddings.
         :sub_heading: Expand this section to define a function that converts your embeddings to BSON binary format.
         :expanded: false

         .. include:: /includes/avs/extracts/avs-bson-function-node-description.rst
