.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. step:: Open the configuration menu.
      
      Click :guilabel:`Edit Config` and select the cluster that you 
      want to move from the drop-down menu.
      
      Alternatively, if you are already viewing the specific cluster, 
      click :guilabel:`Configuration`.
      
   .. step:: In the :guilabel:`Cloud Provider & Region` view, review the current multi-region configuration options.
      
      For a given region, click the currently selected 
      :guilabel:`Region` and pick a new region from the drop-down list. 
      If you modify the :guilabel:`Preferred` region, the |service| 
      cluster calls for one or more elections to select a new 
      :term:`primary` in the selected region. See 
      :doc:`/tutorial/test-resilience/test-primary-failover` for
      instructions on testing your application response to a replica set
      election before changing the :guilabel:`Preferred` cluster.
      
      To change the number of nodes |service| deploys to a given 
      region, increase or decrease the :guilabel:`Number of Nodes` 
      value. The total number of nodes across the :guilabel:`Preferred` 
      region and all :guilabel:`Electable` regions must be an odd 
      number.
      
   .. step:: Click :guilabel:`Confirm & Deploy`.
