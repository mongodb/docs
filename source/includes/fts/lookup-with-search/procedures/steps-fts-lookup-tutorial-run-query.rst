.. procedure:: 

   .. step:: Connect to your cluster in {+mongosh+}.

      Open {+mongosh+} in a terminal window and connect to your 
      cluster. For detailed instructions on connecting, see 
      :ref:`connect-mongo-shell`.

   .. step:: Switch to the ``sample_analytics`` database.

      Run the following command at {+mongosh+} prompt:

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: sh

            use sample_analytics 

         .. output:: 
            :language: sh 

            switched to db sample_analytics

   .. step:: Run the following :pipeline:`$lookup` with |fts| :pipeline:`$search` query.

      .. include:: /includes/fts/lookup-with-search/query-intro.rst

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: json

            db.customers.aggregate([
              {
                $lookup:{
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
                    "$project": {
                      "_id": 0
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
            ]) 

         .. output:: 
            :language: json

            [
              {
                name: 'Elizabeth Ray',
                email: 'arroyocolton@gmail.com',
                active: true,
                accounts: [ 371138, 324287, 276528, 332179, 422649, 387979 ],
                purchases: [
                  {
                    account_id: 422649,
                    limit: 10000,
                    products: [ 'CurrencyService', 'InvestmentStock' ]
                  },
                  {
                    account_id: 324287,
                    limit: 10000,
                    products: [
                      'Commodity',
                      'CurrencyService',
                      'Derivatives',
                      'InvestmentStock'
                    ]
                  },
                  {
                    account_id: 332179,
                    limit: 10000,
                    products: [
                      'Commodity',
                      'CurrencyService',
                      'InvestmentFund',
                      'Brokerage',
                      'InvestmentStock'
                    ]
                  }
                ]
              },
              {
                name: 'Lindsay Cowan',
                email: 'cooperalexis@hotmail.com',
                accounts: [ 116508 ],
                purchases: []
              },
              {
                name: 'Katherine David',
                email: 'timothy78@hotmail.com',
                accounts: [ 462501, 228290, 968786, 515844, 377292 ],
                purchases: [
                  {
                    account_id: 228290,
                    limit: 10000,
                    products: [
                      'CurrencyService',
                      'InvestmentStock',
                      'InvestmentFund',
                      'Brokerage'
                    ]
                  },
                  {
                    account_id: 515844,
                    limit: 10000,
                    products: [
                      'Commodity',
                      'CurrencyService',
                      'InvestmentFund',
                      'Brokerage',
                      'InvestmentStock'
                    ]
                  }
                ]
              },
              {
                name: 'Leslie Martinez',
                email: 'tcrawford@gmail.com',
                accounts: [ 170945, 951849 ],
                purchases: []
              },
              {
                name: 'Brad Cardenas',
                email: 'dustin37@yahoo.com',
                accounts: [ 721914, 817222, 973067, 260799, 87389 ],
                purchases: [
                  {
                    account_id: 87389,
                    limit: 10000,
                    products: [ 'CurrencyService', 'InvestmentStock' ]
                  },
                 {
                    account_id: 260799,
                    limit: 10000,
                    products: [
                      'Brokerage',
                      'InvestmentStock',
                      'Commodity',
                      'CurrencyService'
                    ]
                  }
                ]
              }
            ]
