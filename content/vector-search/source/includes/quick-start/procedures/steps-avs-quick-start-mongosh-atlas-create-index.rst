.. procedure:: 
   :style: normal 

   .. step:: Switch to the database that contains the collection for which you want to create the index. 

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

      .. literalinclude:: /includes/quick-start/code-snippets/shell/basic-example-mongosh.sh
         :language: shell
         :copyable: true 
         :linenos:

      .. include:: /includes/quick-start/facts/avs-quick-start-basic-index-description.rst
