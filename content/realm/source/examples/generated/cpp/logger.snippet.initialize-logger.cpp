auto config = realm::db_config();
auto thisRealm = realm::db(config);
auto myLogger = std::make_shared<MyCustomLogger>();
realm::set_default_logger(myLogger);
