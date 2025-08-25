let companiesInSmallCircle = realm.objects(Geospatial_Company.self).where {
    $0.location.geoWithin(smallCircle!)
}
print("Number of companies in small circle: \(companiesInSmallCircle.count)")

let companiesInLargeCircle = realm.objects(Geospatial_Company.self)
    .filter("location IN %@", largeCircle)
print("Number of companies in large circle: \(companiesInLargeCircle.count)")
