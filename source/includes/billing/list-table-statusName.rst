.. list-table::
   :widths: 30 70
   :header-rows: 1
   :stub-columns: 1

   * - Status
     - Description

   * - ``PAID``
     - The funds have been transferred to MongoDB.

   * - ``PREPAID``
     - The customer has purchased credit from MongoDB sales, so the
       customer is not charged.

   * - ``FREE``
     - The amount turned out to be zero, so the customer is not 
       charged.

   * - ``PENDING``
     - Includes charges for the current subscription cycle. An 
       organization should never have more than one invoice in this 
       state.

   * - ``FORGIVEN``
     - The charge has been forgiven. If the charge succeeded, it has 
       been refunded.

   * - ``FAILED``
     - An attempt to charge the credit card for the amount due 
       failed.

   * - ``CLOSED``
     - All charges for the subscription cycle have been 
       finalized, the balance is more than zero, and the 
       customer has not been charged yet.
