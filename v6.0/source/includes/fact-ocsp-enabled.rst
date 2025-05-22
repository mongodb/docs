Starting in MongoDB 6.0, if :parameter:`ocspEnabled` is set to ``true`` during 
initial sync, all nodes must be able to reach the :ref:`OCSP <ocsp-support>` 
responder.

If a member fails in the :replstate:`STARTUP2` state, set 
:parameter:`tlsOCSPVerifyTimeoutSecs` to a value that is less than ``5``. 
