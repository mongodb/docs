import pymongo
from bson.json_util import dumps
client = pymongo.MongoClient('mongodb://mongo1')
db = client.get_database(name='Tutorial1')
pipeline = [ { "$match": { "$and": [ { "fullDocument.type": "temp" }, { "fullDocument.value": { "$gte": 100 } } ] } } ]
with db.sensors.watch(pipeline=pipeline) as stream:
    print('\nChange Stream is opened on the Tutorial1.sensors namespace.  Currently watching for values > 100...\n\n')
    for change in stream:
        print(dumps(change, indent = 2))
