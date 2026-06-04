Use :ref:`analytics nodes <analytics-nodes-overview>` to isolate
queries which you do not wish to contend with your operational
workload. Analytics nodes help handle data analysis operations, such as
reporting queries from |bic|. To direct queries to analytics nodes, 
use :ref:`pre-defined replica set tags <replica-set-tags>`.

.. note::

   You can deploy analytics nodes for dedicated (``M10`` or higher) clusters only. 
   You can't add analytics nodes on {+Free-clusters+} or {+Flex-clusters+}.

Click :guilabel:`Add a region` to select a region in which to
deploy analytics nodes. Specify the desired number of
:guilabel:`Nodes` for the region.
