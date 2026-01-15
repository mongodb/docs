from pymongo import MongoClient
from anthropic import Anthropic
import voyageai
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Environment variables (private)
MONGODB_URI = os.getenv("MONGODB_URI")
VOYAGE_API_KEY = os.getenv("VOYAGE_API_KEY")
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
  
# MongoDB cluster configuration
mongo_client = MongoClient(MONGODB_URI)
rag_db = mongo_client["rag_db"]
collection = rag_db["test"]

# Model configuration
voyage_client = voyageai.Client(api_key=VOYAGE_API_KEY)
anthropic_client = Anthropic(api_key=ANTHROPIC_API_KEY)
VOYAGE_MODEL = "voyage-4-large"
ANTHROPIC_MODEL = "claude-sonnet-4-5-20250929"
