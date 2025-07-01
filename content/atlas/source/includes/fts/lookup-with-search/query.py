import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient('<connection-string>')

# define pipeline
pipeline = [
  {
    '$lookup': {
      'from': 'accounts', 
      'localField': 'accounts', 
      'foreignField': 'account_id', 
      'as': 'purchases', 
      'pipeline': [
        {
          '$search': {
            'index': 'lookup-with-search-tutorial', 
            'compound': {
              'must': [
                {
                  'queryString': {
                    'defaultPath': 'products', 
                    'query': 'products: (CurrencyService AND InvestmentStock)'
                  }
                }
              ], 
              'should': [
                {
                  'range': {
                    'path': 'limit', 
                    'gte': 5000, 
                    'lte': 10000
                  }
                }
              ]
            }
          }
        }, 
        { '$project': { '_id': 0 }  }
      ]
    }
  }, 
  { '$limit': 5 }, 
  {
    '$project': {
      '_id': 0, 
      'address': 0, 
      'birthdate': 0, 
      'username': 0, 
      'tier_and_details': 0
    }
  }
]

# run pipeline
result = client['sample_analytics']['customers'].aggregate(pipeline)

# print results
for i in result:
    print(i)
