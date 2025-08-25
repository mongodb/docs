var companiesInBox1 = realm.All<Company>()
    .Where(c => QueryMethods.GeoWithin(c.Location, box1));

var companiesInBox2 = realm.All<Company>()
    .Where(c => QueryMethods.GeoWithin(c.Location, box2));
