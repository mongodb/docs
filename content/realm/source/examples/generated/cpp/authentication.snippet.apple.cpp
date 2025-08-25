auto appConfig = realm::App::configuration();
appConfig.app_id = APP_ID;
auto app = realm::App(appConfig);

auto idToken = "<token>";

auto user = app.login(realm::App::credentials::apple(idToken)).get();
