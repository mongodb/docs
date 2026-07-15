
If you start sync with verification enabled and ``buildIndexes``
set to ``never``, the migration will fail if ``mongosync`` finds
a TTL collection on the source cluster. This can happen after
you call the ``/start`` endpoint or much later, such as where a
user creates a TTL index on the source cluster while a migration
is in progress.

To sync TTL collections without building indexes on the
destination cluster, you must start sync with the :ref:`verifier
disabled <c2c-disabled-verifier>`.


