var GeoWthinExample = realm.All<Company>()
    .Where(c => QueryMethods.GeoWithin(c.Location, circle1));

var RQLExample = realm.All<Company>()
    .Filter("Location geoWithin $0", circle2);
