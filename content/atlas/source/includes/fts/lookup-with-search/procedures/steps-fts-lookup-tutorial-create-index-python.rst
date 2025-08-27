.. procedure::
   :style: normal
   
   .. step:: Set up the Python project.

      .. literalinclude:: /includes/fts/field-types/initialize-project-python.sh
         :language: shell
         :copyable: true

      For detailed installation instructions, see the
      :driver:`MongoDB PyMongo Driver documentation </python/pymongo-driver/current/get-started/>`.

   .. step:: Define the index.

      Create a ``create_index.py`` file in your project directory, 
      and copy and paste the following code into the file.  
      
      .. literalinclude:: /includes/fts/lookup-with-search/create-index-example.py
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

            New index name: lookup-with-search-tutorial
