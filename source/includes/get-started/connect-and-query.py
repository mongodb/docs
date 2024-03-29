from pymongo import MongoClient

uri = "<connection string URI>"
client = MongoClient(uri)

try:
    database = client.get_database("sample_mflix")
    movies = database.get_collection("movies")

    # Query for a movie that has the title 'Back to the Future'
    query = { "title": "Back to the Future" }
    movie = movies.find_one(query)

    print(movie)

    client.close()

except Exception as e:
    raise Exception("Unable to find the document due to the following error: ", e)
