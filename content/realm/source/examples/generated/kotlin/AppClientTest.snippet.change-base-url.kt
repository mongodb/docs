// Specify a custom baseUrl to connect to.
// In this case, an Edge Server instance running on the device:
val config = AppConfiguration.Builder(EDGE_SERVER_APP_ID)
    .baseUrl("http://localhost:80")
    .build()
val app = App.create(config)

// ... log in a user and use the app ...

// Later, change the baseUrl.
// In this case, pass `null` to reset to default:
// https://services.cloud.mongodb.com
app.updateBaseUrl(null)
