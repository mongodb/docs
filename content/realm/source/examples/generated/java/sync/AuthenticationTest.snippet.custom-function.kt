val appID = YOUR_APP_ID // replace this with your App ID
val app: App = App(
    AppConfiguration.Builder(appID)
        .build()
)

val customFunctionCredentials:
        Credentials = Credentials.customFunction(org.bson.Document("username", "bob"))

var user: User? = null
app.loginAsync(customFunctionCredentials) {
    if (it.isSuccess) {
        Log.v("AUTH", "Successfully authenticated using a custom function.")
        user = app.currentUser()
    } else {
        Log.e("AUTH", "Error logging in: ${it.error.toString()}")
    }
}
