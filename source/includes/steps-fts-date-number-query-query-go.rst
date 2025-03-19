.. procedure:: 
   :style: normal

   .. step:: Create a file named ``date-number-to-string-query.go``.

   .. step:: Copy and paste the code example for the operator for which you created the index into the ``date-number-to-string-query.go`` file.

      .. include:: /includes/extracts/fts-query-intro.rst 

      .. tabs:: 

         .. tab:: queryString Operator 
            :tabid: querystring

            .. tabs:: 

               .. tab:: AND Query 
                  :tabid: and-query 

                  .. include:: /includes/extracts/fts-and-query-desc.rst

                  .. literalinclude:: /includes/fts-tutorial/date-number-to-string/querystring-and-query.go
                     :language: go
                     :linenos:
                     :dedent:
                     :emphasize-lines: 19

                  .. include:: /includes/fact-fts-driver-connection-string.rst

               .. tab:: OR Query 
                  :tabid: or-query 

                  .. include:: /includes/extracts/fts-or-query-desc.rst

                  .. literalinclude:: /includes/fts-tutorial/date-number-to-string/querystring-or-query.go
                     :language: go
                     :linenos:
                     :dedent:
                     :emphasize-lines: 19

                  .. include:: /includes/fact-fts-driver-connection-string.rst

         .. tab:: autocomplete Operator 
            :tabid: autocomplete

            .. tabs:: 

               .. tab:: Year Search
                  :tabid: yearquery

                  .. include:: /includes/extracts/fts-date-query-desc.rst 

                  .. literalinclude:: /includes/fts-tutorial/date-number-to-string/autocomplete-date-to-string-query.go 
                     :language: go
                     :linenos:
                     :dedent:
                     :emphasize-lines: 24

                  .. include:: /includes/fact-fts-driver-connection-string.rst

               .. tab:: Number Search
                  :tabid: numericquery

                  .. include:: /includes/extracts/fts-numeric-query-desc.rst 

                  .. literalinclude:: /includes/fts-tutorial/date-number-to-string/autocomplete-number-to-string-query.go 
                     :language: go
                     :linenos:
                     :dedent:
                     :emphasize-lines: 24

                  .. include:: /includes/fact-fts-driver-connection-string.rst

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

                        go run date-number-to-string-query.go

                     .. output:: /includes/fts-tutorial/date-number-to-string/querystring-and-go-query-results.json
                        :language: json 
                        :linenos:
                        :visible: true

               .. tab:: OR Query 
                  :tabid: or-query 

                  .. io-code-block::
                     :copyable: true 

                     .. input:: 
                        :language: shell

                        go run date-number-to-string-query.go

                     .. output:: /includes/fts-tutorial/date-number-to-string/querystring-or-go-query-results.json
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

                        go run date-number-to-string-query.go

                     .. output:: /includes/fts-tutorial/date-number-to-string/autocomplete-date-go-query-results.json
                        :language: json 
                        :linenos:
                        :visible: true

               .. tab:: Number Search
                  :tabid: numericquery

                  .. io-code-block::
                     :copyable: true 

                     .. input:: 
                        :language: shell

                        go run date-number-to-string-query.go

                     .. output:: /includes/fts-tutorial/date-number-to-string/autocomplete-numeric-go-query-results.json
                        :language: json 
                        :linenos:
                        :visible: true
