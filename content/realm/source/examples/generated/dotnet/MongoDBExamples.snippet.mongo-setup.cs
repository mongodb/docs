mongoClient = user.GetMongoClient("mongodb-atlas");
dbPlantInventory = mongoClient.GetDatabase("inventory");
plantsCollection = dbPlantInventory.GetCollection<Plant>("plants");
