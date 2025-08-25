auto relative_realm_path_directory = "custom_path_directory/";
std::filesystem::create_directories(relative_realm_path_directory);
// Construct a path
std::filesystem::path path =
    std::filesystem::current_path().append(relative_realm_path_directory);
// Add a name for the database file
path = path.append("employee_objects");
// Add the .realm extension
path = path.replace_extension("realm");
// Set the path on the config, and open the database at the path
auto config = realm::db_config();
config.set_path(path);
auto realmInstance = realm::db(std::move(config));
