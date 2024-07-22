.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-org-billing.rst
      
   .. step:: Review the :guilabel:`Overview` tab.
      
      If it isn't already displayed, click the :guilabel:`Overview` tab.
      
      In the :guilabel:`Overview` tab, you can explore:
          
      - The :guilabel:`Running Invoice Total` section that shows the 
        total invoice for one organization, or for all invoices for 
        linked organizations, per billing period.

      - The :ref:`billing cost visualization charts 
        <billing-visualizations>`.
      
      - The :ref:`Available Credits <subscription-level>` and
        :ref:`History <subscription-level>` sections.
      
   .. step:: Verify your :guilabel:`Payment Method`.
      
      View the payment method displayed in the :guilabel:`Payment Method`
      card. If this method appears incorrect, click :guilabel:`Edit` in
      that card.
      
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
      
   .. step:: Retry the payment.
      
      a. Locate the :guilabel:`Payment Details` section in your invoice page.
      b. Review the values in the :guilabel:`Actions` column to locate the
         :guilabel:`Retry` action.
      c. Click :guilabel:`Retry`.
      
      .. include:: /includes/fact-sca-payment-failure.rst  
