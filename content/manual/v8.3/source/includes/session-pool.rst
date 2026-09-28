A session is checked out from a session pool to run database operations.

:parameter:`AbortExpiredTransactionsSessionCheckoutTimeout` sets the
maximum number of milliseconds for a session to be checked out when
attempting to end an expired transaction.

If the expired transaction is successfully ended, MongoDB increments
:serverstatus:`metrics.abortExpiredTransactions.successfulKills`. If the
transaction isn't successfully ended because it timed out when
attempting to check out a session, MongoDB increments
:serverstatus:`metrics.abortExpiredTransactions.timedOutKills`.
