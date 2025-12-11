require 'bundler/inline'
gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end

uri = "<connection string>"

Mongo::Client.new(uri) do |client|
  # start-db-coll
  database = client.use('sample_restaurants')
  collection = database[:restaurants]
  # end-db-coll

  # Updates a single document
  # start-update-one
  filter = { name: 'Happy Garden' }

  update = { '$set' => { name: 'Mountain House' } }

  single_result = collection.update_one(filter, update)

  puts "#{single_result.modified_count} document(s) updated."
  # end-update-one

  # Updates multiple documents
  # start-update-many
  filter = { name: 'Starbucks' }

  update = { '$rename' => { address: 'location' } }

  many_result = collection.update_many(filter, update)

  puts "#{many_result.modified_count} document(s) updated."
  # end-update-many

  # Performs an update operation with the upsert option enabled
  # start-update-options
  filter = { 'name' => 'Sunrise Pizzeria' }

  update = { '$set' => { borough: 'Queens', cuisine: 'Italian' } }

  upsert_result = collection.update_one(filter, update, upsert: true)

  puts "#{upsert_result.modified_count} document(s) updated."
  # end-update-options
end