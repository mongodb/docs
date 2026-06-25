The ``mongosync`` user must have
a role that includes the :authaction:`setUserWriteBlockMode` and
:authaction:`bypassWriteBlockingMode` ActionTypes.

.. note::

   Write blocking only applies to users that do not have the
   :authaction:`bypassWriteBlockingMode` ActionType. Users who
   have this ActionType can perform writes.
