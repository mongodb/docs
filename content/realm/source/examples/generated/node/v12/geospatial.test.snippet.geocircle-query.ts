const companiesInSmallCircle = realm
  .objects(Company)
  .filtered("location geoWithin $0", smallCircle);
console.debug(`Companies in smallCircle: ${companiesInSmallCircle.length}`);

const companiesInLargeCircle = realm
  .objects(Company)
  .filtered("location geoWithin $0", largeCircle);
console.debug(`Companies in largeCircle: ${companiesInLargeCircle.length}`);
