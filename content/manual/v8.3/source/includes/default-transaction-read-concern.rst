All operations within a transaction use the transaction read concern:
Any read concern set at the operation, collection, or database level is
:red:`ignored` inside the transaction.
