If the ``mongodbResourceRef`` field is not explicitly set up, |mms| defaults to the
:opsmgr:`Application Database</core/system-overview/#application-database>`, which has
limited scalability and may not be suitable for larger environments. 

This default configuration is  **not recommended** for production or at-scale deployments
because it can lead to severe performance degradation, instability in the {+appdb+}, and backup
failures. For production environments always configure a separate MongoDB instance using
``mongodbResourceRef`` for each backup and oplog store’s metadata.

You  **cannot**  change your selected configuration nor migrate the backup to another
location after the deployment. The only alternative is to stop the backup entirely and
restart it, which renders all previous backups unavailable.