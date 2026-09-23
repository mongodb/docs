.. procedure::
   :style: normal

   .. step:: Create a ``listings_SearchableTypes`` View.

      Run the following command in {+mongosh+}:

      .. literalinclude:: /includes/view/code-snippets/shell/facet-fields-create-view.sh
         :language: sh

   .. step:: Create a |fts| index on the View.

      .. literalinclude:: /includes/view/code-snippets/nodejs/facet-fields-create-index.js
         :language: javascript
         :copyable: true

   .. step:: Query the View.

      .. io-code-block::
         :copyable: true

         .. input:: /includes/view/code-snippets/nodejs/facet-fields-query.js
            :language: javascript

         .. output:: /includes/view/code-snippets/output/facet-fields-query-nodejs-output.js
            :language: javascript
