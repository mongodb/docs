var dogsByFirstLetter: SectionedResults<String, Dog>

dogsByFirstLetter = realm.objects(Dog.self).sectioned(by: \.firstLetter, ascending: true)
