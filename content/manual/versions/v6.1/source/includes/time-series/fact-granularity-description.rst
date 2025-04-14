Optional. Possible values are:

- ``"seconds"``
- ``"minutes"``
- ``"hours"``

By default, MongoDB sets the ``granularity`` to ``"seconds"`` for
high-frequency ingestion.

Manually set the ``granularity`` parameter to improve performance
by optimizing how data in the time series collection is stored
internally. To select a value for ``granularity``, choose the
closest match to the time span between consecutive incoming
measurements.

If you specify the ``timeseries.metaField``, consider the time
span between consecutive incoming measurements that have the same
unique value for the ``metaField`` field. Measurements often have
the same unique value for the ``metaField`` field if they come
from the same source.

If you do not specify ``timeseries.metaField``, consider the time
span between all measurements that are inserted in the collection.
