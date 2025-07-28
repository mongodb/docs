val deleteId1 = DeleteOneModel<Person>(Filters.eq("_id", 1))
val deleteAgeLt30 = DeleteManyModel<Person>(Filters.lt(Person::age.name, 30))
