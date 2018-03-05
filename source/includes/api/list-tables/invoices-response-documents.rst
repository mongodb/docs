.. list-table::
   :header-rows: 1
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
     - 

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
     - 

   * - orgId 
     - string
     - Unique identifier for the organization that received this 
       invoice.

   * - paymentMethod 
     - string
     - 

   * - salesforceOpportunityId 
     - string
     - 

   * - salesTaxCents 
     - number
     - // tax on subtotal. 

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
     - 

   * - subtotalCents 
     - number
     - Sum of all positive line items in cents.

   * - updated 
     - string
     - Timestamp in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format in :abbr:`UTC (Coordinated Universal Time)` of
       the latest :term:`oplog <Oplog Store Database>` entry in the
       restored :term:`snapshot`.
