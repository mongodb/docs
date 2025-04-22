Optional. Use with ``bucketMaxSpanSeconds`` as an alternative
to ``granularity``. Must be equal to ``bucketMaxSpanSeconds``.

When a document requires a new bucket, MongoDB rounds down the
document's timestamp value by this interval to set the minimum
time for the bucket.
   
.. versionadded:: 6.3