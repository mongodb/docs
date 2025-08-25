do {
    let user = try await app.login(credentials: Credentials.anonymous)
    print("Successfully logged in user: \(user)")
    await openSyncedRealm(user: user)
} catch {
    print("Error logging in: \(error.localizedDescription)")
}
