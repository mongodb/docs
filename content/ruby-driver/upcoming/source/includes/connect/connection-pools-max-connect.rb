require 'mongo'

uri = "<connection-string>"
client = Mongo::Client(uri, {
    max_connecting: 2
})
