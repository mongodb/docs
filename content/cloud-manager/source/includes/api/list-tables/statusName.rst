.. list-table::
   :widths: 30 70
   :header-rows: 1
   :stub-columns: 1

   * - Status
     - Description

   * - ``CLOSED``
     - All charges for the subscription cycle have been 
       finalized, the balance is more than zero, and the 
       customer has not been charged yet.

   * - ``FAILED``
     - An attempt to charge the credit card for the amount due 
       failed.

   * - ``FORGIVEN``
     - The customer has been charged, but the charge has been 
       forgiven.

   * - ``FREE``
     - The amount turned out to be zero, so the customer is not 
       charged.

   * - ``PAID``
     - The funds have been transferred to MongoDB, Inc.

   * - ``PENDING``
     - Includes charges for the current subscription cycle. A customer 
       should never have more than one invoice in this state.

   * - ``PREPAID``
     - The customer is on a prepaid plan, so the customer is not
       charged.
