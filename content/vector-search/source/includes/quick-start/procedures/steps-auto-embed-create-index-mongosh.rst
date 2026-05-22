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

               use sample_mflix

            .. output:: 
              :language: shell 

               switched to db sample_mflix

   .. step:: Create the index. 
    
      To create the index named ``autoembed_index``, run the following 
      ``db.collection.createSearchIndex()`` method: 

      .. literalinclude:: /includes/quick-start/code-snippets/auto-embed/shell/create-index-mongosh.sh
         :language: javascript
         :copyable: true 
         :caption: autoembed_index
         :linenos:

      .. include:: /includes/quick-start/facts/avs-quick-start-auto-embed-index-description.rst
