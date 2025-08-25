val appID = YOUR_APP_ID // replace this with your App ID
val app: App = App(AppConfiguration.Builder(appID).build())

val anonymousCredentials: Credentials = Credentials.anonymous()
app.loginAsync(anonymousCredentials) {
    if (it.isSuccess) {
        val user: User? = app.currentUser()

        val functionsManager: Functions = app.getFunctions(user)
        val args: List<Int> = listOf(1, 2)
        functionsManager.callFunctionAsync("sum", args, Integer::class.java) { result ->
            if (result.isSuccess) {
                Log.v("EXAMPLE", "Sum value: ${result.get()}")
            } else {
                Log.e("EXAMPLE", "failed to call sum function with: " + result.error)
            }
        }
    } else {
        Log.e("EXAMPLE", "Error logging into the Realm app. Make sure that anonymous authentication is enabled. Error: " + it.error)
    }
}
