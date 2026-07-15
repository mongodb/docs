.. procedure:: 
   :style: normal

   .. step:: Initialize your Node.js project.

      .. literalinclude:: /includes/hybrid-search/shared/code-snippets/initialize-project-node.sh
         :language: shell
         :copyable: true

      For detailed installation instructions, see the
      :driver:`MongoDB Node Driver documentation </node/current>`.

   .. step:: Define the {+avs+} index.

      The following index definition indexes the ``fullplot`` field as the 
      ``autoEmbed`` type field, for which {+avs+} automatically generates 
      embeddings using the ``voyage-4`` embedding model. 

      A. Create a file named ``vector-search-index.js``, and paste the following
         code into it:

         .. literalinclude:: /includes/hybrid-search/shared-index/code-snippets/nodejs/auto-embed-index.js
            :language: javascript
            :copyable: true
            :linenos:
            :caption: vector-search-index.js

      #. Run the following command to execute the code:

         .. io-code-block:: 
            :copyable: true 
            
            .. input:: 
               :language: javascript
   
               node vector-search-index.js

            .. output:: 
               :language: javascript

               hybrid-vector-search

         {+avs+} might take few minutes to create the index. 

   .. step:: Define the {+fts+} index. 

      The following index definition automatically indexes all
      dynamically indexable field types in the collection.

      A. Create a file named ``text-search-index.js``, and paste the following
         code into it:

         .. literalinclude:: /includes/hybrid-search/shared-index/code-snippets/nodejs/fts-index.js
            :language: javascript
            :copyable: true 
            :linenos: 
            :caption: text-search-index.js

         This index definition indexes the ``fullplot`` field as the 
         ``autoEmbed`` field, for which {+avs+} automatically generates 
         embeddings using the ``voyage-4`` embedding model. 

      #. Run the following command to execute the code:

         .. io-code-block:: 
            :copyable: true 
            
            .. input:: 
               :language: javascript
   
               node text-search-index.js

            .. output:: 
               :language: javascript

               hybrid-full-text-search

         {+fts+} might take few minutes to create the index. 
