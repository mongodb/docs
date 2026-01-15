.. procedure:: 
   :style: normal  

   .. step:: Connect to the {+cluster+} using {+mongosh+}.

         Open {+mongosh+} in a terminal window and connect to your |service|
         {+cluster+}. For detailed instructions on connecting, see
         :ref:`Connect via mongosh <connect-mongo-shell>`.

         .. code-block:: shell 

            mongosh "mongodb://localhost:27017"

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

      You can create an index of ``vector`` type to run queries using 
      vector embeddings or ``autoEmbed`` type to run natural language 
      queries. 

      .. tabs:: 

         .. tab:: vector Type 
            :tabid: vector

            .. literalinclude:: /includes/avs/index-management/create-index/basic-example-mongosh.sh  
               :language: shell
               :copyable: true 
               :linenos:

            .. include:: /includes/avs/tutorial/avs-quick-start-basic-index-description.rst

         .. tab:: autoEmbed Type 
            :tabid: autoEmbed

            .. literalinclude:: /includes/avs/index-management/create-index/auto-embed-example-mongosh.sh  
               :language: shell
               :copyable: true 
               :linenos:

            .. include:: /includes/avs/tutorial/avs-quick-start-auto-embed-index-description.rst