The choice of cloud provider and region affects the configuration
options for the available cluster tiers, network latency for clients
accessing your cluster, the geographic location of the nodes in your
cluster, and the :ref:`cost of running the cluster <billing-overview>`.

To learn more about selecting a provider and region, refer to 
:ref:`create-cluster-cloud-provider-region`.

From the :guilabel:`Cloud Provider & Region` section, you can also
choose :guilabel:`Multi-Cloud, Multi-Region & Workload Isolation`. Multi-region
clusters can better withstand data center outages and may contain
dedicated geographic regions for localized reads, thereby improving
performance. To learn how to deploy a multi-region cluster, see
:ref:`create-cluster-multi-region`.

During public preview, {+atlas-infinite-cluster+}s don't support
multi-cloud clusters. On an {+atlas-infinite-cluster+}, you can
configure read-only nodes, analytics nodes, and Search Nodes for
workload isolation.

:guilabel:`Automatically add Search Nodes` is on by default. With this
setting, {+service+} adds Search Nodes when the co-located |fts| and
{+avs+} indexes on each compute node exceed 8 GB. The indexes are
limited to 10 GB per node, at which point the search process pauses
replication. Search Nodes incur additional
:ref:`cost <fts-search-node-costs>`. You can turn off automatic
migration at any time. After |service| adds Search Nodes, you can
remove them only after you drop all search indexes. To learn more, see
:ref:`atlas-infinite-workload-isolation`.

If you choose :guilabel:`Multi-Cloud, Multi-Region & Workload Isolation`, 
you can also choose to configure:

- Electable nodes
- Read-only nodes
- Analytics nodes
- Search nodes

For information on these settings, see 
:ref:`Configure High Availability and Workload Isolation <create-cluster-multi-region>`.
