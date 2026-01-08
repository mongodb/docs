import pymongo
from pymongo import MongoClient

try:
    uri = "<connection string URI>"
    client = MongoClient(uri)

    database = client["<database name>"]
    collection = database["<collection name>"]

    # start example code here

    # end example code here

    client.close()

except Exception as e:
    raise Exception(
        "The following error occurred: ", e)
