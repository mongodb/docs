If a time series collection contains documents with ``timeField``
timestamps before ``1970-01-01T00:00:00.000Z`` or after
``2038-01-19T03:14:07.000Z``, no documents are deleted from the
collection by the :term:`TTL "time to live" <TTL>` feature.
