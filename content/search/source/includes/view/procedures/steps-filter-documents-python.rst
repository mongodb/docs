.. procedure::
   :style: normal

   .. step:: Create a ``movies_ReleasedAfter2000`` View.

      Run the following command in {+mongosh+}:

      .. literalinclude:: /includes/view/code-snippets/shell/filter-documents-create-view.sh
         :language: sh

   .. step:: Create a |fts| index on the View.

      .. literalinclude:: /includes/view/code-snippets/python/filter-documents-create-index.py
         :language: python
         :copyable: true

   .. step:: Query the View.

      .. io-code-block::
         :copyable: true

         .. input:: /includes/view/code-snippets/python/filter-documents-query.py
            :language: python

         .. output:: /includes/view/code-snippets/output/filter-documents-query-python-output.js
            :language: python
