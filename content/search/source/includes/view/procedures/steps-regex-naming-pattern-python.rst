.. procedure::
   :style: normal

   .. step:: Create a ``listings_SearchableTypes`` View.

      Run the following command in {+mongosh+}:

      .. literalinclude:: /includes/view/code-snippets/shell/regex-naming-pattern-create-view.sh
         :language: sh

   .. step:: Create a |fts| index on the View.

      .. literalinclude:: /includes/view/code-snippets/python/regex-naming-pattern-create-index.py
         :language: python
         :copyable: true

   .. step:: Query the View.

      The following query searches the View named
      ``listings_SearchableTypes`` for ``house`` with a
      ``private room``.

      .. io-code-block::
         :copyable: true

         .. input:: /includes/view/code-snippets/python/regex-naming-pattern-query.py
            :language: python

         .. output:: /includes/view/code-snippets/output/regex-naming-pattern-query-python-output.js
            :language: python
