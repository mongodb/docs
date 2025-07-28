# start-csot-overrides
require 'mongo'

# Replace the placeholder with your connection string
uri = "<connection string>"

# Sets a client-level timeout configuration
options = { timeout_ms: 30000 }

Mongo::Client.new(uri, options) do |client|
  db = client.use('test-db')
  collection = db[:test-collection]

  # Performs a query with an operation-level timeout configuration,
  # overriding the client-level configuration
  docs = collection.find({}, timeout_ms: 10000).to_a

  docs.each { |doc| puts doc }
end
# end-csot-overrides

# start-csot-iterable
cursor = collection.find()

cursor.each do |movie|
  puts movie['title']
end
# end-csot-iterable
