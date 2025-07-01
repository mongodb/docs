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

If you choose :guilabel:`Multi-Cloud, Multi-Region & Workload Isolation`, 
you can also choose to configure:

- Electable nodes
- Read-only nodes
- Analytics nodes
- Search nodes

For information on these settings, see 
:ref:`Configure High Availability and Workload Isolation <create-cluster-multi-region>`.
