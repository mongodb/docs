const companiesInLargeBox = realm
  .objects(Company)
  .filtered("location geoWithin $0", largeBox);
console.debug(`Companies in large box: ${companiesInLargeBox.length}`);

const companiesInSmallBox = realm
  .objects(Company)
  .filtered("location geoWithin $0", smallBox);
console.debug(`Companies in small box: ${companiesInSmallBox.length}`);
