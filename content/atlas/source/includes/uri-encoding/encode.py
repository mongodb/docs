import pymongo
from urllib.parse import quote_plus

username = quote_plus('<username>')
password = quote_plus('<password>')
cluster = '<clusterName>'
authSource = '<authSource>'
authMechanism = '<authMechanism>'

uri = 'mongodb+srv://' + username + ':' + password + '@' + cluster + '/?authSource=' + authSource + '&authMechanism=' + authMechanism

client = pymongo.MongoClient(uri)

result = client["<dbName"]["<collName>"].find()

# print results
for i in result:
    print(i)
