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

  # Inserts a single document
  # start-insert-one
  document = { name: 'Neighborhood Bar & Grill', borough: 'Queens' }
  collection.insert_one(document)
  # end-insert-one

  # Inserts multiple documents
  # start-insert-many
  documents = [
    { name: 'Metropolitan Cafe', borough: 'Queens' },
    { name: 'Yankee Bistro', borough: 'Bronx' }
  ]
  collection.insert_many(documents)
  # end-insert-many

  # Inserts multiple documents while enabling the bypass_document_validation option
  # start-insert-options
  documents = [
    { name: 'Cloudy Day', borough: 'Brooklyn' },
    { name: 'Squall or Shine', borough: 'Staten Island' }
    { name: 'Rose Field', borough: 'Queens' }
  ]
  options = { bypass_document_validation: true }
  collection.insert_many(documents, options)
  # end-insert-options
end