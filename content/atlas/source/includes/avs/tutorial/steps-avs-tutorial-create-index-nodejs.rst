.. procedure:: 
   :style: normal 

   .. step:: Add the MongoDB Node.js Driver to your project.

      Add the MongoDB Node Driver as a dependency in your project:

      .. code-block:: sh

         npm install mongodb

      .. tip::
      
         The examples on this page assume your project manages modules as
         CommonJS modules. If you're using ES modules, instead, you must
         modify the import syntax.

   .. step:: Define the index.

      Create a file named ``vector-index.js`` and copy and paste the
      following code into the file.

      This index definition indexes the
      ``plot_embedding_voyage_3_large`` field as the ``vector`` type and
      the ``genres`` and ``year`` fields as the ``filter`` type in an
      {+avs+} index. The ``plot_embedding_voyage_3_large`` field
      contains embeddings created using |voyage|'s ``voyage-3-large``
      embedding model. The index definition specifies ``2048`` vector
      dimensions and measures similarity using ``dotProduct`` function.

      .. literalinclude:: /includes/avs/index-management/create-index/filter-example.js
         :language: javascript
         :copyable: true
         :caption: vector-index.js
         :emphasize-lines: 4
         :linenos:

   .. step:: Replace the ``<connection-string>`` in the code and then save the file.

      .. include:: /includes/search-shared/find-connection-string.rst
       
   .. step:: Run the following command to create the index.

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell 

            node vector-index.js

         .. output::
            :language: shell

            vector_index
