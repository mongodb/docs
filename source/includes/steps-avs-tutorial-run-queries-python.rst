.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``atlas-vector-search-tutorial.py``.

   .. step:: Copy and paste the query for the pre-filter operator that you want to try into the ``atlas-vector-search-tutorial.py`` file.

      .. include:: /includes/extracts/fts-vector-search-tutorial-queries-desc.rst 

      .. tabs:: 

         .. tab:: Pre-Filter by AND Operator 
            :tabid: and-operator

            .. include:: /includes/extracts/fts-vector-search-tutorial-simple-query-desc.rst

            .. literalinclude:: /includes/avs-examples/tutorial/filter-by-and-query.py
               :language: js
               :linenos:
               :dedent:
               :emphasize-lines: 5

         .. tab:: Pre-Filter by OR and AND Operator 
            :tabid: or-and-operator

            .. include:: /includes/extracts/fts-vector-search-tutorial-advanced-query-desc.rst

            .. literalinclude:: /includes/avs-examples/tutorial/filter-by-or-and-query.py
               :language: js
               :linenos:
               :dedent:
               :emphasize-lines: 5

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Run the command to query your collection.

      .. tabs:: 
         :hidden:

         .. tab:: Pre-Filter by AND Operator 
            :tabid: and-operator
  
            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
     
                  python atlas-vector-search-tutorial.py
        
               .. output:: /includes/avs-examples/tutorial/filter-by-and-query-python-output.js 
                  :language: json
                  :visible: true

         .. tab:: Pre-Filter by OR and AND Operator 
            :tabid: or-and-operator
  
            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
     
                  python atlas-vector-search-tutorial.py
        
               .. output:: /includes/avs-examples/tutorial/filter-by-or-and-query-python-output.js 
                  :language: json
                  :visible: true      
