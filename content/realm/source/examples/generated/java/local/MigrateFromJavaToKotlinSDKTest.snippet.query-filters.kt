val samples =
    realm.where(
        Sample::class.java
    ).findAll()
val samplesThatBeginWithN =
    realm.where(
        Sample::class.java
    )
        .beginsWith(
            "stringField",
            "N"
        ).findAll()
