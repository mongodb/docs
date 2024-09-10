.. procedure::
   :style: normal

   .. step:: Create the {+avs+} index.

      To enable vector search queries on your data,
      you must create an {+avs+} index on your
      collection.

      Complete the following steps to create an index on the
      ``sample_db.embeddings`` collection that specifies the 
      ``embedding`` field as the :ref:`vector
      <avs-types-vector-search>` type, ``768`` vector 
      dimensions, and the similarity measure as ``euclidean``.

      a. Create a file named named ``create-index.js`` and paste the following code.

         .. literalinclude:: /includes/avs-examples/tutorial/create-index-open-source.js
            :language: js
            :copyable:
            :caption: create-index.js

      #. Replace ``<connectionString>`` with your |service| {+cluster+}'s |srv| 
         :manual:`connection string </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.
    
      #. Save the file, then run the following command:

         .. code-block::
            
            node create-index.js

      To learn more, see :ref:`avs-create-index`.

   .. step:: Create embeddings for vector search queries and run a query. 
      
      a. Create a file named named ``vector-query.js`` and paste the following code.

         .. include:: /includes/avs-run-query-description.rst

         .. literalinclude:: /includes/avs-examples/tutorial/vector-query.js
            :language: js
            :copyable:
            :caption: vector-query.js

      #. Replace ``<connectionString>`` with your |service| {+cluster+}'s |srv| 
         :manual:`connection string </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.

      #. Save the file, then run the following command:
       
         .. io-code-block:: 
            :copyable: true 
            
            .. input:: 
               :language: sh

               node vector-query.js

            .. output:: 
               :language: json

               '{"text":"Titanic: The story of the 1912 sinking of the largest luxury liner ever built","score":0.5103757977485657}'
               '{"text":"Avatar: A marine is dispatched to the moon Pandora on a unique mission","score":0.4616812467575073}'
               '{"text":"The Lion King: Lion cub and future king Simba searches for his identity","score":0.4115804433822632}'
               