.. _atlas-api-remoteMcpConfigurations:

=================================
atlas api remoteMcpConfigurations
=================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns and manages Remote MCP configurations for organizations and projects.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.



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
     - help for remoteMcpConfigurations

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

* :ref:`atlas-api-remoteMcpConfigurations-createGroupMcpConfig` - Creates an MCP configuration for the specified project.
* :ref:`atlas-api-remoteMcpConfigurations-createGroupMcpSecret` - Creates a new secret on the ingress service account of the specified project-level MCP configuration.
* :ref:`atlas-api-remoteMcpConfigurations-createOrgMcpConfig` - Creates an MCP configuration for the specified organization.
* :ref:`atlas-api-remoteMcpConfigurations-createOrgMcpSecret` - Creates a new secret on the ingress service account of the specified organization-level MCP configuration.
* :ref:`atlas-api-remoteMcpConfigurations-deleteGroupMcpConfig` - Deletes the MCP configuration with the specified ID for the specified project.
* :ref:`atlas-api-remoteMcpConfigurations-deleteGroupMcpSecret` - Deletes the specified secret from the ingress service account of the specified project-level MCP configuration.
* :ref:`atlas-api-remoteMcpConfigurations-deleteOrgMcpConfig` - Deletes the MCP configuration with the specified ID for the specified organization.
* :ref:`atlas-api-remoteMcpConfigurations-deleteOrgMcpSecret` - Deletes the specified secret from the ingress service account of the specified organization-level MCP configuration.
* :ref:`atlas-api-remoteMcpConfigurations-getGroupMcpConfig` - Returns the MCP configuration with the specified ID for the specified project.
* :ref:`atlas-api-remoteMcpConfigurations-getGroupMcpSecret` - Returns metadata for the specified secret on the ingress service account of a project-level MCP configuration.
* :ref:`atlas-api-remoteMcpConfigurations-getOrgMcpConfig` - Returns the MCP configuration with the specified ID for the specified organization.
* :ref:`atlas-api-remoteMcpConfigurations-getOrgMcpSecret` - Returns metadata for the specified secret on the ingress service account of an organization-level MCP configuration.
* :ref:`atlas-api-remoteMcpConfigurations-listGroupMcpConfigs` - Returns all MCP configurations associated with the specified project.
* :ref:`atlas-api-remoteMcpConfigurations-listGroupMcpSecrets` - Returns metadata for all secrets on the ingress service account of the specified project-level MCP configuration.
* :ref:`atlas-api-remoteMcpConfigurations-listOrgMcpConfigs` - Returns all MCP configurations associated with the specified organization.
* :ref:`atlas-api-remoteMcpConfigurations-listOrgMcpSecrets` - Returns metadata for all secrets on the ingress service account of the specified organization-level MCP configuration.
* :ref:`atlas-api-remoteMcpConfigurations-updateGroupMcpConfig` - Updates the specified MCP configuration for the project.
* :ref:`atlas-api-remoteMcpConfigurations-updateOrgMcpConfig` - Updates the specified MCP configuration for the organization.


.. toctree::
   :titlesonly:

   createGroupMcpConfig </command/atlas-api-remoteMcpConfigurations-createGroupMcpConfig>
   createGroupMcpSecret </command/atlas-api-remoteMcpConfigurations-createGroupMcpSecret>
   createOrgMcpConfig </command/atlas-api-remoteMcpConfigurations-createOrgMcpConfig>
   createOrgMcpSecret </command/atlas-api-remoteMcpConfigurations-createOrgMcpSecret>
   deleteGroupMcpConfig </command/atlas-api-remoteMcpConfigurations-deleteGroupMcpConfig>
   deleteGroupMcpSecret </command/atlas-api-remoteMcpConfigurations-deleteGroupMcpSecret>
   deleteOrgMcpConfig </command/atlas-api-remoteMcpConfigurations-deleteOrgMcpConfig>
   deleteOrgMcpSecret </command/atlas-api-remoteMcpConfigurations-deleteOrgMcpSecret>
   getGroupMcpConfig </command/atlas-api-remoteMcpConfigurations-getGroupMcpConfig>
   getGroupMcpSecret </command/atlas-api-remoteMcpConfigurations-getGroupMcpSecret>
   getOrgMcpConfig </command/atlas-api-remoteMcpConfigurations-getOrgMcpConfig>
   getOrgMcpSecret </command/atlas-api-remoteMcpConfigurations-getOrgMcpSecret>
   listGroupMcpConfigs </command/atlas-api-remoteMcpConfigurations-listGroupMcpConfigs>
   listGroupMcpSecrets </command/atlas-api-remoteMcpConfigurations-listGroupMcpSecrets>
   listOrgMcpConfigs </command/atlas-api-remoteMcpConfigurations-listOrgMcpConfigs>
   listOrgMcpSecrets </command/atlas-api-remoteMcpConfigurations-listOrgMcpSecrets>
   updateGroupMcpConfig </command/atlas-api-remoteMcpConfigurations-updateGroupMcpConfig>
   updateOrgMcpConfig </command/atlas-api-remoteMcpConfigurations-updateOrgMcpConfig>
