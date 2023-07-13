For a :binary:`~bin.mongod` :term:`primary` in MongoDB 4.4 and earlier.
:ref:`timeoutSecs <shutdownServer-method-timeoutSecs>` specifies the
time in seconds that the :term:`primary` waits for a :term:`secondary`
to catch up for the ``shutdownServer`` command. If no secondaries catch
up within ``timeoutSecs``, the ``shutdownServer`` command fails.

Default is ``120`` seconds.
