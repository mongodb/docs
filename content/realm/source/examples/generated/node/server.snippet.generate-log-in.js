// generate OAuth 2.0 log in link
const loginLink = oauth2Client.generateAuthUrl({
  access_type: "offline", // Indicates that we need to be able to access data continuously without the user constantly giving us consent
  scope: oauthConfig.scopes,
});
