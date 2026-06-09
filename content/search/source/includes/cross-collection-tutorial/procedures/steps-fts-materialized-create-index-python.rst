.. procedure::
   :style: normal
   
   .. step:: Define the index.

      Create a ``create_index.py`` file in your ``search-materialized-view`` project directory, 
      and copy and paste the following code into the file.  
      
      .. literalinclude:: /includes/cross-collection-tutorial/code-snippets/python/create-index-example.py
         :caption: create_index.py
         :language: python
         :copyable:
         :linenos:

      .. include:: /includes/index/shared/facts/find-connection-string.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true 

         .. input::
            :language: shell

            python create_index.py

         .. output::
            :visible: false

            New index name: monthlySalesIndex
