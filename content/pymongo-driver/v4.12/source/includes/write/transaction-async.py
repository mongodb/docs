# start-transaction
# Establishes a connection to the MongoDB server
client = AsyncMongoClient("<connection string>")

# Defines the database and collection
restaurants_db = client["sample_restaurants"]
restaurants_collection = restaurants_db["restaurants"]

# Function performs the transaction
async def insert_documents(session):
    restaurants_collection_with_session = restaurants_collection.with_options(
        write_concern=WriteConcern("majority"),
        read_concern=ReadConcern("local")
    )
    
    # Inserts documents within the transaction
    await restaurants_collection_with_session.insert_one(
        {"name": "PyMongo Pizza", "cuisine": "Pizza"}, session=session
    )
    await restaurants_collection_with_session.insert_one(
        {"name": "PyMongo Burger", "cuisine": "Burger"}, session=session
    )

# Starts a client session
with client.start_session() as session:
    try:
        # Uses the with_transaction method to start a transaction, execute the callback, and commit (or abort on error).
        await session.with_transaction(insert_documents)
        print("Transaction succeeded")
    except (ConnectionFailure, OperationFailure) as e:
        print(f"Transaction failed: {e}")

# Closes the client connection
await client.close()
# end-transaction