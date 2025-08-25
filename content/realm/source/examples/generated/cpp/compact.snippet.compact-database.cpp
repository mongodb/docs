// Create a database configuration.
auto config = realm::db_config();

config.should_compact_on_launch([&](uint64_t totalBytes, uint64_t usedBytes) {
  // totalBytes refers to the size of the file on disk in bytes (data + free
  // space). usedBytes refers to the number of bytes used by data in the file
  // Compact if the file is over 100MB in size and less than 50% 'used'
  auto oneHundredMB = 100 * 1024 * 1024;
  return (totalBytes > oneHundredMB) && (usedBytes / totalBytes) < 0.5;
});

// The database is compacted on the first open if the configuration block
// conditions were met.
auto realm = realm::db(config);
