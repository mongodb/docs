// :replace-start: {
//   "terms": {
//     "ReadExamples_": ""
//   }
// }
import XCTest
import RealmSwift

// :snippet-start: models
class ReadExamples_DogToy: Object {
    @Persisted var id: ObjectId
    @Persisted var name = ""
}

class ReadExamples_Dog: Object {
    @Persisted var name = ""
    @Persisted var age = 0
    @Persisted var color = ""
    @Persisted var currentCity = ""
    @Persisted var citiesVisited: MutableSet<String>
    @Persisted var companion: AnyRealmValue

    // To-one relationship
    @Persisted var favoriteToy: ReadExamples_DogToy?

    // Map of city name -> favorite park in that city
    @Persisted var favoriteParksByCity: Map<String, String>
    
    // :snippet-start: sectioned-result-variable
    // Computed variable that is not persisted, but only
    // used to section query results.
    var firstLetter: String {
        return name.first.map(String.init(_:)) ?? ""
    }
    // :snippet-end:
}
// :snippet-start: embedded-object-models
class ReadExamples_Person: Object {
    @Persisted(primaryKey: true) var id = 0
    @Persisted var name = ""

    // To-many relationship - a person can have many dogs
    @Persisted var dogs: List<ReadExamples_Dog>

    // Inverse relationship - a person can be a member of many clubs
    @Persisted(originProperty: "members") var clubs: LinkingObjects<ReadExamples_DogClub>

    // Embed a single object.
    // Embedded object properties must be marked optional.
    @Persisted var address: ReadExamples_Address?

    convenience init(name: String, address: ReadExamples_Address) {
        self.init()
        self.name = name
        self.address = address
    }
}

class ReadExamples_DogClub: Object {
    @Persisted var name = ""
    @Persisted var members: List<ReadExamples_Person>

    // ReadExamples_DogClub has an array of regional office addresses.
    // These are embedded objects.
    @Persisted var regionalOfficeAddresses: List<ReadExamples_Address>

    convenience init(name: String, addresses: [ReadExamples_Address]) {
        self.init()
        self.name = name
        self.regionalOfficeAddresses.append(objectsIn: addresses)
    }
}

class ReadExamples_Address: EmbeddedObject {
    @Persisted var street: String?
    @Persisted var city: String?
    @Persisted var country: String?
    @Persisted var postalCode: String?
}
// :snippet-end:
// :snippet-end:

