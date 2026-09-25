|service| relies on host ping data for autoscaling decisions. Dedicated
cluster data nodes continuously send this ping data to the control plane
regardless of whether autoscaling is enabled. When you enable
autoscaling, |service| can use this historical data to scale immediately
if scaling conditions are met.

|service| scales your {+cluster+} to another tier in the same class. For
example, |service| scales :guilabel:`General` {+clusters+} to other
:guilabel:`General` {+cluster+} classes, but doesn't scale
:guilabel:`General` {+clusters+} to :guilabel:`Low-CPU` {+cluster+}
classes.

|service| won't scale your {+cluster+} tier if the new {+cluster+} tier
would fall outside of your specified :guilabel:`Minimum` and
:guilabel:`Maximum Cluster Size` range. 

If you deploy :term:`read-only nodes <read-only node>` and want your
{+cluster+} to scale faster, consider adjusting your :ref:`Replica Set
Scaling Mode <replica-set-scaling-mode>`.

The exact reactive auto-scaling criteria are subject to change in order
to ensure appropriate cluster resource utilization.

.. include:: /includes/fact-auto-scaling-and-migration.rst

|service| uses the following resource utilization and operation
admission control concepts to determine when to scale your {+cluster+}
up or down:

- **Absolute System CPU Utilization**: Total CPU usage of all processes
  on the node. Visible as :ref:`System CPU <metrics-system-cpu>` in
  |service| metrics.

- **Relative System CPU Utilization**: Value |service| uses for
  autoscaling decisions on ``M10`` and ``M20`` clusters. This is
  calculated as:

  .. code-block:: none
     :copyable: false

     Relative System CPU Utilization = Normalized System CPU / Baseline CPU Utilization
  
  Where: 

  - **Normalized System CPU**: Total CPU usage summed across all cores,
    normalized to the baseline CPU utilization. Visible as
    :ref:`Normalized System CPU <metrics-normalized-system-cpu>` in
    |service| metrics.
  - **Baseline CPU Utilization**: Fraction of full CPU guaranteed to
    your instance by the cloud provider, typically 20%-50% for burstable
    instance types. Not visible in |service| metrics. To learn more, see
    :term:`baseline CPU utilization <baseline CPU utilization>`.

    For example, using 20% as a lower-end estimate for the
    :guilabel:`Baseline CPU Utilization`, the following
    :guilabel:`Relative System CPU Utilization` values correspond to
    these :ref:`Normalized System CPU <metrics-normalized-system-cpu>`
    values in |service| metrics:

    - ``75%`` :term:`relative system CPU utilization` equals ``15%``
      :guilabel:`Normalized System CPU` (75% of 20%).
    - ``90%`` :term:`relative system CPU utilization` equals ``18%``
      :guilabel:`Normalized System CPU` (90% of 20%).

  |service| caps the :guilabel:`Relative System CPU Utilization` at
  100%, even when the calculation exceeds it. If a scale-up occurs when
  :guilabel:`Normalized System CPU` appears low, contact |mdb-support|.

- **System Memory Utilization**: Total memory usage across all processes
  on the node, expressed as a percentage of total memory available to
  the node. This is calculated as:

  .. code-block:: none
     :copyable: false

     System Memory Utilization = Memory Used / Total Memory * 100

  Where:

  - **Memory Used**: Number of bytes of physical memory currently in
    use on the host. Visible as :ref:`System Memory: Memory Used (bytes)
    <metrics-system-memory>` in |service| metrics.
  - **Total Memory**: Total physical memory available to the node, as
    reported by the operating system. |service| does not display this
    value as a separate metric. Not visible in |service| metrics.

  .. note::

     The :guilabel:`System Memory Utilization` value that |service| uses
     for autoscaling decisions might differ slightly from the value
     shown in the |service| metrics panel. If a scale-down does not
     occur when :guilabel:`System Memory Utilization` appears low,
     contact |mdb-support|.

