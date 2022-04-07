  When Atlas detects that the source and destination clusters are nearly
  in sync, it starts an extendable 72 hour timer to begin the cutover
  procedure. If the 72 hour period passes, Atlas stops synchronizing with
  the source cluster. You can extend the time remaining by 24 hours by
  clicking the :guilabel:`Extend time` hyperlink below the :guilabel:`<time>
  left to cut over` timer.

  a. Once you are prepared to cut your applications over to the
     destination Atlas cluster, click :guilabel:`Prepare to Cutover`.

  #. Atlas displays a walk-through screen with instructions
     on how to proceed with the cutover. These steps are also outlined
     below:

     1. Stop your application. This ensures that no additional writes
        are generated to the source cluster.

     #. Wait for the optime gap to reach zero. When the counter reaches
        zero, the source and destination clusters are in sync.

     #. Restart your application using the new connection string
        provided in step 3 of the Live Migrate cutover UI.

  #. Once you have completed the cutover procedure and confirmed
     your applications are working normally with the Atlas cluster,
     click :guilabel:`Cut Over` to complete the migration procedure.
     This allows Atlas to:

     - Mark the migration plan as complete.
     - Remove the Application Server subnets from the destination
       cluster IP access list.
     - Remove the MongoDB user that Live Migrate used to import data
       to the destination cluster.
