do {
    let app = App(id: APP_ID)
    let user = try await app.login(credentials: Credentials.anonymous)
    var config = user.flexibleSyncConfiguration(clientResetMode: .manual())
} catch {
    print("Error logging in user: \(error.localizedDescription)")
}
