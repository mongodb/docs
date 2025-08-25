FacebookSdk.setApplicationId(YOUR_FACEBOOK_SDK_APP_ID);
FacebookSdk.sdkInitialize(activity);
CallbackManager callbackManager = CallbackManager.Factory.create();
LoginManager.getInstance().registerCallback(callbackManager,
    new FacebookCallback<LoginResult>() {
        @Override
        public void onSuccess(LoginResult loginResult) {
            // Signed in successfully, forward credentials to MongoDB Realm.
            AccessToken accessToken = loginResult.getAccessToken();
            Credentials facebookCredentials = Credentials.facebook(accessToken.getToken());
            app.loginAsync(facebookCredentials, it -> {
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully logged in to MongoDB Realm using Facebook OAuth.");
                } else {
                    Log.e("AUTH", "Failed to log in to MongoDB Realm", it.getError());
                }
            });
        }
        
        @Override
        public void onCancel() {
            Log.v("AUTH", "Facebook authentication cancelled.");
        }
        
        @Override
        public void onError(FacebookException exception) {
            Log.e("AUTH", "Failed to authenticate using Facebook: " + exception.getMessage());
        }
    }
);
LoginManager.getInstance().logIn(activity, null);
