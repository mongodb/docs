val appID = YOUR_APP_ID // replace this with your App ID
val app: App = App(
    AppConfiguration.Builder(appID)
        .build()
)

// fetch IDToken using Apple SDK

val appleCredentials: Credentials = Credentials.apple("<token>")

var user: User? = null
app.loginAsync(appleCredentials) {
    if (it.isSuccess) {
        Log.v("AUTH", "Successfully authenticated using Sign-in with Apple.")
        user = app.currentUser()
    } else {
        Log.e("AUTH", "Error logging in: ${it.error.toString()}")
    }
}
