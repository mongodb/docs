CreateCollectionOptions createCollectionOptions = new CreateCollectionOptions()
        .timeSeriesOptions(
                new TimeSeriesOptions("timestamp")
                        .metaField("metadata"))
        .expireAfter(24, TimeUnit.HOURS);
