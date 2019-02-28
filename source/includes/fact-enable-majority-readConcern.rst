To use :term:`read concern` level of :readconcern:`"majority"`, replica
sets must use :ref:`WiredTiger storage engine <storage-wiredtiger>`.

You can disable read concern :readconcern:`"majority"` for a deployment
with a three-member primary-secondary-arbiter (PSA) architecture. For
more information, see :ref:`disable-read-concern-majority`.
