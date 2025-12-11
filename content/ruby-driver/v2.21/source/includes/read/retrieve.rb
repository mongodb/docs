require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end

uri = '<connection string>'

Mongo::Client.new(uri) do |client|
  # start-db-coll
  database = client.use('sample_training')
  collection = database[:companies]
  # end-db-coll

  # Finds one document with a "name" value of "LinkedIn"
  # start-find-one
  document = collection.find(name: 'LinkedIn').first
  puts document
  # end-find-one

  # Finds documents with a "founded_year" value of 1970
  # start-find-many
  results = collection.find(founded_year: 1970)
  # end-find-many

  # start-cursor
  results.each do |doc|
    puts doc
  end
  # end-cursor


  # Finds and prints up to 2 documents with a "number_of_employees" value of 1000
  # start-modify
  limit_results = collection.find(number_of_employees: 1000).limit(2)

  limit_results.each do |doc|
    puts doc
  end
  # end-modify
end

