// Initialize the App, authenticate a user, and open the database
auto appConfig = realm::App::configuration();
appConfig.app_id = APP_ID;
auto app = realm::App(appConfig);
auto user = app.login(realm::App::credentials::anonymous()).get();
auto syncConfig = user.flexible_sync_configuration();
auto syncedRealm = realm::db(syncConfig);
