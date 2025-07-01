from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_openai import OpenAIEmbeddings

embedding_model = OpenAIEmbeddings(model="text-embedding-ada-002", disallowed_special=())

# Instantiate the vector store
vector_store = MongoDBAtlasVectorSearch.from_connection_string(
   connection_string = MONGODB_URI,
   namespace = "sample_mflix.embedded_movies",
   embedding = embedding_model,
   text_key = "plot",
   embedding_key = "plot_embedding",
   relevance_score_fn = "dotProduct"
)