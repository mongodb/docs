.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-triggers.rst
      
   .. step:: Click :guilabel:`Add a Trigger` to open the Trigger configuration page.
      
   .. step:: Enter configuration values for the Trigger.
      
      .. list-table:: 
         :header-rows: 1
         :widths: 20 80
       
         * - UI Field Name 
           - Configuration
      
         * - :guilabel:`Trigger Type`
           - Select :guilabel:`Scheduled`.
      
         * - :guilabel:`Name`
           - Specify ``updateMonthlySales``.
      
         * - :guilabel:`Schedule Type`
           - a. Select :guilabel:`Basic`. 
             
             #. For :guilabel:`Repeat once by`, select ``Day of the Month`` 
                and set the value to your preferred date.
           
                .. note:: 
      
                   Alternatively, for testing purposes, 
                   set :guilabel:`Repeat once by` dropdown to a more 
                   frequent occurrence, such as :guilabel:`Minute` or 
                   :guilabel:`Hour`
      
         * - :guilabel:`Select An Event Type`
           - Select :guilabel:`Function`.
      
         * - :guilabel:`Function`
           - Select ``updateMonthlySales``.
      
   .. step:: Click :guilabel:`Save`.
      
   .. include:: /includes/nav/steps-triggers.rst
      
   .. step:: Click :guilabel:`Add a Trigger` to add another trigger.
      
   .. step:: Enter configuration values for the new Trigger.
      
      .. list-table:: 
         :header-rows: 1
         :widths: 20 80
       
         * - UI Field Name 
           - Configuration
      
         * - :guilabel:`Trigger Type`
           - Select :guilabel:`Scheduled`.
      
         * - :guilabel:`Name`
           - Specify ``updateMonthlyPurchaseOrders``.
      
         * - :guilabel:`Schedule Type`
           - a. Select :guilabel:`Basic`. 
             
             #. For :guilabel:`Repeat once by`, select ``Day of the Month`` 
                and set the value to your preferred date.
           
                .. note:: 
      
                   Alternatively, for testing purposes, 
                   set :guilabel:`Repeat once by` dropdown to a more 
                   frequent occurrence, such as :guilabel:`Minute` or 
                   :guilabel:`Hour`
      
         * - :guilabel:`Select An Event Type`
           - Select :guilabel:`Function`.
      
         * - :guilabel:`Function`
           - Select ``updateMonthlyPurchaseOrders``.
      
   .. step:: Click :guilabel:`Save`.
      
   .. step:: Review and deploy the ``Sales-App`` application draft.
