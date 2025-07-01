.. procedure:: 
   :style: normal

   .. step:: Create a file named ``date-number-to-string-query.js``.

   .. step:: Copy and paste the code for the operator for which you created the index into the ``date-number-to-string-query.js`` file.
 
      .. include:: /includes/fts/extracts/fts-query-intro.rst 

      .. tabs:: 

         .. tab:: queryString Operator 
            :tabid: querystring

            .. include:: /includes/fts/extracts/fts-nodejs-query-desc.rst

            .. tabs:: 

               .. tab:: AND Query 
                  :tabid: and-query 

                  .. include:: /includes/fts/extracts/fts-and-query-desc.rst

                  .. literalinclude:: /includes/fts/date-number-to-string/querystring-and-query.js
                     :language: javascript
                     :linenos:
                     :dedent:
                     :emphasize-lines: 23

                  .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

               .. tab:: OR Query 
                  :tabid: or-query 

                  .. include:: /includes/fts/extracts/fts-or-query-desc.rst

                  .. literalinclude:: /includes/fts/date-number-to-string/querystring-or-query.js
                     :language: javascript
                     :linenos:
                     :dedent:
                     :emphasize-lines: 23

                  .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

         .. tab:: autocomplete Operator 
            :tabid: autocomplete

            .. include:: /includes/fts/extracts/fts-nodejs-query-desc.rst

            .. tabs:: 

               .. tab:: Year Search
                  :tabid: yearquery

                  .. include:: /includes/fts/extracts/fts-date-query-desc.rst 

                  .. literalinclude:: /includes/fts/date-number-to-string/autocomplete-date-to-string-query.js 
                     :language: javascript
                     :linenos:
                     :dedent:
                     :emphasize-lines: 34

                  .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

               .. tab:: Number Search
                  :tabid: numericquery

                  .. include:: /includes/fts/extracts/fts-numeric-query-desc.rst 

                  .. literalinclude:: /includes/fts/date-number-to-string/autocomplete-number-to-string-query.js 
                     :language: javascript
                     :linenos:
                     :dedent:
                     :emphasize-lines: 34

                  .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

   .. step:: Run the following command to query your collection: 


      .. tabs:: 
         :hidden:

         .. tab:: queryString Operator 
            :tabid: querystring

            .. tabs:: 
               :hidden:

               .. tab:: AND Query 
                  :tabid: and-query 
                     
                  .. io-code-block::
                     :copyable: true 

                     .. input:: 
                        :language: shell 
                        
                        node date-number-to-string-query.js

                     .. output:: /includes/fts/date-number-to-string/querystring-and-node-query-results.json
                        :language: json 
                        :linenos:
                        :visible: true

               .. tab:: OR Query 
                  :tabid: or-query 

                  .. io-code-block::
                     :copyable: true 

                     .. input:: 
                        :language: shell 
                        
                        node date-number-to-string-query.js

                     .. output:: /includes/fts/date-number-to-string/querystring-or-node-query-results.json
                        :language: json 
                        :linenos:
                        :visible: true

         .. tab:: autocomplete Operator 
            :tabid: autocomplete

            .. tabs:: 
               :hidden:

               .. tab:: Year Search
                  :tabid: yearquery

                  .. io-code-block::
                     :copyable: true 

                     .. input:: 
                        :language: shell 
                        
                        node date-number-to-string-query.js

                     .. output:: /includes/fts/date-number-to-string/autocomplete-date-node-query-results.json
                        :language: json 
                        :linenos:
                        :visible: true

               .. tab:: Number Search
                  :tabid: numericquery

                  .. io-code-block::
                     :copyable: true 

                     .. input:: 
                        :language: shell 
                        
                        node date-number-to-string-query.js

                     .. output:: /includes/fts/date-number-to-string/autocomplete-numeric-node-query-results.json
                        :language: json 
                        :linenos:
                        :visible: true
