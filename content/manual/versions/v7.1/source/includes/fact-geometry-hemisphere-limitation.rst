For |geo-operator-method|, if you specify a single-ringed polygon that
has an area greater than a single hemisphere, include the custom MongoDB
coordinate reference system in the :query:`$geometry <$geometry>`
expression. Otherwise, |geo-operator-method| queries for the
complementary geometry. For all other GeoJSON polygons with areas
greater than a hemisphere, |geo-operator-method| queries for the
complementary geometry.
