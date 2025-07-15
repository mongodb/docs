require 'mongo'  
require 'json'  
  
uri = "<connection-string>"  
  
begin  
  # Connect to the MongoDB client  
  client = Mongo::Client.new(uri, database: 'sample_mflix')  
  
  # Set the namespace  
  db = client.database  
  collection = db[:embedded_movies]  
  
  # Define the Vector Search index specification  
  index_definition = {  
    name: 'vector_index',  
    type: 'vectorSearch',  
    fields: [  
      {  
        type: "vector",  
        path: "plot_embedding_voyage_3_large",  
        numDimensions: 2048,  
        similarity: "dotProduct"  
      }  
    ]  
  }  
  
  # Create the index using `create_one`  
  index_name = collection.search_indexes.create_one(index_definition)  
  
  puts "Vector search index created successfully: #{index_name}"  
  
rescue Mongo::Error::NoServerAvailable => e  
  # Handle MongoDB server connection issues  
  puts "Failed to connect to MongoDB: #{e.message}"  
  
rescue Mongo::Error::OperationFailure => e  
  # Handle MongoDB operation failure issues  
  puts "Failed to perform operation: #{e.message}"  
  
rescue Mongo::Error => e  
  # Handle general MongoDB-related errors  
  puts "A MongoDB error occurred: #{e.message}"  
  
rescue StandardError => e  
  # Handle any other kinds of errors  
  puts "A general error occurred: #{e.message}"  
  
ensure  
  # Ensure the client is closed  
  client&.close  
  puts "MongoDB client closed."  
end  
