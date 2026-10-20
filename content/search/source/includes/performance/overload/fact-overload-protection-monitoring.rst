.. :snippet-start: fact-overload-protection-monitoring
.. :snippet-output: content/vector-search/source/includes/performance/overload/

|service| reports queuing before it results in rejections, which gives
you time to act. Use the following signals:

- The :guilabel:`Search Process Throttling` metric reports the rate at
  which the search process signaled that it exceeded its queue
  threshold. A sustained non-zero value means that work arrives faster
  than the process can admit it. To view this metric, see
  :ref:`review-atlas-search-metrics`.

- The :guilabel:`MongoDB Search: Search Process is Overloaded` alert
  fires when the condition persists for 5 minutes. To resolve this
  alert, see :ref:`atlas-search-alerts`.

To reduce the load that reaches the search process, take the following
actions:

- Deploy :ref:`Search Nodes <what-is-search-node>` to isolate the
  search workload, or upgrade to a Search Node tier with more vCPUs.

- Spread queries out over time instead of sending them in bursts.

- Optimize your queries. Add filters, reduce leading wildcards and
  deeply nested clauses, and return only the fields that you need.

.. :snippet-end:
