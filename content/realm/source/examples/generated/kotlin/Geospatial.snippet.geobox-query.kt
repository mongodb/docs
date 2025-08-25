val companiesInLargeBox =
    realm.query<Company>("location GEOWITHIN $box1").find()
println("Companies in large box: ${companiesInLargeBox.size}")

val companiesInSmallBox =
    realm.query<Company>("location GEOWITHIN $box2").find()
println("Companies in small box: ${companiesInSmallBox.size}")
