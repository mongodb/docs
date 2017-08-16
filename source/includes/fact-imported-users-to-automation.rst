¬Adding a MongoDB deployment to automation may affect the security
settings of the |mms| project or the MongoDB deployment or both.

Enables |mms| Project Security Setting
``````````````````````````````````````

If the MongoDB deployment requires authentication but the |mms| project
does not have authentication settings enabled, upon successful addition
of the MongoDB deployment to automation, the project's security settings
will have the security settings of the newly imported deployment.

.. note::

   The import process only enables the |mms| project's security setting
   if the project's security setting is currently not enabled. If the
   project's security setting is currently enabled, the import process
   does not disable the project's security setting or change its enabled
   authentication mechanism.

Imports MongoDB Users and Roles
```````````````````````````````
.. note::

   The following applies for situations where at least either the
   MongoDB deployment requires authentication or the |mms| project has
   authentication settings enabled.

If the MongoDB deployment contains users or user-defined roles, you can
choose to import these users and roles for |mms| to manage. The
imported users and roles are :guilabel:`Synced` to all managed
deployments in the |mms| project.

If the ``Enforce Consistent Set`` value for the |mms| project is ``YES``,
users and roles *not* imported are deleted from the MongoDB deployment.

If the ``Enforce Consistent Set`` value for the |mms| project is ``No``,
non-imported users and roles are not managed by |mms| project but remain
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
|mms| project.

Applies to All Deployments in |mms| Project
```````````````````````````````````````````

The project's updated security settings, including all users and roles
managed as part of the |mms| project, apply to *all* deployments in the
project, including the imported MongoDB deployment.

|mms| restarts all deployments in the project with the new setting,
including the imported MongoDB deployment. All deployments in the project
will use the |mms| automation keyfile upon restart.

If the existing deployment or deployments in the project require a
different security profile from the imported process, create a new
project into which you can import the MongoDB deployment.

Examples of Imported Users
``````````````````````````

.. note::

   The following applies for situations where at least either the
   MongoDB deployment requires authentication or the |mms| project has
   authentication settings enabled.

If you choose to import the MongoDB users and custom roles, once |mms|
project manages the MongoDB deployment, regardless of the value of ``Enforce
Consistent Set``:

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - ``Enforce Consistent Set``
     - Results

   * - ``Yes`` or ``No``
     - |mms| project:
         - Authentication is enabled.
         - Manages the imported users and roles.
         - Syncs the new users and roles to all its managed deployments.

       The MongoDB deployment:
         - Has access control enabled and requires authentication.
         - All users and roles that the |mms| project manages (i.e. has
           ``Synced`` set to ``Yes`` ) exist in the MongoDB deployment.

If you choose not to import the users, once |mms| project manages the
MongoDB deployment:

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - ``Enforce Consistent Set``
     - Results

   * - ``Yes``
     - |mms| project:
         - Authentication is enabled.
         - Has no changes to its managed users and roles.

       The MongoDB deployment:
         - Has access control enabled and requires authentication.

         - The non-imported MongoDB users and roles will be deleted
           from the MongoDB deployment.

         - All users and roles that the |mms| project manages (i.e. has
           ``Synced`` set to ``Yes`` ) exist in the MongoDB deployment.

   * - ``No``

     - |mms| project:
         - Authentication is enabled.
         - Has no changes to its security settings, including users and roles.

       The MongoDB deployment:
         - Has access control enabled and requires authentication.

         - The non-imported MongoDB users and roles remain in the
           MongoDB deployment.

         - All users and roles managed by the |mms| project (i.e. has
           ``Synced`` set to ``Yes`` ) exist in the MongoDB deployment.
