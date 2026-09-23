.. procedure::
   :style: normal

   .. step:: Create a ``listingsAndReviews_totalPrice`` View.

      Run the following command in {+mongosh+}:

      .. literalinclude:: /includes/view/code-snippets/shell/add-modify-fields-create-view.sh
         :language: sh

   .. step:: Create a |fts| index on the View.

      .. literalinclude:: /includes/view/code-snippets/java/AddModifyFieldsCreateIndex.java
         :language: java
         :copyable: true

   .. step:: Query the View.

      .. io-code-block::
         :copyable: true

         .. input:: /includes/view/code-snippets/java/AddModifyFieldsQuery.java
            :language: java

         .. output:: /includes/view/code-snippets/output/add-modify-fields-query-java-output.js
            :language: json
