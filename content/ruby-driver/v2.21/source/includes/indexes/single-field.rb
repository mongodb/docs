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

# start-index-single
# Creates an index on the "title" field
collection.indexes.create_one({ title: 1 })
# end-index-single

# start-index-single-query
# Finds a document with the title "Sweethearts" by using the newly created index
filter = { title: 'Sweethearts' }
doc = collection.find(filter).first

if doc
  puts doc.to_json
else
  puts "No document found"
end
# end-index-single-query

# start-check-single-index
# Lists all indexes on the collection
puts collection.indexes.collect(&:to_json)
# end-check-single-index
