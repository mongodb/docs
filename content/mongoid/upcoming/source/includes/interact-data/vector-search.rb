# start-model
class Movie
  include Mongoid::Document

  store_in collection: "embedded_movies", database: "sample_mflix"

  field :title, type: String
  field :plot, type: String
  field :year, type: Integer

  field :plot_embedding, type: Array

  # Declare a vector search index on the `plot_embedding` field. The `_id`
  # and `year` filter fields enable instance-level and filtered queries.
  vector_search_index :plot_embedding_index,
    fields: [
      {
        type: "vector",
        path: "plot_embedding",
        numDimensions: 1536,
        similarity: "cosine"
      },
      {
        type: "filter",
        path: "_id"
      },
      {
        type: "filter",
        path: "year"
      }
    ]
end
# end-model

# start-basic-query
# The query vector must have the same number of dimensions as the
# vector search index (1536, in this example).
query_vector = [ -0.0016261312, -0.028070757, -0.011342932, ..., -0.009710136 ]

movies = Movie.vector_search(query_vector, limit: 5)

movies.each do |movie|
  puts movie.title
end
# end-basic-query

# start-score-query
movies = Movie.vector_search(query_vector, limit: 5)

movies.each do |movie|
  puts "#{movie.title}: #{movie.vector_search_score}"
end
# end-score-query

# start-similar-query
movie = Movie.find_by(title: "About Time")

neighbors = movie.vector_search(limit: 5)

neighbors.each do |neighbor|
  puts neighbor.title
end
# end-similar-query

# start-options-query
movies = Movie.vector_search(
  query_vector,
  limit: 5,
  num_candidates: 150,
  filter: { year: { "$gt" => 2000 } }
)
# end-options-query
