let realm = try! Realm()
let results = realm.objects(Dog.self)
let sectionedResults = results.sectioned(by: { String($0.name.first!) },
                                         sortDescriptors: [SortDescriptor.init(keyPath: "name", ascending: true)])
let sectionKeys = sectionedResults.allKeys
