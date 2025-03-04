Consider these strategies for optimizing your |service| costs.

Underutilized {+Clusters+}
--------------------------

- Enable :ref:`auto-scaling <cluster-autoscaling>` on your {+cluster+}
  tier to match your usage and prevent over-provisioning.
  
  Scaling down occurs once every six hours and must match
  specific conditions. To learn more, see :atlas:`Scaling Down a Cluster Tier 
  </cluster-autoscaling/#scaling-down-a-cluster-tier>`.

  You can also manually move to a lower {+cluster+} tier by regularly
  monitoring the cluster's |cpu|, WireTiger cache, memory, and IOPs
  over a rolling 30 day period of normal use. Generally, if the usage
  is steadily below 30% of allocated resources, we recommend that you
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
    
    - :oas-atlas-op:`Modify One Cluster </updateCluster>` endpoint.
    - `Terraform cluster resource <https://registry.terraform.io/providers/mongodb/mongodbatlas/latest/docs/resources/cluster#paused-2>`__.

  - Set an alert in your 
    third party metrics or alerting system that triggers if a dev or
    test {+cluster+} has not had any activity in over one week.

  - Consider terminating unused dev and test {+clusters+} after a 
    set amount of time and sufficient email alerts to the {+cluster+}
    owner. You can terminate a {+cluster+} with the following methods:

    - {+atlas-admin-api+} by using the :oas-atlas-op:`Remove One Cluster
      </deleteCluster>` endpoint.
    - `Terraform cluster resource
      <https://registry.terraform.io/providers/mongodb/mongodbatlas/latest/docs/resources/cluster#termination_protection_enabled-2>`__
      by setting the ``termination_protection_enabled`` field to ``false``.


High Backup Frequency
---------------------

- :ref:`Continuous backups <pit-restore>` are expensive, but they give
  you the most safety to recover data from any point in time within the
  backup window in case of disaster or code logic error. We recommend
  that you enable continuous backups only for production applications at
  the most critical data tier.

- :ref:`Lower the frequency of backups <creating-backup-policy>` for
  {+clusters+} that store less critical data. Consider terminating
  these {+clusters+} entirely for development environments.

Optimize Data Transfer Patterns
---------------------------------

Whenever possible, opt for same-provider, same-region data transfer to
minimize costs. Only use inter-region or internet transfers when
necessary, such as for disaster recovery scenarios where you need to
restore the application in a different region. Locating your {+cluster+}
in the same region as most of your traffic — usually where you host your
application — can greatly reduce data transfer costs.

To learn more, see :ref:`reducing-data-transfer-costs`.

Optimize Queries
----------------

Queries that take a long time to execute can increase resource usage, 
requiring higher-tier {+clusters+}. :ref:`Optimize these queries <performance-advisor>` 
to reduce resource consumption and lower costs as a result.

Optimize Storage
----------------

Use features like :ref:`online archive <online-archive-overview>` 
or :manual:`TTL indexes </core/index-ttl/>` to move older data from more
expensive hot storage to less expensive cold storage, or delete data
that is no longer needed. After you archive data, you can access the
data through :ref:`Atlas Data Federation <data-federation-overview>`. 

Use Cost Explorer
-----------------

Regularly use the :ref:`Cost Explorer <cost-explorer>` tool to monitor spending 
patterns at the organization, project, {+cluster+}, and service levels. Set a 
frequency that works for your needs.

Set Alerts
----------

Configure :ref:`billing alerts <billing-alerts>` for key thresholds, such as 
when your monthly costs exceed a certain amount.  For example, set an alert when 
costs exceed $100. This proactive approach helps you avoid surprises.

Review Invoices
---------------

Each month, review your invoice to assess the highest-cost services using the 
previous billing optimization suggestions. This is a recommended best practice 
to identify cost reduction opportunities.

If you see unexpected changes on your invoice, check your cloud
computing costs, which are often the largest portion of your bill. You
can review cloud computing costs in the :guilabel:`Summary By Service`
card of any invoice within the |service| :guilabel:`Billing` section.
The :guilabel:`Summary By Service` view shows the costs of all
{+clusters+} by provider, tier, and region.