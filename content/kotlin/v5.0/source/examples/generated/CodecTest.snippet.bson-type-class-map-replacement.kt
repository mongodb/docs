val replacements = mutableMapOf<BsonType, Class<*>>(BsonType.ARRAY to MutableSet::class.java)
val bsonTypeClassMap = BsonTypeClassMap(replacements)
val clazz = bsonTypeClassMap[BsonType.ARRAY]
println("Class name: " + clazz.name)
