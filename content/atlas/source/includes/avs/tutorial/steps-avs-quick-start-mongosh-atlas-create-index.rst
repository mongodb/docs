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

      .. literalinclude:: /includes/avs/index-management/create-index/basic-example-mongosh.sh  
         :language: shell
         :copyable: true 
         :linenos:

      .. include:: /includes/avs/tutorial/avs-quick-start-basic-index-description.rst
