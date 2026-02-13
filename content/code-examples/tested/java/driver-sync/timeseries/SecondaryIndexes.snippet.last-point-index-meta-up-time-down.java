collection.createIndex(Indexes.compoundIndex(
        Indexes.ascending("metadata.type"),
        Indexes.descending("timestamp")));
