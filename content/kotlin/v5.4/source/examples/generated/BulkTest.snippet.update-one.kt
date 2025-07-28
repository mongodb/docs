val filter = Filters.eq("_id", 2)
val update = Updates.inc(Person::age.name, 1)
val doc = UpdateOneModel<Person>(filter, update)
