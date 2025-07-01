import time
from pymongo.operations import SearchIndexModel

def setup_vector_search_index(collection, index_definition, index_name="vector_index"):
    new_vector_search_index_model = SearchIndexModel(
        definition=index_definition, name=index_name, type="vectorSearch"
    )

    # Create the new index
    try:
        result = collection.create_search_index(model=new_vector_search_index_model)
        print(f"Creating index '{index_name}'...")

        # Wait for initial sync to complete
        print("Polling to check if the index is ready. This may take a couple of minutes.") 
        predicate=None
        if predicate is None: 
            predicate = lambda index: index.get("queryable") is True 
            while True:
                indices = list(collection.list_search_indexes(result)) 
                if len(indices) and predicate(indices[0]): 
                    break 
                time.sleep(5)
        print(f"Index '{index_name}' is ready for querying.")
        return result

    except Exception as e:
        print(f"Error creating new vector search index '{index_name}': {e!s}")
        return None