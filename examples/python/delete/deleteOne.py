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

# Start updateOne (Example 58)
result = db.inventory.delete_one({"status": "D"})
# End updateOne (Example 58)

pprint(result.raw_result)

client.close()