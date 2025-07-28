require 'bundler/inline'
gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end


  # start-create
  client = Mongo::Client.new('<connection string>', database: 'weather')
  collection_name = 'october2024'

  time_series_options = { timeField: 'timestamp' }
  database = client.database
  database.command(
    create: collection_name,
    timeseries: time_series_options
  )
  # end-create

  # start-correct
  collections = database.list_collections(filter: { name: 'october2024' }).to_a
  puts collections
  # end-correct

  # start-insert
  client = Mongo::Client.new('<connection string>', database => 'your_db')
  collection = client[:october2024]

  document_list = [
    { temperature: 77, location: "New York City", timestamp: DateTime.new(2024, 10, 22, 6, 0, 0) },
    { temperature: 74, location: "New York City", timestamp: DateTime.new(2024, 10, 23, 6, 0, 0) }
  ]

  collection.insert_many(document_list)
  #end-insert