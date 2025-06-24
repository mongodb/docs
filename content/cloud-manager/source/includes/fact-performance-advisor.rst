The Performance Advisor monitors any operation with a query predicate
that :ref:`MongoDB considers slow <slow-queries>` and suggests new
:manual:`indexes </indexes>` to improve query performance. For the
selected host and time period, the Performance Advisor evaluates up to
the 20,000 most recent slow queries found in the logs.

Recommended indexes are accompanied by sample queries, grouped by
:term:`query shape`, that were run against a collection that would
benefit from the suggested index. The Performance Advisor does not
negatively affect the performance of your |mms| clusters.

You can also monitor collection-level :manual:`query latency </reference/operator/aggregation/collStats/#latencystats-document>` with 
:ref:`Query Insights <query-insights>`.
