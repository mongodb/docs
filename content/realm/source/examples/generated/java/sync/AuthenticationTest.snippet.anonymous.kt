val appID = YOUR_APP_ID // replace this with your App ID
val app: App = App(
    AppConfiguration.Builder(appID)
        .build()
)

val anonymousCredentials: Credentials = Credentials.anonymous()

var user: User?
app.loginAsync(anonymousCredentials) {
    if (it.isSuccess) {
        Log.v("AUTH", "Successfully authenticated anonymously.")
        user = app.currentUser()
    } else {
        Log.e("AUTH", it.error.toString())
    }
}
