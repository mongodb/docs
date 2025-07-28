# start-connection-target-atlas
require 'mongo'

# Replace the placeholders with your credentials
uri = "<connection string>"

# Sets the server_api field of the options object to Stable API version 1
options = { server_api: { version: '1' } }
# Creates a new client and connect to the server
client = Mongo::Client.new(uri, options)
# Sends a ping to confirm a successful connection
begin
  admin_client = client.use('admin')
  result = admin_client.database.command(ping: 1).documents.first
  puts "Pinged your deployment. You successfully connected to MongoDB!"
rescue Mongo::Error::OperationFailure => ex
  puts ex
ensure
  client.close
end
# end-connection-target-atlas

# start-local-connection
Mongo::Client.new([ 'host1:27017' ], database: 'mydb')
# end-local-connection

# start-local-connection-uri
Mongo::Client.new("mongodb://host1:27017/mydb")
# end-local-connection-uri

# start-localhost
client = Mongo::Client.new(["localhost"])
# end-localhost

# start-replica-set
Mongo::Client.new([ 'host1:27017', 'host2:27018', `host3:21019` ], database: 'mydb')
# end-replica-set

# start-replica-set-uri
Mongo::Client.new("mongodb://host1:27017,host2:27018,host3:27019/mydb")
# end-replica-set-uri

# start-replica-set-option
Mongo::Client.new([ 'host1:27017', 'host2:27018', 'host3:27019' ],
  database: 'mydb', replica_set: 'myapp')

# Or by using a connection string:
Mongo::Client.new("mongodb://host1:27017,host2:27018,host3:27019/mydb?replicaSet=myapp")
# end-replica-set-option
