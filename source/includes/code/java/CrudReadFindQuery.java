// find code goes here
Bson filter = eq("hasRings", true);
MongoCursor<Document> cursor = coll.find(filter).iterator();
