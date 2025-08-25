val aggregates: RealmResults<Sample> =
    realm.query<Sample>()
        .distinct(Sample::stringField.name)
        .sort(Sample::stringField.name,
            Sort.ASCENDING)
        .limit(2)
        .find()
