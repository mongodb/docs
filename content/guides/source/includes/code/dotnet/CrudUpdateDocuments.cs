// update code goes here
var filter = Builders<Comet>.Filter.Empty;
var update = Builders<Comet>.Update.Mul("radius", 1.60934);
var result = coll.UpdateMany(filter, update);
