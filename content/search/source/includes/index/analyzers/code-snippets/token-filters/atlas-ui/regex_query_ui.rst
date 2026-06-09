1. Click the :guilabel:`Query` button for your index.
#. Click :guilabel:`Edit Query` to edit the query.
#. Click on the query bar and select the database and collection.
#. Replace the default query with the following and click
   :guilabel:`Search`:

   .. code-block:: json
      :copyable: true

      {
        "$search": {
          "index": "default",
          "wildcard": {
            "query": "*example.com",
            "path": "page_updated_by.email",
            "allowAnalyzedField": true
          }
        }
      }

