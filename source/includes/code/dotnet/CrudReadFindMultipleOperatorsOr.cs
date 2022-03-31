// find code goes here
var cursor = from planet in coll.AsQueryable()
             where planet["orderFromSun"] > 7 || planet["orderFromSun"] < 2
             select planet;
