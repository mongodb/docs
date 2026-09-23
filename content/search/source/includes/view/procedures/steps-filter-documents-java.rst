.. procedure::
   :style: normal

   .. step:: Create a ``movies_ReleasedAfter2000`` View.

      Run the following command in {+mongosh+}:

      .. literalinclude:: /includes/view/code-snippets/shell/filter-documents-create-view.sh
         :language: sh

   .. step:: Create a |fts| index on the View.

      .. literalinclude:: /includes/view/code-snippets/java/FilterDocumentsCreateIndex.java
         :language: java
         :copyable: true

   .. step:: Query the View.

      .. io-code-block::
         :copyable: true

         .. input:: /includes/view/code-snippets/java/FilterDocumentsQuery.java
            :language: java

         .. output:: /includes/view/code-snippets/output/filter-documents-query-java-output.js
            :language: json
