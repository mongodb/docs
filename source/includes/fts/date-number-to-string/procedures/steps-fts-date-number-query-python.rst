.. procedure:: 
   :style: normal

   .. step:: Create a file named ``date-number-to-string-query.py``.

   .. step:: Copy and paste the code example for the operator for which you created the index into the ``date-number-to-string-query.py`` file.

      .. include:: /includes/fts/extracts/fts-query-intro.rst 

      .. tabs:: 

         .. tab:: queryString Operator 
            :tabid: querystring

            .. include:: /includes/fts/extracts/fts-python-query-desc.rst

            .. tabs:: 

               .. tab:: AND Query 
                  :tabid: and-query 

                  .. include:: /includes/fts/extracts/fts-and-query-desc.rst


                  .. literalinclude:: /includes/fts/date-number-to-string/querystring-and-query.py
                     :language: python
                     :linenos:
                     :dedent:
                     :emphasize-lines: 4

                  .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

               .. tab:: OR Query 
                  :tabid: or-query 

                  .. include:: /includes/fts/extracts/fts-or-query-desc.rst

                  .. literalinclude:: /includes/fts/date-number-to-string/querystring-or-query.py
                     :language: python
                     :linenos:
                     :dedent:
                     :emphasize-lines: 4

                  .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

         .. tab:: autocomplete Operator 
            :tabid: autocomplete

            .. include:: /includes/fts/extracts/fts-python-query-desc.rst

            .. tabs:: 

               .. tab:: Year Search
                  :tabid: yearquery

                  .. include:: /includes/fts/extracts/fts-date-query-desc.rst 

                  .. literalinclude:: /includes/fts/date-number-to-string/autocomplete-date-to-string-query.py 
                     :language: python
                     :linenos:
                     :dedent:
                     :emphasize-lines: 4

                  .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

               .. tab:: Number Search
                  :tabid: numericquery

                  .. include:: /includes/fts/extracts/fts-numeric-query-desc.rst 

                  .. literalinclude:: /includes/fts/date-number-to-string/autocomplete-number-to-string-query.py 
                     :language: python
                     :linenos:
                     :dedent:
                     :emphasize-lines: 4

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

                        python date-number-to-string-query.py

                     .. output:: /includes/fts/date-number-to-string/querystring-and-py-query-results.json
                        :language: json 
                        :linenos:
                        :visible: true

               .. tab:: OR Query 
                  :tabid: or-query 

                  .. io-code-block::
                     :copyable: true 

                     .. input:: 
                        :language: shell

                        python date-number-to-string-query.py

                     .. output:: /includes/fts/date-number-to-string/querystring-or-py-query-results.json 
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

                        python date-number-to-string-query.py

                     .. output:: /includes/fts/date-number-to-string/autocomplete-date-py-query-results.json
                        :language: json 
                        :linenos:
                        :visible: true

               .. tab:: Number Search
                  :tabid: numericquery

                  .. io-code-block::
                     :copyable: true 

                     .. input:: 
                        :language: shell

                        python date-number-to-string-query.py

                     .. output:: /includes/fts/date-number-to-string/autocomplete-numeric-py-query-results.json
                        :language: json 
                        :linenos:
                        :visible: true
