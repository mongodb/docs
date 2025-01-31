require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end

uri = '<connection string>'

Mongo::Client.new(uri) do |client|
  # start-setup
  database = client.use('db')
  collection = database[:fruits]

  # Inserts documents representing fruits
  fruits = [
  { _id: 1, name: 'apples', qty: 5, rating: 3, color: 'red', type: ['fuji', 'honeycrisp'] },
  { _id: 2, name: 'bananas', qty: 7, rating: 4, color: 'yellow', type: ['cavendish'] },
  { _id: 3, name: 'oranges', qty: 6, rating: 2, type: ['naval', 'mandarin'] },
  { _id: 4, name: 'pineapples', qty: 3, rating: 5, color: 'yellow' }
  ]

  collection.insert_many(fruits)
  # end-setup

  # Retrieves documents in which the "color" value is "yellow"
  # start-find-exact
  filter = { color: 'yellow' }
  results = collection.find(filter)
  results.each do |doc|
    puts doc
  end
  # end-find-exact

  # Retrieves and prints documents in which the "rating" value is greater than 2
  # start-find-comparison
  filter = { rating: { '$gt' => 2 } }
  results = collection.find(filter)
  results.each do |doc|
    puts doc
  end
  # end-find-comparison

  # Retrieves and prints documents that match one or both query filters
  # start-find-logical
  filter = { '$or' => [{ qty: { '$gt' => 5 } }, { color: 'yellow' }] }
  results = collection.find(filter)
  results.each do |doc|
    puts doc
  end
  # end-find-logical

  # Retrieves and prints documents in which the "type" array has 2 elements
  # start-find-array
  filter = { type: { '$size' => 2 } }
  results = collection.find(filter)
  results.each do |doc|
    puts doc
  end
  # end-find-array

  # Retrieves and prints documents that have a "color" field
  # start-find-element
  filter = { color: { '$exists' => true } }
  results = collection.find(filter)
  results.each do |doc|
    puts doc
  end
  # end-find-element

  # Retrieves and prints documents in which the "name" value has at least two consecutive "p" characters
  # start-find-evaluation
  filter = { name: /p{2,}/ }
  results = collection.find(filter)
  results.each do |doc|
    puts doc
  end
  # end-find-evaluation
end
