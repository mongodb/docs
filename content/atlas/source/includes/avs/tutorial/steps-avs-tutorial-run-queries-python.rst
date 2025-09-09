.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``atlas-vector-search-tutorial.py``.

   .. step:: Copy and paste the query for the pre-filter operator that you want to try into the ``atlas-vector-search-tutorial.py`` file.

      .. include:: /includes/avs/extracts/fts-vector-search-tutorial-queries-desc.rst 

      .. tabs:: 

         .. tab:: Pre-Filter by AND Operator 
            :tabid: and-operator

            .. include:: /includes/avs/extracts/fts-vector-search-tutorial-simple-query-desc.rst

            ..
               NOTE: If you edit this Python file, also update the Jupyter Notebook
               at https://github.com/mongodb/docs-notebooks/blob/main/run-queries/semantic-search-and-filter.ipynb

            .. literalinclude:: /includes/avs/tutorial/semantic-search/filter-by-and-query.py
               :language: js
               :linenos:
               :dedent:
               :emphasize-lines: 4

         .. tab:: Pre-Filter by OR and AND Operators 
            :tabid: or-and-operator

            .. include:: /includes/avs/extracts/fts-vector-search-tutorial-advanced-query-desc.rst

            ..
               NOTE: If you edit this Python file, also update the Jupyter Notebook
               at https://github.com/mongodb/docs-notebooks/blob/main/run-queries/semantic-search-and-or-filter.ipynb

            .. literalinclude:: /includes/avs/tutorial/semantic-search/filter-by-or-and-query.py
               :language: js
               :linenos:
               :dedent:
               :emphasize-lines: 4

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      .. include:: /includes/search-shared/find-connection-string.rst

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
        
               .. output:: /includes/avs/tutorial/semantic-search/filter-by-and-query-python-output.js 
                  :language: json
                  :visible: true

         .. tab:: Pre-Filter by OR and AND Operators 
            :tabid: or-and-operator
  
            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
     
                  python atlas-vector-search-tutorial.py
        
               .. output:: /includes/avs/tutorial/semantic-search/filter-by-or-and-query-python-output.js 
                  :language: json
                  :visible: true      
