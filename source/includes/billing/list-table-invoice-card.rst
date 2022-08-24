.. list-table::
   :widths: 20 80
   :header-rows: 1
   :stub-columns: 1

   * - Invoice Section
     - Contents

   * - :guilabel:`Running Total` table
     - The invoice status, the running total amount, the billing period
       the invoice number, and the billing address. In this card, you can
       export the invoice to PDF or CSV.

   * - :guilabel:`Total Usage` chart
     - The total usage by your |service| usage over the billing period.
       You can filter usage by service. To learn more,
       see :ref:`Invoice Charts <invoice-charts>`.

   * - :guilabel:`By Deployment` chart
     - The proportion of your usage incurred by each of your
       {+deployments+} for one or all projects. To learn more,
       see :ref:`Invoice Charts <invoice-charts>`.

   * - :guilabel:`Summary By Project` table
     - A summarized list of usage costs per project, excluding
       :ref:`subscription <activate-subscription>` charges.
 
   * - :guilabel:`Summary by Service` table
     - List of all |service| services, App Services, |charts|, and
       |service| Subscription Plans with corresponding usage costs for
       each service, and the total usage amount.

   * - :guilabel:`Payment Details`
     - Payments that are itemized by the payment method.
       The table lists:

       - :ref:`Payment methods <atlas-billing-methods>`, which may
         include |service| credits from a prepaid subscription or
         promotional subscription, a :ref:`monthly commitment subscription
         <subscription-types>`, a marketplace subscription, a credit
         card, or PayPal.

       - :guilabel:`Date`: the date when |service| issued the charge.
       - :ref:`Payment status <payment-statuses>`.
       - :guilabel:`Usage`: the amount you have used.
       - :guilabel:`Billed Usage`: the amount you are being billed for.
         :guilabel:`Billed Usage` amount can differ from the
         :guilabel:`usage` amount in a number of cases, such as when a
         month's usage is below the monthly minimum on your |service|
         subscription, or a month's billed usage encompasses usage for
         multiple months.
       - :guilabel:`Total Amount`: the unit price multiplied by billed
         usage, plus taxes. Taxes represent the amount of taxes collected
         by MongoDB. If you have a marketplace subscription, taxes are
         imposed by your Cloud Provider. To learn more, see
         :ref:`Taxation by Region <atlas-international-tax>`.
       - :guilabel:`Amount Due`.
       - :guilabel:`Action` that you can click. Actions can be one of the
         following:

         - :guilabel:`PDF`: download the PDF of the tax invoice that you
           receive by email.
         - :guilabel:`VIEW DETAILS`: view your subscription's monthly
           commitment details.
         - :guilabel:`PAY NOW`: pay your bill directly if you are
           a YayPay customer.
         - :guilabel:`RETRY`: :ref:`retry the failed payment
           <retry-failed-payment>`.

       To learn more, see :ref:`Payment and Usage Details <payment-details>`.

   * - :guilabel:`Usage Details`
     - List of all line item details for each month's bill. This is a
       granular breakout of all services that are invoiced, including
       dates used and billed, quantity (the number of server hours),
       the project, the unit price, and the amount. You can download the
       usage details as a CSV. To learn more, see
       :ref:`Payment and Usage Details <payment-details>`.
       