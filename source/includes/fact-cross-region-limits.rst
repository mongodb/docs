For a given region in an |service| project with multi-region clusters, the
total sum of MongoDB nodes on all *other* regions in that project cannot
exceed 40. This limit applies across all cloud service providers.

For example, if an |service| project has 20 nodes in ``Region A`` and 20 nodes
in ``Region B``, you can deploy no more than 20 additional nodes in that
project in any given region. This limit applies even if ``Region A`` and
``Region B`` are backed by different cloud service providers.

For |service| projects where every cluster is deployed to a single region, you
cannot create a multi-region cluster in that project if there are already 40
or more nodes in that single region.
