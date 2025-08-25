let companiesInBasicPolygon = realm.objects(Geospatial_Company.self).where {
    $0.location.geoWithin(basicPolygon!)
}
print("Number of companies in basic polygon: \(companiesInBasicPolygon.count)")

let companiesInPolygonWithTwoHoles = realm.objects(Geospatial_Company.self).where {
    $0.location.geoWithin(polygonWithTwoHoles!)
}
print("Number of companies in polygon with two holes: \(companiesInPolygonWithTwoHoles.count)")
