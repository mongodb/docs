from pymongo import MongoClient

# Replace the uri string with your MongoDB deployment's connection string.
uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority"

client = MongoClient(uri)

# database and collection code goes here
# delete code goes here
# amount deleted code goes here

# Close the connection to MongoDB when you're done.
client.close()