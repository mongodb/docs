.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Update All Applications to Use Private IP for Peering Connection Strings.
      
      Change any |url|\s in your applications that use your
      |service| clusters to use
      :ref:`Private IP for Peering connection strings <connstring-private>`.
      
   .. include:: /includes/nav/steps-project-settings.rst

   .. step:: Disable Connect via Peering Only.
      
      Toggle :guilabel:`Connect via Peering Only (GCP and Azure)` to Off.
