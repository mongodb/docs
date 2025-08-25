// This example demonstrates login logic for FBSDK version 13.x. If you're using
// a different version of FBSDK, you'll need to adapt this example for your version.
let loginManager = LoginManager()
loginManager.logIn(permissions: [ .email ]) { loginResult in
    switch loginResult {
    case .success(let grantedPermissions, let declinedPermissions, let accessToken):
        let credentials = Credentials.facebook(accessToken: accessToken!.tokenString)
        app.login(credentials: credentials) { result in
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Failed to log in to MongoDB Realm: \(error)")
                case .success(let user):
                    print("Successfully logged in to MongoDB Realm using Facebook OAuth.")
                    // Now logged in, do something with user
                    // Remember to dispatch to main if you are doing anything on the UI thread
                }
            }
        }
    case .failed(let error):
        print("Facebook login failed: \(error)")
    case .cancelled:
        print("The user cancelled the login flow.")

    }
}
