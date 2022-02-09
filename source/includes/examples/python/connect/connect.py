#Start Connect
from pymongo import MongoClient

class Connect(object):
    @staticmethod    
    def get_connection():
        return MongoClient("<URISTRING>")
#End Connect
