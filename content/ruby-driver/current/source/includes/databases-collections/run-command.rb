require 'bundler/inline'
gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end

uri = "<connection string>"

Mongo::Client.new(uri) do |client|
  # start-db
  database = client.use('sample_restaurants').database
  # end-db

  # start-hello
  database.command(hello: 1)
  # end-hello

  # start-readpref
  database.command({hello: 1}, read: {mode: :secondary})
  # end-readpref

  # start-print-command
  puts database.command({dbStats: 1}).first
  # end-print-command

  # start-cursor-command
  cursor = database.cursor_command(listCollections: 1, nameOnly: true)
  cursor.each do |doc|
    puts doc
  end
  # end-cursor-command
end