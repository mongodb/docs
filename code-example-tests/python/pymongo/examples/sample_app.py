from pymongo import MongoClient

def example(CONNECTION_STRING):
    client = MongoClient(CONNECTION_STRING)
    # :snippet-start: app
    # :uncomment-start:
    # from datetime import datetime
    # from pymongo import MongoClient
    # :uncomment-end:

    try:
        # :uncomment-start:
        # uri = "<connection-string>"
        # client = MongoClient(uri)
        # :uncomment-end:

        # start example code here

        # end example code here

        client.admin.command("ping") # :remove:
        client.close()
        return "Connected successfully" # :remove:

    except Exception as e:
        raise Exception("The following error occurred: ", e)
    # :snippet-end:
