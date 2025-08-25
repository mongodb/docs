RealmResults<Sample> aggregates =
        realm.where(Sample.class)
        .distinct("stringField")
        .sort("stringField",
                Sort.ASCENDING)
        .limit(2)
        .findAll();
