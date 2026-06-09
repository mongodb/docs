import pymongo

# connect to your MongoDB deployment
client = pymongo.MongoClient('<connection-string>')

# define pipeline
pipeline = [
  {
    '$search': {
      'index': 'monthlySalesIndex',
      'range': {
        'gt': 10000,
        'path': ['sales_price']
      }
    }
  },
  {
    '$count': 'months_w_over_10000'
  }
]

# run pipeline
result = client['sample_supplies']['monthlyPhoneTransactions'].aggregate(pipeline)

# print results
for doc in result:
    print(doc)
