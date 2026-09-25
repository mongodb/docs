Use :ref:`analytics nodes <analytics-nodes-overview>` to isolate
queries which you do not wish to contend with your operational
workload. Analytics nodes help handle data analysis operations, such as
reporting queries from |bic|. To direct queries to analytics nodes, 
use :ref:`pre-defined replica set tags <replica-set-tags>`.

.. note::

   You can deploy analytics nodes for dedicated (``M10`` or higher) clusters only. 
   You can't add analytics nodes on {+Free-clusters+} or {+Flex-clusters+}.

For {+atlas-infinite-cluster+}s in public preview, specify the number
of :guilabel:`Nodes`. {+service+} deploys them in the same region as
the {+atlas-infinite-cluster+}. For {+atlas-core-cluster+}s, click
:guilabel:`Add a region` to select a region, then specify the number
of :guilabel:`Nodes` for that region.
