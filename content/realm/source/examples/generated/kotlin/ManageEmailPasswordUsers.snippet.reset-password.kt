val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
runBlocking { // use runBlocking sparingly -- it can delay UI interactions
    app.emailPasswordAuth.resetPassword(token, tokenId, newPassword)
}
