var companiesInCircle = realm.All<Company>()
    .Where(c => QueryMethods.GeoWithin(c.Location, circle1));

var companiesInSmallerCircle = realm.All<Company>()
    .Where(c => QueryMethods.GeoWithin(c.Location, circle2));
