This example highlights the key components of the transactions API. In
particular, it uses the callback API. The callback API:

- starts a transaction
- executes the specified operations
- commits the result or ends the transaction on error

Errors in server-side operations, such as the ``DuplicateKeyError``,
can end the transaction and result in a command error to alert
the user that the transaction has ended. This behavior is expected
and occurs even if the client never calls :method:`Session.abortTransaction()`. 
To incorporate custom error handling, use the :ref:`Core API <txn-core-api>`
on your transaction.

The callback API incorporates retry logic for certain errors. The 
driver tries to rerun the transaction after a :ref:`TransientTransactionError
<transient-transaction-error>` or :ref:`UnknownTransactionCommitResult
<unknown-transaction-commit-result>` commit error. 

Starting in MongoDB 6.2, the server does not retry the transaction if
it receives a :ref:`TransactionTooLargeForCache
<transactionTooLargeForCache-error>` error.

.. include :: /includes/fact-no-upsert-retry-multidocument-transaction.rst