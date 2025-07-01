.. procedure:: 
   :style: normal

   .. step:: Ensure that your ``CLASSPATH`` contains the following libraries.

      .. list-table::
         :widths: 30 70 

         * - ``junit``
           - 4.11 or higher version 

         * - ``mongodb-driver-sync``
           - 4.3.0 or higher version

         * - ``slf4j-log4j12``
           - 1.7.30 or higher version

   .. step:: Create a file named ``DateNumberToStringQuery.java``.

   .. step:: Copy and paste the code for the operator for which you created the index into the ``DateNumberToStringQuery.java`` file.
 
      .. include:: /includes/fts/extracts/fts-query-intro.rst 

      .. tabs:: 

         .. tab:: queryString Operator 
            :tabid: querystring

            .. include:: /includes/fts/extracts/fts-java-query-desc.rst

            .. tabs:: 

               .. tab:: AND Query 
                  :tabid: and-query 

                  .. include:: /includes/fts/extracts/fts-and-query-desc.rst

                  .. literalinclude:: /includes/fts/date-number-to-string/querystring-and-query.java
                     :language: java
                     :linenos:
                     :dedent:
                     :emphasize-lines: 23

                  .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

               .. tab:: OR Query 
                  :tabid: or-query 

                  .. include:: /includes/fts/extracts/fts-or-query-desc.rst

                  .. literalinclude:: /includes/fts/date-number-to-string/querystring-or-query.java
                     :language: java
                     :linenos:
                     :dedent:
                     :emphasize-lines: 23

                  .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

         .. tab:: autocomplete Operator 
            :tabid: autocomplete

            .. include:: /includes/fts/extracts/fts-java-query-desc.rst

            .. tabs:: 

               .. tab:: Year Search
                  :tabid: yearquery

                  .. include:: /includes/fts/extracts/fts-date-query-desc.rst 

                  .. literalinclude:: /includes/fts/date-number-to-string/autocomplete-date-to-string-query.java 
                     :language: java
                     :linenos:
                     :dedent:
                     :emphasize-lines: 28

                  .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

               .. tab:: Number Search
                  :tabid: numericquery

                  .. include:: /includes/fts/extracts/fts-numeric-query-desc.rst 

                  .. literalinclude:: /includes/fts/date-number-to-string/autocomplete-number-to-string-query.java 
                     :language: java
                     :linenos:
                     :dedent:
                     :emphasize-lines: 28

                  .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

   .. step:: Compile and run ``DateNumberToStringQuery.java`` file.

      .. tabs:: 
         :hidden: true

         .. tab:: queryString Operator 
            :tabid: querystring

            .. tabs:: 
               :hidden: true

               .. tab:: AND Query 
                  :tabid: and-query

                  .. io-code-block::
                     :copyable: true 

                     .. input:: 
                        :language: shell 

                        javac DateNumberToStringQuery.java
                        java DateNumberToStringQuery

                     .. output:: /includes/fts/date-number-to-string/querystring-and-java-csharp-query-results.json
                        :language: json 
                        :linenos:
                        :visible: true

               .. tab:: OR Query 
                  :tabid: or-query 

                  .. io-code-block::
                     :copyable: true 

                     .. input:: 
                        :language: shell 

                        javac DateNumberToStringQuery.java
                        java DateNumberToStringQuery

                     .. output:: /includes/fts/date-number-to-string/querystring-or-java-csharp-query-results.json
                        :language: json 
                        :linenos:
                        :visible: true

         .. tab:: autocomplete Operator 
            :tabid: autocomplete

            .. tabs:: 
               :hidden: true

               .. tab:: Year Search
                  :tabid: yearquery

                  .. io-code-block::
                     :copyable: true 

                     .. input:: 
                        :language: shell 

                        javac DateNumberToStringQuery.java
                        java DateNumberToStringQuery

                     .. output:: /includes/fts/date-number-to-string/autocomplete-date-java-csharp-query-results.json
                        :language: json 
                        :linenos:
                        :visible: true

               .. tab:: Number Search
                  :tabid: numericquery

                  .. io-code-block::
                     :copyable: true 

                     .. input:: 
                        :language: shell 

                        javac DateNumberToStringQuery.java
                        java DateNumberToStringQuery

                     .. output:: /includes/fts/date-number-to-string/autocomplete-numeric-java-csharp-query-results.json
                        :language: json 
                        :linenos:
                        :visible: true
