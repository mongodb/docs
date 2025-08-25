val filterByRealmAnyInt = realm.query<Frog>("favoriteThing.@type == 'int'")
val findFrog = filterByRealmAnyInt.find().first()
