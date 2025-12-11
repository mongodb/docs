require 'mongo'

# Creates a subscriber for connection pool monitoring
subscriber = Mongo::Monitoring::CmapLogSubscriber.new

# Globally subscribes to connection pool monitoring events
Mongo::Monitoring::Global.subscribe(Mongo::Monitoring::CONNECTION_POOL, subscriber)

# Replace with your connection string and connect to your client
uri = '<connection string>'
client = Mongo::Client.new(uri)

# Subscribes to connection pool monitoring events at the client level
client.subscribe(Mongo::Monitoring::CONNECTION_POOL, subscriber)
