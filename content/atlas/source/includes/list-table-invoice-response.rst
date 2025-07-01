.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 10 10 80

   * - Name
     - Type
     - Description

   * - ``amountBilledCents``
     - number
     - Amount billed in this invoice, calculated as ``subtotalCents`` 
       + ``salesTaxCents`` - ``startingBalanceCents``.

   * - ``amountPaidCents`` 
     - number
     - Amount paid for this invoice, in USD cents. 

   * - ``created`` 
     - string
     - Timestamp in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format in :abbr:`UTC (Coordinated Universal Time)` when
       this invoice was created.

   * - ``creditsCents``
     - number
     - Amount credited by MongoDB, in USD cents.

   * - ``endDate`` 
     - string
     - Timestamp in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format in :abbr:`UTC (Coordinated Universal Time)` 
       when the billing period for this invoice ended.

   * - ``id``
     - string
     - Unique identifier for this invoice.

   * - ``links``
     - object array
     - .. include:: /includes/links-explanation.rst

   * - ``groupId``
     - string
     - Unique identifier of the project with which the invoice is associated. *Does not
       appear on all invoices.*

   * - ``orgId`` 
     - string
     - Unique identifier for the organization that received this 
       invoice.

   * - ``salesTaxCents`` 
     - number
     - Amount of taxes levied on **subtotalCents**. 

   * - ``startDate`` 
     - string
     - Timestamp in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format in :abbr:`UTC (Coordinated Universal Time)` of
       the starting date for this invoice.

   * - ``statusName`` 
     - string
     - State of this invoice. Accepted values are:

       .. include:: /includes/billing/list-table-statusName.rst

   * - ``subtotalCents`` 
     - number
     - Sum of all positive invoice line items in USD cents.

   * - ``updated`` 
     - string
     - Timestamp in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format in :abbr:`UTC (Coordinated Universal Time)` when
       the invoice was last updated.
