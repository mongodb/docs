data class Results(val email: String)

val filter = and(eq(User::gender.name, "female"), gt(User::age.name, 29))
val projection = fields(excludeId(), include("email"))
val results = collection.find<Results>(filter).projection(projection)
