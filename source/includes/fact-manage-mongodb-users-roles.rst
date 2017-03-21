Managed Users and Roles
~~~~~~~~~~~~~~~~~~~~~~~

Any users or roles you choose to manage in an |mms| group have their
:guilabel:`Synced` value set to ``Yes`` and are synced to all deployments in
the group.

Any users or roles you do not choose to manage in an |mms| group have their
:guilabel:`Synced` value set to ``No`` and exist only in their respective
MongoDB deployments.

.. note::
   If you toggle :guilabel:`Synced` to ``OFF`` after import, any users or
   roles you create are deleted.

Consistent Users and Roles
~~~~~~~~~~~~~~~~~~~~~~~~~~

|mms| has two modes of user and role management that depend upon the value of
:guilabel:`Enforce Consistent Set`:

:guilabel:`Enforce Consistent Set` is ``YES``
     In this mode, all deployments that the |mms| group manages have the same set
     of MongoDB users and roles; specifically, all users and roles that the |mms|
     group manages.

     Only the MongoDB users and roles that the |mms| group manages, that is
     :guilabel:`Synced` value set to ``Yes``, can exist in the group's managed
     deployments. Any users and roles that the |mms| group does not manage group
     are deleted from these deployments.

:guilabel:`Enforce Consistent Set` is ``NO``
     In this mode, deployments that the |mms| group manages can have different sets
     of MongoDB users and roles, including MongoDB users and roles not managed
     through the |mms| group. To manage these users and roles, you must connect
     directly to the MongoDB deployment.

     Users and roles that the |mms| group manages, where :guilabel:`Synced` value
     set to ``Yes``, are created in all deployments the |mms| group manages. Users
     and roles that the |mms| group does not manage, where :guilabel:`Synced` value
     set to ``No``, exist only in the specific deployment.

     .. note::
        :guilabel:`Enforce Consistent Set` set to ``NO`` is the default setting.
  
To learn how importing MongoDB deployments can affect managing users
and roles, see :ref:`automation-updated-security-settings`.