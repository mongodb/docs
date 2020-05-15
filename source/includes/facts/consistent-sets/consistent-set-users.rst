Managed Users and Roles
~~~~~~~~~~~~~~~~~~~~~~~

Any users or roles you choose to manage in an |mms| project have their
:guilabel:`Synced` value set to ``Yes`` and are synced to all
deployments in the project.

Any users or roles you do not choose to manage in an |mms| project have
their :guilabel:`Synced` value set to ``No`` and exist only in their
respective MongoDB deployments.

.. note::
   If you toggle :guilabel:`Synced` to ``OFF`` after import, any users
   or roles you create are deleted.

.. _enforce-consistent-set-users:

Consistent Users and Roles
~~~~~~~~~~~~~~~~~~~~~~~~~~

If you enforce a consistent set of users and roles in your project,
|mms| synchronizes these users and roles across all deployments in that
project. Toggle :guilabel:`Enforce Consistent Set` to choose whether or
not to manage one set of users and roles:

.. _enforce-consistent-set-users-yes:

:guilabel:`Enforce Consistent Set` is ``YES``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In a managed project, |mms| grants all of the users and roles access to
all deployments. All deployments that the |mms| project manages have
the same set of MongoDB users and roles.

|mms| limits the access to users and roles where you set
:guilabel:`Synced` to ``Yes``. |mms| deletes all users and roles that |mms| project doesn't manage from the deployments in your project.

.. _enforce-consistent-set-users-no:

:guilabel:`Enforce Consistent Set` is ``NO``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In a managed project, |mms| allows each deployment to use its own set of MongoDB users and roles. |mms| doesn't need to manage these MongoDB users and roles. To manage these
users and roles, you must connect direct to the MongoDB
deployment.

|mms| grants managed MongoDB users and roles where you set
:guilabel:`Synced` to ``Yes`` access to all managed deployments.

|mms| limits access of unmanaged MongoDB users and roles, where you set
:guilabel:`Synced` to ``No``, to those users' and roles' specific
deployments.

.. note::

   :guilabel:`Enforce Consistent Set` defaults to ``NO``.

To learn how importing MongoDB deployments can affect managing users
and roles, see :ref:`automation-updated-security-settings`.
