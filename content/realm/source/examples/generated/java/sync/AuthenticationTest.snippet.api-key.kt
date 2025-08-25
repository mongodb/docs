val appID = YOUR_APP_ID // replace this with your App ID
val app: App = App(
    AppConfiguration.Builder(appID)
        .build()
)

val apiKeyCredentials: Credentials = Credentials.apiKey("<key>")

var user: User? = null
app.loginAsync(apiKeyCredentials) {
    if (it.isSuccess) {
        Log.v("AUTH", "Successfully authenticated using an API Key.")
        user = app.currentUser()
    } else {
        Log.e("AUTH", "Error logging in: ${it.error.toString()}")
    }
}
