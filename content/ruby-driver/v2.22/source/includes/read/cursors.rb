require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end

uri = '<connection string>'

Mongo::Client.new(uri) do |client|
  # start-db-coll
  database = client.use('sample_restaurants')
  collection = database[:restaurants]
  # end-db-coll

  # Iterates over and prints all documents that have a "name" value of "Dunkin' Donuts"
  # start-cursor-iterate
  cursor = collection.find(name: "Dunkin' Donuts")
  cursor.each do |doc|
    puts doc
  end
  # end-cursor-iterate

  # Retrieves and prints the first document stored in the cursor
  # start-cursor-first
  cursor = collection.find(name: "Dunkin' Donuts")
  first_doc = cursor.first
  puts first_doc
  # end-cursor-first

  # Converts the documents stored in a cursor to an array
  # start-cursor-array
  cursor = collection.find(name: "Dunkin' Donuts")
  array_results = cursor.to_a
  # end-cursor-array

  # Creates a collection with a maximum size and inserts documents representing vegetables
  # start-capped-coll
  db = client.use('db')
  collection = db[:vegetables, capped: true, size: 1024 * 1024]
  collection.create

  vegetables = [
    { name: 'cauliflower' },
    { name: 'zucchini' }
  ]

  collection.insert_many(vegetables)
  # end-capped-coll


  # Iterates over the initial query results and continues iterating until three documents are stored in the cursor
  # by using a tailable cursor
  # start-tailable
  cursor = collection.find({}, cursor_type: :tailable)
  docs_found = 0

  cursor.each do |doc|
    puts doc
    docs_found += 1
    break if docs_found >= 3
  end
  # end-tailable
end
