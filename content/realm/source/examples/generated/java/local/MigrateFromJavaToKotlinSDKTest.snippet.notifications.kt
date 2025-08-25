realm.where(Sample::class.java)
    .findAllAsync()
    .addChangeListener {
            samples: RealmResults<Sample>?,
            changeSet: OrderedCollectionChangeSet ->
        // log change description
        Log.v(
            "EXAMPLE",
            ("Results changed. " +
                "change ranges: " +
                Arrays.toString(
                    changeSet
                        .changeRanges
                ) +
                ", insertion ranges: " +
                Arrays.toString(
                    changeSet
                        .insertionRanges
                ) +
                ", deletion ranges: " +
                Arrays.toString(
                    changeSet
                        .deletionRanges
                ))
        )
    }
