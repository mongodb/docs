let realm = try! Realm()
// Access all dogs in the realm
let dogs = realm.objects(Dog.self)

// Filter by age
let puppies = dogs.filter("age < 2")

// Filter by person
let dogsWithoutFavoriteToy = dogs.filter("favoriteToy == nil")

// Filter by person's name
let dogsWhoLikeTennisBalls = dogs.filter("favoriteToy.name == 'Tennis ball'")
