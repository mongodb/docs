.. procedure::
   :style: normal

   .. step:: Define the index.

      Create a ``create-index.js`` file in your ``search-materialized-view`` project directory, 
      and copy and paste the following code into the file.   
   
      .. literalinclude:: /includes/fts/materialized-view/create-index-example.js
         :caption: create-index.js
         :language: javascript
         :copyable:
         :linenos:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            node create-index.js

         .. output::

            New index name: monthlySalesIndex
