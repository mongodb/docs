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

# Start deleteMany (Example 57)
result = db.inventory.delete_many({"status": "A"})
# End deleteMany (Example 57)

pprint(result.raw_result)

client.close()