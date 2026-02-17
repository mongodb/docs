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

# Creates an index on the "runtime" and "year" field
# start-index-compound
collection.indexes.create_one({ runtime: -1, year: 1 })
# end-index-compound

# Finds a document with the specified runtime and release year by using the newly created index
# start-index-compound-query
filter = { '$and' => [
    { runtime: { '$gt' => 90 } },
    { year: { '$gt' => 2005 } }
  ] }
doc = collection.find(filter).first

if doc
  puts doc.to_json
else
  puts "No document found"
end
# end-index-compound-query

# Lists all indexes on the collection
# start-check-compound-index
puts collection.indexes.collect(&:to_json)
# end-check-compound-index
