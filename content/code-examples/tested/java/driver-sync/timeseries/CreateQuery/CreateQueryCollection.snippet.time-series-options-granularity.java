TimeSeriesOptions timeSeriesOptions = new TimeSeriesOptions("time")
        .metaField("sensor")
        .granularity(TimeSeriesGranularity.HOURS); // '.SECONDS' | '.MINUTES' | '.HOURS'
