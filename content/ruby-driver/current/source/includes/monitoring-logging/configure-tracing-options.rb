client = Mongo::Client.new(['localhost:27017'],
  database: 'my_database',
  tracing: {
    enabled: true,
    query_text_max_length: 1024,
    tracer: my_custom_tracer
  }
)
