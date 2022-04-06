from pymongo import MongoClient

# Replace the uri string with your MongoDB deployment's connection string.
uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority"

client = MongoClient(uri)

# database and collection code goes here
db = client.sample_guides
coll = db.comets

coll.drop()

# insert code goes here
docs = [
    {"Name": "Halley's Comet", "OfficialName": "1P/Halley", "OrbitalPeriod": 75, "Radius": 3.4175, "Mass": 2.2e14},
	{"Name": "Wild2", "OfficialName": "81P/Wild", "OrbitalPeriod": 6.41, "Radius": 1.5534, "Mass": 2.3e13},
	{"Name": "Comet Hyakutake", "OfficialName": "C/1996 B2", "OrbitalPeriod": 17000, "Radius": 0.77671, "Mass": 8.8e12},
    ]

result = coll.insert_many(docs)

# display insert ids code goes here
print(result.inserted_ids)

# Close the connection to MongoDB when you're done.
client.close()
