final config = Configuration.local([Car.schema],
    shouldCompactCallback: ((totalSize, usedSize) {
  // Compact if the file is over 10MB in size and less than 50% 'used'
  const tenMB = 10 * 1048576;
  return (totalSize > tenMB) &&
      (usedSize.toDouble() / totalSize.toDouble()) < 0.5;
}));
final realm = Realm(config);
