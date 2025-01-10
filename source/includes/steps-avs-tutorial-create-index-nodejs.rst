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

      Create a file named ``vector-index.js``. Copy and paste the following
      code into the file, and replace the ``<connectionString>``
      placeholder value.

      .. literalinclude:: /includes/avs-examples/index-management/create-index/filter-example.js
         :language: javascript
         :copyable: true
         :caption: vector-index.js
         :emphasize-lines: 4
         :linenos:

      This index definition indexes the ``plot_embedding`` field
      as the ``vector`` type and the ``genres`` and ``year`` fields
      as the ``filter`` type in an {+avs+} index. The ``plot_embedding``
      field contains embeddings created using OpenAI's
      ``text-embedding-ada-002`` embeddings model. The index definition
      specifies ``1536`` vector dimensions and measures similarity using
      ``dotProduct`` function.

   .. step:: Run the following command to create the index.

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell 

            node vector-index.js

         .. output::
            :language: shell

            vector_index
