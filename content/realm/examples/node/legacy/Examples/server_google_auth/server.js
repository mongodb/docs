// based on:
// * https://dev.to/aidanlovelace/how-to-setup-google-oauth2-login-with-express-2d30
// * https://developers.google.com/identity/protocols/oauth2/openid-connect?hl=fi#python

const express = require("express");
const methodOverride = require("method-override");
// :snippet-start: import-npm-packages
const Realm = require("realm");
const { google } = require("googleapis");
// :snippet-end:
require("dotenv").config();

const PORT = process.env.PORT || 5500;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const REALM_APP_ID = process.env.REALM_APP_ID;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_PROJECT_ID = process.env.GOOGLE_PROJECT_ID;

// :snippet-start: google-oauth-realm-config
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
// :snippet-end:

// Create Express application
const app = express();
app.set("view engine", "ejs");
app.set("views", __dirname);
app.use(methodOverride());

app.get("/", function (req, res) {
  // :snippet-start: generate-log-in
  // generate OAuth 2.0 log in link
  const loginLink = oauth2Client.generateAuthUrl({
    access_type: "offline", // Indicates that we need to be able to access data continuously without the user constantly giving us consent
    scope: oauthConfig.scopes,
  });
  // :snippet-end:
  res.render("views/index", { loginLink });
});

app.get("/auth/google/callback", function (req, res, errorHandler) {
  if (req.query.error) {
    // The user did not give us permission.
    return errorHandler(req.query.error);
  } else {
    const authCodeFromQueryString = req.query.code;
    // :snippet-start: login-with-token
    // Get Google token and use it to sign into Realm
    oauth2Client.getToken(authCodeFromQueryString, async function (
      error,
      token
    ) {
      if (error) return errorHandler(error);
      try {
        const credential = Realm.Credentials.google({
          idToken: token.id_token,
        });
        const user = await realmApp.logIn(credential);
        console.log("signed in as Realm user", user.id);
        return res.render("views/success", { id: user.id }); // :remove:
      } catch (error) {
        errorHandler(error);
      }
    });
    // :snippet-end:
  }
});

app.post("/logout", (req, res) => {
  res.redirect("/");
});

// Handle 500 Errors
app.use(function (error, req, res, next) {
  res.status(500).render("views/error", { error });
});

// Listen on the port defined in the config file
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
