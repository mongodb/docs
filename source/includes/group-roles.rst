.. _read-only-role:

Read Only
~~~~~~~~~

The **Read Only** role has the lowest level of privileges. The user can
generally see everything in a group, including all monitoring, backup, and
automation data, all activity, and all users and user roles. The
user, however, cannot modify or delete anything.

.. _user-admin-role:

User Admin
~~~~~~~~~~

The **User Admin** role grants access to do the following:

- Add an existing user to a group.

- Invite a new user to a group.

- Remove an existing group invitation.

- Remove a user's request to join a group, which denies the user access to
  the group.

- Remove a user from a group.

- Modify a user's roles within a group.

- Update the billing email address.

.. _monitoring-admin-role:

Monitoring Admin
~~~~~~~~~~~~~~~~

The **Monitoring Admin** role grants all the privileges of the
**Read Only** role and grants additional access to do the following:

- Manage alerts (create, modify, delete, enable/disable,
  acknowledge/unacknowledge).

- Manage hosts (add, edit, delete, enable deactivated).

- Manage dashboards (create, edit, delete).

- Manage group-wide settings.

- Download monitoring agent.

.. _backup-admin-role:

Backup Admin
~~~~~~~~~~~~

The **Backup Admin** role grants all the privileges of the **Read Only**
role and grants access to manage :doc:`backups </backup>`, including the
following:

- Start, stop, and terminate backups.

- Request restores.

- View and edit excluded namespaces.

- View and edit host passwords.

- Modify backup settings.

- Generate SSH keys.

- Download the Backup Agent.

.. todo: above. What is the blacklist?

.. _automation-admin-role:

Automation Admin
~~~~~~~~~~~~~~~~

The **Automation Admin** role grants all the privileges of the
**Read Only** role and grants access to manage :doc:`automation </automation>`,
including the following:

- View deployments.

- Provision machines.

- Edit configuration files.

- Modify settings.

- Download the Automation Agent.

.. _group-owner-role:

Group Owner
~~~~~~~~~~~

The **Group Owner** role has the privileges of all the other roles
combined, as well as additional privileges available only to the owner. In
addition to the privileges of other roles, a Group Owner can:

- Set up the :doc:`Backup </backup>` service.

- Update billing information.

- Enable the public API.
