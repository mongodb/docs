.. procedure:: 
   :style: normal

   .. step:: Initialize your Node.js project.

      .. literalinclude:: /includes/fts/field-types/initialize-project-node.sh
         :language: shell
         :copyable: true

      For detailed installation instructions, see the
      :driver:`MongoDB Node Driver documentation </node/current>`.

   .. step:: Define the {+avs+} index.

      The following index definition indexes the
      ``plot_embedding_voyage_3_large`` field as the {+avs+} field when
      querying the collection. 

      A. Create a file named ``vector-search-index.js``, and paste the following
         code into it:

         .. literalinclude:: /includes/avs/hybrid-search/shared-index/avs-index.js
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

   .. step:: Define the |fts| index. 

      The following index definition automatically indexes all
      dynamically indexable field types in the collection.

      A. Create a file named ``text-search-index.js``, and paste the following
         code into it:

         .. literalinclude:: /includes/avs/hybrid-search/shared-index/fts-index.js
            :language: javascript
            :copyable: true 
            :linenos: 
            :caption: text-search-index.js

      #. Run the following command to execute the code:

         .. io-code-block:: 
            :copyable: true 
            
            .. input:: 
               :language: javascript
   
               node text-search-index.js

            .. output:: 
               :language: javascript

               hybrid-full-text-search

         |fts| might take few minutes to create the index. 
