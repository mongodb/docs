.. _atlas-privateEndpoints-onlineArchive-aws-describe:

=================================================
atlas privateEndpoints onlineArchive aws describe
=================================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Return a specific Data Lake private endpoint for your project.

To use this command, you must authenticate with a user account or an API key that has the Project Read Only role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas privateEndpoints onlineArchive aws describe <privateEndpointId> [options]

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
   * - privateEndpointId
     - string
     - true
     - Unique 22-character alphanumeric string that identifies the private endpoint.

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
     - Output format. Valid values are json, json-path, go-template, or go-template-file.
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

   ID             ENDPOINT PROVIDER   TYPE     COMMENT
   <EndpointId>   <Provider>          <Type>   <Comment>
   

Examples
--------

.. code-block::

   # This example uses the profile named "myprofile" for accessing Atlas.
   atlas privateEndpoint dataLake aws describe vpce-abcdefg0123456789 -P myprofile
