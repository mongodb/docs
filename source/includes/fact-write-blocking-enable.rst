``mongosync`` does not enable write-blocking by default. If you enable
write-blocking, ``mongosync`` blocks writes:

- On the destination cluster during sync.
- On the source cluster while ``commit`` is running.

To enable write-blocking, use the :ref:`start API <c2c-api-start>`
to set ``enableUserWriteBlocking`` to ``true``. You cannot enable
write-blocking after the sync starts.
