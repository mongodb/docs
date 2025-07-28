try {
    val resultsFlow = collection.find()
    val firstResult = resultsFlow.first()
} catch (e: NoSuchElementException) {
    println("No results found")
}
