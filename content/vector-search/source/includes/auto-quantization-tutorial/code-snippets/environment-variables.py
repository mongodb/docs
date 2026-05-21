import getpass
import os
import voyageai
import huggingface_hub

# Function to securely get and set environment variables
def set_env_securely(var_name, prompt):
    value = getpass.getpass(prompt)
    os.environ[var_name] = value

# Environment Variables
set_env_securely("VOYAGE_API_KEY", "Enter your Voyage API Key: ")
set_env_securely("MONGO_URI", "Enter your MongoDB URI: ")
MONGO_URI = os.environ.get("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI not set in environment variables.")

# Voyage Client
voyage_client = voyageai.Client()
# Hugging Face Token (optional)
# Providing a token increases rate limits and speeds up dataset downloads.
# Press Enter to skip.
hf_token = getpass.getpass("Enter your Hugging Face token (optional, press Enter to skip): ")
if hf_token:
    os.environ["HF_TOKEN"] = hf_token
    huggingface_hub.login(hf_token)
    print("Hugging Face token set.")
else:
    print("No Hugging Face token provided. You may experience slower download speeds.")