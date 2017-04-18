+++
title = "Perform Two Phase Commits"

[tags]
+++
# Perform Two Phase Commits


# On this page

* [Synopsis](#synopsis) 

* [Background](#background) 

* [Pattern](#pattern) 

* [Recovering from Failure Scenarios](#recovering-from-failure-scenarios) 

* [Multiple Applications](#multiple-applications) 

* [Using Two-Phase Commits in Production Applications](#using-two-phase-commits-in-production-applications) 


## Synopsis

This document provides a pattern for doing multi-document updates or
"multi-document transactions" using a two-phase commit approach for
writing data to multiple documents. Additionally, you can extend this
process to provide a [rollback-like](#phase-commits-rollback)
functionality.


## Background

Operations on a single [*document*](#term-document) are always atomic with MongoDB
databases; however, operations that involve multiple documents, which
are often referred to as "multi-document transactions", are not atomic.
Since documents can be fairly complex and contain multiple "nested"
documents, single-document atomicity provides the necessary support for
many practical use cases.

Despite the power of single-document atomic operations, there are cases
that require multi-document transactions. When executing a transaction
composed of sequential operations, certain issues arise, such as:

* Atomicity: if one operation fails, the previous operation within the transaction must "rollback" to the previous state (i.e. the "nothing," in "all or nothing"). 

* Consistency: if a major failure (i.e. network, hardware) interrupts the transaction, the database must be able to recover a consistent state. 

For situations that require multi-document transactions, you can
implement two-phase commit in your application to provide support for
these kinds of multi-document updates. Using two-phase commit ensures
that data is consistent and, in case of an error, the state that
preceded the transaction is [recoverable](#phase-commits-rollback). During the procedure, however, documents
can represent pending data and states.

Note: Because only single-document operations are atomic with MongoDB, two-phase commits can only offer transaction-*like* semantics. It is possible for applications to return intermediate data at intermediate points during the two-phase commit or rollback. 


## Pattern


### Overview

Consider a scenario where you want to transfer funds from account ``A``
to account ``B``. In a relational database system, you can subtract the
funds from ``A`` and add the funds to ``B`` in a single multi-statement
transaction. In MongoDB, you can emulate a two-phase commit to achieve
a comparable result.

The examples in this tutorial use the following two collections:

1. A collection named ``accounts`` to store account information. 

2. A collection named ``transactions`` to store information on the fund transfer transactions. 


### Initialize Source and Destination Accounts

Insert into the ``accounts`` collection a document for account ``A``
and a document for account ``B``.

```javascript

db.accounts.insert(
   [
     { _id: "A", balance: 1000, pendingTransactions: [] },
     { _id: "B", balance: 1000, pendingTransactions: [] }
   ]
)

```

The operation returns a [``BulkWriteResult()``](#BulkWriteResult) object with the
status of the operation. Upon successful insert, the
[``BulkWriteResult()``](#BulkWriteResult) has [``nInserted``](#BulkWriteResult.nInserted) set
to ``2`` .


### Initialize Transfer Record

For each fund transfer to perform, insert into the ``transactions``
collection a document with the transfer information. The document
contains the following fields:

* ``source`` and ``destination`` fields, which refer to the ``_id`` fields from the ``accounts`` collection, 

* ``value`` field, which specifies the amount of transfer affecting the ``balance`` of the ``source`` and ``destination`` accounts, 

* ``state`` field, which reflects the current state of the transfer. The ``state`` field can have the value of ``initial``, ``pending``, ``applied``, ``done``, ``canceling``, and ``canceled``. 

* ``lastModified`` field, which reflects last modification date. 

To initialize the transfer of ``100`` from account ``A`` to account
``B``, insert into the ``transactions`` collection a document with the
transfer information, the transaction ``state`` of ``"initial"``, and
the ``lastModified`` field set to the current date:

```javascript

db.transactions.insert(
    { _id: 1, source: "A", destination: "B", value: 100, state: "initial", lastModified: new Date() }
)

```

The operation returns a [``WriteResult()``](#WriteResult) object with the status
of the operation. Upon successful insert, the [``WriteResult()``](#WriteResult)
object has [``nInserted``](#WriteResult.nInserted) set to ``1``.


### Transfer Funds Between Accounts Using Two-Phase Commit


#### Step 1: Retrieve the transaction to start.

From the ``transactions`` collection, find a transaction in the
``initial`` state. Currently the ``transactions`` collection has
only one document, namely the one added in the
[Initialize Transfer Record](#initialize-transfer-record) step. If the collection
contains additional documents, the query will return any
transaction with an ``initial`` state unless you specify additional
query conditions.

```javascript

var t = db.transactions.findOne( { state: "initial" } )

```

Type the variable ``t`` in the [``mongo``](#bin.mongo) shell to print the
contents of the variable. The operation should print a document
similar to the following except the ``lastModified`` field should reflect
date of your insert operation:

```javascript

{ "_id" : 1, "source" : "A", "destination" : "B", "value" : 100, "state" : "initial", "lastModified" : ISODate("2014-07-11T20:39:26.345Z") }

```


#### Step 2: Update transaction state to pending.

Set the transaction ``state`` from ``initial`` to ``pending`` and
use the [``$currentDate``](#up._S_currentDate) operator to set the ``lastModified``
field to the current date.

```javascript

db.transactions.update(
    { _id: t._id, state: "initial" },
    {
      $set: { state: "pending" },
      $currentDate: { lastModified: true }
    }
)

```

The operation returns a [``WriteResult()``](#WriteResult) object with the status
of the operation. Upon successful update, the
[``nMatched``](#WriteResult.nMatched) and [``nModified``](#WriteResult.nModified)
displays ``1``.

In the update statement, the ``state: "initial"`` condition ensures
that no other process has already updated this record. If
[``nMatched``](#WriteResult.nMatched) and [``nModified``](#WriteResult.nModified) is
``0``, go back to the first step to get a different transaction
and restart the procedure.


#### Step 3: Apply the transaction to both accounts.

Apply the transaction ``t`` to both accounts using the
[``update()``](#db.collection.update) method *if* the transaction has not
been applied to the accounts. In the update condition, include the
condition ``pendingTransactions: { $ne: t._id }`` in order to avoid
re-applying the transaction if the step is run more than once.

To apply the transaction to the account, update both the ``balance``
field and the ``pendingTransactions`` field.

Update the source account, subtracting from its ``balance`` the
transaction ``value`` and adding to its ``pendingTransactions``
array the transaction ``_id``.

```javascript

db.accounts.update(
   { _id: t.source, pendingTransactions: { $ne: t._id } },
   { $inc: { balance: -t.value }, $push: { pendingTransactions: t._id } }
)

```

Upon successful update, the method returns a
[``WriteResult()``](#WriteResult) object with [``nMatched``](#WriteResult.nMatched)
and [``nModified``](#WriteResult.nModified) set to ``1``.

Update the destination account, adding to its ``balance`` the
transaction ``value`` and adding to its ``pendingTransactions``
array the transaction ``_id`` .

```javascript

db.accounts.update(
   { _id: t.destination, pendingTransactions: { $ne: t._id } },
   { $inc: { balance: t.value }, $push: { pendingTransactions: t._id } }
)

```

Upon successful update, the method returns a
[``WriteResult()``](#WriteResult) object with [``nMatched``](#WriteResult.nMatched)
and [``nModified``](#WriteResult.nModified) set to ``1``.


#### Step 4: Update transaction state to applied.

Use the following [``update()``](#db.collection.update) operation to
set the transaction's ``state`` to ``applied`` and update the
``lastModified`` field:

```javascript

db.transactions.update(
   { _id: t._id, state: "pending" },
   {
     $set: { state: "applied" },
     $currentDate: { lastModified: true }
   }
)

```

Upon successful update, the method returns a
[``WriteResult()``](#WriteResult) object with [``nMatched``](#WriteResult.nMatched)
and [``nModified``](#WriteResult.nModified) set to ``1``.


#### Step 5: Update both accounts' list of pending transactions.

Remove the applied transaction ``_id`` from the
``pendingTransactions`` array for both accounts.

Update the source account.

```javascript

db.accounts.update(
   { _id: t.source, pendingTransactions: t._id },
   { $pull: { pendingTransactions: t._id } }
)

```

Upon successful update, the method returns a
[``WriteResult()``](#WriteResult) object with [``nMatched``](#WriteResult.nMatched)
and [``nModified``](#WriteResult.nModified) set to ``1``.

Update the destination account.

```javascript

db.accounts.update(
   { _id: t.destination, pendingTransactions: t._id },
   { $pull: { pendingTransactions: t._id } }
)

```

Upon successful update, the method returns a
[``WriteResult()``](#WriteResult) object with [``nMatched``](#WriteResult.nMatched)
and [``nModified``](#WriteResult.nModified) set to ``1``.


#### Step 6: Update transaction state to done.

Complete the transaction by setting the ``state`` of the transaction
to ``done`` and updating the ``lastModified`` field:

```javascript

db.transactions.update(
   { _id: t._id, state: "applied" },
   {
     $set: { state: "done" },
     $currentDate: { lastModified: true }
   }
)

```

Upon successful update, the method returns a [``WriteResult()``](#WriteResult)
object with [``nMatched``](#WriteResult.nMatched) and
[``nModified``](#WriteResult.nModified) set to ``1``.


## Recovering from Failure Scenarios

The most important part of the transaction procedure is not the
prototypical example above, but rather the possibility for recovering
from the various failure scenarios when transactions do not complete
successfully. This section presents an overview of possible
failures and provides steps to recover from these kinds of events.


### Recovery Operations

The two-phase commit pattern allows applications running the sequence
to resume the transaction and arrive at a consistent state. Run the
recovery operations at application startup, and possibly at regular
intervals, to catch any unfinished transactions.

The time required to reach a consistent state depends on how long the
application needs to recover each transaction.

The following recovery procedures uses the ``lastModified`` date as an
indicator of whether the pending transaction requires recovery;
specifically, if the pending or applied transaction has not been
updated in the last 30 minutes, the procedures determine that these
transactions require recovery. You can use different conditions to make
this determination.


#### Transactions in Pending State

To recover from failures that occur after step
"[Update transaction state to pending.](#update-transaction-state-to-pending)" but before
"[Update transaction state to applied.](#update-transaction-state-to-applied)" step, retrieve from
the ``transactions`` collection a pending transaction for recovery:

```javascript

var dateThreshold = new Date();
dateThreshold.setMinutes(dateThreshold.getMinutes() - 30);

var t = db.transactions.findOne( { state: "pending", lastModified: { $lt: dateThreshold } } );

```

And resume from step "[Apply the transaction to both accounts.](#apply-the-transaction-to-both-accounts)"


#### Transactions in Applied State

To recover from failures that occur after step
"[Update transaction state to applied.](#update-transaction-state-to-applied)" but before
"[Update transaction state to done.](#update-transaction-state-to-done)" step, retrieve from
the ``transactions`` collection an applied transaction for recovery:

```javascript

var dateThreshold = new Date();
dateThreshold.setMinutes(dateThreshold.getMinutes() - 30);

var t = db.transactions.findOne( { state: "applied", lastModified: { $lt: dateThreshold } } );

```

And resume from
"[Update both accounts' list of pending transactions.](#update-both-accounts-list-of-pending-transactions)"


### Rollback Operations

In some cases, you may need to "roll back" or undo a transaction; e.g.,
if the application needs to "cancel" the transaction or if one of the
accounts does not exist or stops existing during the transaction.


#### Transactions in Applied State

After the "[Update transaction state to applied.](#update-transaction-state-to-applied)" step, you should
**not** roll back the transaction. Instead, complete that transaction
and [create a new transaction](#initialize-transfer-record) to
reverse the transaction by switching the values in the source and the
destination fields.


#### Transactions in Pending State

After the "[Update transaction state to pending.](#update-transaction-state-to-pending)" step, but before the
"[Update transaction state to applied.](#update-transaction-state-to-applied)" step, you can rollback the
transaction using the following procedure:


#### Step 1: Update transaction state to canceling.

Update the transaction ``state`` from ``pending`` to ``canceling``.

```javascript

db.transactions.update(
   { _id: t._id, state: "pending" },
   {
     $set: { state: "canceling" },
     $currentDate: { lastModified: true }
   }
)

```

Upon successful update, the method returns a [``WriteResult()``](#WriteResult)
object with [``nMatched``](#WriteResult.nMatched) and
[``nModified``](#WriteResult.nModified) set to ``1``.


#### Step 2: Undo the transaction on both accounts.

To undo the transaction on both accounts, reverse the transaction
``t`` if the transaction has been applied. In the update condition,
include the condition ``pendingTransactions: t._id`` in order to
update the account only if the pending transaction has been applied.

Update the destination account, subtracting from its ``balance`` the
transaction ``value`` and removing the transaction ``_id``
from the ``pendingTransactions`` array.

```javascript

db.accounts.update(
   { _id: t.destination, pendingTransactions: t._id },
   {
     $inc: { balance: -t.value },
     $pull: { pendingTransactions: t._id }
   }
)

```

Upon successful update, the method returns a
[``WriteResult()``](#WriteResult) object with [``nMatched``](#WriteResult.nMatched)
and [``nModified``](#WriteResult.nModified) set to ``1``.
If the pending transaction has not been previously applied to
this account, no document will match the update condition and
[``nMatched``](#WriteResult.nMatched) and [``nModified``](#WriteResult.nModified)
will be ``0``.

Update the source account, adding to its ``balance`` the
transaction ``value`` and removing the transaction ``_id``
from the ``pendingTransactions`` array.

```javascript

db.accounts.update(
   { _id: t.source, pendingTransactions: t._id },
   {
     $inc: { balance: t.value},
     $pull: { pendingTransactions: t._id }
   }
)

```

Upon successful update, the method returns a
[``WriteResult()``](#WriteResult) object with [``nMatched``](#WriteResult.nMatched)
and [``nModified``](#WriteResult.nModified) set to ``1``.
If the pending transaction has not been previously applied to
this account, no document will match the update condition and
[``nMatched``](#WriteResult.nMatched) and [``nModified``](#WriteResult.nModified)
will be ``0``.


#### Step 3: Update transaction state to canceled.

To finish the rollback, update the transaction ``state`` from
``canceling`` to ``cancelled``.

```javascript

db.transactions.update(
   { _id: t._id, state: "canceling" },
   {
     $set: { state: "cancelled" },
     $currentDate: { lastModified: true }
   }
)

```

Upon successful update, the method returns a [``WriteResult()``](#WriteResult)
object with [``nMatched``](#WriteResult.nMatched) and
[``nModified``](#WriteResult.nModified) set to ``1``.


## Multiple Applications

Transactions exist, in part, so that multiple applications can create
and run operations concurrently without causing data inconsistency or
conflicts. In our procedure, to update or retrieve the transaction
document, the update conditions include a condition on the ``state``
field to prevent reapplication of the transaction by multiple
applications.

For example, applications ``App1`` and ``App2`` both grab the same
transaction, which is in the ``initial`` state. ``App1`` applies the
whole transaction before ``App2`` starts. When ``App2`` attempts to
perform the "[Update transaction state to pending.](#update-transaction-state-to-pending)" step, the update
condition, which includes the ``state: "initial"`` criterion, will not
match any document, and the [``nMatched``](#WriteResult.nMatched) and
[``nModified``](#WriteResult.nModified) will be ``0``. This should signal to
``App2`` to go back to the first step to restart the procedure with
a different transaction.

When multiple applications are running, it is crucial that only one
application can handle a given transaction at any point in time. As
such, in addition including the expected state of the transaction in
the update condition, you can also create a marker in the transaction
document itself to identify the application that is handling the
transaction. Use [``findAndModify()``](#db.collection.findAndModify) method to
modify the transaction and get it back in one step:

```javascript

t = db.transactions.findAndModify(
       {
         query: { state: "initial", application: { $exists: false } },
         update:
           {
             $set: { state: "pending", application: "App1" },
             $currentDate: { lastModified: true }
           },
         new: true
       }
    )

```

Amend the transaction operations to ensure that only applications that
match the identifier in the ``application`` field apply the transaction.

If the application ``App1`` fails during transaction execution, you can
use the [recovery procedures](#phase-commits-recovery), but
applications should ensure that they "own" the transaction before
applying the transaction. For example to find and resume the pending
job, use a query that resembles the following:

```javascript

var dateThreshold = new Date();
dateThreshold.setMinutes(dateThreshold.getMinutes() - 30);

db.transactions.find(
   {
     application: "App1",
     state: "pending",
     lastModified: { $lt: dateThreshold }
   }
)

```


## Using Two-Phase Commits in Production Applications

The example transaction above is intentionally simple. For example, it
assumes that it is always possible to roll back operations to an
account and that account balances can hold negative values.

Production implementations would likely be more complex. Typically,
accounts need information about current balance, pending credits, and
pending debits.

For all transactions, ensure that you use the appropriate level of
[write concern](#) for your deployment.
