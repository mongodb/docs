To run :binary:`~bin.mongodump` against a MongoDB deployment that has
:doc:`access control </core/authorization>` enabled, you must have
privileges that grant :authaction:`find` action for each database to
back up. The built-in :authrole:`backup` role provides the required
privileges to perform backup of any and all databases.

.. include:: /includes/fact-required-access-for-backup-profiling.rst
