auto appConfig = realm::App::configuration();
appConfig.app_id = APP_ID;
auto app = realm::App(appConfig);

// The user's OpenID Connect id_token you got from the Google OAuth response
auto myIdToken = "open_id_connect_id_token_from_google";
auto user =
    app.login(realm::App::credentials::google_id_token(myIdToken)).get();
