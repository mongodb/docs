.. procedure::
   :style: normal

   .. step:: Create a ``listings_SearchablePrice`` View.

      Run the following command in {+mongosh+}:

      .. literalinclude:: /includes/view/code-snippets/shell/decimal-to-double-create-view.sh
         :language: sh

   .. step:: Create a |fts| index on the View.

      .. literalinclude:: /includes/view/code-snippets/java/DecimalToDoubleCreateIndex.java
         :language: java
         :copyable: true

   .. step:: Query the View.

      .. io-code-block::
         :copyable: true

         .. input:: /includes/view/code-snippets/java/DecimalToDoubleQuery.java
            :language: java

         .. output:: /includes/view/code-snippets/output/decimal-to-double-query-java-output.js
            :language: json
