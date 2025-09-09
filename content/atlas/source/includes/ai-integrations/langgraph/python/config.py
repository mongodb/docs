import os
from pymongo import MongoClient
from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_mongodb.index import create_fulltext_search_index
from langchain_voyageai import VoyageAIEmbeddings
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get required environment variables
MONGODB_URI = os.getenv("MONGODB_URI")
if not MONGODB_URI:
    raise ValueError("MONGODB_URI environment variable is required")

# Initialize models
embedding_model = VoyageAIEmbeddings(
    model="voyage-3-large",
    output_dimension=2048
)
llm = ChatOpenAI("gpt-4o")

# MongoDB setup
mongo_client = MongoClient(MONGODB_URI)
collection = mongo_client["sample_mflix"]["embedded_movies"]

# LangChain vector store setup
vector_store = MongoDBAtlasVectorSearch.from_connection_string(
    connection_string=MONGODB_URI,
    namespace="sample_mflix.embedded_movies",
    embedding=embedding_model,
    text_key="plot",
    embedding_key="plot_embedding_voyage_3_large",
    relevance_score_fn="dotProduct",
)

# Create indexes on startup
print("Setting up vector store and indexes...")
try:
    existing_indexes = list(collection.list_search_indexes())
    vector_index_exists = any(idx.get('name') == 'vector_index' for idx in existing_indexes)
    if vector_index_exists:
        print("Vector search index already exists, skipping creation...")
    else:
        print("Creating vector search index...")
        vector_store.create_vector_search_index(
            dimensions=2048,  # The dimensions of the vector embeddings to be indexed
            wait_until_complete=60  # Number of seconds to wait for the index to build (can take around a minute)
        )
        print("Vector search index created successfully!")
except Exception as e:
    print(f"Error creating vector search index: {e}")
try:
    fulltext_index_exists = any(idx.get('name') == 'search_index' for idx in existing_indexes)

    if fulltext_index_exists:
        print("Search index already exists, skipping creation...")
    else:
        print("Creating search index...")
        create_fulltext_search_index(
            collection=collection,
            field="title",
            index_name="search_index",
            wait_until_complete=60  # Number of seconds to wait for the index to build (can take around a minute)
        )
        print("Search index created successfully!")
except Exception as e:
    print(f"Error creating search index: {e}")
