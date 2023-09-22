Enabling {+qe+} on a collection redacts fields from some diagnostic
commands and omits some operations from the query log. This limits the
data available to MongoDB support engineers, especially when
analyzing query performance. To measure the impact of operations against
encrypted collections, use a third party application performance
monitoring tool to collect metrics.