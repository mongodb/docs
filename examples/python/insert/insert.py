# Start Connection
from pymongo import MongoClient
from pprint import pprint
import json

connection_string = "mongodb://testuser:<PASSWORD>@localhost:27017/test?authSource=admin"
client = MongoClient(connection_string)
# End Connection

# Start DatabaseBind
db = client.test
# End DatabaseBind

# Start InsertOne
db.inventory.insert_one(
    {"item": "canvas",
     "qty": 101,
     "tags": ["cotton"],
     "size": {"h": 28, "w": 35.5, "uom": "cm"}})
# End InsertOne

cursor = db.inventory.find({})

for inventory in cursor:
  pprint(inventory)

client.close()
