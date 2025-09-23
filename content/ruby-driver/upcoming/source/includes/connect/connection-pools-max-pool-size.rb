require 'mongo'

uri = "<connection-string>"
client = Mongo::Client(uri, {
    max_pool_size: 200
})
