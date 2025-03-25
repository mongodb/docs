.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``atlas-vector-search-tutorial.js``.

   .. step:: Copy and paste the sample query for the pre-filter operator you want to try into the ``atlas-vector-search-tutorial.js`` file.

      .. include:: /includes/avs/extracts/fts-vector-search-tutorial-queries-desc.rst 

      .. tabs:: 

         .. tab:: Pre-Filter by AND Operator 
            :tabid: and-operator

            .. include:: /includes/avs/extracts/fts-vector-search-tutorial-simple-query-desc.rst

            .. literalinclude:: /includes/avs/tutorial/filter-by-and-query.js
               :language: js
               :linenos:
               :dedent:
               :emphasize-lines: 4

         .. tab:: Pre-Filter by OR and AND Operators 
            :tabid: or-and-operator

            .. include:: /includes/avs/extracts/fts-vector-search-tutorial-advanced-query-desc.rst

            .. literalinclude:: /includes/avs/tutorial/filter-by-or-and-query.js
               :language: js
               :linenos:
               :dedent:
               :emphasize-lines: 4

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Query your collection.

      Run the following command to query your collection: 

      .. tabs:: 
         :hidden:

         .. tab:: Pre-Filter by AND Operator 
            :tabid: and-operator
  
            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
     
                  node atlas-vector-search-tutorial.js
        
               .. output:: /includes/avs/tutorial/filter-by-and-query-nodejs-output.js 
                  :language: json
                  :visible: true

         .. tab:: Pre-Filter by OR and AND Operators 
            :tabid: or-and-operator
  
            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
     
                  node atlas-search-tutorial.js
        
               .. output:: /includes/avs/tutorial/filter-by-or-and-query-nodejs-output.js 
                  :language: json
                  :visible: true        
