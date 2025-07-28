data class BinaryNumber(
    @BsonId val id: Int,
    val decimalValue: Int,
    val binaryValue: String
)
val binaryCollection = database.getCollection<BinaryNumber>("binary_numbers")

val bitmask = 34.toLong() // 00100010 in binary
val bitsComparison = Filters.bitsAllSet(BinaryNumber::decimalValue.name, bitmask)
val resultsFlow = binaryCollection.find(bitsComparison)
resultsFlow.collect { println(it) }
