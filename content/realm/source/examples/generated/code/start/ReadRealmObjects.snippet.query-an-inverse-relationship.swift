let realm = try! Realm()

// Establish an inverse relationship
let person = Person()
person.id = 12345

let club = DogClub()
club.name = "Pooch Pals"
club.members.append(person)

try! realm.write {
    realm.add(club)
}

// Later, query the specific person
let specificPerson = realm.object(ofType: Person.self, forPrimaryKey: 12345)

// Access directly through an inverse relationship
let clubs = specificPerson!.clubs
let firstClub = clubs[0]
print("# memberships: \(clubs.count)")
print("First club's name: \(firstClub.name)")
