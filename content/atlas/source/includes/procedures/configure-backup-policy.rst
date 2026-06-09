.. procedure::
   :style: normal
	   
   .. step:: Select the frequency unit from :guilabel:`Frequency Unit` for an existing policy item.

      Alternatively, click :guilabel:`Add Frequency Unit` to add a new
      policy item to your backup policy. You can't specify multiple
      :guilabel:`Hourly` or :guilabel:`Daily` backup policy items.

      .. important:: 
       
         If you have a :ref:`{+bcp+} <backup-compliance-policy>` enabled,
         you can't remove backup policy items that the compliance policy
         requires through self-service backup policy changes. To
         request changes to policy items that the {+bcp+} protects,
         the designated security or legal representative for the
         {+bcp+} must :ref:`contact MongoDB Support <request-support>`
         and complete the required verification process.

   .. step:: Select the specific value for the frequency unit from :guilabel:`Every`.

   .. step:: Specify the retention time.
    
      In the :guilabel:`Retention Time` column, choose a retention value
      and unit for the policy item. To learn more, see
      :ref:`snapshot-retention`.

   .. step:: At the bottom of the page, click :guilabel:`Review Changes`. 
      
      |service| displays a summary of differences between your existing
      backup policy and your new backup policy.

   .. step:: (Optional) Apply changes to existing snapshots.
    
      To apply the retention changes in the updated backup policy to 
      snapshots that |service| took previously, check
      :guilabel:`Update retention time of existing
      snapshots`. 
      
      You must check this **before** saving your changes.

      .. important:: 
       
         This option affects only snapshots created by the updated 
         policy items and whose retention has not been updated 
         individually with the 
         :oas-bump-atlas-op:`Update Cloud Backup Schedule for One Cluster <updategroupclusterbackupschedule>` 
         API call.

   .. step:: (Optional) Delete existing snapshots.
    
      To delete snapshots and snapshot copies associated with policies 
      that you delete, check :guilabel:`Delete all snapshots and any 
      associated snapshot copies from removed policies`. 
      
      You must check this **before** saving your changes.

      Type ``delete snapshots`` in the prompt that appears when you
      check this option.

   .. step:: Click :guilabel:`Confirm`.
