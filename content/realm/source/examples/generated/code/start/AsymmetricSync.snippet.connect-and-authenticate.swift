let app = App(id: INSERT_APP_ID_HERE)
do {
    let user = try await login()
    await openSyncedRealm(user: user)
} catch {
    print("Error logging in: \(error.localizedDescription)")
}

func login() async throws -> User {
    let user = try await app.login(credentials: .anonymous)
    return user
}
