import pymongo
from bson.json_util import dumps

client = pymongo.MongoClient('mongodb://mongo1')
db = client.get_database(name='Tutorial1')
with db.orders.watch() as stream:
    print('\nA change stream is open on the Tutorial1.orders namespace.  Currently watching ...\n\n')
    for change in stream:
        print(dumps(change, indent = 2))