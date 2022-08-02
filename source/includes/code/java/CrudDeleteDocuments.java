// delete code goes here
Bson filter = Filters.and(Filters.gt("orbitalPeriod", 5), Filters.lt("orbitalPeriod", 85));
DeleteResult result = coll.deleteMany(filter);
