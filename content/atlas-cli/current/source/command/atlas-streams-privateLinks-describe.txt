.. _atlas-streams-privateLinks-describe:

===================================
atlas streams privateLinks describe
===================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Describes a PrivateLink endpoint that can be used as an Atlas Stream Processor connection.

To use this command, you must authenticate with a user account or an API key with any of the following roles: Project Owner, Project Stream Processing Owner.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas streams privateLinks describe <connectionID> [options]

.. Code end marker, please don't delete this comment

Arguments
---------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - connectionID
     - string
     - true
     - ID of the PrivateLink endpoint.

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
     - help for describe
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

   # describe a PrivateLink endpoint for Atlas Stream Processing:
   atlas streams privateLink describe 5e2211c17a3e5a48f5497de3

