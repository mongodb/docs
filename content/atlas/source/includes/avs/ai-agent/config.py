from pymongo import MongoClient
from openai import OpenAI
import voyageai

MONGODB_URI = "<connection-string>"
VOYAGE_API_KEY = "<voyage-api-key>"
OPENAI_API_KEY = "<openai-api-key>"

# MongoDB Atlas configuration
mongo_client = MongoClient(MONGODB_URI)
agent_db = mongo_client["ai_agent_db"]
vector_collection = agent_db["embeddings"]
memory_collection = agent_db["chat_history"]

# Model configuration
voyage_client = voyageai.Client(api_key=VOYAGE_API_KEY)
client = OpenAI(api_key=OPENAI_API_KEY)
VOYAGE_MODEL = "voyage-3-large"
OPENAI_MODEL = "gpt-4o"
