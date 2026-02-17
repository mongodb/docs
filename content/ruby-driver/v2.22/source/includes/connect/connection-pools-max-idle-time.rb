require 'mongo'

uri = "<connection-string>"
client = Mongo::Client(uri, {
    max_idle_time: 10000
})
