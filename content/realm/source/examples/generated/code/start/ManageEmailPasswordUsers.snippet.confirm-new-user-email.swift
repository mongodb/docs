let app = App(id: YOUR_APP_SERVICES_APP_ID)
let client = app.emailPasswordAuth

// Token and tokenId are query parameters in the confirmation
// link sent in the confirmation email.
let token = "someToken"
let tokenId = "someTokenId"

do {
    try await client.confirmUser(token, tokenId: tokenId)
    // User email address confirmed.
    print("Successfully confirmed user.")
} catch {
    print("User confirmation failed: \(error.localizedDescription)")
}
