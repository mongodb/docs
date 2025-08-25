const companiesInBasicPolygon = realm
  .objects(Company)
  .filtered("location geoWithin $0", basicPolygon);
console.debug(
  `Companies in basic polygon: ${companiesInBasicPolygon.length}`
);

const companiesInPolygonWithTwoHoles = realm
  .objects(Company)
  .filtered("location geoWithin $0", polygonWithTwoHoles);
console.debug(
  `Companies in polygon with two holes: ${companiesInPolygonWithTwoHoles.length}`
);
