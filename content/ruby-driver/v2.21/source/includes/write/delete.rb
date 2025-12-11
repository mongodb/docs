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

  # start-delete-one
  filter = { name: 'Happy Garden' }
  result = collection.delete_one(filter)
  puts "Deleted #{result.deleted_count} document(s)"
  # end-delete-one

  # start-delete-many
  filter = { name: 'Starbucks', borough: 'Brooklyn' }
  result = collection.delete_many(filter)
  puts "Deleted #{result.deleted_count} document(s)"
  # end-delete-many

  # start-delete-options
  filter = { name: /Red/ }
  options = { hint: 'name_index' }
  result = collection.delete_many(filter, options)
  puts "Deleted #{result.deleted_count} document(s)"
  # end-delete-options
end