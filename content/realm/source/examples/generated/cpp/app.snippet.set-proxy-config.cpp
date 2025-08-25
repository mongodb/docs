auto proxyConfig = realm::proxy_config();
proxyConfig.port = 8080;
proxyConfig.address = "127.0.0.1";
proxyConfig.username_password = {"username", "password"};

auto appConfig = realm::App::configuration();
appConfig.app_id = APP_ID;
appConfig.proxy_configuration = proxyConfig;
auto app = realm::App(appConfig);

auto user = app.get_current_user();
auto syncConfig = user->flexible_sync_configuration();
syncConfig.set_proxy_config(proxyConfig);
auto syncedRealm = realm::db(syncConfig);
