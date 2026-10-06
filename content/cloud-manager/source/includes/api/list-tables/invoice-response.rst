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
     - Timestamp in `International Organization for
       Standardization (ISO) 8601
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
     - Unique identifier of the project associated with this invoice.
       *Doesn't appear in all invoices.*

   * - ``orgId`` 
     - string
     - Unique identifier for the organization that received this 
       invoice.

   * - ``salesTaxCents`` 
     - number
     - Amount of taxes applied to **subtotalCents**.

   * - ``startDate`` 
     - string
     - Timestamp in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format in :abbr:`UTC (Coordinated Universal Time)` of
       the starting date for this invoice.

   * - ``statusName``
     - string
     - State of this invoice. Accepted values are:

       - ``CLOSED``: All charges for the subscription cycle have been
         finalized, the balance is more than zero, and the customer
         hasn't been charged yet.

       - ``FAILED``: Charging the credit card for the amount due
         failed.

       - ``FORGIVEN``: The customer has been charged, but the charge
         has been forgiven.

       - ``FREE``: The amount turned out to be zero, so the customer
         isn't charged.

       - ``PAID``: The funds have been transferred to MongoDB, Inc.

       - ``PENDING``: Includes charges for the current subscription
         cycle. A customer should never have more than one invoice in
         this state.

       - ``PREPAID``: The customer has a prepaid plan, so the customer
         isn't charged.

   * - ``subtotalCents`` 
     - number
     - Sum of all positive invoice line items in USD cents.

   * - ``updated`` 
     - string
     - Timestamp in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format in :abbr:`UTC (Coordinated Universal Time)` when
       the invoice was last updated.
