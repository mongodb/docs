.. procedure:: 
   :style: normal 

   .. step:: Define the index in a file. 

      To define a {+avs+} index: 

      a. Create a ``.py`` file. 

         .. code-block:: shell 

            touch vector_index.py

      #. Copy and paste the following index definition in to the file.

         .. include:: /includes/quick-start/facts/avs-quick-start-auto-embed-index-description.rst
      
         .. literalinclude:: /includes/quick-start/code-snippets/auto-embed/python/create-index.py
            :language: python
            :copyable: true 
            :caption: vector_index.py
            :linenos:

         For details on all the {+avs+} index settings for Automated Embedding, see 
         :ref:`avs-types-vector-search-options`.

      #. Replace the ``<connectionString>`` in the index definition and
         save the file.

         To learn more, see :ref:`connect-via-driver`.

   .. step:: Create the index.

      To create the index, run the following command: 

      .. code-block:: shell 

         python vector_index.py