- **Queued or Rejected Operations**: Combined rate of operations
  that |service| queues or rejects to protect your {+cluster+} from
  overload as part of :ref:`Intelligent Workload Management (IWM)
  <intelligent-workload-management>`. |service| calculates this as:

  .. code-block:: none
     :copyable: false

     Queued or Rejected Operations = Queued Operations + Rejected Operations
  
  Where:

  - **Queued Operations**: Average rate per minute of incoming
    operations that |service| adds to the ingress request rate limiter
    queue to wait for admission into the cluster. The per-second rate is
    visible as :ref:`Operation Rate Limiting: Queued operations
    <metrics-operation-rate-limiting>` in |service| metrics.
  - **Rejected Operations**: Average rate per minute of incoming
    operations that |service| rejects because the cluster is overloaded
    and :ref:`Load Shedding <configure-iwm>` is active. The per-second
    rate is visible as :ref:`Operation Rate Limiting: Rejected
    operations <metrics-operation-rate-limiting>` in |service| metrics.

  To learn how IWM works to queue or reject operations in response to
  cluster overload, see :ref:`intelligent-workload-management`.

  A combined value above zero means that your {+cluster+} is under
  overload.

The following sections describe how |service| uses these metrics to
determine when to scale your {+cluster+} up or down.

Conditions for Scaling Up
-------------------------

To manage dynamic workloads for your applications, |service| reactively
scales up nodes in your {+cluster+} under the conditions described in
this section.

To achieve optimal resource utilization and cost profile, |service|
avoids scaling up the {+cluster+} to the next tier if:

- The ``M10`` or ``M20`` {+cluster+} has been scaled up in the past 20
  minutes or one hour, depending on thresholds.
- The ``M30+`` {+cluster+} has been scaled up in the past 10 minutes or
  one hour, depending on thresholds.
- The {+cluster+} has been scaled up in the past 10 minutes, for the
  :guilabel:`Queued or Rejected Operations` criterion.

For example, if the cluster tier has not been changed since ``12:00``,
|service| will scale an ``M30+`` {+cluster+} at ``12:10``, if the
{+cluster+}'s current normalized System CPU Utilization is greater than
90%.

If the next {+cluster+} tier is within your :guilabel:`Maximum Cluster
Size` range, |service| scales :term:`operational nodes <operational
node>` in your {+cluster+} up to the next tier if at least *one* of the
following criteria is true for *any* {+cluster+} node of this type.

.. note::

   The conditions in this section describe operational nodes. For
   :term:`analytics nodes <analytics node>` on any cloud provider,
   |service| scales them up to the next tier if the average
   :guilabel:`Normalized System CPU` or the :guilabel:`System Memory
   Utilization` has exceeded 75% of resources available to any
   {+cluster+} node for the past one hour. |service| doesn't apply the
   :guilabel:`Queued or Rejected Operations` criterion to analytics
   nodes.

The following list groups the criteria by {+cluster+} tier. Within each
tier, CPU-related criteria appear first, followed by memory-related
criteria. Within each of those two sets, criteria specific to a cloud
provider appear first. The remaining criteria appear in order from most
restrictive to least restrictive. The overload criterion applies to
every dedicated tier and appears last.

- ``M10`` and ``M20`` {+clusters+}:

  - |aws|. The average normalized :guilabel:`Relative System CPU
    Utilization` has exceeded 90% for the past 20 minutes and the
    average non-normalized :guilabel:`Absolute System CPU Utilization`
    for :term:`CPU steal` has exceeded 30% for the past 3 minutes.

  - |azure|. The average normalized :guilabel:`Relative System CPU
    Utilization` has exceeded 90% for the past 20 minutes and the
    average non-normalized :guilabel:`Absolute System CPU Utilization`
    for :term:`softIRQ` has exceeded 10% for the past 3 minutes.

  - The average normalized :guilabel:`Absolute System CPU Utilization`
    has exceeded 90% of resources available to the {+cluster+} for the
    past 20 minutes.

  - The average normalized :guilabel:`Relative System CPU Utilization`
    has exceeded 75% of resources available to the {+cluster+} for the
    past one hour.

  - The average :guilabel:`System Memory Utilization` has exceeded 90%
    of resources available to the {+cluster+} for the past 10 minutes.

  - The average :guilabel:`System Memory Utilization` has exceeded 75%
    of resources available to the {+cluster+} for the past one hour.

  .. note::

     If a scale-up occurs when :guilabel:`Normalized System CPU` appears
     low, contact |mdb-support|.

