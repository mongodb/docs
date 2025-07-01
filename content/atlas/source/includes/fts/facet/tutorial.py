import pymongo
import datetime

# connect to your Atlas cluster
client = pymongo.MongoClient('<connection-string>')

# define pipeline
pipeline = [{"$searchMeta": { 
    "index": "facet-tutorial",
    "facet": {
        "operator": {
          "near": {"path": "released", "origin": datetime.datetime(1921, 11, 1, 0, 0, 0, 0), "pivot": 7776000000}
        },
        "facets": {
          "genresFacet": {"type": "string", "path": "genres"},
          "yearFacet" : {"type" : "number", "path" : "year", "boundaries" : [1910,1920,1930,1940]}
        }}}}]
# run pipeline
result = client["sample_mflix"]["movies"].aggregate(pipeline)

# print results
for i in result:
    print(i)
