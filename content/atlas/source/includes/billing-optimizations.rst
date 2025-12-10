Consider these strategies for optimizing your |service| costs.

Optimize Workload 
~~~~~~~~~~~~~~~~~

Optimize Queries
````````````````

Queries that take a long time to execute can increase resource usage, 
requiring higher-tier {+clusters+}. :ref:`Optimize these queries <performance-advisor>` 
to reduce resource consumption and lower costs.

Index Management
`````````````````

Create indexes for frequent queries and ensure that the indexes you create include all 
fields being queried. Also consider running unindexed queries on separate nodes. For 
{+dedicated-clusters+}, the :ref:`Performance Advisor <performance-advisor>` 
recommends indexes to create or drop.

Query Result Filtering
```````````````````````

Filter and limit query results based on input and feedback from the end user. 
Ensure that you're only returning important results to reduce the amount of 
data returned, and thus save on egress costs.

.. _billing-optimizations-cluster-costs:

Optimize {+Cluster+} Costs 
~~~~~~~~~~~~~~~~~~~~~~~~~~

Optimize Data Transfer Patterns
```````````````````````````````

Whenever possible, deploy resources to the same provider and region to minimize 
data transfer costs. Only use inter-region or internet transfers when necessary. 


Underutilized {+Clusters+}
``````````````````````````

- Use :ref:`auto-scaling <cluster-autoscaling>` for both {+cluster+} tier and storage to 
  match your usage and prevent over-provisioning.

- For {+dedicated-clusters+}, consider scaling down 
  to a lower tier or :ref:`pausing <pause-terminate-cluster>` the {+cluster+} 
  if you won't use it for an extended period.

- Create a separate {+cluster+} tier for aggregation queries to help isolate 
  analytics work and ensure operational queries remain fast and responsive 
  without affecting costs associated with the primary workload as your 
  analytics needs change or grow over time.

Optimize Storage
````````````````

- Use features like :ref:`online archive <online-archive-overview>` 
  or :manual:`TTL indexes </core/index-ttl/>` to 
  move older data from more expensive hot storage to less expensive cold 
  storage. After you archive data, you can access the data through 
  :ref:`Atlas Data Federation <atlas-data-federation>`. 

- |service| supports scaling |azure| |iops| independently 
  from storage. You can increase storage performance without increasing storage.

- You can increase storage to up to 14 terabytes per replica set for 
  single-region clusters.

High Backup Frequency
`````````````````````

- If :ref:`continuous backups <pit-restore>` aren’t necessary for 
  a {+cluster+}, disable this feature to reduce costs.

- :ref:`Lower the frequency of backups <creating-backup-policy>` for less critical 
  {+clusters+}.

Optimize Network Costs
``````````````````````

- Lower network egress volume between the driver and |service| 
  by up to 50%, at only a slight increase in compute.

- Avoid cross-region egress costs for multi-regional businesses, while also reducing latency.

- Reduce inter-AZ data transfer costs by directly targeting nodes.

Analyze Spend
~~~~~~~~~~~~~

Monitor Spending with Cost Explorer
```````````````````````````````````

Regularly use the :ref:`Cost Explorer <cost-explorer>` tool to monitor spending 
patterns at the organization, project, {+cluster+}, and service levels. Set a 
frequency that works for your needs.

Set Alerts
``````````

Configure :ref:`billing alerts <billing-alerts>` for key thresholds, such as 
when your monthly costs exceed a certain amount.  For example, set an alert when 
costs exceed $100. This proactive approach helps you avoid surprises.

Review Invoices
```````````````

Each month, review your invoice to assess the highest-cost services using the 
previous billing optimization suggestions. This is a recommended best practice 
to identify cost reduction opportunities.

Support Resources
~~~~~~~~~~~~~~~~~

- :ref:`Atlas Basic Support <atlas-support>`: Available for all customers at no 
  additional cost, providing a foundational level of assistance.

- :ref:`Developer and Premium Support <atlas-support>`: For teams that require 
  faster response times and end-to-end database support. 

- `Consulting Sessions <https://www.mongodb.com/services/consulting>`__: For 
  complex workloads, consider consulting sessions to focus on optimization and 
  cost reduction strategies.
