val flowWithLifetimeTimeout = collection
    .find(Filters.gte("age", 40))
    .timeoutMode(TimeoutMode.CURSOR_LIFETIME)
