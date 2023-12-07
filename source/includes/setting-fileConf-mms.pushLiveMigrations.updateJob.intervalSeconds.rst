.. setting:: mms.pushLiveMigrations.updateJob.intervalSeconds

   *Type*: boolean

   
   The repeat interval, in seconds, between sync refreshes.
   The syncs of the organization's project information between
   |mms| and |service-short| occur periodically. The default interval
   between syncs is ``60``. |mms| expects sync refreshes to occur
   within an interval from 10 to 43200 seconds (12 hours). If the
   actual interval between sync refreshes is longer than 43200 seconds
   or if the actual interval between sync refreshes is longer than 1800
   seconds (30 minutes) during the validation phase, the Live Migration
   to |service-short| might stall, time out, or fail.
   
   
   .. note::
   
      After updating this setting, restart the Web Server
      for the change to take effect.
   

