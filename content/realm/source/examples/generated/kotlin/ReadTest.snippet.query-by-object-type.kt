// Query all Frog objects in the database
val queryAllFrogs = realm.query<Frog>()
val allFrogs = queryAllFrogs.find()
