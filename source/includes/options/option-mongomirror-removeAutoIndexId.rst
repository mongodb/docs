.. option:: --removeAutoIndexId

   *New in version 0.12.0*

   Removes the ``autoIndexId`` option from collections during the
   initial sync to the target cluster. Also removes the ``autoIndexId``
   option from any collections that ``mongomirror`` creates during the
   migration.

   Use the :option:`--removeAutoIndexId` option when migrating
   collections that were created with ``autoIndexId: false`` from 
   MongoDB 3.6 or earlier to |service|.
