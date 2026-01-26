.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: If you enabled :guilabel:`Termination Protection`, disable it.
      
      a. Click :icon-mms:`ellipsis` next to the cluster you want to disable 
         :guilabel:`Termination Protection` for.
      #. Click :guilabel:`Edit Config` from the drop-down menu.
      #. Click :guilabel:`Additional Settings`.
      #. Toggle :guilabel:`Termination Protection` to :guilabel:`Off`.
      #. Click :guilabel:`Review Changes`.
      #. Click :guilabel:`Apply Changes`.

   .. step:: Click :icon-mms:`ellipsis` next to the cluster you want to terminate.
      
   .. step:: Click :guilabel:`Terminate` from the drop-down menu.

   .. step:: (Optional) Keep existing snapshots after termination.
      
      If you have a :ref:`{+bcp+} enabled <backup-compliance-policy>` and 
      you terminate a {+cluster+}, |service| automatically maintains all 
      existing snapshots after the termination according to the backup 
      policy. |service| retains the :term:`oplog` for 
      :ref:`restoring a point in time with {+pit-restore+} 
      <recover-pit-continuous-cloud-backup>` in a static state until 
      |service| can no longer use them for {+pit-restore+}.
      
      Otherwise, if you are terminating a cluster with {+Cloud-Backup+} 
      enabled, you must toggle :guilabel:`Keep existing snapshots after 
      termination` to :guilabel:`On` to retain any existing snapshots 
      after termination. This option instructs |service| to keep the 
      existing snapshots and :term:`oplog` for the cluster according to 
      your cluster's 
      :ref:`backup policy <cloud-provider-retention-policy>`. If you 
      have {+Cloud-Backup+} disabled, this option is unavilable.
            
   .. step:: Confirm the termination.
      
      a. Enter the cluster name.
      
      #. Click :guilabel:`Terminate`.  
