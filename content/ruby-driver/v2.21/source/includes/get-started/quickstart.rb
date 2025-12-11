# start-bundler
require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end
# end-bundler

# start-query
uri = '<connection string>'

begin
  client = Mongo::Client.new(uri)

  database = client.use('sample_mflix')
  movies = database[:movies]

  # Queries for a movie that has the title 'Back to the Future'
  query = { title: 'Back to the Future' }
  movie = movies.find(query).first

  # Prints the movie document
  puts movie

ensure
  client&.close
end
# end-query
