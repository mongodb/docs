import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient("<CONNECTION-STRING>")

# define pipeline
pipeline = [
  {
    '$vectorSearch': {
      'index': '<INDEX-NAME>', 
      'path': '<FIELD-NAME>', 
      'query': '<QUERY-TEXT>', 
      'numCandidates': <NUMBER-OF-CANDIDATES-TO-CONSIDER>,
      'limit': <NUMBER-OF-DOCUMENTS-TO-RETURN>
    }
  }
]

# run pipeline
result = client["<DATABASE-NAME>"]["<COLLECTION-NAME>"].aggregate(pipeline)

# print results
for i in result:
    print(i)
 