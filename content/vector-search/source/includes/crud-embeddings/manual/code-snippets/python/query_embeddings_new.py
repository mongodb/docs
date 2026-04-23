# Generate embedding for the search query
query_embedding = get_embedding("ocean tragedy")

# Sample vector search pipeline
pipeline = [
   {
      "$vectorSearch": {
            "index": "vector_index",
            "queryVector": query_embedding,
            "path": "embedding",
            "exact": True,
            "limit": 5
      }
   }, 
   {
      "$project": {
         "_id": 0, 
         "text": 1,
         "score": {
            "$meta": "vectorSearchScore"
         }
      }
   }
]

# Execute the search
results = collection.aggregate(pipeline)

# Print results
for i in results:
   print(i)
