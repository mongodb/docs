.. procedure:: 
   :style: normal

   .. step:: Create a file named ``date-number-to-string-query.py``.

   .. step:: Copy and paste the code example for the operator for which you created the index into the ``date-number-to-string-query.py`` file.

      .. include:: /includes/string-tutorial/facts/fts-query-intro.rst 

      .. tabs:: 

         .. tab:: queryString Operator 
            :tabid: querystring

            .. include:: /includes/string-tutorial/facts/fts-python-query-desc.rst

            .. tabs:: 

               .. tab:: AND Query 
                  :tabid: and-query 

                  .. include:: /includes/string-tutorial/facts/fts-and-query-desc.rst


                  .. literalinclude:: /includes/string-tutorial/code-snippets/python/querystring-and-query.py
                     :language: python
                     :linenos:
                     :dedent:
                     :emphasize-lines: 4

                  .. include:: /includes/shared/facts/fact-fts-driver-connection-string.rst

               .. tab:: OR Query 
                  :tabid: or-query 

                  .. include:: /includes/string-tutorial/facts/fts-or-query-desc.rst

                  .. literalinclude:: /includes/string-tutorial/code-snippets/python/querystring-or-query.py
                     :language: python
                     :linenos:
                     :dedent:
                     :emphasize-lines: 4

                  .. include:: /includes/shared/facts/fact-fts-driver-connection-string.rst

         .. tab:: autocomplete Operator 
            :tabid: autocomplete

            .. include:: /includes/string-tutorial/facts/fts-python-query-desc.rst

            .. tabs:: 

               .. tab:: Year Search
                  :tabid: yearquery

                  .. include:: /includes/string-tutorial/facts/fts-date-query-desc.rst 

                  .. literalinclude:: /includes/string-tutorial/code-snippets/python/autocomplete-date-to-string-query.py 
                     :language: python
                     :linenos:
                     :dedent:
                     :emphasize-lines: 4

                  .. include:: /includes/shared/facts/fact-fts-driver-connection-string.rst

               .. tab:: Number Search
                  :tabid: numericquery

                  .. include:: /includes/string-tutorial/facts/fts-numeric-query-desc.rst 

                  .. literalinclude:: /includes/string-tutorial/code-snippets/python/autocomplete-number-to-string-query.py 
                     :language: python
                     :linenos:
                     :dedent:
                     :emphasize-lines: 4

                  .. include:: /includes/shared/facts/fact-fts-driver-connection-string.rst

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

                     .. output:: /includes/string-tutorial/code-snippets/python/querystring-and-py-query-results.json
                        :language: json 
                        :linenos:
                        :visible: false

               .. tab:: OR Query 
                  :tabid: or-query 

                  .. io-code-block::
                     :copyable: true 

                     .. input:: 
                        :language: shell

                        python date-number-to-string-query.py

                     .. output:: /includes/string-tutorial/code-snippets/python/querystring-or-py-query-results.json 
                        :language: json 
                        :linenos:
                        :visible: false

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

                     .. output:: /includes/string-tutorial/code-snippets/python/autocomplete-date-py-query-results.json
                        :language: json 
                        :linenos:
                        :visible: false

               .. tab:: Number Search
                  :tabid: numericquery

                  .. io-code-block::
                     :copyable: true 

                     .. input:: 
                        :language: shell

                        python date-number-to-string-query.py

                     .. output:: /includes/string-tutorial/code-snippets/python/autocomplete-numeric-py-query-results.json
                        :language: json 
                        :linenos:
                        :visible: false
