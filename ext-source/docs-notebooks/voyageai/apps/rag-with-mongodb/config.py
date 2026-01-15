from pymongo import MongoClient
import voyageai
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Configuration - Choose your LLM provider
LLM_PROVIDER = os.getenv("LLM_PROVIDER", "anthropic").lower()

# Environment variables (private)
MONGODB_URI = os.getenv("MONGODB_URI")
VOYAGE_API_KEY = os.getenv("VOYAGE_API_KEY")

# MongoDB cluster configuration
mongo_client = MongoClient(MONGODB_URI)
rag_db = mongo_client["rag_db"]
collection = rag_db["test"]

# Model configuration
voyage_client = voyageai.Client(api_key=VOYAGE_API_KEY)
VOYAGE_MODEL = "voyage-4-large"

# Initialize LLM client based on provider
if LLM_PROVIDER == "anthropic":
    from anthropic import Anthropic
    ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
    llm_client = Anthropic(api_key=ANTHROPIC_API_KEY)
    LLM_MODEL = "claude-sonnet-4-5-20250929"
else:
    from openai import OpenAI
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    llm_client = OpenAI(api_key=OPENAI_API_KEY)
    LLM_MODEL = "gpt-4o"
