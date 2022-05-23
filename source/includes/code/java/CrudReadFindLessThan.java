// find code goes here
Bson filter = lt("surfaceTemperatureC.mean", 15);
MongoCursor<Document> cursor = coll.find(filter).iterator();