- ``M30+`` {+clusters+}:

  - The average :guilabel:`Normalized System CPU` has exceeded 90% of
    resources available to the {+cluster+} for the past 10 minutes.

  - The average :guilabel:`Normalized System CPU` has exceeded 75% of
    resources available to the {+cluster+} for the past one hour.

  - The average :guilabel:`System Memory Utilization` has exceeded 90%
    of resources available to the {+cluster+} for the past 10 minutes.

  - The average :guilabel:`System Memory Utilization` has exceeded 75%
    of resources available to the {+cluster+} for the past one hour.

- All {+Dedicated-clusters+}, ``M10+``:

  - :guilabel:`Queued or Rejected Operations` remains above zero for
    every sample in the past 10 minutes.

    |service| requires the rate to stay above zero for the entire
    10-minute window rather than averaging it, so a brief burst of
    queueing or rejecting operations during a short traffic spike
    doesn't scale your {+cluster+}. Sustained load shedding indicates
    that your workload exceeds what the current tier can admit, so
    |service| scales up to relieve the overload.

    .. note::

       This criterion measures whether |service| shed load, not how
       much. Any sustained rate above zero meets the threshold.

These thresholds ensure that your {+cluster+} scales up quickly in
response to high loads, maintaining its performance and reliability.

.. note::

   |service| does not trigger cluster tier auto-scaling during a
   :ref:`simulated regional outage <test-outage>`. This behavior may
   also occur during an actual regional outage if the {+cluster+} has
   insufficient healthy nodes to support scaling operations.

.. important:: Sudden Workload Spikes

   Scaling up to a greater {+cluster+} tier requires enough time to
   prepare backing resources. Automatic scaling may not occur when a
   {+cluster+} receives a burst of activity, such as a bulk insert. To
   reduce the risk of running out of resources, plan to scale up
   {+clusters+} before bulk inserts and other workload spikes.

Example
~~~~~~~

Consider an example scenario with the following values to see how
|service| evaluates the scaling conditions. The baseline CPU utilization
is not visible in the |service| metrics panel and can range from 20%-50%
for burstable instance types. You can use any value in that range to
estimate upper and lower bounds, and this example uses 20% as the lower
end of that range.

- :guilabel:`Normalized System CPU`: 60%
- :term:`Baseline CPU utilization <baseline CPU utilization>`: 20%
- :term:`CPU steal`: 10%

Evaluating the conditions:

**Condition 1 (AWS)**: Requires average
:term:`Relative System CPU Utilization
<relative system CPU utilization>` > 90% for 20 minutes
AND average :term:`CPU steal` > 30% for 3 minutes.

- Relative CPU: 60% ÷ 20% = 300%, capped at 100%. First threshold met.
- CPU steal is 10%, which doesn't exceed 30%. Second threshold not met.
- Result: Condition 1 Not Met. Both thresholds must be true.

**Condition 2**: Requires average :guilabel:`Normalized System CPU` >
90% for 20 minutes.

- Normalized System CPU is 60%, which doesn't exceed 90%.
- Result: Condition 2 Not Met.

**Condition 3**: Requires average :term:`Relative System CPU Utilization
<relative system CPU utilization>` > 75% for 1 hour.

- Relative CPU: 60% ÷ 20% = 300%, capped at 100%.
- Result: Condition 3 Met. |service| triggers auto-scaling.

Conditions for Scaling Down
---------------------------

To optimize costs, |service| reactively scales down nodes in your
{+cluster+} under the conditions described in this section.

