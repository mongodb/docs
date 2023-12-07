.. setting:: mms.pushLiveMigrations.syncJobs.enabled

   *Type*: boolean

   
   If set to ``true``, allows |mms| to request information about Live Migration
   processes, such as:
   
   - The list of available projects and deployments that can be used as
     sources for Live Migrations.
   - The list of available configured migration hosts that can
     facilitate Live Migrations in their respective deployments and projects.
   - The current status of running Live Migrations in |service-short|.
   
   |mms| uses this information to facilitate Live Migration processes.
   The default is ``true``.
   

