.. _atlas-api-invoices-listInvoices:

===============================
atlas api invoices listInvoices
===============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all invoices that MongoDB issued to the specified organization.

This list includes all invoices regardless of invoice status. To use this resource, the requesting API Key must have the Organization Billing Viewer, Organization Billing Admin, or Organization Owner role. If you have a cross-organization setup, you can view linked invoices if you have the Organization Billing Admin or Organization Owner role. To compute the total owed amount of the invoices - sum up total owed of each invoice. It could be computed as a sum of owed amount of each payment included into the invoice. To compute payment's owed amount - use formula totalBilledCents * unitPrice + salesTax - startingBalanceCents. This command is invoking the endpoint with OperationID: 'listInvoices'. For more information about flags, format of --file and examples, see: https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Invoices/operation/listInvoices

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas api invoices listInvoices [options]

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
   * - --fromDate
     - string
     - false
     - retrieve the invoices the startDates of which are greater than or equal to the fromDate
   * - -h, --help
     - 
     - false
     - help for listInvoices
   * - --includeCount
     - 
     - false
     - flag that indicates whether the response returns the total number of items (totalCount) in the response
   * - --itemsPerPage
     - int
     - false
     - number of items that the response returns per page
   * - --orderBy
     - string
     - false
     - field used to order the returned invoices by
   * - --orgId
     - string
     - true
     - unique 24-hexadecimal digit string that identifies the organization that contains your projects
   * - --output
     - string
     - false
     - preferred api format, can be ["json", go-template] This value defaults to "json".
   * - --output-file
     - string
     - false
     - file to write the api output to. This flag is required when the output of an endpoint is binary (ex: gzip) and the command is not piped (ex: atlas command > out.zip)
   * - --pageNum
     - int
     - false
     - number of the page that displays the current set of the total objects that the response returns
   * - --pretty
     - 
     - false
     - flag that indicates whether the response body should be in the prettyprint format
   * - --sortBy
     - string
     - false
     - field used to sort the returned invoices by
   * - --statusNames
     - stringArray
     - false
     - statuses of the invoice to be retrieved
   * - --toDate
     - string
     - false
     - retrieve the invoices the endDates of which are smaller than or equal to the toDate
   * - --version
     - string
     - false
     - api version to use when calling the api call [options: "2023-01-01"], defaults to the latest version or the profiles api_version config value if set This value defaults to "2023-01-01".
   * - --viewLinkedInvoices
     - 
     - false
     - flag that indicates whether to return linked invoices in the linkedInvoices field

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

