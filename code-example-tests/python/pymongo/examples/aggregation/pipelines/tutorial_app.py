# Modify imports for each tutorial as needed.
from pymongo import MongoClient

def example(CONNECTION_STRING):
    client = MongoClient(CONNECTION_STRING)
    # :snippet-start: tutorial-app
    # Modify imports for each tutorial as needed.
    # :uncomment-start:
    # from pymongo import MongoClient
    # :uncomment-end:

    # Replace the placeholder with your connection string.
    # :uncomment-start:
    # uri = "<connection-string>"
    # client = MongoClient(uri)
    # :uncomment-end:

    try:
        agg_db = client["agg_tutorials_db"]

        # Get a reference to relevant collections.
        some_coll = agg_db["some_coll"] # :remove:
        another_coll = agg_db["another_coll"] # :remove:
        # ... some_coll = agg_db["some_coll"]
        # ... another_coll = agg_db["another_coll"]

        # Delete any existing documents in collections if needed.
        some_coll.delete_many({"name": "sample0"}) # :remove:
        # ... some_coll.delete_many({})

        # Insert sample data into the collection or collections.
        sample_data = {"name": "sample1"}, {"_id": "filterItem", "name": "filterItem"} # :remove:
        some_coll.insert_many(sample_data) # :remove:
        # ... some_coll.insert_many(...)

        # Create an empty pipeline array.
        pipeline = []

        # Add code to create pipeline stages.
        pipeline.append({ "$match": { "name": "filterItem" } }) # :remove:
        # ... pipeline.append({...})

        # Run the aggregation.
        aggregation_result = some_coll.aggregate(pipeline) # :remove:
        # ... aggregation_result = ...
        document_list = [] # :remove:

        # Print the aggregation results.
        for document in aggregation_result:
            print(document)
            document_list.append(document) # :remove:
        return document_list # :remove:

    finally:
        some_coll.delete_many({}) # :remove:
        client.close()
# :snippet-end:
