let app = App(id: YOUR_APP_SERVICES_APP_ID)
let user = try await app.login(credentials: Credentials.anonymous)
let accessToken = try await getValidAccessToken(user: user)
