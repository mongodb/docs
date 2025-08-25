val companiesInBasicPolygon =
    realm.query<Company>("location GEOWITHIN $basicPolygon").find()
println("Companies in basic polygon: ${companiesInBasicPolygon.size}")

val companiesInPolygonWithHoles =
    realm.query<Company>("location GEOWITHIN $polygonWithTwoHoles").find()
println("Companies in polygon with holes: ${companiesInPolygonWithHoles.size}")
