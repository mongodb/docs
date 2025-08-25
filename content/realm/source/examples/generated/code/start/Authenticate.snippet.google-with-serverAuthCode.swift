func sign(_ signIn: GIDSignIn!, didSignInFor googleUser: GIDGoogleUser!, withError error: Error!) {
    if let error = error {
      print("\(error.localizedDescription)")
        return
    }
    // Upon first successful sign-in, forward serverAuthCode credentials to MongoDB Realm.
    // Upon subsequent sign-ins, this returns nil.
    let credentials = Credentials.google(serverAuthCode: googleUser.serverAuthCode!)

    app.login(credentials: credentials) { result in
        DispatchQueue.main.async {
            switch result {
            case .failure(let error):
                print("Failed to log in to MongoDB Realm: \(error)")
            case .success(let user):
                print("Successfully logged in to MongoDB Realm using Google OAuth.")
                // Now logged in, do something with user
                // Remember to dispatch to main if you are doing anything on the UI thread
            }
        }
    }
}
