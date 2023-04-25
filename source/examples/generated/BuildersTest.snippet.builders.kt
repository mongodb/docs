data class Results(val email: String)

val filter = and(eq("gender", "female"), gt("age", 29))
val projection = fields(excludeId(), include("email"))
val results = collection.find<Results>(filter).projection(projection)
