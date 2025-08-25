const mongodb = app.currentUser.mongoClient("mongodb-atlas");
const plants = mongodb.db("example").collection<Plant>("plants");
