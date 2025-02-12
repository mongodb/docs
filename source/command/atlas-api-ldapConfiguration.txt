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

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, edits, verifies, and removes LDAP configurations.

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

* :ref:`atlas-api-ldapConfiguration-deleteLdapConfiguration` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes the current LDAP Distinguished Name mapping captured in the userToDNMapping document from the LDAP configuration for the specified project.
* :ref:`atlas-api-ldapConfiguration-getLdapConfiguration` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the current LDAP configuration for the specified project.
* :ref:`atlas-api-ldapConfiguration-getLdapConfigurationStatus` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the status of one request to verify one LDAP configuration for the specified project.
* :ref:`atlas-api-ldapConfiguration-saveLdapConfiguration` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Edits the LDAP configuration for the specified project.
* :ref:`atlas-api-ldapConfiguration-verifyLdapConfiguration` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Verifies the LDAP configuration for the specified project.


.. toctree::
   :titlesonly:

   deleteLdapConfiguration </command/atlas-api-ldapConfiguration-deleteLdapConfiguration>
   getLdapConfiguration </command/atlas-api-ldapConfiguration-getLdapConfiguration>
   getLdapConfigurationStatus </command/atlas-api-ldapConfiguration-getLdapConfigurationStatus>
   saveLdapConfiguration </command/atlas-api-ldapConfiguration-saveLdapConfiguration>
   verifyLdapConfiguration </command/atlas-api-ldapConfiguration-verifyLdapConfiguration>

