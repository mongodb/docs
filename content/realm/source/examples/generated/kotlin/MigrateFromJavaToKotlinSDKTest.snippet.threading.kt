val realm = Realm.open(config)
val sample: Sample? =
    realm.query<Sample>()
        .first()
        .find()

launch(Dispatchers.Unconfined) {
    // can access the realm opened on
    // a different thread
    realm.query<Sample>().find()
    // can access realm object queried
    // on a different thread
    Log.v(sample!!.stringField)
}.join()
