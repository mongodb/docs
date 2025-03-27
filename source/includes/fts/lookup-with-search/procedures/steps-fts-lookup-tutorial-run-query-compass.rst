.. procedure:: 
   :style: normal 

   .. step:: Connect to your {+cluster+} in |compass|.

      Open |compass| and connect to your {+cluster+}. For detailed
      instructions on connecting, see :ref:`atlas-connect-via-compass`.

   .. step:: Use the ``sample_mflix.movies`` collection.

      On the :guilabel:`Database` screen, click the ``sample_analytics``
      database and then click the ``customers`` collection.

   .. step:: Run an |fts| query against the collection.

      .. include:: /includes/fts/lookup-with-search/query-intro.rst

      To run this query in |compass|: 

      a. Click the :guilabel:`Aggregations` tab.
      #. Click :guilabel:`Select...`, then configure each of the
         following pipeline stages by selecting the stage from the 
         dropdown and adding the query for that stage. Click
         :guilabel:`Add Stage` to add additional stages. 

         .. include:: /includes/fts/lookup-with-search/list-table-compass-query.rst 
                 
         If you :compass:`enabled </aggregation-pipeline-builder/#set-the-documents-limit-or-auto-preview-documents>` 
         :guilabel:`Auto Preview`, |compass| displays the following
         documents next to the ``$project`` pipeline stage: 

         .. code-block:: json
            :copyable: false 

            name: Elizabeth Ray
            email: arroyocolton@gmail.com
            active: True
            accounts: Array (6) 
            purchases: Array (3)

            name: "Lindsay Cowan"
            email: "cooperalexis@hotmail.com"
            accounts: Array (1)
            purchases: Array (empty)

            name: "Katherine David"
            email: "timothy78@hotmail.com"
            accounts: Array (5)
            urchases: Array (2)

            name: "Leslie Martinez"
            email: "tcrawford@gmail.com"
            accounts: Array (2)
            purchases: Array (empty)

            name: "Brad Cardenas"
            email: "dustin37@yahoo.com"
            accounts: Array (5)
            purchases: Array (2)

   .. step:: Expand your query results.

      |compass| might not display all the fields inside objects and all
      the values inside arrays for the documents it returns in the
      results. To view all the fields and values, expand the field in
      the results.  
