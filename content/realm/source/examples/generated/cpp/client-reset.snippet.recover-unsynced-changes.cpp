auto user = app.login(realm::App::credentials::anonymous()).get();
auto syncConfig = user.flexible_sync_configuration();

// Set the client reset handler with your preferred client reset mode.
syncConfig.set_client_reset_handler(
    realm::client_reset::recover_unsynced_changes(beforeReset, afterReset));

auto syncedRealm = realm::db(syncConfig);
