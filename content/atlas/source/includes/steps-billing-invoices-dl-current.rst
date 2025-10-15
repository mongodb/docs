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
      
   .. step:: Click :guilabel:`View Pending Invoice`.
      
      |service| displays the current invoice. The current invoice page shows
      the following sections:
      
      .. include:: /includes/billing/list-table-invoice-card.rst
      
   .. step:: Choose the format of your invoice.
      
      a. Click :guilabel:`Download` in the upper right corner of the
         :guilabel:`Invoice` page.
      
      #. Select :guilabel:`PDF` or :guilabel:`CSV`.
         
         When you download your invoice as a PDF, the document represents
         a copy of your actual bill for the specified billing period.
      
         When you download your invoice as a CSV, the document provides
         itemized usage details. If you have credits applied to your invoice,
         the invoice includes a row with the following information:
      
         - A :guilabel:`Description` that includes the word ``Credit`` 
         - A negative :guilabel:`Amount` value.
      
         This information helps you calculate when you ran out of credits.
         When summing the :guilabel:`Amount` column, you can filter out this
         row to calculate your invoice subtotal.
