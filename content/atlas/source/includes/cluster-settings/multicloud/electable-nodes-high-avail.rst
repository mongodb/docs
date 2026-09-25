If you add regions with electable nodes, you:

- increase data availability
- reduce the impact of data center outages

On {+atlas-core-cluster+}s, you can deploy nodes to multiple regions
within the same cloud provider or across multiple cloud providers.
{+atlas-infinite-cluster+}s don't support multi-region or multi-cloud
{+clusters+} in public preview.

{+service+} sets the node in the first row of the :guilabel:`Electable
nodes` table as the :guilabel:`Highest Priority` region. {+service+}
prioritizes nodes in this region for :term:`primary` eligibility. Other
nodes rank in the order that they appear. For more information, see
:ref:`rs-election-priority`.