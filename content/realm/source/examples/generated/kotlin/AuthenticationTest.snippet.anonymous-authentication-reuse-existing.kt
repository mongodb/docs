// Logs in with an anonymous user
val anonUser = app.login(Credentials.anonymous())

// Logs in with a new, different anonymous user
val otherAnonUser =
    app.login(Credentials.anonymous(reuseExisting = false))
