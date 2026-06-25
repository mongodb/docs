
Verification requires 10 GB of memory plus an additional 500 MB
for every 1 million documents in the migration. 

If the available memory is insufficient, the ``/start`` endpoint
returns an error. If this occurs, to use ``mongosync`` with the
verifier you must first increase the memory of the server and
resume the migration. 

If increasing server memory isn't an option, restart
``mongosync`` with the :ref:`verifier disabled
<c2c-disabled-verifier>`.


