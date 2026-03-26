In MongoDB 8.2.0, |collectionUUID-link| and
|disambiguatedPaths-link| are included in applicable
change events even if you do not set ``showExpandedEvents``. In
MongoDB versions earlier than 8.2.0 and in versions 8.2.1 and later,
these fields are included only if you open the change stream with
``showExpandedEvents: true``.
