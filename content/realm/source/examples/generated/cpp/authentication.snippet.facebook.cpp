auto appConfig = realm::App::configuration();
appConfig.app_id = APP_ID;
auto app = realm::App(appConfig);

auto accessToken = "<token>";

auto user = app.login(realm::App::credentials::facebook(accessToken)).get();
