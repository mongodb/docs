1. Click the :guilabel:`Query` button for your index.
#. Click :guilabel:`Edit Query` to edit the query.
#. Click on the query bar and select the database and collection.
#. Replace the default query with the following and click
   :guilabel:`Search`:

.. io-code-block:: 
   :copyable: true

   .. input:: 
      :language: json

      {
        "$search": {
          "index": "default",
          "text": {
            "query": "sign",
            "path": "message"
          }
        }
      }

   .. output:: 
      :language: json

      SCORE: 0.6763891577720642 _id:  "3"
        message: "try to sign-in"
        page_updated_by: Object
        text: Object
