AutoReconnect
~~~~~~~~~~~~~

An ``AutoReconnect`` exception indicates that a
:manual:`failover <reference/glossary/#std-term-failover>` has occurred. This means that
{+driver-short+} has lost its connection to the original primary member
of the replica set, and its last operation might have failed.

When this error occurs, {+driver-short+} automatically tries to find the new primary member
for subsequent operations. To handle the error, your application must take one of the
following actions:

- Retry the operation that might have failed
- Continue running, with the understanding that the operation might have failed

.. important::
    
   {+driver-short+} raises an ``AutoReconnect`` error on all operations until the
   replica set elects a new primary member.