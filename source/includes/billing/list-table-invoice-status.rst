.. list-table::
   :widths: 30 70
   :header-rows: 1
   :stub-columns: 1

   * - Status
     - Description

   * - ``SUCCESSFUL``
     - MongoDB has received your payment.

   * - ``PREPAID``
     - Your prepaid subscription has covered the invoice with 
       credits.

   * - ``INVOICED``
     - Your usage has been invoiced with your subscription.

   * - ``N/A``
     - The amount turned out to be zero, so you are not 
       charged.

   * - ``PENDING``
     - Includes charges for the current subscription cycle. An 
       organization should never have more than one invoice in this 
       state.

   * - ``CLOSED``
     - All charges for the subscription cycle have been finalized, the 
       balance is more than zero, and you have not been charged yet.

   * - ``FORGIVEN``
     - The charge has been forgiven. If the charge succeeded, it has 
       been refunded by MongoDB.

   * - ``FAILED``
     - An attempt to charge your payment method for the amount due 
       failed.
