.. procedure::
   :style: normal
   
   .. step:: Set up the Python project.

      .. code-block:: shell
         :copyable: true

         mkdir search-with-unionwith
         cd search-with-unionwith
         pip install pymongo

      For detailed installation instructions, see the
      :driver:`MongoDB PyMongo Driver documentation </python/pymongo-driver/current/get-started/>`.

   .. step:: Define the index.

      Create a ``create_index.py`` file in your project directory, 
      and copy and paste the following code into the file.  
      
      .. literalinclude:: /includes/fts/search-with-unionwith/create-index-example.py
         :caption: create_index.py
         :language: python
         :copyable:
         :linenos:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true 

         .. input::
            :language: shell

            python create_index.py

         .. output::
            :visible: false

            New index name for companies: default
            New index name for inspections: default
