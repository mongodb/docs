// update code goes here
Bson filter = Filters.empty();
Bson update = Updates.mul("radius", 1.60934);
UpdateResult result = coll.updateMany(filter, update);
