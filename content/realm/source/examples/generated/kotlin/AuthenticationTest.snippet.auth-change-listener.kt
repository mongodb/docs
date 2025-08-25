// Create a Flow of AuthenticationChange objects
app.authenticationChangeAsFlow().collect {
    change: AuthenticationChange ->
        when (change) {
            is LoggedIn -> proceedToAppActivity(change.user)
            is LoggedOut -> proceedToLoginActivity(change.user)
            is Removed -> proceedToRemovedUserActivity(change.user)
        }
}
