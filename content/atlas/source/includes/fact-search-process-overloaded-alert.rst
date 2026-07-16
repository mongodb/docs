This alert occurs when the rate of search queries that exceed the
search node's admission control queue threshold is greater than 0. When this
alert is raised, the |fts| process (``mongot``) is overloaded and search
queries are being queued and could be rejected. Queries might be slower than
usual until load decreases. The alert is raised after the condition persists
for 5 minutes.

**Suggested Actions:**

- Upgrade to a :ref:`Search Nodes <what-is-search-node>` tier with more vCPUs.
  If not using Search Nodes, add them for workload isolation.
- Reduce concurrent queries or spread queries out over time.
- Optimize queries by implementing filtering, reducing leading wildcards and
  heavily nested clauses, and retrieving only necessary data.
