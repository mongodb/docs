.. setting:: mms.pushLiveMigrations.fetchJob.intervalSeconds

   *Type*: boolean

   
   The repeat interval, in seconds, for syncing the Live Migration plan
   updates from |service-short|.The plan lists the steps in the
   |service-short| migration process. |mms| periodically retrieves the
   current plan from |service-short| to check progress. Without this
   information, |mms| does not move the Live Migration process to the
   next stage.
   
   The default interval between syncs is ``60``. |mms| expects sync
   refreshes to occur within an interval from 10 to 43200 seconds (12
   hours). If the actual interval between consecutive syncs is longer
   than 43200 seconds, the Live Migration to |service-short| might
   stall, time out, or fail.
   
   .. note::
   
      After updating this setting, restart the Web Server
      for the change to take effect.
   

