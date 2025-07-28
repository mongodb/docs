val explanation = collection.find().explain(ExplainVerbosity.EXECUTION_STATS)
val jsonSummary = explanation.getEmbedded(
    listOf("queryPlanner", "winningPlan"),
    Document::class.java
).toJson()
println(jsonSummary)
