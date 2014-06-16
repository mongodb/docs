|geo-operation| always returns the documents sorted by distance.
Any other sort order requires to sort the documents in memory, which can
be inefficient. To return results in a different sort order, use the
:operator:`$geoWithin` operator in combination with :method:`sort()`
