auto token = "<jwt>";

auto appConfig = realm::App::configuration();
appConfig.app_id = APP_ID;
auto app = realm::App(appConfig);

auto user = app.login(realm::App::credentials::custom(token)).get();
