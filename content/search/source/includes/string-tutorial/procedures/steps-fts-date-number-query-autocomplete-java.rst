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

      .. include:: /includes/string-tutorial/facts/fts-query-intro.rst

      .. include:: /includes/string-tutorial/facts/fts-java-query-desc.rst

      .. tabs::

         .. tab:: Year Search
            :tabid: yearquery

            .. include:: /includes/string-tutorial/facts/fts-date-query-desc.rst

            .. literalinclude:: /includes/string-tutorial/code-snippets/java/autocomplete-date-to-string-query.java
               :language: java
               :linenos:
               :dedent:
               :emphasize-lines: 28

            .. include:: /includes/shared/facts/fact-fts-driver-connection-string.rst

         .. tab:: Number Search
            :tabid: numericquery

            .. include:: /includes/string-tutorial/facts/fts-numeric-query-desc.rst

            .. literalinclude:: /includes/string-tutorial/code-snippets/java/autocomplete-number-to-string-query.java
               :language: java
               :linenos:
               :dedent:
               :emphasize-lines: 28

            .. include:: /includes/shared/facts/fact-fts-driver-connection-string.rst

   .. step:: Compile and run ``DateNumberToStringQuery.java`` file.

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

               .. output:: /includes/string-tutorial/code-snippets/json/autocomplete-date-java-csharp-query-results.json
                  :language: json
                  :linenos:
                  :visible: false

         .. tab:: Number Search
            :tabid: numericquery

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: shell

                  javac DateNumberToStringQuery.java
                  java DateNumberToStringQuery

               .. output:: /includes/string-tutorial/code-snippets/json/autocomplete-numeric-java-csharp-query-results.json
                  :language: json
                  :linenos:
                  :visible: false
