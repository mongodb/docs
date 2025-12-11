require 'bundler/inline'
gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end

uri = "<connection string>"

Mongo::Client.new(uri) do |client|
  # start-db
  database = client.use('sample_restaurants')
  # end-db

  # start-hello
  client.database.command(hello: 1)
  # end-hello

  # start-readpref
  client.database.command({hello: 1}, read: {mode: :secondary})
  # end-readpref

  # start-print-command
  puts client.database.command({dbStats: 1}).first
  # end-print-command
end