CreateCollectionOptions collectionOptions = new CreateCollectionOptions()
        .timeSeriesOptions(timeSeriesOptions)
        .expireAfter(86400, TimeUnit.SECONDS); // optional
