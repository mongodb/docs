val aggregates =
    realm.where(
        Sample::class.java
    )
        .distinct("stringField")
        .sort(
            "stringField",
            Sort.ASCENDING
        )
        .limit(2)
        .findAll()
