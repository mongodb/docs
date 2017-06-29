.. only:: onprem

   .. _global-roles:

   Global Roles
   ++++++++++++

   Global roles have all the same privileges as the equivalent Group
   roles, except that they have these privileges for all groups. They also
   have some additional privileges as noted below.

   .. _global-read-only-role:

   Global Read Only
   ~~~~~~~~~~~~~~~~

   The **Global Read Only** role grants :ref:`read only <read-only-role>`
   access to all groups. The role additionally grants access to do the
   following:

   - View :doc:`backups </tutorial/nav/backup-use>` and other statistics through the
     :guilabel:`admin` UI.

   - Global user search.

   .. _global-user-admin-role:

   Global User Admin
   ~~~~~~~~~~~~~~~~~

   The **Global User Admin** role grants :ref:`user admin <user-admin-role>`
   access to all groups. The role additionally grants access to do the
   following:

   - Add new groups.

   - Manage UI messages.

   - Send test emails, SMS messages, and voice calls.

   - Edit user accounts.

   - Manage LDAP group mappings.

   .. _global-monitoring-admin-role:

   Global Monitoring Admin
   ~~~~~~~~~~~~~~~~~~~~~~~

   The **Global Monitoring Admin** role grants :ref:`monitoring admin
   <monitoring-admin-role>` access to all groups. The role additionally
   grants access to do the following:

   - View system statistics through the :guilabel:`admin` UI.

   .. _global-backup-admin-role:

   Global Backup Admin
   ~~~~~~~~~~~~~~~~~~~

   The **Global Backup Admin** role grants :ref:`backup admin
   <backup-admin-role>` access to all groups. The role additionally grants
   access to do the following:

   - View system statistics through the :guilabel:`admin` UI.

   - Manage blockstore, daemon, and oplog store configurations.

   - Move jobs between daemons.

   - Approve backups in awaiting provisioning state.

   .. _global-automation-admin-role:

   Global Automation Admin
   ~~~~~~~~~~~~~~~~~~~~~~~

   The **Global Automation Admin** role grants :ref:`automation admin
   <automation-admin-role>` access to all groups. The role additionally grants
   access to view system statistics through the :guilabel:`admin` UI.

   .. _global-owner-role:

   Global Owner
   ~~~~~~~~~~~~

   The **Global Owner** role for |a-mms| account has the privileges of all
   the other roles combined.

