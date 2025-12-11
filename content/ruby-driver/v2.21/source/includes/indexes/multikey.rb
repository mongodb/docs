require 'mongo'

# Replace the placeholders with your credentials
uri = "<connection string>"

# Sets the server_api field of the options object to Stable API version 1
options = { server_api: { version: "1" }}

# Creates a new client and connect to the server
client = Mongo::Client.new(uri, options)

# start-sample-data
database = client.use('sample_mflix')
collection = database[:movies]
# end-sample-data

# Creates an index on the "cast" field
# start-index-multikey
collection.indexes.create_one({ cast: 1 })
# end-index-multikey

# Finds a document with the specified cast members by using the newly created index
# start-index-multikey-query
filter = { cast: { '$all' => ['Aamir Khan', 'Kajol'] } }
doc = collection.find(filter).first

if doc
  puts doc.to_json
else
  puts "No document found"
end
# end-index-multikey-query

# Lists all indexes on the collection
# start-check-multikey-index
puts collection.indexes.collect(&:to_json)
# end-check-multikey-index
