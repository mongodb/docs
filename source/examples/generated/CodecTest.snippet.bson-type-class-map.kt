val bsonTypeClassMap = BsonTypeClassMap()
val clazz = bsonTypeClassMap[BsonType.ARRAY]
println("Class name: " + clazz.name)
