.. _atlas-api-invoices-getCostExplorerQueryProcess:

==============================================
atlas api invoices getCostExplorerQueryProcess
==============================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the usage details for a Cost Explorer query, if the query is finished and the data is ready to be viewed.

If the data is not ready, a 'processing' response willindicate that another request should be sent later to view the data. This command is invoking the endpoint with OperationID: 'getCostExplorerQueryProcess'. For more information about flags, format of --file and examples, see: https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Invoices/operation/getCostExplorerQueryProcess

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas api invoices getCostExplorerQueryProcess [options]

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
   * - --envelope
     - 
     - false
     - flag that indicates whether Application wraps the response in an envelope JSON object
   * - -h, --help
     - 
     - false
     - help for getCostExplorerQueryProcess
   * - --orgId
     - string
     - true
     - unique 24-hexadecimal digit string that identifies the organization that contains your projects
   * - --output
     - string
     - true
     - preferred api format, can be ["csv", "json", go-template]
   * - --output-file
     - string
     - false
     - file to write the api output to. This flag is required when the output of an endpoint is binary (ex: gzip) and the command is not piped (ex: atlas command > out.zip)
   * - --token
     - string
     - true
     - unique 64 digit string that identifies the Cost Explorer query
   * - --version
     - string
     - false
     - api version to use when calling the api call [options: "2023-01-01"], defaults to the latest version or the profiles api_version config value if set This value defaults to "2023-01-01".

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

