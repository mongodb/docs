# start-config
require 'sinatra'
require 'mongoid'

Mongoid.load!(File.join(File.dirname(__FILE__), 'config', 'mongoid.yml'))
# end-config

# start-model
class Restaurant
   include Mongoid::Document

   field :name, type: String
   field :cuisine, type: String
   field :borough, type: String

end
# end-model

# start-routes
get '/' do
    @restaurants = Restaurant.all
    erb :index
end

get '/browse' do
    @restaurants = Restaurant
        .where(name: /Moon/i).and(borough: "Queens")
    erb :browse
end
# end-routes