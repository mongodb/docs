let realm = try! Realm()

var dogsByFirstLetter: SectionedResults<String, Dog>

dogsByFirstLetter = realm.objects(Dog.self).sectioned(by: \.firstLetter, ascending: true)

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
