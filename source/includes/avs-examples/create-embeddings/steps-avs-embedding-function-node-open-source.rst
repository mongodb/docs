.. procedure::
   :style: normal

   .. include:: /includes/steps-avs-nodejs-config.rst

   .. step:: Install and import dependencies.

      In a terminal window, run the following command:

      .. code-block::

         npm install mongodb @xenova/transformers

   .. step:: Create a ``.env`` file.

      a. In your project, create a ``.env`` file to store your |service|
         connection string.

         .. code-block::

            ATLAS_CONNECTION_STRING="<connection-string>"

      #. Replace the ``<connection-string>`` placeholder value with the 
         |srv| :manual:`connection string </reference/connection-string/#find-your-mongodb-atlas-connection-string>`
         for your |service| {+cluster+}. Your connection string should use
         the following format:

         .. code-block::
  
            mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net

         .. include:: /includes/note-node-js-env-minimum-requirement.rst

      #. Save the file.

   .. step:: Define a function to generate vector embeddings.

      a. Create a file named ``get-embeddings.js``. 

         .. code-block:: shell

            touch get-embeddings.js

      #. Paste the following code in the file. 
      
         This code defines a function named ``getEmbedding`` to generate an embedding for
         a given input. This function specifies: 

         - The ``feature-extraction`` task from Hugging Face's `transformers.js <https://huggingface.co/docs/transformers.js/en/index>`__
           library. To learn more, see `Tasks <https://huggingface.co/docs/transformers.js/en/index#tasks>`__.
         - The `nomic-embed-text-v1 <https://huggingface.co/xenova/nomic-embed-text-v1>`__ 
           embedding model.

         .. literalinclude:: /includes/avs-examples/rag/get-embeddings.js
            :language: js
            :copyable:
            :caption: get-embeddings.js

      #. Save the file.

      .. collapsible::
         :heading: (Advanced) Compress your embeddings.
         :sub_heading: Expand this section to define a function that converts your embeddings to BSON binary format.
         :expanded: false

         .. include:: /includes/extracts/avs-bson-function-node-description.rst
