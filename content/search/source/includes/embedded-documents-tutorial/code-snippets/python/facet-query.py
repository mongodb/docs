import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient('<connection-string>')

# define pipeline
pipeline = [{"$searchMeta": { 
    "index": "embedded-documents-tutorial",
    "facet": {
        "operator": {
          "text": {"path": "name", "query": 'High'}
        },
        "facets": {
          "gradeFacet": {"type": "string", "path": "teachers.classes.grade"}
        }
    }
}}]

# run pipeline
result = client["local_school_district"]["schools"].aggregate(pipeline)

# print results
for i in result:
    print(i)