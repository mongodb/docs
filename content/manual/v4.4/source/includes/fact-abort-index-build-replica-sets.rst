For replica sets or shard replica sets, aborting an index on the primary
does not simultaneously abort secondary index builds. MongoDB attempts
to abort the in-progress builds for the specified indexes on the
:term:`primary` and if successful creates an associated ``abort``
:term:`oplog` entry. :term:`Secondary <secondary>` members with
replicated in-progress builds wait for a commit or abort oplog entry
from the primary before either committing or aborting the index build.
