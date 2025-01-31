require 'bundler/inline'
gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end

uri = '<connection string URI>'

Mongo::Client.new(uri) do |client|
  #start-aggregation
  database = client.use('sample_restaurants')
  restaurants_collection = database[:restaurants]
    
  pipeline = [
    { '$match' => { 'cuisine' => 'Bakery' } },
    { '$group' => {
        '_id' => '$borough',
        'count' => { '$sum' => 1 }
      }
    }
  ]

  aggregation = restaurants_collection.aggregate(pipeline)
    
  aggregation.each do |doc|
    puts doc
  end
  #end-aggregation

  #start-explain-aggregation
  explanation = restaurants_collection.aggregate(pipeline).explain()

  puts explanation
  #end-explain-aggregation

  #start-search-aggregation
  search_pipeline = [
    {
      '$search' => {
        'index' => '<your_search_index_name>',
        'text' => {
          'query' => 'Salt',
          'path' => 'name'
        },
      }
    },
    {
      '$project' => {
        '_id' => 1,
        'name' => 1
      }
    }
  ]
      
  results = collection.aggregate(search_pipeline)

  results.each do |document|
    puts document
  end
  #end-search-aggregation
end