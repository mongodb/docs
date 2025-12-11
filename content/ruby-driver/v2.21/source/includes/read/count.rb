require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end

uri = '<connection string>'

Mongo::Client.new(uri) do |client|
  # start-db-coll
  database = client.use('sample_training')
  collection = database['companies']
  # end-db-coll

  # Counts all documents in the collection
  # start-count-all
  result = collection.count_documents
  puts "Number of documents: #{result}"
  # end-count-all

  # Counts documents that have a "founded_year" value of 2010
  # start-count-accurate
  result = collection.count_documents(founded_year: 2010)
  puts "Number of companies founded in 2010: #{result}"
  # end-count-accurate

  # Counts a maximum of 100 documents that have a "number_of_employees" value of 50
  # start-modify-accurate
  result = collection.count_documents({ number_of_employees: 50 }, limit: 100)
  puts "Number of companies with 50 employees: #{result}"
  # end-modify-accurate

  # Estimates the number of documents in the collection
  # start-count-estimate
  result = collection.estimated_document_count
  puts "Estimated number of documents: #{result}"
  # end-count-estimate

  # Estimates the number of documents in the collection and sets a time limit on the operation
  # start-modify-estimate
  result = collection.estimated_document_count(max_time_ms: 1000)
  puts "Estimated number of documents: #{result}"
  # end-modify-estimate
end
