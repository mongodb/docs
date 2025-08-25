// With a logged-in user, refresh the custom user data to refresh the auth
// session
user.refresh_custom_user_data().get();

// Then get the user's access token
auto userAccessToken = user.access_token();
