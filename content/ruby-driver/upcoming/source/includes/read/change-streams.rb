require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end

uri = '<connection string>'

Mongo::Client.new(uri) do |client|
  # Accesses the database and collection
  # start-db-coll
  database = client.use('sample_restaurants')
  collection = database[:restaurants]
  # end-db-coll
  
  # Monitors and prints changes to the "restaurants" collection
  # start-open-change-stream
  stream = collection.watch
  stream.each do |doc|
    puts doc
    break if doc['operationType'] == 'invalidate'
  end
  # end-open-change-stream

  # Updates a document that has a 'name' value of 'Blarney Castle'
  # start-update-for-change-stream
  collection.update_one(
    { 'name' => 'Blarney Castle' },
    { '$set' => { 'cuisine' => 'Irish' } }
  )
  # end-update-for-change-stream

  # Passes a pipeline argument to watch to monitor only update operations
  # start-change-stream-pipeline
  pipeline = [{ '$match' => { 'operationType' => 'update' } }]
  stream = collection.watch(pipeline)
  stream.each do |doc|
    puts doc
    break if doc['operationType'] == 'invalidate'
  end
  # end-change-stream-pipeline

  # Passes an options argument to watch to include the post-image of updated documents
  # start-change-stream-post-image
  options = { full_document: 'updateLookup' }
  stream = collection.watch([], options)
  stream.each do |doc|
    puts doc
    break if doc['operationType'] == 'invalidate'
  end
  # end-change-stream-post-image
end
