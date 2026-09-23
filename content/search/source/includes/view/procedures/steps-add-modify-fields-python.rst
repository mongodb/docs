.. procedure::
   :style: normal

   .. step:: Create a ``listingsAndReviews_totalPrice`` View.

      Run the following command in {+mongosh+}:

      .. literalinclude:: /includes/view/code-snippets/shell/add-modify-fields-create-view.sh
         :language: sh

   .. step:: Create a |fts| index on the View.

      .. literalinclude:: /includes/view/code-snippets/python/add-modify-fields-create-index.py
         :language: python
         :copyable: true

   .. step:: Query the View.

      .. io-code-block::
         :copyable: true

         .. input:: /includes/view/code-snippets/python/add-modify-fields-query.py
            :language: python

         .. output:: /includes/view/code-snippets/output/add-modify-fields-query-python-output.js
            :language: python
