let akcClub = realm.objects(Club.self).where {
    $0.name == "American Kennel Club"
}.first!
// You can use type-safe expressions to check for equality
XCTAssert(akcClub.url == URL(string: "https://akc.org")!)

let clubs = realm.objects(Club.self)
// You can use the persisted property type in NSPredicate query expressions
let akcByUrl = clubs.filter("url == 'https://akc.org'").first!
XCTAssert(akcByUrl.name == "American Kennel Club")
