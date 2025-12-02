.. procedure::
   :style: normal
	   
   .. step:: Select the frequency unit from :guilabel:`Frequency Unit`
      for an existing policy item.

      Alternatively, click :guilabel:`Add Frequency Unit` to add a new
      policy item to your backup policy. You can't specify multiple
      :guilabel:`Hourly` or :guilabel:`Daily` backup policy items.

      :gold:`IMPORTANT:` If you have a :ref:`{+bcp+} enabled
      <backup-compliance-policy>`, only MongoDB support can delete
      :ref:`policy items <creating-backup-policy>` specified in the
      {+bcp+}. To delete policy items specified in the {+bcp+}, you
      must :ref:`request support <request-support>` and complete an
      extensive verification process.

   .. step:: Select the specific value for the frequency unit from
      :guilabel:`Every`.

   .. step:: Specify the retention time for the policy item in
      :guilabel:`Retention Time` and the units for the retention time
      from the list the right. To learn more, see
      :ref:`snapshot-retention`.

   .. step:: At the bottom of the page, click :guilabel:`Review
      Changes` to see a summary of differences between your existing
      backup policy and your new backup policy.

   .. step:: (Optional) To apply the retention changes in the updated
      backup policy to snapshots that |service| took previously, check
      :guilabel:`Update retention time of existing
      snapshots`. You must check this **before** saving your changes.

      :gold:`IMPORTANT:` This option affects only snapshots created by
      the updated policy items and whose retention has not been
      updated individually with the :oas-bump-atlas-op:`Update Cloud
      Backup Schedule for One Cluster
      <updategroupclusterbackupschedule>` API call.

   .. step:: (Optional) To delete snapshots and snapshot copies
      associated with policies that you delete, check
      :guilabel:`Delete all snapshots and any associated snapshot
      copies from removed policies`. You must check this **before**
      saving your changes.

      Type ``delete snapshots`` in the prompt that appears when you
      check this option.

   .. step:: Click
      :guilabel:`Confirm`.
