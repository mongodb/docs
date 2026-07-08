.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-backup-details.rst

   .. step:: Select the snapshot to restore and click :guilabel:`Restore`.

      In the :guilabel:`Actions` column, expand the 
      :icon-fa5:`ellipsis-v` :guilabel:`Actions` menu, and click 
      :guilabel:`Restore` for the snapshot that you want to restore.

   .. step:: Select restore type and write strategy.

      In the :guilabel:`Source Details` pane, select
      :guilabel:`Restore database(s)/collection(s)`.

      Under the :guilabel:`Write Strategy` heading, select the write
      strategy suitable for your use case. To learn more, see
      :ref:`{+Db-Coll-Restore+} Considerations
      <restore-from-db-coll>`.

   .. step:: Select data to restore.

      Under the :guilabel:`Select Restore Data` heading, first choose
      your preferred entry method.

      If you select :guilabel:`Checkbox Entry`, {+service+} displays a
      list of all databases captured by the snapshot. Each database
      entry includes a collapsible list of all of its collections to
      enable collection-level restore.

      If you select :guilabel:`List Entry`, {+service+} displays a
      text entry field in which you provide the names of the databases
      or collections you want to restore. Enter each name on its own
      line. Enter databases by their names, enter collections in the
      ``database.collection`` name format.

      Click :guilabel:`Continue`.

   .. step:: Specify the restore target.

      In the :guilabel:`Destination` pane, select the project that
      hosts the restore target cluster from the :guilabel:`Destination
      Project` dropdown.

      Select the restore target cluster from the
      :guilabel:`Destination Cluster` dropdown.

      The source project and cluster of the snapshot appears with the
      :guilabel:`Source` label.

      If you use the :guilabel:`Add as new` write strategy and any of
      your selected databases or collections have the same names as
      databases or collections already on the destination cluster,
      {+service+} renames these by appending a suffix to each database
      or collection.

      You can also optionally rename databases or collections under
      the :guilabel:`Rename database(s)/collection(s)` heading. You
      can either rename specific databases or collections
      individually, or batch-rename them by clicking :guilabel:`Add a
      suffix to all source names` and entering a suffix into the
      prompt.

   .. step:: Specify restore details.

      In the :guilabel:`Restore Details` pane, select the set of
      indexes you want to restore as part of the restore job from the
      :guilabel:`Indexes` dropdown menu.

      Click :guilabel:`Continue`.

   .. step:: Review restore job details and initiate the restore.

      Verify that the details of the restore job are correct. If you
      choose the :guilabel:`Overwrite Existing` write strategy, you
      must type the destination cluster name to confirm the action
      where prompted.

      Click :guilabel:`Start Restore`.		

   .. step:: Restart your application and ensure it uses the new target {+database-deployment+}.
