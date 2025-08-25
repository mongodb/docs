val companiesInLargeCircle =
    realm.query<Company>("location GEOWITHIN $circle1").find()
println("Companies in large circle: ${companiesInLargeCircle.size}")

val companiesInSmallCircle =
    realm.query<Company>("location GEOWITHIN $circle2").find()
println("Companies in small circle: ${companiesInSmallCircle.size}")
