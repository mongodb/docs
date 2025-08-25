// Gets a valid user access token to authenticate requests
fun getValidAccessToken(user: User?): String {
    // An already logged in user's access token might be stale. To
    // guarantee that the token is valid, refresh it if necessary.
    user!!.refreshCustomData()
    return user.accessToken
}

