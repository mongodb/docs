# start-connection-string
uri = "mongodb://<hostname>:<port>/?compressors=zlib,snappy"
client = Mongo::Client.new(uri)
# end-connection-string

# start-client-settings
client = Mongo::Client.new(["<hostname>:<port>"],
    compressors: ["zlib", "snappy"])
# end-client-settings