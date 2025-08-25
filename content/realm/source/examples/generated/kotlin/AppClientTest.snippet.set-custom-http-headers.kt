AppConfiguration.Builder(YOUR_APP_ID)
    .authorizationHeaderName("MyApp-Authorization")
    .customRequestHeaders { put("X-MyApp-Version", "1.0.0") }
    .build()
