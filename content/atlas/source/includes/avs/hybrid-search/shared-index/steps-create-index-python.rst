.. procedure::
   :style: normal
   
   .. step:: Set up the Python project.

      .. literalinclude:: /includes/fts/field-types/initialize-project-python.sh
         :language: shell
         :copyable: true

      For detailed installation instructions, see 
      :ref:`MongoDB Python Driver (PyMongo) <pymongo-get-started-download-and-install>`.

   .. step:: Define the {+avs+} index.

      Create a ``create_vector_index.py`` file in your project directory, 
      and copy and paste the following code into the file.  

      .. literalinclude:: /includes/avs/hybrid-search/shared-index/create_avs_index.py
         :caption: create_vector_index.py
         :language: python
         :copyable:
         :linenos:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Create the {+avs+} index.

      .. io-code-block::
         :copyable: true 

         .. input::
            :language: shell

            python create_vector_index.py

         .. output::
            :visible: false

            New search index named hybrid-vector-search is building.
            Polling to check if the index is ready. This may take up to a minute.
            hybrid-vector-search is ready for querying.

   .. step:: Define the {+avs+} index.

      Create a ``create_search_index.py`` file in your project directory, 
      and copy and paste the following code into the file.  

      .. literalinclude:: /includes/avs/hybrid-search/shared-index/create_fts_index.py
         :caption: create_search_index.py
         :language: python
         :copyable:
         :linenos:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Create the {+avs+} index.

      .. io-code-block::
         :copyable: true 

         .. input::
            :language: shell

            python create_search_index.py

         .. output::
            :visible: false

            New search index named hybrid-full-text-search is building.
            Polling to check if the index is ready. This may take up to a minute.
            hybrid-full-text-search is ready for querying.
