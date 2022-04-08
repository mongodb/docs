// delete code goes here
Bson filter = Filters.and(Filters.gt("OrbitalPeriod", 5), Filters.lt("OrbitalPeriod", 85));
DeleteResult result = coll.deleteMany(filter);
