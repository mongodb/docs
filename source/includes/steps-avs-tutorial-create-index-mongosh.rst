.. procedure:: 
   :style: normal

   .. step:: Connect to your cluster in {+mongosh+}.

      Open {+mongosh+} in a terminal window and connect to your
      {+cluster+}. For detailed instructions on connecting, see
      :ref:`Connect via mongosh <connect-mongo-shell>`.

   .. step:: Switch to the database where you want to create the index. 

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

      .. include:: /includes/avs-openai-index-description-filter.rst

      .. literalinclude:: /includes/avs-examples/index-management/create-index/filter-example-mongosh.sh  
         :language: shell
         :copyable: true 
         :linenos:
