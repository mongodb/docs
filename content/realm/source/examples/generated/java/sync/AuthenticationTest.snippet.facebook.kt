FacebookSdk.setApplicationId(YOUR_FACEBOOK_SDK_APP_ID)
FacebookSdk.sdkInitialize(activity)
val callbackManager = CallbackManager.Factory.create()
LoginManager.getInstance().registerCallback(
    callbackManager,
    object : FacebookCallback<LoginResult> {
        override fun onSuccess(loginResult: LoginResult) {
            // Signed in successfully, forward credentials to MongoDB Realm.
            val accessToken = loginResult.accessToken
            val facebookCredentials: Credentials =
                Credentials.facebook(accessToken.token)
            app.loginAsync(facebookCredentials) {
                if (it.isSuccess) {
                    Log.v(
                        "AUTH",
                        "Successfully logged in to MongoDB Realm using Facebook OAuth."
                    )
                } else {
                    Log.e("AUTH", "Failed to log in to MongoDB Realm", it.error)
                }
            }
        }

        override fun onCancel() {
            Log.v("AUTH", "Cancelled Facebook login")
        }

        override fun onError(exception: FacebookException) {
            Log.e("AUTH", "Failed to authenticate with Facebook: ${exception.message}")
        }
    })
