Starting in MongoDB 5.0.14 (and 6.0.2), the server will not use TTL
indexes that have ``expireAfterSeconds`` set to ``NaN``.