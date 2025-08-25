import UIKit
import RealmSwift

class Drink: Object {
    @Persisted var name = ""
    @Persisted var rating = 0
    @Persisted var source = ""
    @Persisted var drinkType = ""
}

var config = Realm.Configuration()

config.fileURL!.deleteLastPathComponent()
config.fileURL!.appendPathComponent("playgroundRealm")
config.fileURL!.appendPathExtension("realm")

if Realm.fileExists(for: config) {
    try Realm.deleteFiles(for: config)
    print("Successfully deleted existing realm at path: \(config.fileURL!)")
} else {
    print("No file currently exists at path")
}

let drink = Drink(value: ["name": "Los Cabellos", "rating": 10, "source": "AeroPress", "drinkType": "Coffee"])

let realm = try! Realm(configuration: config)

try! realm.write {
    realm.add(drink)
}

let drinks = realm.objects(Drink.self)

let coffeeDrinks = drinks.where {
    $0.drinkType == "Coffee"
}

print(coffeeDrinks.first?.name)
