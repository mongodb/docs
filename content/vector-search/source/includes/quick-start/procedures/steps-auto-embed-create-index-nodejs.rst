.. procedure:: 
   :style: normal 

   .. step:: Define the index in a file. 

      To define a {+avs+} index: 

      a. Create a ``.js`` file. 

         .. code-block:: javascript 

            touch vector_index.js

      #. Copy and paste the following index definition in to the file.
         
         .. include:: /includes/quick-start/facts/avs-quick-start-auto-embed-index-description.rst
      
         .. literalinclude:: /includes/quick-start/code-snippets/auto-embed/nodejs/create-index.js
            :language: javascript
            :copyable: true 
            :caption: vector_index.js
            :linenos:

      #. Replace the ``<connectionString>`` in the index definition and
         save the file.

         To learn more, see :ref:`connect-via-driver`.

   .. step:: Create the index.

      To create the index, run the following command: 

      .. code-block:: shell 

         node vector_index.js
