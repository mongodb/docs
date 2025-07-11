// find code goes here
Bson filter = and(lt("surfaceTemperatureC.mean", 15), gt("surfaceTemperatureC.min", -100));
MongoCursor<Document> cursor = coll.find(filter).iterator();
