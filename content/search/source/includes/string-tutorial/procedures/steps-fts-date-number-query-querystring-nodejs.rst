.. procedure::
   :style: normal

   .. step:: Create a file named ``date-number-to-string-query.js``.

   .. step:: Copy and paste the code for the operator for which you created the index into the ``date-number-to-string-query.js`` file.

      .. include:: /includes/string-tutorial/facts/fts-query-intro.rst

      .. include:: /includes/string-tutorial/facts/fts-nodejs-query-desc.rst

      .. tabs::

         .. tab:: AND Query
            :tabid: and-query

            .. include:: /includes/string-tutorial/facts/fts-and-query-desc.rst

            .. literalinclude:: /includes/string-tutorial/code-snippets/nodejs/querystring-and-query.js
               :language: javascript
               :linenos:
               :dedent:
               :emphasize-lines: 23

            .. include:: /includes/shared/facts/fact-fts-driver-connection-string.rst

         .. tab:: OR Query
            :tabid: or-query

            .. include:: /includes/string-tutorial/facts/fts-or-query-desc.rst

            .. literalinclude:: /includes/string-tutorial/code-snippets/nodejs/querystring-or-query.js
               :language: javascript
               :linenos:
               :dedent:
               :emphasize-lines: 23

            .. include:: /includes/shared/facts/fact-fts-driver-connection-string.rst

   .. step:: Run the following command to query your collection:

      .. tabs::
         :hidden:

         .. tab:: AND Query
            :tabid: and-query

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: shell

                  node date-number-to-string-query.js

               .. output:: /includes/string-tutorial/code-snippets/nodejs/querystring-and-node-query-results.json
                  :language: json
                  :linenos:
                  :visible: false

         .. tab:: OR Query
            :tabid: or-query

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: shell

                  node date-number-to-string-query.js

               .. output:: /includes/string-tutorial/code-snippets/nodejs/querystring-or-node-query-results.json
                  :language: json
                  :linenos:
                  :visible: false
