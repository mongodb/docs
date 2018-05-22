
#Start Caller Connect
from connect import Connect
from pymongo import MongoClient

client = Connect()
connection = client.get_connection()
#End Caller Connect
assert connection is  not None
