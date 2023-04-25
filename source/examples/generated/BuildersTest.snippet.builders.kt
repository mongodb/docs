val filter: Bson = and(eq("gender", "female"), gt("age", 29))
val projection: Bson = fields(excludeId(), include("email"))
val results = collection.find<Document>(filter).projection(projection)
