const mongo = app.currentUser.mongoClient(DATA_SOURCE_NAME);
const collection = mongo.db(DATABASE_NAME).collection(COLLECTION_NAME);
