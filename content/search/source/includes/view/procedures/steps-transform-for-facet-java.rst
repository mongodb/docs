.. procedure::
   :style: normal

   .. step:: Create a ``listings_SearchableTypes`` View.

      Run the following command in {+mongosh+}:

      .. literalinclude:: /includes/view/code-snippets/shell/facet-fields-create-view.sh
         :language: sh

   .. step:: Create a |fts| index on the View.

      .. literalinclude:: /includes/view/code-snippets/java/FacetFieldsCreateIndex.java
         :language: java
         :copyable: true

   .. step:: Query the View.

      .. io-code-block::
         :copyable: true

         .. input:: /includes/view/code-snippets/java/FacetFieldsQuery.java
            :language: java

         .. output:: /includes/view/code-snippets/output/facet-fields-query-java-output.js
            :language: json
