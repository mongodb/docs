.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. step:: Edit the configuration.
      
      Click :guilabel:`Edit Config` and select the cluster that you 
      want to move from the drop-down menu.
      
      Alternatively, if you are already viewing the specific cluster, 
      click :guilabel:`Configuration`.
      
   .. step:: In the :guilabel:`Cloud Provider & Region` view, select the desired new region for the new cluster.
      
      For ``M0`` {+clusters+}:
        
      - You must also select a higher {+cluster+} tier. |service| supports
        moving ``M0`` {+clusters+} only when you :doc:`increase the
        cluster tier </scale-cluster>`.
      - The available regions are a subset of the total supported regions for any
        given cloud service provider.
      
   .. step:: Click :guilabel:`Review Changes`.
      
   .. step:: Click :guilabel:`Apply Changes` or :guilabel:`Apply Changes and Checkout` to configure the billing information.
