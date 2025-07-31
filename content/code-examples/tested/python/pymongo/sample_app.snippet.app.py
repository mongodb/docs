from datetime import datetime
from pymongo import MongoClient

try:
    uri = "<connection-string>"
    client = MongoClient(uri)

    # start example code here

    # end example code here

    client.close()

except Exception as e:
    raise Exception("The following error occurred: ", e)
