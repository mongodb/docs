val appID = YOUR_APP_ID // replace this with your App ID
val app: App = App(
    AppConfiguration.Builder(appID)
        .build()
)

// fetch JWT from custom provider

val customJWTCredentials: Credentials = Credentials.jwt("<token>")

var user: User? = null
app.loginAsync(customJWTCredentials) {
    if (it.isSuccess) {
        Log.v("AUTH", "Successfully authenticated using a custom JWT.")
        user = app.currentUser()
    } else {
        Log.e("AUTH", "Error logging in: ${it.error.toString()}")
    }
}
