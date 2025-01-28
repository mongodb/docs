# start default modeling
class Restaurant
  include Mongoid::Document
end

class Person
  include Mongoid::Document
end
# end default modeling

# start set pluralization
ActiveSupport::Inflector.inflections do |inflect|
  inflect.plural("rey", "reyes")
end
# end set pluralization

# start BSON model
{
    "_id" : ObjectId("4d3ed089fb60ab534684b7e9"),
    "title" : "Sir",
    "name" : {
        "_id" : ObjectId("4d3ed089fb60ab534684b7ff"),
        "first_name" : "Durran"
    },
    "addresses" : [
        {
          "_id" : ObjectId("4d3ed089fb60ab534684b7e0"),
          "city" : "Berlin",
          "country" : "Deutschland"
        }
    ]
}
# end BSON model

# start store_in example
class Person
  include Mongoid::Document
  store_in collection: "citizens", database: "other", client: "analytics"
end
# end store_in example

# start store_in lambda example
class Band
  include Mongoid::Document
  store_in database: ->{ Thread.current[:database] }
end
# end store_in lambda example

# start persistence context attributes
puts Band.client_name

puts Band.database_name

puts Band.collection_name
# end persistence context attributes

# start with example
class Band
  include Mongoid::Document

  field :name, type: String
  field :likes, type: Integer
end

# Creates document in 'bands' collection in 'music-non-stop' database within
# default cluster
Band.with(database: "music-non-stop") do |band_class|
  band_class.create(name: "Medusa and the Polyps")
end

# Deletes all documents in 'artists' collection within default database
Band.with(collection: "artists") do |band_class|
  band_class.delete_all
end

band = Band.new(name: "Japanese Breakfast")

# Perform operations on tertiary cluster
band.with(client: :tertiary) do |band_object|
  band_object.save!
    
  band.save!
end
# end with example

# start read configuration
Band.with(read: {mode: :secondary}) do
  Band.count

  # This write operation runs in the 
  # new persistence context, but is 
  # not affected by the read preference.
  Band.create(name: "Metallica")
end
# end read configuration

# start global configuration example
class BandsController < ApplicationController
  before_action :switch_database
  after_action :reset_database

  private

  def switch_database
    I18n.locale = params[:locale] || I18n.default_locale
    Mongoid.override_database("my_db_name_#{I18n.locale}")
  end

  def reset_database
    Mongoid.override_database(nil)
  end
end
# end global configuration example

# start access client collection
Band.mongo_client
band.mongo_client

Band.collection
band.collection
# end access client collection

# start client with example
Band.mongo_client.with(write: { w: 0 }, database: "music") do |client|
  client[:artists].find(...)
end
# end client with example

# start collection with example
Band.collection.with(write: { w: 0 }) do |collection|
  collection[:artists].find(...)
end
# end collection with example