// Must set log level before opening synced realm.
Realm.logger.level = RealmLogLevel.error;

// Initialize app and user before can open synced realm.
final app = App(AppConfiguration(APP_ID));
final user = await app.logIn(Credentials.anonymous());

// Synced realm writes logs according to log level set above.
final realm = Realm(Configuration.flexibleSync(user, SCHEMA_OBJECTS));
