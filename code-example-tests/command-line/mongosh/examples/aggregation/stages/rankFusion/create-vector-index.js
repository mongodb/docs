// :snippet-start: rankfusion-vector-index
db.embedded_movies.createSearchIndex(
   "vector_index",
   "vectorSearch",
   {
      "fields": [
         {
            "type": "vector",
            "path": "<FIELD_NAME>",
            "numDimensions": <NUMBER_OF_DIMENSIONS>,
            "similarity": "dotProduct"
         }
      ]
   }
);
// :snippet-end:
