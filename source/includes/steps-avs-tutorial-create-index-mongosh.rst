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

      The following index definition indexes the ``plot_embedding``
      field as the ``vector`` type and the ``genres`` and ``year``
      fields as the ``filter`` type in an {+avs+} index. The
      ``plot_embedding`` field contains embeddings created using
      OpenAI's ``text-embedding-ada-002`` embeddings model. The
      index definition specifies ``1536`` vector dimensions and
      measures similarity using ``dotProduct`` function.

      .. literalinclude:: /includes/avs-examples/index-management/create-index/filter-example-mongosh.sh  
         :language: shell
         :copyable: true 
         :linenos:
