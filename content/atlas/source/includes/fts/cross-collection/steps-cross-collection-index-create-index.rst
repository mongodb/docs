.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. include:: /includes/nav/steps-atlas-search.rst
      
   .. include:: /includes/nav/steps-configure-index.rst

   .. step:: Review the default |fts| index configuration settings.
      
   .. step:: Click :guilabel:`Create Search Index`.
      
   .. step:: Close the :guilabel:`You're All Set!` Modal Window.
      
      A modal window appears to let you know your index is building. Click 
      the :guilabel:`Close` button.
      
   .. step:: Check the status.
      
      The newly created index appears on the :guilabel:`Atlas Search` tab. While 
      the index is building, the :guilabel:`Status` field reads 
      :guilabel:`Building`. When the index is finished building,
      the :guilabel:`Status` field reads :guilabel:`Active`.
      
      .. note::
      
         Larger collections take longer to index. You will receive an email
         notification when your index is finished building.
