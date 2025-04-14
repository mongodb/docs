On a replica set, even if a transaction uses read concern ``local``, you
might observe stronger read isolation where the operation reads from a
snapshot at the point in time that the transaction was opened.
