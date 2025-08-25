auto config = realm::db_config();
auto realm = realm::open<realm::Dog>(std::move(config));
