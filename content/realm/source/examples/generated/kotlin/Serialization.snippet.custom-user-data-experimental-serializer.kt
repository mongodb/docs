val user = app.currentUser!!
val customUserData = user.customData<UserCustomData>()
assertEquals("blue", customUserData!!.favoriteColor)
