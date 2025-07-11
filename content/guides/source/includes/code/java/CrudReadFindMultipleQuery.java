// find code goes here
Bson filter = and(eq("hasRings", false), eq("mainAtmosphere", "Ar"));
MongoCursor<Document> cursor = coll.find(filter).iterator();
