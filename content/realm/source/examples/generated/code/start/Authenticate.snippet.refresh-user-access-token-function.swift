func getValidAccessToken(user: User) async throws -> String {
    // An already logged in user's access token might be stale. To
    // guarantee that the token is valid, refresh it if necessary.
    try await user.refreshCustomData()
    return user.accessToken!
}
