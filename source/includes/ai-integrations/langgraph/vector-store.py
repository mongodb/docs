from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_openai import OpenAIEmbeddings
from pymongo import MongoClient

# Connect to your Atlas cluster
client = MongoClient(MONGODB_URI)
collection = client["sample_mflix"]["embedded_movies"]
embedding_model = OpenAIEmbeddings(model="text-embedding-ada-002", disallowed_special=())

# Instantiate the vector store
vector_store = MongoDBAtlasVectorSearch(
   collection = collection,
   embedding = embedding_model,
   text_key = "plot",
   embedding_key = "plot_embedding",
   relevance_score_fn = "dotProduct"
)