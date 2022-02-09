# Start Connection
from pymongo import MongoClient
from pprint import pprint
import json

connection_string = "mongodb://testuser:<PASSWORD>@localhost:27017/test?authSource=admin"
client = MongoClient(connection_string)
# End Connection

# Start select db
db = client.test
# End select db

# Start updateMany (Example 53)
result = db.inventory.update_many(
            {"qty": {"$lt": 50}},
            {"$set": {"size.uom": "in", "status": "P"},
             "$currentDate": {"lastModified": True}})
# End updateMany (Example 53)

pprint(result.raw_result)

client.close()