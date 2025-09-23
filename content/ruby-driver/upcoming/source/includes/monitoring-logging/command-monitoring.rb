require 'mongo'

# Creates a subscriber for command monitoring
subscriber = Mongo::Monitoring::CommandLogSubscriber.new

# Globally subscribes to command monitoring events
Mongo::Monitoring::Global.subscribe(Mongo::Monitoring::COMMAND, subscriber)

# Replace with your connection string and connect to your client
uri = '<connection string>'
client = Mongo::Client.new(uri)

# Subscribes to command monitoring events at the client level
client.subscribe( Mongo::Monitoring::COMMAND, subscriber)
