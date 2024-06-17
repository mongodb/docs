.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Click the cluster name to view cluster details.

   .. step:: Click the :guilabel:`Atlas Search` tab.
      
   .. step:: Click :guilabel:`Create Search Index`
      
   .. step:: Select :guilabel:`Visual Editor`, then click :guilabel:`Next`.
      
   .. step:: Enter the :guilabel:`Index Name`, and set the :guilabel:`Database and Collection`.
      
      a. In the :guilabel:`Index Name` field, enter 
         ``monthlyPhoneTransactions``.
      
      #. In the :guilabel:`Database and Collection` section, find the 
         ``sample_supplies`` database, 
         and select the ``monthlyPhoneTransactions`` collection.
      
      #. Click :guilabel:`Next`.
      
   .. step:: Review the default |fts| index configuration settings.
      
   .. step:: Click :guilabel:`Create Search Index`.
      
   .. step:: Close the :guilabel:`You're All Set!` Modal Window.
      
      A modal window appears to let you know your index is building. Click 
      the :guilabel:`Close` button.
      
   .. step:: Check the status.
      
      The newly created index appears on the :guilabel:`Atlas Search` tab. While 
      the index is building, the :guilabel:`Status` field reads 
      :guilabel:`Build in Progress`. When the index is finished building,
      the :guilabel:`Status` field reads :guilabel:`Active`.
      
      .. note::
      
         Larger collections take longer to index. You will receive an email
         notification when your index is finished building.
