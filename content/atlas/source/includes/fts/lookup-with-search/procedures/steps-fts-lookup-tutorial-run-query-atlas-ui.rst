.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Go to the :guilabel:`Aggregation` page for your cluster.

      a. Click the :guilabel:`Browse Collections` button for your
         {+cluster+}. 
      #. Expand the :guilabel:`sample_analytics` database and click the
         :guilabel:`customers` collection.
      #. Click the :guilabel:`Aggregation` tab for the
         collection.

   .. step:: Run a |fts| ``lookup`` query on the ``customers`` and ``accounts`` collections.
      
      .. include:: /includes/fts/lookup-with-search/query-intro.rst
      
      Click the :guilabel:`TEXT` view on the :guilabel:`Aggregation` page.
      Then, copy and paste the following code into the pipeline
      to run the query:
      
      .. io-code-block::
         :copyable: true
      
         .. input::
            :language: js
            :linenos:
         
            [
              {
                $lookup: {
                  "from": "accounts",
                  "localField": "accounts",
                  "foreignField": "account_id",
                  "as": "purchases",
                  "pipeline": [{
                    "$search": {
                      "index": "lookup-with-search-tutorial",
                      "compound": {
                        "must": [{
                          "queryString": {
                            "defaultPath": "products",
                            "query": "products: (CurrencyService AND InvestmentStock)"
                          }
                        }],
                        "should": [{
                          "range": {
                            "path": "limit",
                            "gte": 5000,
                            "lte": 10000
                          }
                        }]
                      }
                    }
                  },{
                    "$limit": 5
                  },{
                    "$project": {
                      "_id": 0,
                      "address": 0,
                      "birthdate": 0,
                      "username": 0,
                      "tier_and_details": 0
                    }
                  }]
                }
              },{
                "$limit": 5
              },{
                "$project": {
                  "_id": 0,
                  "address": 0,
                  "birthdate": 0,
                  "username": 0,
                  "tier_and_details": 0
                }
              }
            ]
      
         .. output::
            :visible: true

            name: "Lindsay Cowan"
            email: "cooperalexis@hotmail.com"
            accounts: Array (1)
            purchases: Array (empty)

            name: "Dr. Angela Brown"
            email: "michaelespinoza@gmail.com"
            accounts: Array (1)
            purchases: Array (empty)

            name: "Brian Flores"
            email: "april04@gmail.com"
            accounts: Array (2)
            purchases: Array (1)

            name: "Shirley Rodriguez"
            email: "jonathan95@yahoo.com"
            accounts: Array (4)
            purchases: Array (3)

            name: "Clinton Shelton"
            email: "acook@gmail.com"
            accounts: Array (5)
            purchases: Array (empty)

   .. step:: Expand your query results.

      |service| might not display all the fields inside objects and all
      the values inside arrays for the documents it returns in the
      results. To view all the fields and values, expand the field in
      the results.  