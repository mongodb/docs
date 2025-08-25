final config = Configuration.local([Car.schema],
    shouldCompactCallback: ((totalSize, usedSize) {
  // shouldCompactCallback sizes are in bytes.
  // For convenience, this example defines a const
  // representing a byte to MB conversion for compaction
  // at an arbitrary 10MB file size.
  const tenMB = 10 * 1048576;
  return totalSize > tenMB;
}));
final realm = Realm(config);
