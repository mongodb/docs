// Log in a user
val user = app.login(Credentials.emailPassword(email, password))

// Access the user's metadata
val userEmail = user.profileAsBsonDocument()["email"]
Log.i("The logged-in user's email is: $userEmail")
