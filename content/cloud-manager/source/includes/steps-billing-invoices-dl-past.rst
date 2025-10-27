.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-org-billing-invoice.rst
      
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
      
        - If you leave :guilabel:`From` blank, |mms| sets the lower
          date boundary to the organization's creation date.
      
        - If you leave :guilabel:`To` blank, |mms| sets the upper date
          boundary to the current date.
      
   .. step:: Download your desired invoice.
      
      For the desired invoice, click one of the invoice format buttons in
      its :guilabel:`Download As` column. These file formats include:
      
      - :guilabel:`PDF`
      - :guilabel:`TXT`
      - :guilabel:`CSV`
