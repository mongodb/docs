.. procedure::
   :style: normal

   .. step:: Create a ``movies_ReleasedAfter2000`` View.

      Run the following command in {+mongosh+}:

      .. literalinclude:: /includes/view/code-snippets/shell/filter-documents-create-view.sh
         :language: sh

   .. step:: Create a |fts| index on the View.

      .. literalinclude:: /includes/view/code-snippets/go/filter-documents-create-index.go
         :language: go
         :copyable: true

   .. step:: Query the View.

      .. io-code-block::
         :copyable: true

         .. input:: /includes/view/code-snippets/go/filter-documents-query.go
            :language: go

         .. output:: /includes/view/code-snippets/output/filter-documents-query-go-output.js
            :language: none
