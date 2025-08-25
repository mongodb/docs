auto appConfig = realm::App::configuration();
appConfig.app_id = APP_ID;
auto app = realm::App(appConfig);

auto user = app.login(realm::App::credentials::api_key(API_KEY)).get();
