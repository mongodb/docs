val ejsonStr = """
    { "_id": { "${"$"}oid": "507f1f77bcf86cd799439011"},
      "myNumber": {"${"$"}numberLong": "4794261" }}
    """.trimIndent()

val jsonReader = JsonReader(ejsonStr)

jsonReader.readStartDocument()

jsonReader.readName("_id")
val id = jsonReader.readObjectId()
jsonReader.readName("myNumber")
val myNumber = jsonReader.readInt64()

jsonReader.readEndDocument()

println(id.toString() + " is type: " + id.javaClass.name)
println(myNumber.toString() + " is type: " + myNumber.javaClass.name)

jsonReader.close()
