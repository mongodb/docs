.. procedure::
   :style: normal

   .. step:: Define the index.
      
      Create a ``create_index.go`` file in your ``search-materialized-view`` project directory, 
      and copy and paste the following code into the file.  

      .. literalinclude:: /includes/cross-collection-tutorial/code-snippets/go/create-index-example.go
         :caption: create_index.go
         :language: go
         :linenos:
         :copyable:

      .. include:: /includes/index/shared/facts/find-connection-string.rst

   .. step:: Create the index.
      
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            go run create_index.go

         .. output::
            :visible: false

            Name of index created: monthlySalesIndex
