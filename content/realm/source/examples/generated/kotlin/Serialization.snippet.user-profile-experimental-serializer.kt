val user = app.currentUser!!
val userProfile = user.profile<UserProfile>()

assertEquals(userProfile.email, "my.email@example.com")
