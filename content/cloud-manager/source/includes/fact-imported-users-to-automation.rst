Adding a MongoDB deployment to automation may affect the security
settings of the |mms| project and the MongoDB deployment.

- **Automation enables the Project Security Setting**. If the
  MongoDB deployment requires authentication but the |mms| project doesn't
  have authentication settings enabled, when you add the MongoDB deployment
  to automation, |mms| updates the project's security settings to the security
  settings of the newly imported deployment.
  
  The import process only updates the |mms| project's security setting
  if the project's security setting is currently disabled. The import
  process doesn't disable the project's security setting or change its
  enabled authentication mechanism.

- **Automation Imports MongoDB Users and Roles**. The following statements
  apply to situations where a MongoDB deployment requires authentication
  or the |mms| project has authentication settings enabled.

  If the MongoDB deployment contains users or user-defined roles, you can
  choose to import these users and roles for |mms| to manage. The imported
  users and roles are :guilabel:`Synced` to all managed deployments in
  the |mms| project.

  - If you set the project's :guilabel:`Enforce Consistent Set` value to ``Yes``,
    |mms| deletes from the MongoDB deployments those users and roles
    that are *not* imported.

  - If you set the project's :guilabel:`Enforce Consistent Set` value to ``No``,
    |mms| stops managing non-imported users and roles in the project. These
    users and roles remain in the MongoDB deployment. To manage these
    users and roles, you must connect directly to the MongoDB deployment.

  If you don't want the |mms| project to manage specific users and roles,
  use the :guilabel:`Authentication & Users` and
  :guilabel:`Authentication & Roles` pages to remove these users and roles
  during import before you confirm and deploy the changes. To learn more,
  see :ref:`manage-unmanage-mongodb-users`.

  If the imported MongoDB deployment already has ``mms-backup-agent`` and
  ``mms-monitoring-agent`` users in its ``admin`` database, the import
  process overrides these users' roles with the roles for ``mms-backup-agent``
  and ``mms-monitoring-agent`` users as set in the |mms| project.

- **Automation Applies to All Deployments in the Project**.
  The project's updated security settings, including all users and roles
  managed by the |mms| project, apply to *all* deployments in the project,
  including the imported MongoDB deployment.

  |mms| restarts all deployments in the project with the new setting,
  including the imported MongoDB deployment. After import, all deployments
  in the project use the |mms| automation keyfile upon restart.

  The deployment that you import must use the same keyfile as the existing
  processes in the destination project or the import process may not
  proceed. To learn more, see :ref:`Authentication Credentials on Source
  and Destination Clusters <auth-creds-on-source-and-destination>`.

  If the existing deployments in the project require a different security
  profile from the imported process, create a new project into which you
  can import the source MongoDB deployment.

Examples of Imported Users
``````````````````````````

The following examples apply to situations where the MongoDB deployment
requires authentication or the |mms| project has authentication settings enabled.

If you import the MongoDB users and custom roles, once the |mms| project
begins to manage the MongoDB deployment, the following happens, regardless
of the :guilabel:`Enforce Consistent Set` value:

- The |mms| project enables authentication, manages imported users and roles,
  and syncs the new users and roles to all its managed deployments.
- The MongoDB deployment's access control is enabled and requires
  authentication. The MongoDB deployment has all users and roles that
  the |mms| project manages. These users and roles have ``Synced`` set to
  ``Yes``.

If you don't import the MongoDB users and custom roles, once the |mms|
project begins to manage the MongoDB deployment, the following happens:

If :guilabel:`Enforce Consistent Set` is set to ``Yes``:

- The |mms| project enables authentication and doesn't change its managed
  users and roles.
- The MongoDB deployment's access control is enabled and requires authentication.
- |mms| deletes the non-imported MongoDB users and roles from the deployment.
- The MongoDB deployment has all users and roles that the |mms| project
  manages. These users and roles have ``Synced`` set to ``Yes``.

If :guilabel:`Enforce Consistent Set` is set to ``No``:

- The |mms| project enables authentication and doesn't change its security
  settings, including users and roles.
- The MongoDB deployment's access control is enabled and requires authentication.
- The non-imported MongoDB users and roles remain in the MongoDB deployment.
- The MongoDB deployment has all users and roles managed by the |mms| project.
  These users and roles have ``Synced`` set to ``Yes``.
