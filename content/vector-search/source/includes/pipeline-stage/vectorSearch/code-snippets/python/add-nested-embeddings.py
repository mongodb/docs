import os
import pymongo
import voyageai

# Set your Voyage API key
os.environ["VOYAGE_API_KEY"] = "<API-KEY>"
vo = voyageai.Client()

def get_embedding(text):
    """Retrieves the embedding for a given text using the voyage-4-large model."""
    try:
        return vo.embed([text], model="voyage-4-large").embeddings[0]
    except Exception as e:
        print("An error occurred while retrieving embeddings:", e)
        return None

# Connect to your MongoDB cluster
mongo_client = pymongo.MongoClient("<CONNECTION-STRING>")
db = mongo_client["sample_airbnb"]
collection = db["listingsAndReviews"]

# Filter to exclude null or empty fields and check for missing embedding
filter = {
    "reviews": {
        "$elemMatch": {
            "comments": {"$nin": [None, ""]},
            "comments_embedding": {"$exists": False}
        }
    }
}

# Count documents matching the filter
doc_count_before_update = collection.count_documents(filter)
print(f"Number of documents matching the filter: {doc_count_before_update}")

# Get all matching documents into a list 
documents_to_process = list(collection.find(filter, no_cursor_timeout=True))

# Add comments_embedding to each review that is missing it
updated_review_count = 0
for doc in documents_to_process:
    if 'reviews' in doc and isinstance(doc['reviews'], list):
        for review in doc['reviews']:
            if isinstance(review, dict) and 'comments' in review and review['comments']:
                if 'comments_embedding' not in review:
                    embedding = get_embedding(review['comments'])
                    if embedding is not None:
                        collection.update_one(
                            {"_id": doc["_id"]},
                            {"$set": {"reviews.$[elem].comments_embedding": embedding}},
                            array_filters=[{"elem._id": review["_id"]}]
                        )
                        updated_review_count += 1

print(f"Updated {updated_review_count} reviews.")
mongo_client.close()