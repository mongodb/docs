val options = CountOptions().hintString("_id_")
val numDocuments = collection.countDocuments(BsonDocument(), options)
