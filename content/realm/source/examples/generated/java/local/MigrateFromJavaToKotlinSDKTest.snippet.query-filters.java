RealmResults<Sample> samples =
        realm
            .where(Sample.class)
            .findAll();

RealmResults<Sample> samplesThatBeginWithN =
        realm
            .where(Sample.class)
            .beginsWith("stringField",
                    "N")
            .findAll();
