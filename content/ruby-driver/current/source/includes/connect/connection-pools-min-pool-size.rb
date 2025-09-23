require 'mongo'

uri = "<connection-string>"
client = Mongo::Client(uri, {
    min_pool_size: 10
})
