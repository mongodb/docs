#   :replace-start: {
#     "terms": {
#       "CONNECTION_STRING": "\"<connection string URI>\""
#     }
#   }

def get_started(CONNECTION_STRING):
    # :snippet-start: example
    from pymongo import MongoClient
    import json

    uri = CONNECTION_STRING
    client = MongoClient(uri)

    try:
        database = client.get_database("sample_mflix")
        movies = database.get_collection("movies")

        # Queries for a movie that has the title 'Back to the Future'
        query = { "title": "Back to the Future" }
        movie = movies.find_one(query)

        print(json.dumps(movie, indent=4, default=str))

        client.close()
        return movie  # :remove:

    except Exception as e:
        raise Exception("Unable to find the document due to the following error: ", e)

# :snippet-end:
# :replace-end:

