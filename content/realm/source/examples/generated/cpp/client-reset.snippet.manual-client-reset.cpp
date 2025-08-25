auto user = app.login(realm::App::credentials::anonymous()).get();
auto syncConfig = user.flexible_sync_configuration();

// Set the client reset handler to manual client reset mode.
syncConfig.set_client_reset_handler(realm::client_reset::manual());

// Define a Sync error handler for handling the client reset.
syncConfig.sync_config().set_error_handler(
    [&](realm::sync_session session, realm::sync_error error) {
      if (error.is_client_reset_requested()) {
        /* You might use this for reporting or to instruct the user to delete
           and re-install the app. */
      };
    });

auto syncedRealm = realm::db(syncConfig);
