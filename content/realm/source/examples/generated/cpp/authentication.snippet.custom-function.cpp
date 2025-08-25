auto appConfig = realm::App::configuration();
appConfig.app_id = APP_ID;
auto app = realm::App(appConfig);

/* Custom function authentication takes a string parameters argument.
The parameter details vary depending on how you define your custom
authentication function. */
std::string params = "{\"username\": \"bob\"}";
auto user = app.login(realm::App::credentials::function(params)).get();
