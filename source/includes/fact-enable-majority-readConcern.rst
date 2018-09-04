To use :term:`read concern` level of :readconcern:`"majority"`, replica
sets must use :ref:`WiredTiger storage engine <storage-wiredtiger>` and
election :rsconf:`protocol version 1 <protocolVersion>`.

For MongoDB 3.6.1 - 3.6.x, you can disable read concern
:readconcern:`"majority"`. For more information, see
:ref:`3.6-disable-read-concern-majority`.
