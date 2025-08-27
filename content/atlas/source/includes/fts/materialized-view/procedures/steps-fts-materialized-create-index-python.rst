.. procedure::
   :style: normal
   
   .. step:: Define the index.

      Create a ``create_index.py`` file in your ``search-materialized-view`` project directory, 
      and copy and paste the following code into the file.  
      
      .. literalinclude:: /includes/fts/materialized-view/create-index-example.py
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

            New index name: monthlySalesIndex
