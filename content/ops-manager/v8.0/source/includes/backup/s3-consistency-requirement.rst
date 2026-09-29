Requires Strong Read-After-Write Consistency
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

|mms| requires that the |s3| or |s3|\-compatible object store you use
for backup provide strong read-after-write consistency. After |mms|
writes an object to the store, a read of that object must return the
most recently written data. Stores that provide only eventual
consistency can return stale data and cause backup operations to
fail.

When you create or update an |s3| store configuration, |mms|
validates the store's consistency model. If the store doesn't return
the expected data immediately after a write, validation fails and
|mms| doesn't save the configuration.

|aws| |s3| provides strong read-after-write consistency by default.
If you use an |s3|\-compatible store from another vendor, consult the
vendor's documentation to confirm that the store provides strong
read-after-write consistency for both new objects and overwrites of
existing objects. Some stores guarantee consistency only for new
objects and remain eventually consistent for overwrites, which can
cause intermittent validation failures.
