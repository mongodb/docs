// Check if we already have a key stored in the platform's secure storage.
// If we don't, generate a new one.
// Use your preferred method to generate a key. This example key is
// NOT representative of a secure encryption key. It only exists to
// illustrate the form your key might take.
std::array<char, 64> exampleKey = {
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0,
    0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 5, 5, 0, 0,
    0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0};

// Store the key securely to be used next time we want to open the database.
// We don't illustrate this here because it varies depending on the platform.

// Create a database configuration.
auto config = realm::db_config();
// Set the encryption key in your config.
config.set_encryption_key(exampleKey);

// Open or create a database with the config containing the encryption key.
auto realm = realm::db(config);
