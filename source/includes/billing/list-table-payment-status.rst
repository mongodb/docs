.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 10 20

   * - Status
     - Description

   * - ``SUCCESSFUL``	
     - MongoDB has received your payment.

   * - ``NEW``	
     - The payment has been calculated, but you have not 
       been charged yet.

   * - ``PARTIAL PAID``	
     - The payment sent to MongoDB was partially paid. You might have 
       received an email with additional information. Please refer to 
       that email or contact 
       :ref:`MongoDB Support <request-support>` to resolve this issue.

   * - ``CANCELLED``
     - The payment was cancelled.

   * - ``PENDING``
     - The payment is pending.

   * - ``CLOSED``
     - All payments for the subscription cycle have been finalized, the 
       balance is more than zero, and you have not been charged yet.

   * - ``FORGIVEN``	
     - The charge has been forgiven. If the charge succeeded, it has 
       been refunded.

   * - ``FAILED DUE TO AUTHENTICATION``	
     - :ref:`Strong Customer Authentication (SCA) <sca-changes>` has
       failed. Please confirm that your 
       :ref:`payment method <payment-method>` is authenticated.

       To resolve a failed payment, :ref:`troubleshoot invoices and
       payments <troubleshoot-invoice-payment>`.

   * - ``FAILED``	
     - The attempt to charge your payment method failed.

       To resolve a failed payment, :ref:`troubleshoot invoices and payments
       <troubleshoot-invoice-payment>`.
