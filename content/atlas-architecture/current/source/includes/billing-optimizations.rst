Consider these strategies for optimizing your |service| costs.

Scale Down Underutilized {+Clusters+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use Performance Advisor and cluster metrics to identify oversized 
clusters. Look for consistently low 
``System Max: User CPU utilization`` (under 45%) or excess
RAM that's never fully utilized. Then downsize to a tier that
better matches your actual workload patterns.

Many teams start with larger clusters and
forget to adjust as they learn their real usage patterns.
|service| offers Low CPU options for lighter workloads and
flexible sizing that lets you match resources to reality
instead of guesswork. Right-sizing is often the single biggest
cost lever you can pull.

To learn more, see :atlas:`Scaling Down a Cluster Reactively 
</cluster-autoscaling/#scaling-down-a-cluster-tier-reactively>`.

- Enable :ref:`auto-scaling <cluster-autoscaling>` on your {+cluster+}
  tier to match your usage and prevent over-provisioning.
  
  Scaling down occurs once every six hours and must match
  specific conditions. To learn more, see :atlas:`Scaling Down a Cluster Tier 
  </cluster-autoscaling/#scaling-down-a-cluster-tier>`.

  You can also manually move to a lower {+cluster+} tier by regularly
  monitoring the cluster's |cpu|, WireTiger cache, memory, and IOPs
  over a rolling 30 day period of normal use. Generally, if the usage
  is steadily below 45% of allocated resources, we recommend that you
  scale down. 

- For {+dedicated-clusters+}, consider scaling down 
  to a lower tier or :ref:`pausing <pause-terminate-cluster>` the {+cluster+} 
  if you won't use it for an extended period. 
  
  We recommend that you
  use ``M10`` or ``M30`` {+clusters+} for development and test environments. To learn more, see :ref:`arch-center-cluster-size-guide`.
  
- For development and test environments, we recommend that you:

  - Enable a cron job to
    pause dev and test {+clusters+} during the night when no one actively develops against the {+cluster+}. You can pause {+clusters+} with the
    {+atlas-admin-api+} by setting the ``paused`` field to ``true`` when
    using either of the following methods:
    
    - :oas-bump-atlas-op:`Modify One Cluster <updategroupcluster>` endpoint.
    - `Terraform cluster resource <https://registry.terraform.io/providers/mongodb/mongodbatlas/latest/docs/resources/cluster#paused-2>`__.

  - Set an alert in your 
    third party metrics or alerting system that triggers if a dev or
    test {+cluster+} has not had any activity in over one week.

  - Consider terminating unused dev and test {+clusters+} after a 
    set amount of time and sufficient email alerts to the {+cluster+}
    owner. You can terminate a {+cluster+} with the following methods:

    - {+atlas-admin-api+} by using the :oas-bump-atlas-op:`Remove One Cluster
      <deletegroupcluster>` endpoint.
    - `Terraform cluster resource
      <https://registry.terraform.io/providers/mongodb/mongodbatlas/latest/docs/resources/cluster#termination_protection_enabled-2>`__
      by setting the ``termination_protection_enabled`` field to ``false``.

Avoid Uneven Shard Distribution
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For sharded clusters, :atlas:`review your scaling strategy 
</cluster-autoscaling/#scaling-a-sharded-cluster>` to avoid 
hot shards. A hot shard occurs when one shard in your cluster
receives disproportionately more traffic or data than
others, forcing you to scale up the entire cluster when
only that single shard needs more resources.

Check how your collections are spread across shards to
spot these lopsided situations. Look for busy collections
that aren't sharded yet. Distribute them properly
so that you can scale back your overall cluster size. You
can also set up different sharding approaches for different collections 
based on how you actually use each one. First try to rebalance traffic 
so its even across shards, but if this is not possible leverage the 
:atlas:`independent shard feature 
</cluster-sharding/#independent-shard-scaling>`.

When you don't use independent shard scaling, hot shards are expensive 
because you end up paying to scale resources you don't actually need 
across your whole cluster. When you spread the load more evenly through
smart sharding, you can adjust your setup and avoid
unnecessary costs. The savings depend on your specific
workload, but these approaches help you grow in a stable,
cost-effective way as your data patterns change.

To learn more, see :ref:`arch-center-scalability`.

Optimize Backup Configurations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- :ref:`Continuous backups <pit-restore>` are expensive, but they give
  you the most safety to recover data from any point in time within the
  backup window in case of disaster or code logic error. We recommend
  that you enable continuous backups only for production applications at
  the most critical data tier.

- :ref:`Lower the frequency of backups <creating-backup-policy>` for
  {+clusters+} that store less critical data. Consider terminating
  these {+clusters+} entirely for development environments.

Optimize Data Transfer Patterns
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Whenever possible, opt for same-provider, same-region data transfer to
minimize costs. Only use inter-region or internet transfers when
necessary, such as for disaster recovery scenarios where you need to
restore the application in a different region. Locating your {+cluster+}
in the same region as most of your traffic — usually where you host your
application — can greatly reduce data transfer costs.

.. note::

   To learn more and for guidance specific to your cloud provider, see 
   :ref:`reducing-data-transfer-costs`.

Compress Network Traffic
~~~~~~~~~~~~~~~~~~~~~~~~

Enable network compression in your client driver to compress data 
between the client and the server. As an example, you can configure the 
:driver:`network compression 
</node/current/fundamentals/connection/network-compression/>` 
option for your Node.js driver. |service| always compresses 
intra-cluster communication.

To learn more, see :ref:`reducing-data-transfer-costs`.

Optimize Connection Pooling
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Review your application's connection pool settings and
right-size them to match your actual concurrent usage
patterns. Most applications can safely reduce their
maximum pool size from default settings while adding
proper connection timeouts and retry logic.

Each database connection consumes resources on both
your application and cluster sides. Over-provisioned
connection pools create unnecessary overhead and can
actually hurt performance through connection thrashing.

To learn more, see 
:manual:`MongoDB Atlas Connection Limits and Cluster Tier </reference/limits/?atlas-provider=aws&atlas-class=general#mongodb-atlas-connection-limits-and-cluster-tier>`

Avoid Inefficient Queries
~~~~~~~~~~~~~~~~~~~~~~~~~

Check all applications and processes that access your data for
inefficiencies. Ensure that queries do not:

- Re-read data that already exists on the client.

- Re-write existing data to your cluster.

To learn more, see :ref:`reducing-data-transfer-costs`.

.. tip::

   Use :manual:`projection 
   </tutorial/project-fields-from-query-results/>` to select which 
   document fields to return from a query. By default, queries 
   return all fields in matching documents. To limit the amount of data 
   that |service| sends to applications, you can include a projection 
   document to specify or restrict fields to return.

Optimize Queries
~~~~~~~~~~~~~~~~

Queries that take a long time to execute can increase resource usage, 
requiring higher-tier {+clusters+}. :ref:`Optimize these queries <performance-advisor>` 
to reduce resource consumption and lower costs as a result.

Schedule quarterly query tune-ups with your team to
review your slowest queries and audit your index footprint.
Use Performance Advisor to identify
missing indexes and :atlas:`Query Profiler </tutorial/query-profiler/>` 
to spot expensive operations. Create a simple spreadsheet to track your 
top 10 costliest queries and their optimization status.

Queries degrade as data grows. A query that performs well at
1GB can easily surpass your budget at 100GB. Meanwhile, unused
indexes consume storage and slow down writes without
delivering value. Regular reviews catch performance drift
early and keep your indexing strategy lean and purposeful.

To learn more, see 
:atlas:`Analyze Slow Queries </analyze-slow-queries/>`.

Paused |fts| Indexes
~~~~~~~~~~~~~~~~~~~~

An |fts| index might be stale because of any of the following reasons: 
       
- Replication stopped due to high disk utilization. 
       
  For dedicated |fts| nodes, the pause replication threshold
  is 90% and the resume replication threshold is 85% disk utilization 
  for all writes on the cluster. 
  Without dedicated |fts| nodes, the pause replication threshold
  is 96% and the resume replication threshold is 94% disk utilization 
  for all writes on the cluster.

- If replication stops for a period longer than the oplog window, the 
  |fts| ``mongot`` process falls off the oplog and then must be 
  resynced. 
  
  This state commonly occurs when the current replication point
  is no longer available on the |mongod| oplog. |service|
  rebuilds index if the ``mongot`` process falls off the oplog, which 
  can be resource intensive and take a notable amount of time.

- Index reached the two billion document limit.

- Replication failed due to an error.
       
You can still query the existing index. However, the results for 
queries against a stale index might contain stale data. You can
upscale your search nodes for more disk space and, if you arent 
currently above the block threshold, delete existing indexes to release 
disk space. Alternatively, use the error in the
:guilabel:`View status details` modal window to troubleshoot the
issue.

To learn more, see :atlas:`Fix MongoDB Search Issues 
</reference/alert-resolutions/atlas-search-alerts/>`.

Optimize Schema Patterns
~~~~~~~~~~~~~~~~~~~~~~~~

Work with your |service| team to review your collections for
cost-heavy patterns like oversized documents, unbounded
arrays, or schemas that force expensive operations. Look
for opportunities to embed related data that's accessed
together, while keeping individual documents under
reasonable sizes. Focus on eliminating patterns that require
complex aggregations or cross-collection lookups when
simpler document structures could work.

Poor schema design quietly drives up costs through
inefficient queries and storage bloat. The |service| document
model naturally eliminates expensive relational operations
when designed properly. Well-designed collections reduce
compute overhead, minimize index requirements, and
improve query performance, all of which directly impact
your monthly bill.

To learn more, see :atlas:`Schema Design 
</monitoring-alerts/?interface=atlas-ui#schema-design>`.

Optimize Storage
~~~~~~~~~~~~~~~~

Use features like :ref:`online archive <online-archive-overview>` 
or :manual:`TTL indexes </core/index-ttl/>` to move older data from more
expensive hot storage to less expensive cold storage, or delete data
that is no longer needed. After you archive data, you can access the
data through :ref:`Atlas Data Federation <atlas-data-federation>`. 

Use Cost Explorer
~~~~~~~~~~~~~~~~~

Regularly use the :ref:`Cost Explorer <cost-explorer>` tool to monitor spending 
patterns at the organization, project, {+cluster+}, and service levels. Set a 
frequency that works for your needs.

Set Alerts
~~~~~~~~~~

Configure :ref:`billing alerts <billing-alerts>` for key thresholds, such as 
when your monthly costs exceed a certain amount.  For example, set an alert when 
costs exceed $100. This proactive approach helps you avoid surprises.

Review Invoices
~~~~~~~~~~~~~~~

Each month, review your invoice to assess the highest-cost services using the 
previous billing optimization suggestions. This is a recommended best practice 
to identify cost reduction opportunities.

If you see unexpected changes on your invoice, check your cloud
computing costs, which are often the largest portion of your bill. You
can review cloud computing costs in the :guilabel:`Summary By Service`
card of any invoice within the |service| :guilabel:`Billing` section.
The :guilabel:`Summary By Service` view shows the costs of all
{+clusters+} by provider, tier, and region.

Choose the Right Deployment Paradigm and Topology
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The deployment paradigm and topology you choose can change your |service| costs.

To learn more about cost savings for different topologies, see :ref:`arch-center-high-availability`.

Set Up Resource Tagging
~~~~~~~~~~~~~~~~~~~~~~~

Apply consistent tags to your |service| projects and
clusters by team, environment, or cost center.
Use descriptive tags like "team-marketing", "env-production", or 
"project-mobile-app" to create
clear ownership and spending visibility across your
organization.

Without proper tagging, your |service| bill
becomes obfuscated where it's impossible to
track which teams or projects are driving costs.
Resource tagging transforms your Cost Explorer
into a powerful accountability tool, making it
easy to identify cost trends, allocate expenses
accurately, and spot optimization opportunities by
department or workload type.

To learn more, see :atlas:`Resource Tags </tags/>`.
