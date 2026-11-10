This holds a database exclusive lock for the duration of the operation.
Other operations which lock the same database will be blocked until the
operation completes. See :ref:`faq-concurrency-operations-locks` for
operations that lock the database.