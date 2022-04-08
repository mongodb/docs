// delete code goes here
var filter = Builders<Comet>.Filter.And(Builders<Comet>.Filter.Gt("OrbitalPeriod", 5), Builders<Comet>.Filter.Lt("OrbitalPeriod", 85));
var result = coll.DeleteMany(filter);
