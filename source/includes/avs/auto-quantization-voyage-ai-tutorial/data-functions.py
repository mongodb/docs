import pandas as pd
from datasets import load_dataset
from bson.binary import Binary, BinaryVectorDtype
import pymongo

# Connect to Cluster
def get_mongo_client(uri):
    """Connect to MongoDB and confirm the connection."""
    client = pymongo.MongoClient(uri)
    if client.admin.command("ping").get("ok") == 1.0:
        print("Connected to MongoDB successfully.")
        return client
    print("Failed to connect to MongoDB.")
    return None

# Generate BSON Vector
def generate_bson_vector(array, data_type):
    """Convert an array to BSON vector format."""
    array = [float(val) for val in eval(array)]
    return Binary.from_vector(array, BinaryVectorDtype(data_type))

# Load Datasets
def load_and_prepare_data(dataset_name, amount):
    """Load and prepare streaming datasets for DataFrame."""
    data = load_dataset(dataset_name, streaming=True, split="train").take(amount)
    return pd.DataFrame(data)

# Insert datasets into MongoDB Collection
def insert_dataframe_into_collection(df, collection):
    """Insert Dataset records into MongoDB collection."""
    collection.insert_many(df.to_dict("records"))
    print(f"Inserted {len(df)} records into '{collection.name}' collection.")