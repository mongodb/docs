val graduationYear = current().getString("graduationYear")

listOf(
    Aggregates.addFields(
        Field("reunionYear",
            graduationYear
                .parseInteger()
                .add(5))
))
