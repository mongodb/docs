Adding a MongoDB deployment to automation may affect the security
settings of the |mms| group or the MongoDB deployment or both.

Enables |mms| Group Security Setting
````````````````````````````````````

If the MongoDB deployment requires authentication but the |mms| group
does not have authentication settings enabled, upon successful addition
of the MongoDB deployment to automation, the group's security settings
will have the security settings of the newly imported deployment.

.. note::

   The import process only enables the |mms| group's security setting
   if the group's security setting is currently not enabled. If the
   group's security setting is currently enabled, the import process
   does not disable the group's security setting or change its enabled
   authentication mechanism.

Imports MongoDB Users and Roles
```````````````````````````````
.. note::

   The following applies for situations where at least either the
   MongoDB deployment requires authentication or the |mms| group has
   authentication settings enabled.

If the MongoDB deployment contains users or user-defined roles, you can
choose to import these users and roles for |mms| to manage. The
imported users and roles are :guilabel:`Synced` to all managed
deployments in the |mms| group.

If the ``Enforce Consistent Set`` value for the |mms| group is ``YES``,
users and roles *not* imported are deleted from the MongoDB deployment.

If the ``Enforce Consistent Set`` value for the |mms| group is ``No``,
non-imported users and roles are not managed by |mms| group but remain
in the MongoDB deployment. To manage these users and roles, you must
connect directly to the MongoDB deployment.

If importing users and roles, before you confirm and deploy the
changes, you can, from the :guilabel:`Authentication & Users` and
:guilabel:`Authentication & Roles` screens, remove specific users and
roles from being imported by unmanaging these users. For details on
unmanaging MongoDB users, see :ref:`manage-unmanage-mongodb-users`.

If the imported MongoDB deployment already has ``mms-backup-agent`` and
``mms-monitoring-agent`` users in its ``admin`` database, the import
procedure overrides the roles of these users with the roles for
``mms-backup-agent`` and ``mms-monitoring-agent`` users as set in the
|mms| group.

Applies to All Deployments in |mms| Group
`````````````````````````````````````````

The group's updated security settings, including all users and roles
managed as part of the |mms| group, apply to *all* deployments in the
group, including the imported MongoDB deployment.

|mms| restarts all deployments in the group with the new setting,
including the imported MongoDB deployment. All deployments in the group
will use the |mms| automation keyfile upon restart.

If the existing deployment or deployments in the group require a
different security profile from the imported process, create a new
group into which you can import the MongoDB deployment.

Examples of Imported Users
``````````````````````````

.. note::

   The following applies for situations where at least either the
   MongoDB deployment requires authentication or the |mms| group has
   authentication settings enabled.

If you choose to import the MongoDB users and custom roles, once |mms|
group manages the MongoDB deployment, regardless of the value of ``Enforce
Consistent Set``:

.. list-table::
   :header-rows: 1
   :widths: 20 80
   
   * - ``Enforce Consistent Set``
     - Results
     
   * - ``Yes`` or ``No``
     - |mms| group:
         - Authentication is enabled.
         - Manages the imported users and roles.
         - Syncs the new users and roles to all its managed deployments.

       The MongoDB deployment:
         - Has access control enabled and requires authentication.
         - All users and roles that the |mms| group manages (i.e. has
           ``Synced`` set to ``Yes`` ) exist in the MongoDB deployment.

If you choose not to import the users, once |mms| group manages the
MongoDB deployment:

.. list-table::
   :header-rows: 1
   :widths: 20 80
   
   * - ``Enforce Consistent Set``
     - Results
     
   * - ``Yes``
     - |mms| group:
         - Authentication is enabled.
         - Has no changes to its managed users and roles.

       The MongoDB deployment:
         - Has access control enabled and requires authentication.

         - The non-imported MongoDB users and roles will be deleted
           from the MongoDB deployment.

         - All users and roles that the |mms| group manages (i.e. has
           ``Synced`` set to ``Yes`` ) exist in the MongoDB deployment.

   * - ``No``

     - |mms| group:
         - Authentication is enabled.
         - Has no changes to its security settings, including users and roles.

       The MongoDB deployment:
         - Has access control enabled and requires authentication.

         - The non-imported MongoDB users and roles remain in the
           MongoDB deployment.

         - All users and roles managed by the |mms| group (i.e. has
           ``Synced`` set to ``Yes`` ) exist in the MongoDB deployment.
