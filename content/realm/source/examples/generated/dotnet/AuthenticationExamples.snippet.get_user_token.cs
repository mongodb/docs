// Returns a valid user access token to authenticate requests
public async Task<string> GetValidAccessToken(User user)
{
    // An already logged in user's access token might be stale. To
    // guarantee that the token is valid, refresh it.
    await user.RefreshCustomDataAsync();
    return user.AccessToken;
}
