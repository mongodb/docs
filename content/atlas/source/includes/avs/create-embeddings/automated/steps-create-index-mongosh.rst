.. procedure:: 
   :style: normal 

   .. step:: Connect to the cluster using {+mongosh+}. 

      To learn more, see :ref:`connect-mongo-shell`.

   .. step:: Switch to the database that contains the collection for which you want to create the index. 

      .. example:: 

         .. io-code-block:: 
            :copyable: true 

            .. input:: 
               :language: shell

               use sample_airbnb

            .. output:: 
              :language: shell 

              switched to db sample_airbnb

   .. step:: Create the index. 
    
      To create the index named ``vector_index``, run the following 
      ``db.collection.createSearchIndex()`` method: 

      .. literalinclude:: /includes/avs/create-embeddings/automated/create-index.sh 
         :language: javascript
         :copyable: true 
         :caption: vector_index
         :linenos:
