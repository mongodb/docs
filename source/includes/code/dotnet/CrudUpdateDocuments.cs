// update code goes here
var filter = Builders<Comet>.Filter.Empty;
var update = Builders<Comet>.Update.Mul("Radius", 1.60934);
var result = coll.UpdateMany(filter, update);
