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

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns invoices.

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

* :ref:`atlas-api-invoices-createCostExplorerQueryProcess` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates a query process within the Cost Explorer for the given parameters.
* :ref:`atlas-api-invoices-downloadInvoiceCsv` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one invoice that MongoDB issued to the specified organization in CSV format.
* :ref:`atlas-api-invoices-getCostExplorerQueryProcess` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the usage details for a Cost Explorer query, if the query is finished and the data is ready to be viewed.
* :ref:`atlas-api-invoices-getInvoice` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one invoice that MongoDB issued to the specified organization.
* :ref:`atlas-api-invoices-listInvoices` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all invoices that MongoDB issued to the specified organization.
* :ref:`atlas-api-invoices-listPendingInvoices` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all invoices accruing charges for the current billing cycle for the specified organization.
* :ref:`atlas-api-invoices-queryLineItemsFromSingleInvoice` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Query the lineItems of the specified invoice and return the result JSON.


.. toctree::
   :titlesonly:

   createCostExplorerQueryProcess </command/atlas-api-invoices-createCostExplorerQueryProcess>
   downloadInvoiceCsv </command/atlas-api-invoices-downloadInvoiceCsv>
   getCostExplorerQueryProcess </command/atlas-api-invoices-getCostExplorerQueryProcess>
   getInvoice </command/atlas-api-invoices-getInvoice>
   listInvoices </command/atlas-api-invoices-listInvoices>
   listPendingInvoices </command/atlas-api-invoices-listPendingInvoices>
   queryLineItemsFromSingleInvoice </command/atlas-api-invoices-queryLineItemsFromSingleInvoice>

