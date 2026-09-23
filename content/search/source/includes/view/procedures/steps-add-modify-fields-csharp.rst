.. procedure::
   :style: normal

   .. step:: Create a ``listingsAndReviews_totalPrice`` View.

      Run the following command in {+mongosh+}:

      .. literalinclude:: /includes/view/code-snippets/shell/add-modify-fields-create-view.sh
         :language: sh

   .. step:: Create a |fts| index on the View.

      .. literalinclude:: /includes/view/code-snippets/csharp/AddModifyFieldsCreateIndex.cs
         :language: csharp
         :copyable: true

   .. step:: Query the View.

      .. io-code-block::
         :copyable: true

         .. input:: /includes/view/code-snippets/csharp/AddModifyFieldsQuery.cs
            :language: csharp

         .. output:: /includes/view/code-snippets/output/add-modify-fields-query-csharp-output.js
            :language: javascript
