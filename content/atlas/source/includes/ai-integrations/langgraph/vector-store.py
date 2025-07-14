from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_voyageai import VoyageAIEmbeddings

embedding_model = VoyageAIEmbeddings(
    model = "voyage-3-large",
    output_dimension = 2048
)

# Instantiate the vector store
vector_store = MongoDBAtlasVectorSearch.from_connection_string(
   connection_string = MONGODB_URI,
   namespace = "sample_mflix.embedded_movies",
   embedding = embedding_model,
   text_key = "plot",
   embedding_key = "plot_embedding_voyage_3_large",
   relevance_score_fn = "dotProduct"
)