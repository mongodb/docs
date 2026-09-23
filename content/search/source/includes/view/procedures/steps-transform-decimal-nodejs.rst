.. procedure::
   :style: normal

   .. step:: Create a ``listings_SearchablePrice`` View.

      Run the following command in {+mongosh+}:

      .. literalinclude:: /includes/view/code-snippets/shell/decimal-to-double-create-view.sh
         :language: sh

   .. step:: Create a |fts| index on the View.

      .. literalinclude:: /includes/view/code-snippets/nodejs/decimal-to-double-create-index.js
         :language: javascript
         :copyable: true

   .. step:: Query the View.

      .. io-code-block::
         :copyable: true

         .. input:: /includes/view/code-snippets/nodejs/decimal-to-double-query.js
            :language: javascript

         .. output:: /includes/view/code-snippets/output/decimal-to-double-query-nodejs-output.js
            :language: javascript
