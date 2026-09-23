.. procedure::
   :style: normal

   .. step:: Create a ``listings_SearchablePrice`` View.

      Run the following command in {+mongosh+}:

      .. literalinclude:: /includes/view/code-snippets/shell/decimal-to-double-create-view.sh
         :language: sh

   .. step:: Create a |fts| index on the View.

      .. literalinclude:: /includes/view/code-snippets/csharp/DecimalToDoubleCreateIndex.cs
         :language: csharp
         :copyable: true

   .. step:: Query the View.

      .. io-code-block::
         :copyable: true

         .. input:: /includes/view/code-snippets/csharp/DecimalToDoubleQuery.cs
            :language: csharp

         .. output:: /includes/view/code-snippets/output/decimal-to-double-query-csharp-output.js
            :language: javascript
