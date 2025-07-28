data class Results(val email: String)

val filter = Filters.and(Filters.eq(User::gender.name, "female"), Filters.gt(User::age.name, 29))
val projection = Projections.fields(Projections.excludeId(), Projections.include("email"))
val results = collection.find<Results>(filter).projection(projection)
