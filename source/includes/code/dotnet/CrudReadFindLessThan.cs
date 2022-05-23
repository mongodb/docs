// find code goes here
var cursor = from planet in coll.AsQueryable()
             where planet["surfaceTemperatureC.mean"] < 15
             select planet;
