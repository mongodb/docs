You can choose to restore to a cluster of a different project in the
same or different organization.

To restore to another |mms| project, you must have
:ref:`Project Owner <project-roles>`,
:ref:`Automation Admin <automation-admin-role>`, or
:ref:`Backup Admin <backup-admin-role>` roles for the target project.

.. note::

   If the source cluster uses :ref:`encryption at rest <encrypt-snapshots>`
   with a KMIP server, configure the target cluster to use the same KMIP
   server. If the KMIP server is unavailable on the target cluster, MongoDB fails
   to start after the restore.