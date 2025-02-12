.. _atlas-api-cloudProviderAccess:

=============================
atlas api cloudProviderAccess
=============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, authorizes, and removes AWS IAM roles in Atlas.

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
     - help for cloudProviderAccess

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

* :ref:`atlas-api-cloudProviderAccess-authorizeCloudProviderAccessRole` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Grants access to the specified project for the specified access role.
* :ref:`atlas-api-cloudProviderAccess-createCloudProviderAccessRole` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates one access role for the specified cloud provider.
* :ref:`atlas-api-cloudProviderAccess-deauthorizeCloudProviderAccessRole` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Revokes access to the specified project for the specified access role.
* :ref:`atlas-api-cloudProviderAccess-getCloudProviderAccessRole` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the access role with the specified id and with access to the specified project.
* :ref:`atlas-api-cloudProviderAccess-listCloudProviderAccessRoles` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all cloud provider access roles with access to the specified project.


.. toctree::
   :titlesonly:

   authorizeCloudProviderAccessRole </command/atlas-api-cloudProviderAccess-authorizeCloudProviderAccessRole>
   createCloudProviderAccessRole </command/atlas-api-cloudProviderAccess-createCloudProviderAccessRole>
   deauthorizeCloudProviderAccessRole </command/atlas-api-cloudProviderAccess-deauthorizeCloudProviderAccessRole>
   getCloudProviderAccessRole </command/atlas-api-cloudProviderAccess-getCloudProviderAccessRole>
   listCloudProviderAccessRoles </command/atlas-api-cloudProviderAccess-listCloudProviderAccessRoles>

