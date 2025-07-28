require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end

uri = '<connection string>'

Mongo::Client.new(uri) do |client|

  # start-find-one
  document = collection.find(name: '<value>').first
  puts document
  # end-find-one

  # start-find-many
  results = collection.find(founded_year: '<value>')
  # end-find-many

  # start-count-collection
  result = collection.count_documents
  puts "Number of documents: #{result}"
  # end-count-collection

  # start-count-accurate
  result = collection.count_documents('key': '<value>')
  puts "value: #{result}"
  # end-count-accurate

  # start-count-estimate
  result = collection.estimated_document_count
  puts "Estimated number of documents: #{result}"
  # end-count-estimate

  # start-distinct
  results = collection.distinct('field')
  # end-distinct

  # start-monitor-changes
  stream = collection.watch
  collection.insert_one(a: 1)
  doc = stream.first
  process(doc)
  # end-monitor-changes