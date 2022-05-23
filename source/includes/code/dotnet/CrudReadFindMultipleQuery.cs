// find code goes here
var cursor = from planet in coll.AsQueryable()
             where planet["hasRings"] == false
             where planet["mainAtmosphere"] == "Ar"
             select planet;
