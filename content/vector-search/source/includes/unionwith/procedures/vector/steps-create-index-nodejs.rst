.. procedure:: 
   :style: normal 
   
   .. step:: Add the MongoDB Node Driver as a dependency in your project:

      .. code-block:: sh

         npm install mongodb

      .. tip::
         
         The examples on this page assume your project manages modules as
         CommonJS modules. If you're using ES modules, instead, you must
         modify the import syntax.

   .. step:: Define the index.

      Create a file named ``vector-index.js``. Copy and paste the following
      code into the file.

      .. literalinclude:: /includes/unionwith/code-snippets/vector/nodejs/create-index.js
         :language: javascript
         :copyable: true
         :caption: vector-index.js
         :emphasize-lines: 4
         :linenos:

      .. include:: /includes/unionwith/facts/vector/index-definition.rst

      This code also includes a polling mechanism to check if the index is ready to use.

   .. step:: Specify the ``<connectionString>``.

      .. include:: /includes/shared/facts/find-connection-string.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell 

            node vector-index.js

         .. output:: 
            :language: console

            New search index named multiple-vector-search is building.
            Polling to check if the index is ready. This may take up to a minute.
            multiple-vector-search is ready for querying.
