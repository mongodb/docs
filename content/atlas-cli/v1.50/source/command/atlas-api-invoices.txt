.. _atlas-api-invoices:

==================
atlas api invoices
==================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns invoices.

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
     - help for invoices

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

* :ref:`atlas-api-invoices-createCostExplorerProcess` - Creates a query process within the Cost Explorer for the given parameters.
* :ref:`atlas-api-invoices-getCostExplorerUsage` - Returns the usage details for a Cost Explorer query, if the query is finished and the data is ready to be viewed.
* :ref:`atlas-api-invoices-getInvoice` - Returns one invoice that MongoDB issued to the specified organization.
* :ref:`atlas-api-invoices-getInvoiceCsv` - Returns one invoice that MongoDB issued to the specified organization in CSV format.
* :ref:`atlas-api-invoices-listInvoicePending` - Returns all invoices accruing charges for the current billing cycle for the specified organization.
* :ref:`atlas-api-invoices-listInvoices` - Returns all invoices that MongoDB issued to the specified organization.
* :ref:`atlas-api-invoices-searchInvoiceLineItems` - Query the lineItems of the specified invoice and return the result JSON.


.. toctree::
   :titlesonly:

   createCostExplorerProcess </command/atlas-api-invoices-createCostExplorerProcess>
   getCostExplorerUsage </command/atlas-api-invoices-getCostExplorerUsage>
   getInvoice </command/atlas-api-invoices-getInvoice>
   getInvoiceCsv </command/atlas-api-invoices-getInvoiceCsv>
   listInvoicePending </command/atlas-api-invoices-listInvoicePending>
   listInvoices </command/atlas-api-invoices-listInvoices>
   searchInvoiceLineItems </command/atlas-api-invoices-searchInvoiceLineItems>
