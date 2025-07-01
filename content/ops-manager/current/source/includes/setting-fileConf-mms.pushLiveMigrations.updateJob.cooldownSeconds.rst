.. setting:: mms.pushLiveMigrations.updateJob.cooldownSeconds

   *Type*: boolean

   
   The interval, in seconds, between information
   sync refreshes for an organization's project. The default interval
   between sync refreshes is ``10``. |mms| expects sync refreshes to
   occur within an interval from 10 to 43200 seconds (12 hours). If
   the actual interval between consecutive syncs is longer than 43200
   seconds, the Live Migration to |service-short| might stall, time out,
   or fail.
   
   .. note::
   
      After updating this setting, restart the Web Server
      for the change to take effect.
   

