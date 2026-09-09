To specify a :term:`cluster's generation <cluster generation>` using the
{+atlas-admin-api+} or {+atlas-cli+}, use the ``instanceSize`` or ``--tier``
options, respectively.

Gen1 clusters use only the cluster tier in their names in the API and
CLI, while Gen2 clusters use the cluster tier with ``_GEN_2`` appended.
For example, to deploy an ``M30`` tiered cluster:

- Use ``M30`` for a Gen1 ``M30`` cluster.
- Use ``M30_GEN_2`` for a Gen2 ``M30`` cluster.

For a list of |aws| and |gcp| cluster tiers that support Gen2 clusters, see:

- :ref:`AWS Gen2 Available Cluster Tiers <aws-reference-gen2-cluster-tiers>`.
- :ref:`GCP Gen2 Available Cluster Tiers <gcp-reference-gen2-cluster-tiers>`.