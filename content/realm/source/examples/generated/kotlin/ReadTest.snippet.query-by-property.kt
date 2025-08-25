val filterByProperty = realm.query<Frog>("name == $0", "Kermit")
val frogsNamedKermit = filterByProperty.find()
