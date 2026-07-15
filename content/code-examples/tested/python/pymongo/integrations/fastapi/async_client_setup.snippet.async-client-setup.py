client = AsyncMongoClient(
    os.environ["MONGODB_URL"],
    server_api=pymongo.server_api.ServerApi(
        version="1", strict=True, deprecation_errors=True
    ),
)
db = client.get_database("college")
student_collection = db.get_collection("students")
