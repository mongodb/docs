In version 3.6, the :option:`--nojournal <mongod --nojournal>` option is deprecated for
:doc:`replica set members </core/replica-set-members/>`
using the :doc:`WiredTiger storage engine </core/wiredtiger/>`.

:doc:`Replica set members </core/replica-set-members/>` which use the
WiredTiger :doc:`storage engine </core/storage-engines/>` should not
use the :option:`--nojournal <mongod --nojournal>` option. For more information about
journaling, see :doc:`/tutorial/manage-journaling`.
