val regexComparison = Filters.regex(PaintOrder::color.name, "^p")
val resultsFlow = collection.find(regexComparison)
resultsFlow.collect { println(it) }
