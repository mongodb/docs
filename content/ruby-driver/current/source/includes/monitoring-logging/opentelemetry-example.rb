require 'mongo'
require 'opentelemetry/sdk'

# Configure OpenTelemetry
OpenTelemetry::SDK.configure do |c|
  c.service_name = 'my-app'
end

# Create MongoDB client with tracing enabled
client = Mongo::Client.new(['localhost:27017'],
  database: 'test',
  tracing: { 
    enabled: true,
    query_text_max_length: 1024 
  }
)

# Use the client normally - operations are traced
collection = client[:users]
collection.insert_one({ name: 'Alice', age: 30 })
collection.find({ age: { '$gte': 25 } }).to_a
