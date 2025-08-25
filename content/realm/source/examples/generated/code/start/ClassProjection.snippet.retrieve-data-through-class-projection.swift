// Retrieve all class projections of the given type `PersonProjection`
let people = realm.objects(PersonProjection.self)
// Use projection data in your view
print(people.first?.firstName)
print(people.first?.homeCity)
print(people.first?.firstFriendsName)
