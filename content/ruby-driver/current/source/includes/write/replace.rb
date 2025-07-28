require 'bundler/inline'
gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end

uri = "<connection string URI>"

Mongo::Client.new(uri) do |client|
  # start-db-coll
  database = client.use('sample_restaurants')
  collection = database[:restaurants]
  # end-db-coll

  # Replaces a single document in the collection
  # start-replace-one
  filter = { name: 'Primola Restaurant' }
  new_document = { name: 'Frutti Di Mare', cuisine: 'Seafood', borough: 'Queens' }
  result = collection.replace_one(filter, new_document)
  puts "Replaced #{result.modified_count} document(s)"
  # end-replace-one

  # Uses the upsert option to replace a single document in the collection
  # start-replace-options
  options = { upsert: true }
  result = collection.replace_one(filter, new_document, options)
  puts "Replaced #{result.upserted_count} document(s)"
  # end-replace-options
end