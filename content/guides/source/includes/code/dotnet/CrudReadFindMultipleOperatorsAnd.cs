// find code goes here
var cursor = from planet in coll.AsQueryable()
             where planet["surfaceTemperatureC.mean"] < 15 && planet["surfaceTemperatureC.min"] > -100
             select planet;

