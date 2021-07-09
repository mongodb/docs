.. _opsmgr-server-5.0.0:

|onprem| Server 5.0.0
~~~~~~~~~~~~~~~~~~~~~

*Released 2021-07-13*

MongoDB Cloud Migration Service
```````````````````````````````

Adds the MongoDB Cloud Migration Service. This service extends
|service| Live Migrations. After linking your |onprem| or |cloud|
organization to your |service| organization, you can launch a Live
Migration for an existing cluster, and migrate all data to |service|.

MongoDB Cluster Management
``````````````````````````

- Supports managing, monitoring, and backing up MongoDB 5.0 deployments.

- Highlights deployments running without best-practice security
  features enabled (|tls|, authentication, authorization) in the
  **Clusters** page.

- Highlights changes to MongoDB clusters that result in processes
  restarts in the **Review and Deploy** confirmation modal.

Backup
``````

- Improves snapshot resiliency to transient failures for clusters
  running MongoDB 4.2 or later.

- Improves performance for snapshots running MongoDB 4.2 or later.

- Improves metadata management and handling of large files.

Activity Feed
`````````````

- Increases granularity of date filters in Activity Feed to the hour. 

- Adds ability for admins to download a |json| view of the Activity
  Feed.

- Adds categories of events for improved filtering of Activity Feed
  items. These improvements exist in both the console and the |api|.

Deprecated Language
```````````````````

- Changes all instances of the following terms in the activity feed,
  console, and |api| endpoint |url|\s:

  - **Whitelist** or **Blacklist** to **Access List**
  - **slaveDelay** to **secondaryDelaySecs**

  Make sure to update any application code or scripts with these
  updated labels to reflect this change.

Performance Advisor
```````````````````

- Supports up to 200,000 logs.

- Doesn't cap logs read at 10 MB.

- Suggests removing redundant, unused, or hidden indexes.

Monitoring
``````````

Adds new hardware charts for system level memory, swap, and network
usage on RHEL Linux.

Kubernetes
``````````

Simplifies deploying Kubernetes MongoDB resources. This release adds a
wizard-like interface to generate configuration files in the |onprem|
console. MongoDB Kubernetes Enterprise Operator
:k8s:`improvements released </release-notes>` separately.

|onprem| Packaging
``````````````````

- Signs |onprem| packages with PGP.

- Supports |onprem| services on RedHat Enterprise Linux version 8 on
  the ppc64le architecture.
