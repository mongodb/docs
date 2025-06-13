import pandas as pd
from bson.binary import Binary, BinaryVectorDtype
from pymongo.errors import CollectionInvalid

wikipedia_data_df = load_and_prepare_data("MongoDB/wikipedia-22-12-en-voyage-embed", amount=250000)
wikipedia_annotation_data_df = load_and_prepare_data("MongoDB/wikipedia-22-12-en-annotation", amount=250000)
wikipedia_annotation_data_df.drop(columns=["_id"], inplace=True)

# Convert embeddings to BSON format
wikipedia_data_df["embedding"] = wikipedia_data_df["embedding"].apply(
    lambda x: generate_bson_vector(x, BinaryVectorDtype.FLOAT32)
)

# MongoDB Setup
mongo_client = get_mongo_client(MONGO_URI)
DB_NAME = "testing_datasets"
db = mongo_client[DB_NAME]

collections = {
    "wikipedia-22-12-en": wikipedia_data_df,
    "wikipedia-22-12-en-annotation": wikipedia_annotation_data_df,
}

# Create Collections and Insert Data
for collection_name, df in collections.items():
    if collection_name not in db.list_collection_names():
        try:
            db.create_collection(collection_name)
            print(f"Collection '{collection_name}' created successfully.")
        except CollectionInvalid:
            print(f"Error creating collection '{collection_name}'.")
    else:
        print(f"Collection '{collection_name}' already exists.")

    # Clear collection and insert fresh data
    collection = db[collection_name]
    collection.delete_many({})
    insert_dataframe_into_collection(df, collection)