# begin x509 connection
from pymongo import MongoClient

uri = "mongodb+srv://<cluster-url>/test?authSource=$external&retryWrites=true&w=majority&authMechanism=MONGODB-X509"
client = MongoClient(uri,
                     tls=True,
                     tlsCertificateKeyFile='/etc/certs/mongodb/client.pem')

db = client['testDB']
collection = db['testCol']
doc_count = collection.count_documents({})
print(doc_count)
# end x509 connection
