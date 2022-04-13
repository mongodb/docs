// update code goes here
var filter = Builders<Comet>.Filter.Empty;
var update = Builders<Comet>.Update.Mul(x => x.Radius, 1.60934);
var result = coll.UpdateMany(filter, update);
