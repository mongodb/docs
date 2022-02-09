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

cursor = db.inventory.find({"status": "D"})

for inventory in cursor:
  pprint(inventory)

client.close()
