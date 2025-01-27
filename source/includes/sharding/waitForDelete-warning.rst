When the ``_waitForDelete`` field is set, MongoDB does not wait on the 
:parameter:`orphanCleanupDelaySecs` delay before performing the range 
deletion. If you use the ``_waitForDelete`` parameter and have have any
read operations occurring on secondaries, the read may return documents 
before their deletion.