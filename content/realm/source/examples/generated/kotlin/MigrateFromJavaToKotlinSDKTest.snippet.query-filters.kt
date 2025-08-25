val samples: RealmResults<Sample> =
    realm.query<Sample>().find()

val samplesThatBeginWithN:
        RealmResults<Sample> =
    realm.query<Sample>(
        "stringField BEGINSWITH 'N'"
    ).find()
