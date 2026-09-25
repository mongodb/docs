.. Shared by cluster-autoscaling-compute-core.txt and
.. cluster-autoscaling-compute-infinite.txt. Anything changed here
.. publishes on both edition pages. Edition-specific text belongs on
.. the pages, not here.

Predictive auto-scaling is an extension of auto-scaling.

|service| uses demand-forecasting for host resource utilization and performs
preemptive scaling up of your cluster compute to ensure optimal resource
utilization. With predictive auto-scaling, |service| attempts to scale up
your cluster proactively, ahead of cyclical workload spikes.

Predictive auto-scaling is powered by a machine learning model based on
historical patterns. |service| analyzes resource utilization on the
:term:`primary` node to make scaling decisions. The model predicts when
resource utilization will be high based on historical usage patterns, and
|service| scales the cluster up if the model forecasts high resource
utilization. MongoDB updates the model and its criteria continuously to
optimize |service| performance.

The model analyzes a rolling 4-week input window to identify cyclical
patterns. Any pattern observable within this window, for example,
hourly, daily, weekly, or bi-weekly cycles, can be captured. Patterns
with longer periods, such as monthly or quarterly cycles, fall outside
the 4-week window and are not detectable.

.. note::

   For patterns near the upper limit of the window, accuracy may
   decrease because fewer complete cycles occur within the window.

Predictive auto-scaling has the following benefits for clusters with predictive, cyclical workloads:

- Automatically scale up your cluster for cyclical workload patterns within the 4-week input window.
- Maintain consistent performance and availability during predictable high-demand periods.
- Reduce manual scaling tasks or scheduled scripts by letting |service| manage capacity increases.
- Seamlessly fall back to reactive auto-scaling when changes to the cluster
  workload fall outside of predictable patterns and are non-cyclical or unpredictable.

To trigger predictive auto-scaling, your cluster must maintain continuous
activity logs for two weeks. Once it meets this criterion, the system enables
predictive auto-scaling.

.. note::

   If you pause your cluster, predictive auto-scaling requires
   two consecutive weeks of activity before it can resume.
