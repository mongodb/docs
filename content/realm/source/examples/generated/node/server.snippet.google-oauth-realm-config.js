// Configure and instantiate Google OAuth2.0 client
const oauthConfig = {
  client_id: GOOGLE_CLIENT_ID,
  project_id: GOOGLE_PROJECT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_secret: GOOGLE_CLIENT_SECRET,
  redirect_uris: [`${BASE_URL}/auth/google/callback`],
  JWTsecret: "secret",
  scopes: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid",
    // any other scopes you might require. View all here - https://developers.google.com/identity/protocols/oauth2/scopes
  ],
};
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  oauthConfig.client_id,
  oauthConfig.client_secret,
  oauthConfig.redirect_uris[0]
);

// Instantiate Realm app
const realmApp = new Realm.App({
  id: REALM_APP_ID,
});
