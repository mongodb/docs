require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end

uri = '<connection string>'

Mongo::Client.new(uri) do |client|
  database = client.use('<database name>')
  collection = database['<collection name>']

 # Start example code here

  # End example code here
end