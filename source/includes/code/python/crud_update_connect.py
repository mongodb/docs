from pymongo import MongoClient

# Replace the uri string with your MongoDB deployment's connection string.
uri = 'mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority'

client = MongoClient(uri)

# database and collection code goes here
# update code goes here
# display the results of your operation

# Close the connection to MongoDB when you're done.
client.close()
