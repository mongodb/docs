.. _atlas-api-ldapConfiguration:

===========================
atlas api ldapConfiguration
===========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns, edits, verifies, and removes LDAP configurations.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

An LDAP configuration defines settings for MongoDB Cloud to connect to your LDAP server over TLS for user authentication and authorization. Your LDAP server must be visible to the internet or connected to your MongoDB Cloud cluster with VPC Peering. Also, your LDAP server must use TLS. You must have the MongoDB Cloud admin user privilege to use these endpoints. Also, to configure user authentication and authorization with LDAPS, your cluster must run MongoDB 3.6 or higher. Groups for which you have configured LDAPS can't create a cluster using a version of MongoDB 3.6 or lower.

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
     - help for ldapConfiguration

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

* :ref:`atlas-api-ldapConfiguration-deleteLdapUserMapping` - Removes the current LDAP Distinguished Name mapping captured in the userToDNMapping document from the LDAP configuration for the specified project.
* :ref:`atlas-api-ldapConfiguration-getUserSecurity` - Returns the current LDAP configuration for the specified project.
* :ref:`atlas-api-ldapConfiguration-getUserSecurityVerify` - Returns the status of one request to verify one LDAP configuration for the specified project.
* :ref:`atlas-api-ldapConfiguration-updateUserSecurity` - Edits the LDAP configuration for the specified project.
* :ref:`atlas-api-ldapConfiguration-verifyUserSecurityLdap` - Verifies the LDAP configuration for the specified project.


.. toctree::
   :titlesonly:

   deleteLdapUserMapping </command/atlas-api-ldapConfiguration-deleteLdapUserMapping>
   getUserSecurity </command/atlas-api-ldapConfiguration-getUserSecurity>
   getUserSecurityVerify </command/atlas-api-ldapConfiguration-getUserSecurityVerify>
   updateUserSecurity </command/atlas-api-ldapConfiguration-updateUserSecurity>
   verifyUserSecurityLdap </command/atlas-api-ldapConfiguration-verifyUserSecurityLdap>
