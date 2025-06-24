.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 10 10 80

   * - Name
     - Type
     - Description

   * - id
     - string
     - Unique identifier for this invoice.

   * - amountBilledCents
     - number
     - Amount billed in this invoice, calculated as **subtotalCents** 
       + **salesTaxCents** - **startingBalanceCents**

   * - amountPaidCents 
     - number
     - Amount paid for this invoice. 

   * - created 
     - string
     - Timestamp in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format in :abbr:`UTC (Coordinated Universal Time)` when
       this invoice was created.

   * - endDate 
     - string
     - Timestamp in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format in :abbr:`UTC (Coordinated Universal Time)` 
       when the billing period for this invoice ended.

   * - groupId 
     - string
     - Unique identifier of the :cloudmgr:`project </reference/glossary/#std-term-project>` that was included in 
       this invoice.

   * - links
     - object array
     - .. include:: /includes/api/links-explanation.rst

   * - lockedAt 
     - string
     - Timestamp in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format in :abbr:`UTC (Coordinated Universal Time)` 
       when this invoice was locked.

   * - note 
     - string
     - Annotation on this invoice that explains or clarifies 
       information within the invoice.

   * - orgId 
     - string
     - Unique identifier for the organization that received this 
       invoice.

   * - paymentMethod 
     - string
     - Means by which this invoice has been paid. 

   * - salesTaxCents 
     - number
     - Amount of taxes levied on **subtotalCents**. 

   * - startDate 
     - string
     - Timestamp in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format in :abbr:`UTC (Coordinated Universal Time)` of
       the starting date for this invoice.

   * - startingBalanceCents 
     - number
     - Carried over balance from prior billing period in cents.

   * - status 
     - string
     - State of this invoice. Accepted values are:

       .. list-table::
          :widths: 30 70
          :header-rows: 1
          :stub-columns: 1

          * - Status
            - Description

          * - PENDING
            - Includes charges for the current subscription cycle. A customer 
              should never have more than one invoice in this state.

          * - CLOSED
            - All charges for the subscription cycle have been 
              finalized, the balance is more than zero, and the 
              customer has not been charged yet.

          * - FORGIVEN
            - The customer has been charged, but the charge has been 
              forgiven.

          * - CHARGE_FAILED
            - An attempt to charge the credit card for the amount due 
              failed.

          * - PAID
            - The funds have been transferred to MongoDB, Inc.

          * - FREE
            - The amount turned out to be zero, so the customer is not 
              charged.

          * - PREPAID
            - The customer is on a prepaid plan, so the customer is not
              charged.

   * - subtotalCents 
     - number
     - Sum of all positive invoice line items in cents.

   * - updated 
     - string
     - Timestamp in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format in :abbr:`UTC (Coordinated Universal Time)` of
       the latest :cloudmgr:`oplog  </reference/glossary/#std-term-Oplog-Store-Database>` entry in the
       restored :manual:`snapshot </reference/glossary/#std-term-snapshot>`.
