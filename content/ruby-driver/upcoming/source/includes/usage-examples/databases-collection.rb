require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end

uri = '<connection string>'

Mongo::Client.new(uri) do |client|
  # start-access-db
  client = Mongo::Client.new(['127.0.0.1:27017'], database: 'test_database')
  database = client.database
  # end-access-db

  # start-access-cl
  database = client.database
  collection = database['test_collection']
  # end-access-cl

  # start-create-collection
  database = client.database

  database[:example_collection].create(capped: true, size: 1024)
  # end-create-collection

  # start-get-list
  database = client.database
 
  collection_list = database.collections
 
  collection_list.each do |collection|
    puts collection.name
  end
  # end-get-list

  # start-get-list-names
  database = client.database
 
  collection_names = database.collection_names
 
  collection_names.each do |name|
    puts name
  end
  # end-get-list-names

  # start-delete
  database = client.database
 
  collection = database[:test_collection]
  collection.drop
  # end-delete

  # start-with-database
  database_with_settings = client.use('test_database').with(
    read: { mode: :secondary },
    read_concern: { level: :local },
    write: { w: :majority }
  )
  # end-with-database

  # start-with-collection

  collection_with_settings = client[:test_collection].with(
    read: { mode: :secondary },
    read_concern: { level: :local },
    write: { w: :majority }
  )
  # end-with-collection

  # start-tag-sets
  client = Mongo::Client.new(['IP_ADDRESS_001:27017'], database: 'test', read: {
      mode: :secondary,
      tag_sets: [{'dc' => 'ny'}, {'dc' => 'sf'}]
    })
   
    database = client.database
   
    collection = database[:example_collection]
  # end-tag-sets

  # start-local-threshold-example
  client = Mongo::Client.new(
      ['IP_ADDRESS_001:27017'],
      database: 'test_database',
      read: { mode: :secondary_preferred },
      local_threshold: 35
    )

    database = client.database

    collection = database[:example_collection]
    result = collection.find({}).first
    puts result
  # end-local-threshold-example
end