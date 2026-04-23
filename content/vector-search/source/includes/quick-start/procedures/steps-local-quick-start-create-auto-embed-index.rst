.. procedure:: 
   :style: normal  

   .. step:: Switch to the database that contains the collection to create the index for. 

         .. example:: 

            .. io-code-block:: 
               :copyable: true 

               .. input:: 
                  :language: shell
                  
                  use sample_mflix 

               .. output:: 
                  :language: shell 

                  switched to db sample_mflix

   .. step:: Run the :method:`db.collection.createSearchIndex()` method.

      You can create an index of ``autoEmbed`` type to run natural language 
      queries. 

      .. literalinclude:: /includes/quick-start/code-snippets/shell/auto-embed-example-mongosh.sh
         :language: shell
         :copyable: true 
         :linenos:

      .. include:: /includes/quick-start/facts/avs-quick-start-auto-embed-index-description.rst
