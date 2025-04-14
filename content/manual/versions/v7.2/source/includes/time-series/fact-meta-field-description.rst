Optional. The name of the field which contains metadata in each
time series document. The metadata in the specified field should
be data that is used to label a unique series of documents. The
metadata should rarely, if ever, change.

The name of the specified field may not be ``_id`` or the same as
the ``timeseries.timeField``. The field can be of any type.
