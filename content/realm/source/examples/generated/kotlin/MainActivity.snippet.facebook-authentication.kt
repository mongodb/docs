val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
FacebookSdk.setApplicationId(YOUR_FACEBOOK_SDK_APP_ID)
FacebookSdk.sdkInitialize(activity)
val callbackManager = CallbackManager.Factory.create()
LoginManager.getInstance().registerCallback(
    callbackManager,
    object : FacebookCallback<LoginResult> {
        override fun onSuccess(loginResult: LoginResult) {
            // Signed in successfully, forward credentials to MongoDB Realm.
            val accessToken = loginResult.accessToken
            runBlocking {
                val user = app.login(Credentials.facebook(accessToken.token))
            }
        }
        override fun onCancel() {
            Log.v("AUTH", "Cancelled Facebook login")
        }
        override fun onError(exception: FacebookException) {
            Log.e("AUTH", "Failed to authenticate with Facebook: ${exception.message}")
        }
    })
