require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end

uri = '<connection string>'

Mongo::Client.new(uri) do |client|
    # Access database and collection
    # start-db-coll
    database = client.use('sample_restaurants')
    collection = database[:restaurants]
    # end-db-coll
  
    # Retrieves documents matching the "name" field query
    # and projects their "name", "cuisine", and "borough" values
    # start-project-include
    opts = { projection: { name: 1, cuisine: 1, borough: 1 } }
    collection.find({ name: 'Emerald Pub' }, opts).each do |doc|
      puts doc
    end
    # end-project-include
  
    # Retrieves documents matching the "name" field query
    # and projects their "name", "cuisine", and "borough" values while excluding the "_id" values
    # start-project-include-without-id
    opts = { projection: { name: 1, cuisine: 1, borough: 1, _id: 0 } }
    collection.find({ name: 'Emerald Pub' }, opts).each do |doc|
      puts doc
    end
    # end-project-include-without-id
  
    # Retrieves documents matching the "name" field query
    # and excludes their "grades" and "address" values when printing
    # start-project-exclude
    opts = { projection: { grades: 0, address: 0 } }
    collection.find({ name: 'Emerald Pub' }, opts).each do |doc|
      puts doc
    end
    # end-project-exclude
  end