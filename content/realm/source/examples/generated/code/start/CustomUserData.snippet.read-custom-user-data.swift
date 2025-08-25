let appId = YOUR_APP_SERVICES_APP_ID // replace this with your App ID
let app = App(id: appId)
app.login(credentials: Credentials.anonymous) { (result) in
    switch result {
    case .failure(let error):
        print("Failed to log in: \(error.localizedDescription)")
    case .success(let user):
        // If the user data has been refreshed recently, you can access the
        // custom user data directly on the user object
        print("User custom data: \(user.customData)")

        // Refresh the custom user data
        user.refreshCustomData { (result) in
            switch result {
            case .failure(let error):
                print("Failed to refresh custom data: \(error.localizedDescription)")
            case .success(let customData):
                // favoriteColor was set on the custom data.
                print("Favorite color: \(customData["favoriteColor"] ?? "not set")")
                return
            }
        }
    }
}
