require 'mongo'

uri = "<connection-string>"
client = Mongo::Client(uri, {
    timeout_ms: 10000
})
