// find code goes here
Bson filter = or(gt("orderFromSun", 7), lt("orderFromSun", 2));
MongoCursor<Document> cursor = coll.find(filter).iterator();
