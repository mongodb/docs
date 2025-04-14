This example highlights the key components of the transactions API. In
particular, it uses the callback API. The callback API:

- starts a transaction
- executes the specified operations
- commits the result (or aborts on error)

The callback API incorporates retry logic for certain errors. The server
tries to rerun the transaction after a :ref:`TransientTransactionError
<transient-transaction-error>` or :ref:`UnknownTransactionCommitResult
<unknown-transaction-commit-result>` commit error.

Starting in MongoDB 6.2, the server does not retry the transaction if
it receives a :ref:`TransactionTooLargeForCache
<transactionTooLargeForCache-error>` error.

