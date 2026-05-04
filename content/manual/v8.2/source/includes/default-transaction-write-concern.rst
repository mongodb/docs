All operations within a transaction use the transaction write concern:
Any write concern set at the operation, collection, or database level is
:red:`ignored` inside the transaction.
