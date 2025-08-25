SyncConfiguration config = new SyncConfiguration.Builder(user, partition)
        .errorHandler((session, error) -> {
            // do some error handling
        }).build();
