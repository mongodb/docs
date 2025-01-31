require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end

uri = '<connection string>'

Mongo::Client.new(uri) do |client|
  # Access the database and collection
  # start-db-coll
  database = client.use('sample_restaurants')
  collection = database[:restaurants]
  # end-db-coll

  # Retrieves distinct values of the "borough" field
  # start-distinct
  results = collection.distinct('borough')
  results.each do |value|
    puts value
  end
  # end-distinct

  # Retrieves distinct "borough" field values for documents with a "cuisine" value of "Italian"
  # start-distinct-with-query
  results = collection.distinct('borough', { cuisine: 'Italian' })
  results.each do |value|
    puts value
  end
  # end-distinct-with-query

  # Retrieves distinct "name" field values for documents matching the "borough" and "cuisine" fields query
  # and uses primary preferred read preference
  # start-distinct-with-opts
  filter = { borough: 'Bronx', cuisine: 'Pizza' }
  options = { read: { mode: :primary_preferred } }
  results = collection.distinct('name', filter, options)
  
  results.each do |value|
    puts value
  end
  # end-distinct-with-opts
end
