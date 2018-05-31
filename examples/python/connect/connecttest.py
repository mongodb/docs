
#Start Caller Connect
from connect import Connect
from pymongo import MongoClient

connection = Connect.get_connection()
#End Caller Connect
assert connection is not None
