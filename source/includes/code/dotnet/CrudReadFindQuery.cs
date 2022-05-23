// find code goes here
var cursor = from planet in coll.AsQueryable()
             where planet["hasRings"] == true
             select planet;
