TimeSeriesOptions timeSeriesOptions = new TimeSeriesOptions("time")
        .metaField("sensor")
        .bucketMaxSpan( (long) 3600, TimeUnit.SECONDS)
        .bucketRounding( (long) 3600, TimeUnit.SECONDS);
