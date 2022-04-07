When saving RDD data into MongoDB, the data must be convertible to
a :manual:`BSON document </core/document>`. You may need to include a
``map`` transformation to convert the data into a ``Document`` (or
``BsonDocument`` or a ``DBObject``).
