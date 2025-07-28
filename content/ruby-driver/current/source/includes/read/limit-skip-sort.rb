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

  # Retrieves 5 documents that have a "cuisine" value of "Italian"
  # start-limit
  filter = { cuisine: 'Italian' }
  collection.find(filter)
            .limit(5)
            .each { |doc| puts doc }
  # end-limit

  # Retrieves documents with a "cuisine" value of "Italian" and sorts in ascending "name" order
  # start-sort
  filter = { cuisine: 'Italian' }
  collection.find(filter)
            .sort(name: 1)
            .each { |doc| puts doc }
  # end-sort

  # Retrieves documents with a "borough" value of "Manhattan" but skips the first 10 results
  # start-skip
  filter = { borough: 'Manhattan' }
  collection.find(filter)
            .skip(10)
            .each { |doc| puts doc }
  # end-skip

  # Retrieves 5 documents with a "cuisine" value of "Italian", skips the first 10 results,
  # and sorts by ascending "name" order
  # start-limit-sort-skip
  filter = { cuisine: 'Italian' }
  collection.find(filter)
            .limit(5)
            .skip(10)
            .sort(name: 1)
            .each { |doc| puts doc }
  # end-limit-sort-skip
end
