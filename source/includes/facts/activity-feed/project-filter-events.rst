Filter by event
  Select the event categories or specific events you want to see from
  the activity feed. To exclude specific categories or events from the
  activity feed, click :guilabel:`Select all categories and events`,
  then deselect the categories and events you want to exclude.

  You can filter events based on the following categories:

  .. list-table::
      :header-rows: 1
      :widths: 20 40

      * - Category
        - Description

      * - Access
        - Events related to |service| users. The following filters are available: 

          - A new API key has been created
          - Service Account has been created
          - A third party integration has been configured
          - A third party integration has been removed
          - All users have multi-factor authentication enabled
          - An API Key has been deleted
          - Service Account has been deleted
          - API Key Access List Entry Added
          - API Key Access List Entry Deleted
          - API Key added to Group
          - API Key Description Changed
          - API Key removed from Group
          - API Key Roles Changed
          - API Key Access List Entry Added
          - API Key Access List Entry Deleted
          - Service Account Details have been changed
          - Service Account had its roles changed
          - Service Account added to Project
          - Service Account removed from Project
          - Service Account Access List Entry Added
          - Service Account Access List Entry Deleted
          - Service Account Secret Deleted
          - Service Account Secret Added
          - Service Account UI IP access list inheritance enabled
          - Service Account UI IP access list inheritance disabled
          - M0 clusters per project limit exceeded
          - No pending user requests to join project
          - Number of M0 clusters per project within limit
          - Request to join project was approved
          - Request to join project was denied
          - Security checkup alerts updated
          - Team added to project
          - Team removed from project
          - Team roles modified in project
          - User had their role changed
          - User joined the project
          - User left the project
          - User requested to join project
          - User security settings updated
          - User was invited to project
          - Users awaiting approval to join project
          - Users do not have multi-factor authentication enabled

      * - Agent
        - Events related to the MongoDB agent. The following filters are available:

          - Automation is down
          - Automation is up
          - Backup does not have the latest version
          - Backup has the latest version
          - Backup is down
          - Backup is up
          - Monitoring does not have the latest version
          - Monitoring has the latest version
          - Monitoring is down
          - Monitoring is up
          - New agent


      * - Alerts
        - Events related to alert configuration and monitoring. The following filters are available:

          - A collection was created for a cluster
          - A list of database collections requested for a cluster
          - A list of database namespaces requested for a cluster
          - A list of databases requested for a cluster
          - Alert acknowledged
          - Alert configuration added
          - Alert configuration changed
          - Alert configuration deleted
          - Alert configuration disabled
          - Alert configuration enabled
          - Alert unacknowledged
          - Cluster feature compatibility version was fixed
          - Cluster feature compatibility version was unfixed
          - Cluster version was fixed
          - Cluster version was unfixed
          - Inside metric threshold
          - Outside metric threshold
          - Run aggregation
          - Serverless metric inside threshold
          - Serverless metric outside threshold

      * - Atlas
        - Events related to |service|. The following filters are available:

          - Auto-created index build completed
          - Auto-created index build failed
          - Auto-healing system took action
          - Auto-indexing disabled
          - Auto-indexing enabled
          - Cloud Provider Access AWS IAM Role added
          - Cloud Provider Access AWS IAM Role deleted
          - Cloud Provider Access AWS IAM Role updated
          - Compute auto-scale initiated
          - Disk auto-scale initiated
          - Online Archive active
          - Online Archive created
          - Online Archive deleted
          - Online Archive orphaned
          - Online Archive pause requested
          - Online Archive paused
          - Online Archive updated
          - Online Archive, Insufficient Indexes Alert
          - Online Archive, Insufficient Indexes Alert Resolved
          - Pending indexes deleted
          - Process restart requested
          - Query logs downloaded for Online Archive
          - Rolling index build failed
          - Slow index build detected for auto-created index
          - Stalled index build detected for auto-created index
          - Submitted auto-created index build

      * - Atlas Network and Security
        - Events related to authentication and MongoDB users. The following filters are available:

          - Audit log configuration updated
          - AWS encryption key needs rotation
          - AWS Encryption key rotation no longer due
          - AWS VPC peer created
          - AWS VPC peer deleted
          - AWS VPC peer updated
          - Azure encryption key needs rotation
          - AZURE Encryption key rotation no longer due
          - Azure Virtual Network peering connection active
          - Azure Virtual Network peering deleted
          - Azure Virtual Network peering initiated
          - Azure Virtual Network peering updated
          - Customer key management service encryption at rest key is no longer accessible
          - Encryption at Rest configuration updated
          - GCP encryption key needs rotation
          - GCP Encryption key rotation no longer due
          - GCP VPC peer created
          - GCP VPC peer deleted
          - GCP VPC peering connection active
          - GCP VPC peering connection inactive
          - GCP VPC peering updated
          - MongoDB custom role added
          - MongoDB custom role deleted
          - MongoDB custom role updated
          - MongoDB user added
          - MongoDB user deleted
          - MongoDB user updated
          - MongoDB user X509 certificate created
          - MongoDB user X509 certificate revoked
          - Network permission entry added
          - Network permission entry removed
          - Network permission entry updated
          - Private endpoint created
          - Private endpoint deleted
          - Private endpoint patched
          - Private endpoint service created
          - Private endpoint service deleted
          - Private network endpoint entry added
          - Private network endpoint entry removed
          - Private network endpoint entry updated
          - Self-managed X509 CRL updated
          - X.509 User Authentication, Client Certificates Expiration Alert
          - X.509 User Authentication, Client Certificates Expiration Alert Resolved
          - X.509 User Authentication, Self-Managed CA Expiration Alert
          - X.509 User Authentication, Self-Managed CA Expiration Alert Resolved
          - X.509 User Authentication, Self-Managed CRL Expiration Alert
          - X.509 User Authentication, Self-Managed CRL Expiration Alert Resolved

      * - Audit
        - Events related to stopping operations and modifying cluster data. The following filters are available:

          - Attempted to kill operation
          - Attempted to kill session
          - Granted temporary infrastructure access to MongoDB Support for 24 hours
          - Revoked temporary infrastructure access to MongoDB Support
          - Sample dataset load requested
          - Unprovisioned target group deletion requested
          - User disabled auto defer
          - User enabled auto defer
          - User requested immediate start of project maintenance
          - User requested maintenance for the next window without 72-hours notice

      * - Backup
        - Events related to |service| cluster :ref:`backups <backup-cloud-provider>`. The following filters are available:

          - A Cloud Backup restore has been requested
          - A export bucket has been deleted
          - A fallback snapshot failed
          - A master key rotation has been requested for a replica set.
          - A new export bucket has been added
          - A regular backup failed, but Atlas was able to take a fallback snapshot
          - A restore failed
          - A restore has been requested
          - A restore succeeded
          - A snapshot was taken successfully
          - A tenant restore has been requested
          - A tenant restore has completed
          - A tenant snapshot download has been requested
          - A tenant snapshot has been deleted
          - A tenant snapshot has completed
          - A tenant snapshot has started
          - An on-demand snapshot has been requested
          - Backup authentication credentials updated for cluster
          - Backup authentication credentials updated for replica set
          - Backup configuration is consistent
          - Backup has a good clustershot
          - Backup has been resynced
          - Backup has possibly inconsistent cluster snapshots
          - Backup initial sync finished
          - Backup initial sync started
          - Backup oplog is behind
          - Backup oplog is current
          - Backup requires a resync
          - Backup sync has been initiated
          - Backup sync is pending
          - Checkpoint interval updated for cluster
          - Cloud Backup schedule updated for cluster
          - Cluster backup state is now
          - Cluster snapshot has been deleted
          - Cluster storage engine has been updated
          - Clustershot expiry has been updated.
          - Disabling {+bcp+} has been completed.
          - Disabling {+bcp+} has been requested.
          - Enabling {+bcp+} has been completed.
          - Enabling {+bcp+} has been requested.
          - Excluded namespaces were modified for cluster
          - Excluded namespaces were modified for replica set
          - Export snapshot failed
          - Export snapshot succeeded
          - Inconsistent backup configuration has been detected
          - No snapshot taken over configured period
          - Replica set backup state is now
          - Replica set storage engine has been updated
          - Snapshot expiry has been updated.
          - Snapshot has been deleted
          - Snapshot has been deleted
          - Snapshot has completed
          - Snapshot has started
          - Snapshot schedule updated for cluster
          - Snapshot schedule updated for replica set
          - Snapshot's retention has been edited
          - Tenant snapshot failed
          - Updating {+bcp+} has been completed.
          - Updating {+bcp+} has been requested.
          - Your snapshot download request failed because of a temporary error in provisioning resources. Please try again.

      * - Billing
        - Events related to payments and payment methods. The following filters are available:

          - Account closure initiated
          - Account downgraded
          - Account modified
          - Account upgraded
          - Active Invoicing Period initiated
          - Active Invoicing Period stopped
          - Credit card charge has failed
          - Credit card information was updated
          - Credit card is about to expire
          - Credit card is current
          - Credit card was added
          - Credit card was successfully charged
          - Credit End Date Modified
          - Credit issued
          - Credit Start Date pulled forward
          - Daily amount billed ($) is above threshold
          - Daily amount billed ($) is below threshold
          - Discount applied
          - Invoice address added
          - Invoice address changed
          - Invoice closed
          - Invoice has been paid by check
          - Invoice has been paid by wire transfer
          - Monthly bill has exceeded the limit you set
          - Monthly pending invoice ($) total is below threshold
          - Organization sync with SFSC initiated
          - Payment forgiven
          - PayPal charge has failed
          - Prepaid plan added
          - Project has been granted temporary access
          - Project has been reactivated
          - Project locked due to unpaid invoices over 60 days
          - Project suspended due to unpaid invoices over 30 days
          - Promo Credit issued
          - Refund issued
          - Service restored because all invoices are paid in full
          - Service suspended due to unpaid invoice(s) more than 30 days old
          - Support plan activated
          - Support plan cancellation scheduled
          - Support plan cancelled
          - Terminate all paid services for organization

      * - Charts
        - Events related to :charts:`MongoDB Charts </>` tenants. The following filters are available:

          - Charts activated
          - Charts activation requested
          - Charts reset   
          - Charts upgraded       

      * - Clusters
        - Events related to clusters and shard management, such as :binary:`~bin.mongos` events. This includes events for both replica sets and sharded clusters. The following filters are available:
            
          - A cluster had its SSL certificate manually rotated
          - A Live Migration failed because the cutover time window expired
          - An admin backup snapshot for an instance in the cluster requested
          - An instance in the cluster had its config manually updated
          - An instance in the cluster had its SSL certificate manually revoked
          - An instance in the cluster had its SSL certificate manually rotated
          - An instance in the cluster was manually replaced
          - An instance in the cluster was manually restarted
          - An instance in the cluster was manually stopped and started
          - An instance replacement in the cluster was manually cleared
          - An instance resync in the cluster was manually cleared
          - An instance resync in the cluster was manually requested
          - An instance update in the cluster was manually requested
          - Cluster data migration cancelled
          - Cluster data migration completed
          - Cluster data migration restart requested
          - Cluster data migration started
          - Cluster delete submitted
          - Cluster deleted
          - Cluster has an active mongos
          - Cluster has been automatically paused due to inactivity
          - Cluster is missing an active mongos
          - Cluster Mongot process arguments update submitted
          - Cluster oplog size was changed
          - Cluster server parameters update submitted
          - Cluster startup parameters update submitted
          - Cluster update completed
          - Cluster update started
          - Cluster update submitted
          - Completed a plan
          - Container subnets update requested
          - Database profiling disabled
          - Database profiling enabled
          - Deployment configuration published
          - Host added
          - Host added to replica set
          - Host does not have the latest version
          - Host experienced a rollback
          - Host has been downgraded
          - Host has been upgraded
          - Host has index suggestions
          - Host has recovered
          - Host has restarted
          - Host has security recommendations
          - Host has the latest version
          - Host IP address changed
          - Host is configured in accordance with security best practices
          - Host is down
          - Host is exposed to the public Internet
          - Host is locked down
          - Host is new
          - Host is now a standalone
          - Host is now primary
          - Host is now secondary
          - Host is recovering
          - Host is up
          - Host removed
          - Host removed from replica set
          - Host undeleted
          - Host version changed
          - Host's SSL certificate is current
          - Host's SSL certificate will expire within 21 days
          - Index Build Completed
          - Index Build Failed
          - Logs downloaded for Atlas host
          - Logs downloaded for BI Connector
          - Mongot no longer crashing due to out of memory error
          - Monitoring for host disabled
          - Monitoring for host disabled and hidden
          - Monitoring for host hidden
          - Monitoring for host paused
          - Monitoring for host resumed
          - Move in progress was skipped
          - New cluster created
          - New cluster ready to use
          - Plan was manually abandoned
          - Proxy has panicked
          - Proxy was restarted
          - Replica set elected a new primary
          - Replica set elected multiple primaries
          - Replica set elected one primary
          - Replica set has an updated configuration
          - Replica set has enough healthy members
          - Replica set has no primary
          - Replica set has too few healthy members
          - Replica set has too many election events
          - Replica set has too many unhealthy members
          - Replica set member added
          - Replica set member removed
          - Replication Oplog Window
          - Replication oplog window is healthy
          - Rolling Index Build Succeeded
          - Scheduled maintenance will occur
          - Search process ran out of memory
          - Secondary Index automatically created
          - Shard added
          - Shard removed
          - Shared cluster upgrade started
          - Started a plan
          - Tenant cluster upgrade from MTM
          - Tenant restore failed
          - Test of primary failover requested
          - Value is no longer anomalous
  
      * - {+df+}
        - Events related to :ref:`Atlas Data Federation 
          <atlas-data-federation>`:

          - Data Federation tenant removed
          - Data Federation tenant updated
          - New Data Federation tenant created
          - Query logs downloaded for Data Federation Tenant


      * - Maintenance
        - Events related to maintenance windows and maintenance requests. The following filters are available:

          - Agent version was fixed
          - Agent version was unfixed
          - Chef tarball URI override has been set
          - Image override JSON has been set
          - Instance force replaced for OS maintenance
          - Instance Reboot for OS maintenance requested
          - Maintenance Is Scheduled
          - Maintenance is Scheduled  
          - Maintenance No Longer Needed
          - Maintenance Started
          - Maintenance window configuration added
          - Maintenance window configuration changed
          - Maintenance window configuration deleted   

      * - Others
        - Miscellaneous events, including log retrieval and :bic:`BI Connector </>` events. The following filters are available:

          - BI Connector is down
          - BI Connector is up
          - Case created.
          - Log collection has been requested.
          - Logs archive download has started.
          - Support email sent

      * - Projects
        - Events related to |service| projects. The following filters are available:

          - Admin requested immediate planning for project
          - Agent API key was created
          - Agent API key was deleted
          - Failure count for all plans in project was reset
          - License accepted
          - Project has been flushed
          - Project limit updated
          - Project maintenance deferred by one week
          - Project maintenance window created
          - Project maintenance window modified
          - Project maintenance window removed
          - Project moved
          - Project name changed
          - Project scheduled maintenance will occur
          - Project was created
          - Project was deleted
 
      * - Resource Tags
        - Events related to |service| :ref:`resource tags 
          <configure-resource-tags>`. The following filter is 
          available:

          - Tag(s) were added/modified.

      * - Search
        - Events related to :ref:`Atlas Search Indexes <ref-index-definitions>`. The following filters are available:

          - Failed to delete Atlas Search indexes
          - Search Index Build Complete
          - Search Index Build Failed
          - Search Index Created
          - Search Index Deleted
          - Search Index Updated

      * - Serverless
        - Events related to |service| Serverless. The following filters are available:

          - New serverless instance created
          - New serverless instance ready to use
          - Serverless auto-scale initiated
          - Serverless Deployment created
          - Serverless Deployment deleted
          - Serverless Deployment Instance rebooted
          - Serverless Deployment Instance replaced
          - Serverless Deployment updated
          - Serverless horizontal scale initiated
          - Serverless instance delete submitted
          - Serverless instance deleted
          - Serverless instance update completed
          - Serverless instance update started
          - Serverless instance update submitted
          - Serverless vertical scale initiated
