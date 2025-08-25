func login() async throws -> User {
    // Authenticate with the instance of the app that points
    // to your backend. Here, we're using anonymous login.
    let user = try await app.login(credentials: Credentials.anonymous)
    print("Successfully logged in user: \(user)")
    return user
}
