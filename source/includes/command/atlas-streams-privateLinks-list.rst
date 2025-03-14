.. _atlas-streams-privateLinks-list:

===============================
atlas streams privateLinks list
===============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Lists the PrivateLink endpoints in the project that can be used as Atlas Stream Processor connections.

To use this command, you must authenticate with a user account or an API key with any of the following roles: Project Owner, Project Stream Processing Owner.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas streams privateLinks list [options]

.. Code end marker, please don't delete this comment

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
     - help for list
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.

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

Output
------

If the command succeeds, the CLI returns output similar to the following sample. Values in brackets represent your values.

.. code-block::

   ID  PROVIDER  REGION  VENDOR  STATE  INTERFACE_ENDPOINT_ID  SERVICE_ENDPOINT_ID  DNS_DOMAIN  DNS_SUBDOMAIN
   <Id>  <Provider>  <Region>  <Vendor>  <State>  <InterfaceEndpointId>  <ServiceEndpointId>  <DnsDomain>  <DnsSubDomain>
   

Examples
--------

.. code-block::
   :copyable: false

   # list PrivateLink endpoints for Atlas Stream Processing:
   atlas streams privateLink list

