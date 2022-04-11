// update code goes here
Bson filter = Filters.empty();
Bson update = Updates.mul("Radius", 1.60934);
UpdateResult result = coll.updateMany(filter, update);ß
