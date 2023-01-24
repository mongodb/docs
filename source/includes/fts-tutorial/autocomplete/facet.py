import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient('<connection-string>')

# define pipeline
pipeline = [{"$searchMeta": { 
    "facet": {
        "operator": {
          "autocomplete": {"path": "title", "query": "Gravity"}
        },
        "facets": {
          "titleFacet": {"type": "string", "path": "title"}
        }}}}]
# run pipeline
result = client["sample_mflix"]["movies"].aggregate(pipeline)

# print results
for i in result:
    print(i)
