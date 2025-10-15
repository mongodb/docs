.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-org-billing.rst
      
   .. step:: Review the :guilabel:`Overview` page.
      
      In the :guilabel:`Overview` page, you can explore:
          
      - Invoice information that includes a :guilabel:`Pending Invoice` section,
        which shows your :guilabel:`Net Month-to-Date Amount` for the current billing period. The
        net month-to-date amount reflects your net charges from the start of the period
        to the current day. You can also see a :guilabel:`Last Invoice` section,
        which shows your usage and amount due for the previous billing period.

      - The :ref:`billing cost visualization charts 
        <billing-visualizations>`.
         
      - The :ref:`Available Credits <subscription-level>` and
        :ref:`History <subscription-level>` sections.
      
   .. step:: Click the :guilabel:`Invoices` tab.
      
      |service| displays a list of your invoices.
      In this list, you can:
      
      - Filter the invoices by status or date.
      - View the invoice status.
      - Click the link to view the invoice.
      - Download each invoice as PDF or CSV.
      
   .. step:: Filter your list of invoices, if desired.
      
      You can filter the invoices by status and date.
      
      - To filter by status, click the :guilabel:`Status` drop-down and
        select the status to which you want to limit the results:
      
        .. list-table::
           :widths: 20 80
           :header-rows: 1
           :stub-columns: 1
      
           * - Status
             - Invoice Type
      
           * - Pending
             - Invoices still pending payment.
      
           * - Free
             - Invoices with a total charge of ``$0.00``.
      
           * - Successful
             - Invoices that are paid.
      
      - To filter by invoice date, set the :guilabel:`From` or
        :guilabel:`To` date inputs to the required date range.
      
        - If you leave :guilabel:`From` blank, |service| sets the lower
          date boundary to the organization's creation date.
      
        - If you leave :guilabel:`To` blank, |service| sets the upper date
          boundary to the current date.
      
   .. step:: Open your invoice to see its payment details.
      
      To open a specific invoice, click its link in :guilabel:`Invoice Date`
      or :guilabel:`Invoice Period`. The invoice page shows the following
      sections:
      
      .. include:: /includes/billing/list-table-invoice-card.rst
      
   .. step:: Pay your invoice.
      
      If you have a :ref:`subscription <activate-subscription>` with an
      amount due, your invoice's :guilabel:`Payment Details` section displays
      the :guilabel:`PAY NOW` action in the :guilabel:`Actions` column for
      the subscription payment method. This allows you to pay your
      tax invoices for your monthly commitment or elastic
      subscription directly from the YayPay website.
      
      a. In your invoice, navigate to the :guilabel:`Payment Details` section.
      
      #. Click the :guilabel:`PAY NOW` action for the row that contains your
         subscription payment method.