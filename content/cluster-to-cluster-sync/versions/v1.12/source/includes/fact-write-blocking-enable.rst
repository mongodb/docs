By default, ``mongosync`` enables destination-only 
write-blocking on the destination cluster. 
``mongosync`` unblocks writes right before the 
:ref:`/progress <c2c-api-progress>` endpoint reports 
that ``canWrite`` is ``true``. You can explicitly
enable destination-only write-blocking by using
the :ref:`/start <c2c-api-start>` endpoint to set
``enableUserWriteBlocking`` to ``"destinationOnly"``.

You can enable dual write-blocking. 
If you enable dual write-blocking, ``mongosync`` blocks writes:

- On the destination cluster during the migration. ``mongosync``
  unblocks writes right before it sets ``canWrite`` to ``true``
- On the source cluster after you call ``/commit``

To enable dual write-blocking, use :ref:`/start <c2c-api-start>`
to set ``enableUserWriteBlocking`` to ``"sourceAndDestination"``.

You can use
:ref:`/start <c2c-api-start>`
to set ``enableUserWriteBlocking`` to ``"none"``.

You cannot enable dual write-blocking or disable
write-blocking after the sync starts.