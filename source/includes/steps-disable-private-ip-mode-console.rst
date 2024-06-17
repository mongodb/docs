.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Update All Applications to Use Private IP for Peering Connection Strings.
      
      Change any |url|\s in your applications that use your
      |service| clusters to use
      :ref:`Private IP for Peering connection strings <connstring-private>`.
      
   .. step:: Go to the :guilabel:`Settings` page for your project.
      
      a. Next to the :guilabel:`Projects` menu, expand the
         :icon-fa5:`ellipsis-v` :guilabel:`Options` menu.

      #. Click :guilabel:`Project Settings`.
      
   .. step:: Disable Connect via Peering Only.
      
      Toggle :guilabel:`Connect via Peering Only (GCP and Azure)` to Off.
