//        val filter = Filters.empty()
//        val pipeline = listOf(
//            Aggregates.match(filter),
//            Aggregates.group("\$color", Accumulators.sum("qty", "\$qty")),
//            Aggregates.sort(Sorts.descending("qty"))
//        )
//        collection.aggregate<Document>(pipeline).toList().forEach { println(it.toJson()) }
