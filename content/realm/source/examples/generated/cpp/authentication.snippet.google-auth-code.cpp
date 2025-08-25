auto appConfig = realm::App::configuration();
appConfig.app_id = APP_ID;
auto app = realm::App(appConfig);

// The user's server auth code you got from Google
auto myAuthCode = "auth_code_from_google";
auto user =
    app.login(realm::App::credentials::google_auth_code(myAuthCode)).get();
