Starting in MongoDB 8.3, if ``unit`` is not ``"millisecond"`` and 
the input date is before ``ISODate("1970-01-01T00:00:00Z")``, the result 
will be one second greater than in previous versions of MongoDB.