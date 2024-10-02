.. procedure::
   :style: normal

   .. step:: Create the {+avs+} index.

      To enable vector search queries on your data,
      you must create an {+avs+} index on your
      collection.

      Complete the following steps to create an index on the
      ``sample_airbnb.listingsAndReviews`` collection that specifies the 
      ``embedding`` field as the :ref:`vector
      <avs-types-vector-search>` type 
      and the similarity measure as ``euclidean``.

      a. Create a file named named ``create-index.js`` and paste the following code.

         .. literalinclude:: /includes/avs-examples/tutorial/create-index-existing-data.js
            :language: js
            :copyable:
            :caption: create-index.js

      #. Replace the following placeholder values:
      
         - ``<connectionString>`` with your |service| {+cluster+}'s |srv| 
           :manual:`connection string </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.
         - ``<dimensions>`` with ``768`` if you used the open-source model
           and ``1536`` if you used the model from OpenAI.
    
      #. Save the file, then run the following command:

         .. code-block::
            
            node create-index.js

      .. note::
         
         .. include:: /includes/fact-index-build-initial-sync.rst
            
      To learn more, see :ref:`avs-create-index`.

   .. step:: Create embeddings for vector search queries and run a query. 
      
      a. Create a file named named ``vector-query.js`` and paste the following code.

         .. include:: /includes/avs-run-query-description.rst

         .. literalinclude:: /includes/avs-examples/tutorial/vector-query-existing.js
            :language: js
            :copyable:
            :caption: vector-query.js

      #. Replace ``<connectionString>`` with your |service| {+cluster+}'s |srv| 
         :manual:`connection string </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.

      #. Save the file, then run the following command:
         
         .. tabs:: 
            :hidden:

            .. tab:: Open-Source
               :tabid: open-source
       
               .. io-code-block:: 
                  :copyable: true 
                  
                  .. input:: 

                     node vector-query.js

                  .. output:: /includes/avs-examples/tutorial/output-existing-open-source-node.json
                     :language: json


            .. tab:: OpenAI
               :tabid: openai

               .. io-code-block:: 
                  :copyable: true 
                  
                  .. input:: 

                     node vector-query.js

                  .. output:: /includes/avs-examples/tutorial/output-existing-openai.json
                     :language: json