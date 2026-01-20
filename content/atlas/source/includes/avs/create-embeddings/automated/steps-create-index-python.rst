.. procedure:: 
   :style: normal 

   .. step:: Define the index in a file. 

      To define a {+avs+} index: 

      a. Create a ``.py`` file. 

         .. code-block:: shell 

            touch vector_index.py

      #. Copy and paste the following index definition in to the file.
      
         .. literalinclude:: /includes/avs/create-embeddings/automated/create-index.py  
            :language: python
            :copyable: true 
            :caption: vector_index.py
            :linenos:

      #. Replace the ``<connectionString>`` in the index definition and
         save the file.

         To learn more, see :ref:`connect-via-driver`.

   .. step:: Create the index.

      To create the index, run the following command: 

      .. code-block:: shell 

         python vector_index.py
