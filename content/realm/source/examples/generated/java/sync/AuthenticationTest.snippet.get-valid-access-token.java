// Gets a valid user access token to authenticate requests
public String getValidAccessToken(User user) {
    // An already logged in user's access token might be stale. To
    // guarantee that the token is valid, refresh it if necessary.
    user.refreshCustomData();
    return user.getAccessToken();
}
