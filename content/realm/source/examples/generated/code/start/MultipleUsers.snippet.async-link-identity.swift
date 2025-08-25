let app = App(id: YOUR_APP_SERVICES_APP_ID)

func logInAnonymously() async throws -> User {
    let anonymousUser = try await app.login(credentials: Credentials.anonymous)
    // User uses app, then later registers an account
    let newAccountLinkedUser = try await registerNewAccount(anonymousUser: anonymousUser)
    return newAccountLinkedUser
}

func registerNewAccount(anonymousUser: User) async throws -> User {
    let email = "swift-async-link@example.com"
    let password = "ganondorf"

    try await app.emailPasswordAuth.registerUser(email: email, password: password)
    // Successfully created account, now link it
    // with the existing anon user
    let linkedUser = try await link(user: anonymousUser, with: Credentials.emailPassword(email: email, password: password))
    return linkedUser
}

func link(user: User, with credentials: Credentials) async throws -> User {
    try await user.linkUser(credentials: credentials)
}

do {
    let linkedUser = try await logInAnonymously()
    print("Successfully linked user async: \(linkedUser)")
} catch {
    print("Failed to link user: \(error.localizedDescription)")
}
