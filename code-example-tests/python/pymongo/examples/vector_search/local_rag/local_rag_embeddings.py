# :replace-start: {
#   "terms": {
#     "CONNECTION_STRING": "MONGODB_URI"
#   }
# }
# The embedding model is downloaded from the Hugging Face model hub on first
# use. The hub caches it locally, so later runs do not download it again.
_model = None


def _load_model():
    """Loads the embedding model once and reuses it across calls."""
    # Imported here rather than at module scope so the test module can be
    # imported without sentence-transformers installed. The package is an
    # optional dependency listed in requirements-models.txt.
    from sentence_transformers import SentenceTransformer

    global _model
    if _model is None:
        _model = SentenceTransformer("voyageai/voyage-4-nano", trust_remote_code=True)
    return _model


def get_embedding(text):
    """Generates a vector embedding for the given document text."""
    return _load_model().encode_document(text).tolist()


def get_query_embedding(text):
    """Generates a vector embedding for the given search query."""
    return _load_model().encode_query(text).tolist()


def create_embeddings(CONNECTION_STRING):
    # The snippet below re-imports MongoClient, which makes the name
    # function-local, so the client is created inside the snippet and closed
    # here rather than being created before the try block.
    client = None
    try:
        # :snippet-start: local-rag-create-embeddings
        from pymongo import MongoClient
        from sentence_transformers import SentenceTransformer

        # Connect to your local MongoDB deployment
        client = MongoClient(CONNECTION_STRING)  # :remove:
        # :uncomment-start:
        # client = MongoClient(MONGODB_URI)
        # :uncomment-end:

        # Select the sample_airbnb.listingsAndReviews collection
        collection = client["sample_airbnb"]["listingsAndReviews"]

        # Load the embedding model (https://huggingface.co/voyageai/voyage-4-nano)
        model = SentenceTransformer("voyageai/voyage-4-nano", trust_remote_code=True)

        # Define a function to generate embeddings for documents
        def get_embedding(text):
            return model.encode_document(text).tolist()

        global _model  # :remove:
        _model = model  # :remove:

        # Filters for only documents with a summary field and without an embeddings field
        filter = {
            "$and": [
                {"summary": {"$exists": True, "$nin": [None, ""]}},
                {"embeddings": {"$exists": False}},
            ]
        }

        # Creates embeddings for subset of the collection
        updated_doc_count = 0
        for document in collection.find(filter).limit(50):
            text = document["summary"]
            embedding = get_embedding(text)
            collection.update_one(
                {"_id": document["_id"]},
                {"$set": {"embeddings": embedding}},
                upsert=True,
            )
            updated_doc_count += 1

        print("Documents updated: {}".format(updated_doc_count))
        # :snippet-end:

        return "Documents updated: {}".format(updated_doc_count)  # :remove:
    finally:
        if client is not None:
            client.close()


# :replace-end:
