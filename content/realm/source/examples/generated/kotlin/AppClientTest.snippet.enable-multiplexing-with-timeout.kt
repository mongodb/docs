val configCustomLingerTime = AppConfiguration.Builder(YOUR_APP_ID)
    .enableSessionMultiplexing(true)
    .syncTimeouts {
        connectionLingerTime = 10.seconds // Overrides default 30 secs
    }
    .build()
