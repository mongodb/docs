val jimHensonsFrogs = realm.query<Frog>("owner == $0", "Jim Henson")

// Find the total number of frogs owned by Jim Henson
val numberOfJimsFrogs = jimHensonsFrogs.count().find()

// Find the oldest frog owned by Jim Henson
val maxAge = jimHensonsFrogs.max<Int>("age").find()
val oldestFrog = jimHensonsFrogs.query("age == $0", maxAge).find().first()