class ReadRealmObjects: XCTestCase {
    override func tearDown() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }
    
    func addTestDogs() {
        let realm = try! Realm()
        let dog = ReadExamples_Dog()
        dog.name = "Maui"
        dog.age = 2
        
        let dog2 = ReadExamples_Dog()
        dog2.name = "Lita"
        dog2.age = 11
        
        try! realm.write {
            realm.add([dog, dog2])
        }
    }

    func testFindObjectByPrimaryKey() {
        // :snippet-start: find-a-specific-object-by-primary-key
        let realm = try! Realm()

        let specificPerson = realm.object(ofType: ReadExamples_Person.self, forPrimaryKey: 12345)
        // :snippet-end:
    }

    func testQueryRelationship() {
        // :snippet-start: query-a-relationship
        let realm = try! Realm()

        // Establish a relationship
        let dog = ReadExamples_Dog()
        dog.name = "Rex"
        dog.age = 10

        let person = ReadExamples_Person()
        person.id = 12345
        person.dogs.append(dog)

        try! realm.write {
            realm.add(person)
        }

        // Later, query the specific person
        let specificPerson = realm.object(ofType: ReadExamples_Person.self, forPrimaryKey: 12345)

        // Access directly through a relationship
        let specificPersonDogs = specificPerson!.dogs
        let firstDog = specificPersonDogs[0]
        print("# dogs: \(specificPersonDogs.count)")
        print("First dog's name: \(firstDog.name)")
        // :snippet-end:
    }

    func testQueryInverseRelationship() {
        // :snippet-start: query-an-inverse-relationship
        let realm = try! Realm()

        // Establish an inverse relationship
        let person = ReadExamples_Person()
        person.id = 12345

        let club = ReadExamples_DogClub()
        club.name = "Pooch Pals"
        club.members.append(person)

        try! realm.write {
            realm.add(club)
        }

        // Later, query the specific person
        let specificPerson = realm.object(ofType: ReadExamples_Person.self, forPrimaryKey: 12345)

        // Access directly through an inverse relationship
        let clubs = specificPerson!.clubs
        let firstClub = clubs[0]
        print("# memberships: \(clubs.count)")
        print("First club's name: \(firstClub.name)")
        // :snippet-end:
    }

    func testObjects() {
        // :snippet-start: objects
        let realm = try! Realm()
        // Access all dogs in the realm
        let dogs = realm.objects(ReadExamples_Dog.self)
        // :snippet-end:
    }

    func testSort() {
        // :snippet-start: sort
        let realm = try! Realm()
        // Access all dogs in the realm
        let dogs = realm.objects(ReadExamples_Dog.self)

        let dogsSorted = dogs.sorted(byKeyPath: "name", ascending: false)

        // You can also sort on the members of linked objects. In this example,
        // we sort the dogs by their favorite toys' names.
        let dogsSortedByFavoriteToyName = dogs.sorted(byKeyPath: "favoriteToy.name")
        // :snippet-end:
    }
    
    func testTypeSafeSort() {
        // :snippet-start: sort-type-safe
        let realm = try! Realm()
        addTestDogs() // :remove:
        // Access all dogs in the realm
        let dogs = realm.objects(ReadExamples_Dog.self)
        XCTAssertEqual(2, dogs.count) // :remove:

        // Sort by type-safe keyPath
        let dogsSorted = dogs.sorted(by: \.name)
        // :snippet-end:
        XCTAssertEqual(dogsSorted.first!.name, "Lita")
    }

    func testFilter() {
        // :snippet-start: filter
        let realm = try! Realm()
        // Access all dogs in the realm
        let dogs = realm.objects(ReadExamples_Dog.self)

        // Filter by age
        let puppies = dogs.filter("age < 2")

        // Filter by person
        let dogsWithoutFavoriteToy = dogs.filter("favoriteToy == nil")

        // Filter by person's name
        let dogsWhoLikeTennisBalls = dogs.filter("favoriteToy.name == 'Tennis ball'")
        // :snippet-end:
        print(puppies.count)
        print(dogsWithoutFavoriteToy.count)
        print(dogsWhoLikeTennisBalls.count)
    }

    func testWhere() {
        // :snippet-start: where
        let realm = try! Realm()
        // Access all dogs in the realm
        let dogs = realm.objects(ReadExamples_Dog.self)

        // Query by age
        let puppies = dogs.where {
            $0.age < 2
        }

        // Query by person
        let dogsWithoutFavoriteToy = dogs.where {
            $0.favoriteToy == nil
        }

        // Query by person's name
        let dogsWhoLikeTennisBalls = dogs.where {
            $0.favoriteToy.name == "Tennis ball"
        }
        // :snippet-end:
        print(puppies.count)
        print(dogsWithoutFavoriteToy.count)
        print(dogsWhoLikeTennisBalls.count)
    }

    func testQueryObjectId() {
        // :snippet-start: query-object-id
        let realm = try! Realm()

        let dogToys = realm.objects(ReadExamples_DogToy.self)

        // Get specific toy by ObjectId id
        let specificToy = dogToys.filter("id = %@", ObjectId("11223344556677889900aabb")).first

        // WRONG: Realm will not convert the string to an object id
        // users.filter("id = '11223344556677889900aabb'") // not ok
        // users.filter("id = %@", "11223344556677889900aabb") // not ok
        // :snippet-end:
        print("\(specificToy ?? ReadExamples_DogToy())")
    }

    func testTypeSafeQueryObjectId() {
        // :snippet-start: tsq-object-id
        let realm = try! Realm()

        let dogToys = realm.objects(ReadExamples_DogToy.self)

        // Get specific user by ObjectId id
        let specificToy = dogToys.where {
            $0.id == ObjectId("11223344556677889900aabb")
        }
        // :snippet-end:
        print("\(specificToy)")
    }

    func testQueryEmbeddedObject() {
        // :snippet-start: query-an-embedded-object
        // Open the default realm
        let realm = try! Realm()

        // Get all people in Los Angeles, sorted by street address
        let losAngelesPeople = realm.objects(ReadExamples_Person.self)
            .filter("address.city = %@", "Los Angeles")
            .sorted(byKeyPath: "address.street")
        print("Los Angeles ReadExamples_Person: \(losAngelesPeople)")
        // :snippet-end:
    }

    func testTypeSafeQueryEmbeddedObject() {
        // :snippet-start: tsq-query-an-embedded-object
        // Open the default realm
        let realm = try! Realm()

        // Get all contacts in Los Angeles, sorted by street address
        let losAngelesPeople = realm.objects(ReadExamples_Person.self)
            .where {
                $0.address.city == "Los Angeles"
            }
            .sorted(byKeyPath: "address.street")
        print("Los Angeles ReadExamples_Person: \(losAngelesPeople)")
        // :snippet-end:
    }

    func testAggregate() {
        // :snippet-start: aggregate
        let realm = try! Realm()

        let people = realm.objects(ReadExamples_Person.self)

        // People whose dogs' average age is 5
        people.filter("dogs.@avg.age == 5")

        // People with older dogs
        people.filter("dogs.@min.age > 5")

        // People with younger dogs
        people.filter("dogs.@max.age < 2")

        // People with many dogs
        people.filter("dogs.@count > 2")

        // People whose dogs' ages combined > 10 years
        people.filter("dogs.@sum.age > 10")
        // :snippet-end:
    }

    func testTypeSafeQueryAggregate() {
        // :snippet-start: tsq-aggregate
        let realm = try! Realm()

        let people = realm.objects(ReadExamples_Person.self)

        // People whose dogs' average age is 5
        people.where {
            $0.dogs.age.avg == 5
        }

        // People with older dogs
        people.where {
            $0.dogs.age.min > 5
        }

        // People with younger dogs
        people.where {
            $0.dogs.age.max < 2
        }

        // People with many dogs
        people.where {
            $0.dogs.count > 2
        }

        // People whose dogs' ages combined > 10 years
        people.where {
            $0.dogs.age.sum > 10
        }
        // :snippet-end:
    }

    func testChainQuery() {
        // :snippet-start: chain-query
        let realm = try! Realm()
        let tanDogs = realm.objects(ReadExamples_Dog.self).filter("color = 'tan'")
        let tanDogsWithBNames = tanDogs.filter("name BEGINSWITH 'B'")
        // :snippet-end:
    }

    func testTypeSafeChainQuery() {
        // :snippet-start: tsq-chain-query
        let realm = try! Realm()
        let tanDogs = realm.objects(ReadExamples_Dog.self).where {
            $0.color == "tan"
        }
        let tanDogsWithBNames = tanDogs.where {
            $0.name.starts(with: "B")
        }
        // :snippet-end:
    }

    func testReadAndIterateMapValues() {
        // :snippet-start: map
        let realm = try! Realm()
        // :remove-start:
        // Create a test dog to see data
        let dog = ReadExamples_Dog()
        dog.name = "Wolfie"
        try! realm.write {
            realm.add(dog)
            // Set map values
            dog.favoriteParksByCity["New York"] = "Domino Park"
            dog.favoriteParksByCity["Chicago"] = "Wiggly Field"
            dog.favoriteParksByCity.setValue("Bush Park", forKey: "Ottawa")
        }
        // :remove-end:

        let dogs = realm.objects(ReadExamples_Dog.self)

        // Find dogs who have favorite parks
        let dogsWithFavoriteParks = dogs.where {
            $0.favoriteParksByCity.count >= 1
        }

        for dog in dogsWithFavoriteParks {
            // Check if an entry exists
            if dog.favoriteParksByCity.keys.contains("Chicago") {
                print("\(dog.name) has a favorite park in Chicago")
            }

            // Iterate over entries
            for element in dog.favoriteParksByCity {
                print("\(dog.name)'s favorite park in \(element.key) is \(element.value)")
            }
        }
        // :snippet-end:
        XCTAssertEqual(dogsWithFavoriteParks.count, 1)
    }

    func testQueryMutableSet() {
        // :snippet-start: set-collections
        let realm = try! Realm()

        // :remove-start:
        // Create a test dog
        let dog = ReadExamples_Dog()
        dog.name = "Maui"
        let dogCitiesVisited = ["New York", "Toronto", "New York"]
        try! realm.write {
            realm.add(dog)
            dog.citiesVisited.insert(objectsIn: dogCitiesVisited)
        }
        XCTAssert(dog.citiesVisited.count == 2)
        // :remove-end:
        // Find dogs who have visited New York
        let newYorkDogs = realm.objects(ReadExamples_Dog.self).where {
            $0.citiesVisited.contains("New York")
        }
        // :remove-start:
        XCTAssertNotNil(newYorkDogs)
        // :remove-end:

        // Get some information about the cities they have visited
        for dog in newYorkDogs {
            print("Cities \(dog.name) has visited: \(dog.citiesVisited)")
        }
        // :remove-start:
        // Create another sample dog
        let dog2 = ReadExamples_Dog()
        dog2.name = "Lita"
        let dog2Cities = ["Boston", "New York", "Toronto", "Montreal", "Boston"]
        try! realm.write {
            realm.add(dog2)
            dog2.citiesVisited.insert(objectsIn: dog2Cities)

        }
        XCTAssert(dog2.citiesVisited.count == 4)
        // :remove-end:

        // Check whether two dogs have visited some of the same cities.
        // Use "intersects" to find out whether the values of the two sets share common elements.
        let isInBothCitiesVisited = (dog.citiesVisited.intersects(dog2.citiesVisited))
        print("The two dogs have visited some of the same cities: \(isInBothCitiesVisited)")
        // Prints "The two dogs have visited some of the same cities: true"

        // Or you can check whether a set is a subset of another set. In this example,
        // the first dog has visited "New York" and "Toronto", while dog2 has visited both of
        // those but also "Toronto" and "Boston".
        let isSubset = (dog.citiesVisited.isSubset(of: dog2.citiesVisited))
        print("\(dog.name)'s set of cities visited is a subset of \(dog2.name)'s: \(isSubset)")
        // Prints "Maui's set of cities visited is a subset of Lita's: true"
        // :snippet-end:
    }

    func testReadAnyRealmValues() {
        // :snippet-start: mixed-data-type
        let realm = try! Realm()
        // :remove-start:
        // Populate some example data
        let myDog = ReadExamples_Dog()
        myDog.name = "Rex"
        myDog.companion = .none

        let theirDog = ReadExamples_Dog()
        theirDog.name = "Wolfie"
        theirDog.companion = .string("Fluffy the Cat")

        let anotherDog = ReadExamples_Dog()
        anotherDog.name = "Fido"
        anotherDog.companion = .object(ReadExamples_Dog(value: ["name": "Spot"]))

        try! realm.write {
            realm.add([myDog, theirDog, anotherDog])
        }
        // :remove-end:

        let dogs = realm.objects(ReadExamples_Dog.self)
        // :remove-start:
        XCTAssertEqual(dogs.count, 4)
        // :remove-end:

        for dog in dogs {
            // Verify the type of the ``AnyRealmProperty`` when attempting to get it. This
            // returns an object whose property contains the matched type.

            // If you only care about one type, check for that type.
            if case let .string(companion) = dog.companion {
                print("\(dog.name)'s companion is: \(companion)")
                // Prints "Wolfie's companion is: Fluffy the Cat"
            }

            // Or if you want to do something with multiple types of data
            // that could be in the value, switch on the type.
            switch dog.companion {
            case .string:
                print("\(dog.name)'s companion is: \(dog.companion)")
                // Prints "Wolfie's companion is: string("Fluffy the Cat")
            case .object:
                print("\(dog.name)'s companion is: \(dog.companion)")
                // Prints "Fido's companion is: object(Dog { name = Spot })"
            case .none:
                print("\(dog.name) has no companion")
                // Prints "Rex has no companion" and "Spot has no companion"
            default:
                print("\(dog.name)'s companion is another type.")
            }
        }
        // :snippet-end:
    }
    
    func testSectionQueryResults() {
        // :snippet-start: section-query-results
        let realm = try! Realm()
        // :remove-start:
        // Populate some example data
        let myDog = ReadExamples_Dog()
        myDog.name = "Rex"
        myDog.companion = .none

        let theirDog = ReadExamples_Dog()
        theirDog.name = "Wolfie"
        theirDog.companion = .string("Fluffy the Cat")

        let anotherDog = ReadExamples_Dog()
        anotherDog.name = "Fido"
        anotherDog.companion = .object(ReadExamples_Dog(value: ["name": "Spot"]))

        try! realm.write {
            realm.add([myDog, theirDog, anotherDog])
        }
        // :remove-end:
        
        // :snippet-start: get-sectioned-results
        var dogsByFirstLetter: SectionedResults<String, ReadExamples_Dog>
        
        dogsByFirstLetter = realm.objects(ReadExamples_Dog.self).sectioned(by: \.firstLetter, ascending: true)
        // :snippet-end:
        
        // You can get a count of the sections in the SectionedResults
        let sectionCount = dogsByFirstLetter.count

        // Get an array containing all section keys for objects that match the query.
        let sectionKeys = dogsByFirstLetter.allKeys
        // This example realm contains 4 dogs, "Rex", "Wolfie", "Fido", "Spot".
        // Prints ["F", "R", "S", "W"]
        print(sectionKeys)
        
        // Get a specific key by index position
        let sectionKey = dogsByFirstLetter[0].key
        // Prints "Key for index 0: F"
        print("Key for index 0: \(sectionKey)")
        
        // You can access Results Sections by the index of the key you want in SectionedResults.
        // "F" is the key at index position 0. When we access this Results Section, we get dogs whose name begins with "F".
        let dogsByF = dogsByFirstLetter[0]
        // Prints "Fido"
        print(dogsByF.first?.name)
        // :snippet-end:
        XCTAssertEqual(sectionKey, "F")
        XCTAssertEqual(sectionCount, 4)
        XCTAssertEqual(sectionKeys, ["F", "R", "S", "W"])
        XCTAssertEqual(dogsByF.first?.name, "Fido")
    }
    
    func testSectionQueryResultsByCallback() {
        // :snippet-start: section-query-results-callback
        let realm = try! Realm()
        // :remove-start:
        // Populate some example data
        let myDog = ReadExamples_Dog()
        myDog.name = "Rex"
        myDog.companion = .none

        let theirDog = ReadExamples_Dog()
        theirDog.name = "Wolfie"
        theirDog.companion = .string("Fluffy the Cat")

        let anotherDog = ReadExamples_Dog()
        anotherDog.name = "Fido"
        anotherDog.companion = .object(ReadExamples_Dog(value: ["name": "Spot"]))

        try! realm.write {
            realm.add([myDog, theirDog, anotherDog])
        }
        // :remove-end:
        let results = realm.objects(ReadExamples_Dog.self)
        let sectionedResults = results.sectioned(by: { String($0.name.first!) },
                                                 sortDescriptors: [SortDescriptor.init(keyPath: "name", ascending: true)])
        let sectionKeys = sectionedResults.allKeys
        // :snippet-end:
        XCTAssertEqual(sectionKeys, ["F", "R", "S", "W"])
    }
}
// :replace-end:
