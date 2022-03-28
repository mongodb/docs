// find code goes here
Bson filter = Filters.eq("hasRings", true);
MongoCursor<Document> cursor = coll.find(filter).iterator();
