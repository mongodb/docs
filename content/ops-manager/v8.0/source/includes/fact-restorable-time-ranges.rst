When you request a point-in-time restore, the restore dialog shows
the :guilabel:`restorable time ranges` for the selected deployment.
These ranges represent the periods for which |mms| has a complete
and continuous oplog history. You can only choose a restore time
that falls within one of these ranges.

Oplog gaps can occur in the following situations:

- The oplog tailing stops because of an issue with a backup job
  tailing the oplog, and the oplog rolls over before {+mdbagent+}
  tails it again.

- A topology change occurs, until |mms| completes a new snapshot.

- A |fcv| change occurs, until |mms| completes a new snapshot. You
  cannot apply a point-in-time restore across MongoDB version
  changes.

- A restore completes, until |mms| completes a new snapshot.

If the restore time you need is not available in the dialog,
investigate recent topology or |fcv| changes and review backup job
history to understand why that period is not restorable.

For example, the restore dialog might show these restorable time
ranges:

- ``June 8th 13:45:03`` to ``June 8th 17:45:03``
- ``June 8th 19:45:03`` to ``June 9th 07:45:03``

In this case, you cannot restore to any time between
``June 8th 17:45:03`` and ``June 8th 19:45:03`` because an oplog gap
exists for that period.
