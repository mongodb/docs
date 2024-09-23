Consider these strategies for optimizing your |service| costs.

Underutilized {+Clusters+}
~~~~~~~~~~~~~~~~~~~~~~~~~~

- Use :ref:`auto-scaling <cluster-autoscaling>` for both {+cluster+} tier and storage to 
  match your usage and prevent over-provisioning.

- For {+dedicated-clusters+}, consider scaling down 
  to a lower tier or :ref:`pausing <pause-terminate-cluster>` the {+cluster+} 
  if you won't use it for an extended period.

High Backup Frequency
~~~~~~~~~~~~~~~~~~~~~

- If :ref:`continuous backups <pit-restore>` aren’t necessary for 
  a {+cluster+}, disable this feature to reduce costs.

- :ref:`Lower the frequency of backups <creating-backup-policy>` for less critical 
  {+clusters+}.

Optimize Data Transfer Patterns
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Whenever possible, opt for same-provider, same-region data transfer to minimize 
costs. Only use inter-region or internet transfers when necessary. Locating your 
{+cluster+} in the same region as most of your traffic — likely where you host your 
application — can greatly reduce data transfer costs.

Optimize Queries
~~~~~~~~~~~~~~~~

Queries that take a long time to execute can increase resource usage, 
requiring higher-tier {+clusters+}. :ref:`Optimize these queries <performance-advisor>` 
to reduce resource consumption and lower costs as a result.

Optimize Storage
~~~~~~~~~~~~~~~~

Use features like :ref:`online archive <online-archive-overview>` 
or :manual:`TTL indexes </core/index-ttl/>` to 
move older data from more expensive hot storage to less expensive cold 
storage. After you archive data, you can access the data through 
:ref:`Atlas Data Federation <data-federation-overview>`. 

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

Use Support Resources
~~~~~~~~~~~~~~~~~~~~~

- :ref:`Atlas Basic Support <atlas-support>`: Available for all customers at no 
  additional cost, providing a foundational level of assistance.

- :ref:`Developer and Premium Support <atlas-support>`: For teams that require 
  faster response times and end-to-end database support. 

- `Consulting Sessions <https://www.mongodb.com/services/consulting>`__: For 
  complex workloads, consider consulting sessions to focus on optimization and 
  cost reduction strategies.
