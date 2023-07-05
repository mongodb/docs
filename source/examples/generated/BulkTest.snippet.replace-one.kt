val filter = Filters.eq("_id", 1)
val insert = Person(1, "Celine Stork", location = "San Diego, CA")
val doc = ReplaceOneModel(filter, insert)
