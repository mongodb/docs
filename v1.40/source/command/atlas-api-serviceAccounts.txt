.. _atlas-api-serviceAccounts:

=========================
atlas api serviceAccounts
=========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Endpoints for managing Service Accounts and secrets.

Service Accounts are used for programmatic access to the Atlas Admin API through the OAuth 2.0 Client Credentials flow. This feature is available as a Preview feature.

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - -h, --help
     - 
     - false
     - help for serviceAccounts

Inherited Options
-----------------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - -P, --profile
     - string
     - false
     - Name of the profile to use from your configuration file. To learn about profiles for the Atlas CLI, see https://dochub.mongodb.org/core/atlas-cli-save-connection-settings.

Related Commands
----------------

* :ref:`atlas-api-serviceAccounts-addProjectServiceAccount` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Assigns the specified Service Account to the specified Project.
* :ref:`atlas-api-serviceAccounts-createProjectServiceAccount` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates one Service Account for the specified Project.
* :ref:`atlas-api-serviceAccounts-createProjectServiceAccountAccessList` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Add Access List Entries for the specified Service Account for the project.
* :ref:`atlas-api-serviceAccounts-createProjectServiceAccountSecret` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Create a secret for the specified Service Account in the specified Project.
* :ref:`atlas-api-serviceAccounts-createServiceAccount` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates one Service Account for the specified Organization.
* :ref:`atlas-api-serviceAccounts-createServiceAccountAccessList` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Add Access List Entries for the specified Service Account for the organization.
* :ref:`atlas-api-serviceAccounts-createServiceAccountSecret` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Create a secret for the specified Service Account.
* :ref:`atlas-api-serviceAccounts-deleteProjectServiceAccount` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes the specified Service Account from the specified project.
* :ref:`atlas-api-serviceAccounts-deleteProjectServiceAccountAccessListEntry` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes the specified access list entry from the specified Service Account for the project.
* :ref:`atlas-api-serviceAccounts-deleteProjectServiceAccountSecret` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Deletes the specified Service Account secret.
* :ref:`atlas-api-serviceAccounts-deleteServiceAccount` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Deletes the specified Service Account.
* :ref:`atlas-api-serviceAccounts-deleteServiceAccountAccessListEntry` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes the specified access list entry from the specified Service Account for the organization.
* :ref:`atlas-api-serviceAccounts-deleteServiceAccountSecret` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Deletes the specified Service Account secret.
* :ref:`atlas-api-serviceAccounts-getProjectServiceAccount` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one Service Account in the specified Project.
* :ref:`atlas-api-serviceAccounts-getServiceAccount` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the specified Service Account.
* :ref:`atlas-api-serviceAccounts-listProjectServiceAccountAccessList` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all access list entries that you configured for the specified Service Account for the project.
* :ref:`atlas-api-serviceAccounts-listProjectServiceAccounts` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all Service Accounts for the specified Project.
* :ref:`atlas-api-serviceAccounts-listServiceAccountAccessList` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all access list entries that you configured for the specified Service Account for the organization.
* :ref:`atlas-api-serviceAccounts-listServiceAccountProjects` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns a list of all projects the specified Service Account is a part of.
* :ref:`atlas-api-serviceAccounts-listServiceAccounts` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all Service Accounts for the specified Organization.
* :ref:`atlas-api-serviceAccounts-updateProjectServiceAccount` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates one Service Account in the specified Project.
* :ref:`atlas-api-serviceAccounts-updateServiceAccount` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates the specified Service Account in the specified Organization.


.. toctree::
   :titlesonly:

   addProjectServiceAccount </command/atlas-api-serviceAccounts-addProjectServiceAccount>
   createProjectServiceAccount </command/atlas-api-serviceAccounts-createProjectServiceAccount>
   createProjectServiceAccountAccessList </command/atlas-api-serviceAccounts-createProjectServiceAccountAccessList>
   createProjectServiceAccountSecret </command/atlas-api-serviceAccounts-createProjectServiceAccountSecret>
   createServiceAccount </command/atlas-api-serviceAccounts-createServiceAccount>
   createServiceAccountAccessList </command/atlas-api-serviceAccounts-createServiceAccountAccessList>
   createServiceAccountSecret </command/atlas-api-serviceAccounts-createServiceAccountSecret>
   deleteProjectServiceAccount </command/atlas-api-serviceAccounts-deleteProjectServiceAccount>
   deleteProjectServiceAccountAccessListEntry </command/atlas-api-serviceAccounts-deleteProjectServiceAccountAccessListEntry>
   deleteProjectServiceAccountSecret </command/atlas-api-serviceAccounts-deleteProjectServiceAccountSecret>
   deleteServiceAccount </command/atlas-api-serviceAccounts-deleteServiceAccount>
   deleteServiceAccountAccessListEntry </command/atlas-api-serviceAccounts-deleteServiceAccountAccessListEntry>
   deleteServiceAccountSecret </command/atlas-api-serviceAccounts-deleteServiceAccountSecret>
   getProjectServiceAccount </command/atlas-api-serviceAccounts-getProjectServiceAccount>
   getServiceAccount </command/atlas-api-serviceAccounts-getServiceAccount>
   listProjectServiceAccountAccessList </command/atlas-api-serviceAccounts-listProjectServiceAccountAccessList>
   listProjectServiceAccounts </command/atlas-api-serviceAccounts-listProjectServiceAccounts>
   listServiceAccountAccessList </command/atlas-api-serviceAccounts-listServiceAccountAccessList>
   listServiceAccountProjects </command/atlas-api-serviceAccounts-listServiceAccountProjects>
   listServiceAccounts </command/atlas-api-serviceAccounts-listServiceAccounts>
   updateProjectServiceAccount </command/atlas-api-serviceAccounts-updateProjectServiceAccount>
   updateServiceAccount </command/atlas-api-serviceAccounts-updateServiceAccount>

