// delete code goes here
var result = coll.DeleteMany(x => x.OrbitalPeriod > 5 && x.OrbitalPeriod < 85);
