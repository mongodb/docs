val appID = YOUR_APP_ID // replace this with your App ID
val app: App = App(AppConfiguration.Builder(appID)
    .appName("My App")
    .requestTimeout(30, TimeUnit.SECONDS)
    .build())
