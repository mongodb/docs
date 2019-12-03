# begin x509 connection
require 'mongo'
certificate_key_file_path = '/etc/certs/mongodb/client.pem'
uri = 'mongodb+srv://<cluster-url>/test?authSource=$external&tlsCertificateKeyFile=' + certificate_key_file_path + '&retryWrites=true&w=majority&authMechanism=MONGODB-X509'

client = Mongo::Client.new([ uri ], :database => 'testDB')

collection = client[:testCol]
doc_count = collection.count_documents({})
print doc_count
# end x509 connection
