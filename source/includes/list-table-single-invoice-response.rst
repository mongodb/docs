.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 10 10 80

   * - Name
     - Type
     - Description

   * - ``amountBilledCents``
     - number
     - Amount billed in this invoice, calculated as **subtotalCents** 
       + **salesTaxCents** - **startingBalanceCents**

   * - ``amountPaidCents`` 
     - number
     - Amount paid for this invoice. 

   * - ``created`` 
     - string
     - Timestamp in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format in :abbr:`UTC (Coordinated Universal Time)` when
       this invoice was created.

   * - ``creditsCents``
     - number
     - Amount credited by MongoDB, in USD cents.

   * - ``endDate`` 
     - string
     - Timestamp in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format in :abbr:`UTC (Coordinated Universal Time)` 
       when the billing period for this invoice ended.

   * - ``groupId``
     - string
     - Unique identifier of the project with which the invoice is associated.
       *Does not appear on all invoices.*

   * - ``id``
     - string
     - Unique identifier for this invoice.

   * - ``lineItems``
     - object array
     - Line items in the invoice. This information is also found in the
       :guilabel:`Usage Details` section of the Invoice page in the
       |service| UI. 
       
       Each object in the array includes
       the following fields:
       
       .. list-table::
          :widths: 30 70
          :header-rows: 1
          :stub-columns: 1
          
          * - Item
            - Description
          
          * - ``clusterName``
            - The name of the cluster that incurred the charge

          * - ``created`` 
            - Timestamp in `ISO 8601
              <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_
              date and time format in :abbr:`UTC (Coordinated Universal
              Time)` when the line item was posted to the invoice.

          * - ``endDate``
            - Timestamp in `ISO 8601
              <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_
              date and time format in :abbr:`UTC (Coordinated Universal
              Time)` when the period for which the line item applies ended.

          * - ``discountCents``
            - Amount discounted, in USD cents. *Displays when applicable.*

          * - ``groupId``
            - ID of the project with which the line item is associated.

          * - ``note``
            - Note regarding the line item.

          * - ``percentDiscount``
            - Percent of discount. *Displays when applicable.*

          * - ``quantity``
            - Number of units of the line item (e.g. GB, hours, etc.).

          * - ``sku``
            - Description of the line item. This could be the instance type,
              a support charge, advanced security, etc.

          * - ``startDate``
            - Timestamp in `ISO 8601
              <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_
              date and time format in :abbr:`UTC (Coordinated Universal
              Time)` when the period for which the line item applies began.

          * - ``stitchAppName``
          
            - Name of the `MongoDB Stitch
              <https://docs.mongodb.com/stitch/>`_ app associated with
              the line item.

          * - ``totalPriceCents``
            - Total price for the line item, in USD cents. Equal to

              .. code-block:: none
                 :copyable: false

                  unitPriceDollars * quantity * 100

          * - ``unitPriceDollars``
            - Cost of the item, in dollars.
       
   * - ``links``
     - object array
     - .. include:: /includes/links-explanation.rst

   * - ``orgId`` 
     - string
     - Unique identifier for the organization that received this 
       invoice.

   * - ``payments``
     - object array
     - Payments applied to the invoice. Objects in the ``payments`` array
       include the following fields:
       
       .. list-table::
          :widths: 30 70
          :header-rows: 1
          :stub-columns: 1
          
          * - Field
            - Description
            
          * - ``amountBilledCents``
            - The amount of the invoice, in USD cents.

          * - ``amountPaidCents``
            - The amount that the customer paid, in USD cents.

          * - ``created``
            - Timestamp in `ISO 8601
              <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_
              date and time format in :abbr:`UTC (Coordinated Universal
              Time)` of the date the payment was recorded.

          * - ``id``
            - Unique identifier of the payment.

          * - ``salesTaxCents``
            - Amount of sales tax paid, in USD cents.

          * - ``statusName``
            - State of the payment.

              .. list-table::
                 :widths: 30 70
                 :header-rows: 1
                 :stub-columns: 1
                 
                 * - Status
                   - Description
                 
                 * - ``CANCELLED``
                   - The payment has been cancelled.

                 * - ``FAILED``
                   - The attempt to charge the credit card failed.

                 * - ``FORGIVEN``
                   - The payment was created, but was subsequently
                     forgiven.

                 * - ``NEW``
                   - The payment has been created, but no attempt
                     has been made to charge the credit card.

                 * - ``PAID``
                   - The payment was successful.

          * - ``subtotalCents``
            - Sum of all positive invoice line items, in USD cents.

          * - ``updated``
            - Timestamp in `ISO 8601
              <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_
              date and time format in :abbr:`UTC (Coordinated Universal
              Time)` that the object was last updated.
   
   * - ``refunds``
     - object array
     - Refunds issued for the invoice. Objects in the ``refunds`` array
       include the following fields:

       .. list-table::
          :widths: 30 70
          :header-rows: 1
          :stub-columns: 1

          * - Field
            - Description

          * - ``amountCents``
            - The amount of the refund, in USD cents.
         
          * - ``created``
            - Timestamp in `ISO 8601
              <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_
              date and time format in :abbr:`UTC (Coordinated Universal
              Time)` of the date the refund was recorded.

          * - ``reason``
            - Reason for the refund.

          * - ``paymentId``
            - Unique identifier of the payment.

   * - ``salesTaxCents`` 
     - number
     - Amount of taxes levied on **subtotalCents**. 

   * - ``startDate`` 
     - string
     - Timestamp in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format in :abbr:`UTC (Coordinated Universal Time)` of
       the starting date for this invoice.

   * - ``statusName`` 
     - string
     - State of this invoice. Accepted values are:

       .. include:: /includes/list-table-statusName.rst

   * - ``subtotalCents`` 
     - number
     - Sum of all positive invoice line items in USD cents.

   * - ``updated`` 
     - string
     - Timestamp in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format in :abbr:`UTC (Coordinated Universal Time)` when
       the invoice was last updated.
