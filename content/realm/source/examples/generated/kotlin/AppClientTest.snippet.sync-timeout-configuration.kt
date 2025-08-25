val config = AppConfiguration.Builder(YOUR_APP_ID)
    .syncTimeouts {
        connectTimeout = 1.minutes
        connectionLingerTime = 15.seconds
        pingKeepalivePeriod = 30.seconds
        pongKeepalivePeriod = 1.minutes
        fastReconnectLimit = 30.seconds
    }
    .build()
