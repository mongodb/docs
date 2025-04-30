To set ``enableUserWriteBlocking``, the ``mongosync`` user must have a
role that includes the :authaction:`setUserWriteBlockMode` and
:authaction:`bypassWriteBlockingMode` ActionTypes. 

.. note:: 
    
   When using ``enableUserWriteBlocking``, writes are only blocked for users
   that do not have the :authaction:`bypassWriteBlockingMode` ActionType. Users
   who have this ActionType are able to perform writes.