|service| begins checking these conditions from the moment you enable
downscaling, not retroactively. Even if your cluster met these
conditions before you enabled downscaling, |service| will not scale down
until the required time windows have elapsed since you enabled the
feature.

If the next lowest {+cluster+} tier is within your :guilabel:`Minimum
Cluster Size` range, |service| scales the nodes in your {+cluster+} down
to the next lowest tier if *all* of the following criteria are true for
*all* nodes in the cluster:

- All nodes:

  - |service| hasn't scaled the cluster down (manually or automatically)
    in the past 24 hours.
  - |service| hasn't provisioned or unpaused the cluster in the past 24
    hours.
  - |service| hasn't stopped and restarted any cluster nodes in the past
    12 hours.

- :term:`Operational nodes <operational node>`:

  - The average :guilabel:`Normalized System CPU` is below 45% of
    resources available to the {+cluster+} over at least the last 10
    minutes **AND** the last 4 hours. |service| uses the "4 hours
    average" checkpoint as an indication that the CPU load has settled
    down on the observed level. |service| uses the "10 minutes average"
    checkpoint as an indication that no recent CPU spikes have occurred
    that |service| didn't capture with the "4 hour average" checkpoint.

    .. note::

       For ``M10`` and ``M20`` tiers, |service| applies the 45% CPU
       threshold relative to the instance :term:`baseline CPU
       utilization` rather than the standard 100% baseline. Using 20% as
       a lower-end estimate, the effective absolute CPU threshold for
       scale-down is approximately **9%** (45% of 20%).

  - The average :manual:`WiredTiger cache
    </reference/command/serverStatus/#serverstatus.wiredTiger.cache>`
    usage is below 90% of the maximum WiredTiger cache size for at least
    the last 10 minutes **AND** the last 4 hours at the **current**
    {+cluster+} tier size. This indicates to |service| that the current
    {+cluster+} isn't overloaded.

  - The :guilabel:`Projected Memory Utilization` at the new lower
    {+cluster+} tier is below 60% for at least the last 10 minutes
    **AND** the last 4 hours.

    To calculate :guilabel:`Projected Memory Utilization`, |service|
    starts with the current memory usage, visible as :ref:`System
    Memory: Memory Used (bytes) <metrics-system-memory>` in |service|
    metrics. |service| subtracts the current :manual:`WiredTiger cache
    </reference/command/serverStatus/#serverstatus.wiredTiger.cache>`
    usage, adds 80% of the maximum WiredTiger cache size on the **new**
    lower tier, then divides the result by that tier's total RAM.

    This value differs from :guilabel:`System Memory Utilization`, which
    measures all memory in use against the RAM on the current tier.

    .. note::

       |service| includes the WiredTiger cache in this calculation to
       make it more likely that {+clusters+} with a full cache, but
       otherwise low traffic, scale down. Scaling down requires both of
       the following thresholds to pass:

       - **90%**: The current tier's WiredTiger cache usage must be
         below 90% of its maximum size.

       - **60%**: The :guilabel:`Projected Memory Utilization` on the
         new lower tier must be below 60%.

  These conditions ensure that |service| scales down operational nodes
  in your {+cluster+} to prevent high utilization states.

  .. note::

     |service| evaluates memory-based scaling using **projected memory
     utilization**, which differs from the :guilabel:`System Memory
     Utilization` shown in the |service| UI. If a scale-down does not
     occur when
     :guilabel:`System Memory Utilization` appears low, contact
     |mdb-support|.

- :term:`Analytics nodes <analytics node>`:

  - The average :guilabel:`Normalized System CPU` and :guilabel:`System
    Memory Utilization` over the past 24 hours is below 50% of resources
    available to the {+cluster+}.

  .. note::

     ``M10`` and ``M20`` {+clusters+} use lower thresholds to account for
     caps on CPU usage set by cloud providers after burst periods. These
     thresholds vary depending on your cloud provider and {+cluster+} tier.