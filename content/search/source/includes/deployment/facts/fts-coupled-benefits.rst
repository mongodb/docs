When you enable |fts|, you can easily build search on top of your data
with an integrated, fully managed search engine that automatically
syncs to your database. |fts| provides a rich query language that uses
|fts| aggregation pipeline stages like :pipeline:`$search` and
:pipeline:`$searchMeta` for full-text search and
:pipeline:`$vectorSearch` for semantic search in conjunction with
other MongoDB aggregation pipeline stages, and score-based results
ranking.

Depending on the resources provisioned for your cluster, deploying
both processes on the same node might be more cost-efficient than running
the search process on a separate, dedicated node.
