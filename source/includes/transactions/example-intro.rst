This example highlights the key components of the transactions API. In
particular, it uses the callback API. 

Errors in server-side operations, such as the ``DuplicateKeyError``,
can end the transaction and result in a command error to alert
the user that the transaction has ended. This behavior is expected
and occurs even if the client never calls :method:`Session.abortTransaction()`. 
To incorporate custom error handling, use the :ref:`Core API <txn-core-api>`
on your transaction.


